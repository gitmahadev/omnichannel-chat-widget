import { TestSettings } from "configuration/test-settings";
import { LiveChatPage } from "pages/livechat";
import { testHelper } from "pages/testHelper";
import { BrowserContext } from "playwright";
import { Constants, CustomLiveChatWidgetConstants, SelectorConstants } from "Utility/constants";

describe("LCW webchat with HTML link", () => {
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
    /// Test Case 2698905: [LCW Customization] [WebChat] Verify html link sent from bot render in a new tab
    /// </summary>
    it("2698905: [LCW Customization] [WebChat] Verify html link sent from bot render in a new tab", async () => {
        livechatpage = new LiveChatPage(await liveChatContext.newPage());
        await livechatpage.openLiveChatWidget(CustomLiveChatWidgetConstants.CustomLCWBotWidgetFilePath);
        await livechatpage.OpenChatWidget();
        await livechatpage.sendMessageforC1(Constants.MessagetoAgent);
        await livechatpage.waituntilBotMsg(SelectorConstants.BotMessageExternalLink);
        const link= await livechatpage.verifyLinkOpens(liveChatContext, SelectorConstants.BotMessageExternalLink, 
            SelectorConstants.BotwaitGreetMsgwithHTMLLink);
        await expect(link).toBeTruthy();    
        livechatpage.closePage();  
    });
});