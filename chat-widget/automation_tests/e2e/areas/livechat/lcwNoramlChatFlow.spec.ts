import { TestSettings } from "configuration/test-settings";
import { LiveChatPage } from "pages/livechat";
import { testHelper } from "pages/testHelper";
import { BrowserContext } from "playwright";
import { CustomLiveChatWidgetConstants } from "Utility/constants";

describe("Normal chat flow", () => {
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
    /// Test Case 2680470: [LCW Customization] [General] Verify normal chat flow
    /// </summary>
    it("2680470: [LCW Customization] [General] Verify normal chat flow", async () => {
        livechatpage = new LiveChatPage(await liveChatContext.newPage());
        await livechatpage.openLiveChatWidget(CustomLiveChatWidgetConstants.CustomLCWAdaptiveCardWidgetFilePath);
        await livechatpage.validatelcwNoramlChatflow();
        await livechatpage.closePage();
    });
});