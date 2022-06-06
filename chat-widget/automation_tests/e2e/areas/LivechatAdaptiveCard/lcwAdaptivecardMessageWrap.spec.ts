import { TestSettings } from "configuration/test-settings";
import { LiveChatConstants, LiveChatPage } from "pages/livechat";
import { testHelper } from "pages/testHelper";
import { BrowserContext } from "playwright";
import { CustomLiveChatWidgetConstants } from "Utility/constants";

describe("LCW Customization for adaptive cards", () => {
    let liveChatContext: BrowserContext;
    let livechatpage: LiveChatPage;

    beforeEach(async () => {
        liveChatContext = await browser.newContext({
            viewport: TestSettings.Viewport,
            acceptDownloads: false,
        });
    });

    afterEach(async () => {
        testHelper.dispose(liveChatContext);
    });

    ///<summary>
    /// Test Case 2698923: [LCW Customization] [Adaptive Cards] Verify long text multiple choice questions messages wrap around the adaptive card push buttons
    /// </summary>
    it("2698923: [LCW Customization] [Adaptive Cards] Verify long text multiple choice questions messages wrap around the adaptive card push buttons", async () => {
        livechatpage = new LiveChatPage(await liveChatContext.newPage());
        await livechatpage.openLiveChatWidget(CustomLiveChatWidgetConstants.CustomLCWAdaptiveCardWrapWidgetFilePath);
        await livechatpage.OpeniframeLiveChat();
        await livechatpage.sendMessage(LiveChatConstants.AdaptivecardButtonWrap);
        expect(await livechatpage.validateAdaptiveCardMsgWrap()).toBeTruthy();
        livechatpage.closePage();
    });
});