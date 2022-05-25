import { BrowserContext } from "playwright";

export class testHelper {
    private static finishedTests = {};
    public static async dispose(browserContext: BrowserContext) {
        try {
            const state = expect.getState();
            const currentTestName = state.currentTestName;
            const regex = /\b(\d{7})\b/;
            const matches = regex.exec(currentTestName);
            const globalBrowser = browserContext.browser();
            const contextGUID = (browserContext as any)._guid;
            const contexts = globalBrowser.contexts();
            for (const [contextIndex, currentContext] of contexts.entries()) {
                const currentContextGUID = (currentContext as any)._guid;
                if (currentContextGUID === contextGUID) {
                    const pages = currentContext.pages();
                    for (let i = 0; i < pages.length; i++) {
                        const cpage = pages[i];
                        if (matches && matches.length > 0) {
                            const testcaseId = matches[0];
                            const itTitle = currentTestName.split(":")[1].trim();
                            const testUniqueName = `${testcaseId}/page${i}_${itTitle}`;
                            let runningTimes = this.finishedTests[testUniqueName] ?? 0;
                            const screenshotFileName = currentTestName.replace(/\W/g, "_");
                            try {
                                await cpage.screenshot({
                                    path: `screenshots/${screenshotFileName}_context${contextIndex}_page${i}_${new Date().getUTCHours()}-${new Date().getUTCMinutes()}.png`,
                                    fullPage: true,
                                    type: "png"
                                });
                                this.finishedTests[testUniqueName] = ++runningTimes;
                            }
                            catch {
                                //If page is already closed, there will be an exception
                            }
                        }
                    }
                }
            }
            await browserContext?.close();
        }
        catch (ex) {
            console.error("Error while closing the browser context: " + ex);
        }
    }
}