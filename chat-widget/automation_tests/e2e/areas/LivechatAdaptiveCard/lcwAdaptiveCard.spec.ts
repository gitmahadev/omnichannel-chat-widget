import { TestSettings } from "configuration/test-settings";
import { LiveChatPage } from "pages/livechat";
import { testHelper } from "pages/testHelper";
import { Browser, BrowserContext } from "playwright";

describe("live chat button", () => {
    // let newBrowser: Browser;
    let liveChatContext: BrowserContext;
    let livechatpage: LiveChatPage;

    beforeEach(async () => {
        liveChatContext = await browser.newContext({
            viewport: TestSettings.Viewport,
            acceptDownloads: true,
        });
    });

    afterEach(async () => {
        testHelper.dispose(liveChatContext);
    });

    ///<summary>
    /// Test Case 2698901: [LCW Customization] [Adaptive Cards] Verify customer getting appropriate Hero Card IMBack ,Hero Card,Action show card,Adaptive Card OpenUrl Action,Adaptive Card Submit Action
    /// Test case link: https://dynamicscrm.visualstudio.com/OneCRM/_workitems/edit/2698901
    /// </summary>
    it("2698901: [LCW Customization] [Adaptive Cards] Verify customer getting appropriate Hero Card IMBack ,Hero Card,Action show card,Adaptive Card OpenUrl Action,Adaptive Card Submit Action ", async () => {
        livechatpage = new LiveChatPage(await liveChatContext.newPage());
        await livechatpage.openLiveChatAdaptiveCardWidget();
        await livechatpage.OpenChatWidget();
    });
});