import { TestSettings } from "configuration/test-settings";
import { LiveChatPage } from "pages/livechat";
import { testHelper } from "pages/testHelper";
import { BrowserContext } from "playwright";
import { Constants, CustomLiveChatWidgetConstants, SelectorConstants } from "Utility/constants";

describe("LCW webchat with special symbols", () => {
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
    /// Test Case 2698882: [LCW Customization] [WebChat] verify able to use special symbols asterisk(*) and the pound(#)
    /// </summary>
    it("2698882: [LCW Customization] [WebChat] verify able to use special symbols asterisk(*) and the pound(#) ", async () => {
        livechatpage = new LiveChatPage(await liveChatContext.newPage());
        await livechatpage.openLiveChatWidget(CustomLiveChatWidgetConstants.CustomLCWAdaptiveCardWidgetFilePath);
        await livechatpage.OpenChatWidget();
        await livechatpage.waituntilBotMsg(SelectorConstants.BotwaitGreetMsg);
        await livechatpage.sendMessageforC1(Constants.AsteriskMessage);
        expect(await livechatpage.validateSpecialSymbolMessages(Constants.AsteriskMessage,SelectorConstants.SpecialSymbolAsteriskMsg)).toBeTruthy();
        await livechatpage.sendMessageforC1(Constants.PoundMessage);
        expect(await livechatpage.validateSpecialSymbolMessages(Constants.PoundMessage,SelectorConstants.SpecialSymbolPoundMsg)).toBeTruthy();
        await livechatpage.closePage();
    });
});