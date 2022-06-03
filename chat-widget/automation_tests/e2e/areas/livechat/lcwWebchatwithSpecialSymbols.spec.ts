import { TestSettings } from "configuration/test-settings";
import { LiveChatPage } from "pages/livechat";
import { testHelper } from "pages/testHelper";
import { BrowserContext } from "playwright";
import { SelectorConstants } from "Utility/constants";

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
    /// Test case link: https://dynamicscrm.visualstudio.com/OneCRM/_workitems/edit/2698901
    /// </summary>
    it("2698882: [LCW Customization] [WebChat] verify able to use special symbols asterisk(*) and the pound(#) ", async () => {
        livechatpage = new LiveChatPage(await liveChatContext.newPage());
        await livechatpage.openLiveChatAdaptiveCardWidget();
        await livechatpage.OpenChatWidget();
        await livechatpage.waituntilBotMsg(SelectorConstants.BotwaitGreetMsg);
        await livechatpage.sendMessageforC1("*Hi");
        expect(await livechatpage.validateSpecialSymbolMessages("*Hi",SelectorConstants.SpecialSymbolAsteriskMsg)).toBeTruthy();
        await livechatpage.sendMessageforC1("#Hi");
        expect(await livechatpage.validateSpecialSymbolMessages("#Hi",SelectorConstants.SpecialSymbolPoundMsg)).toBeTruthy();
        await livechatpage.closePage();
    });
});