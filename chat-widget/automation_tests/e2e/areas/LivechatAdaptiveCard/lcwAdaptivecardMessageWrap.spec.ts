import { TestSettings } from "configuration/test-settings";
import { LiveChatPage } from "pages/livechat";
import { testHelper } from "pages/testHelper";
import { BrowserContext } from "playwright";

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
    /// Test case link: https://dynamicscrm.visualstudio.com/OneCRM/_workitems/edit/2698923
    /// </summary>
    it("2698923: [LCW Customization] [Adaptive Cards] Verify long text multiple choice questions messages wrap around the adaptive card push buttons", async () => {
        livechatpage = new LiveChatPage(await liveChatContext.newPage());
        await livechatpage.openLiveChatAdaptiveCardWrapWidget();
        await livechatpage.OpeniframeLiveChat();
        await livechatpage.sendMessage("Adaptive Card Button Wrap");
        expect(await livechatpage.validateAdaptiveCardMsgWrap()).toBeTruthy();
        livechatpage.closePage();
    });
});