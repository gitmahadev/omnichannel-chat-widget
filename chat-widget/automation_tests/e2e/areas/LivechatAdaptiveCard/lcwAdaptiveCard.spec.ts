import { TestSettings } from "configuration/test-settings";
import { LiveChatPage, LiveChatWidgetPageConstants } from "pages/livechat";
import { testHelper } from "pages/testHelper";
import { BrowserContext } from "playwright";
import { SelectorConstants } from "Utility/constants";

describe("LCW Customization for adaptive cards", () => {
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
        await livechatpage.waituntilBotMsg(SelectorConstants.BotwaitGreetMsg);
        await livechatpage.sendMessageforC1("hero card imback");
        expect(await livechatpage.validateC1Messages(LiveChatWidgetPageConstants.BotMessagesXpathMessage,
            "hero card imback")).toBeTruthy();
        await livechatpage.sendMessageforC1("hero card");
        expect(await livechatpage.validateC1Messages(LiveChatWidgetPageConstants.BotMessagesXpathMessage,
            "hero card")).toBeTruthy();
        expect(await livechatpage.validateC1Images("hero card")).toBeTruthy();
        expect(await livechatpage.validateC1Controls("hero card")).toBeTruthy();
        await livechatpage.verifyLinkOpens(liveChatContext, SelectorConstants.AdaptivecardherocardNavigate, SelectorConstants.AdaptivecardheroCardLinkUrl);  
        await livechatpage.sendMessageforC1("flight update");
        expect(await livechatpage.validateC1Messages(LiveChatWidgetPageConstants.BotMessagesXpathMessage,
            "flight update")).toBeTruthy();
        expect(await livechatpage.validateC1Images("flight update")).toBeTruthy();
        expect(await livechatpage.validateC1Controls("flight update")).toBeTruthy();
        await livechatpage.sendMessageforC1("activity update");
        expect(await livechatpage.validateC1Messages(LiveChatWidgetPageConstants.BotMessagesXpathMessage,
            "activity update")).toBeTruthy();
        expect(await livechatpage.validateC1Controls("activity update")).toBeTruthy();
        await livechatpage.setduedateforAdaptivecardActivityUpdate();
        await livechatpage.verifyLinkOpens(liveChatContext, SelectorConstants.AdaptivecardActivityUpdateNavigate, SelectorConstants.AdaptivecardActivityUpdatelinkUrl);  
        await livechatpage.sendMessageforC1("adaptive card show action");
        expect(await livechatpage.validateC1Messages(LiveChatWidgetPageConstants.BotMessagesXpathMessage,
            "adaptive card show action")).toBeTruthy();
        expect(await livechatpage.validateC1Controls("adaptive card show action")).toBeTruthy();
        await livechatpage.validateAdaptiveCardPopupOption();
        await livechatpage.sendMessageforC1("adaptive card openurl action");
        expect(await livechatpage.validateC1Messages(LiveChatWidgetPageConstants.BotMessagesXpathMessage,
            "adaptive card openurl action")).toBeTruthy();
        expect(await livechatpage.validateC1Images("adaptive card openurl action")).toBeTruthy();
        await livechatpage.verifyLinkOpens(liveChatContext, SelectorConstants.AdaptivecardOpenurlActionNavigate, SelectorConstants.AdaptivecardOpenurl);  
        await livechatpage.sendMessageforC1("adaptive card submit action");
        expect(await livechatpage.validateC1Messages(LiveChatWidgetPageConstants.BotMessagesXpathMessage,
            "adaptive card submit action")).toBeTruthy();
        await livechatpage.validateAdaptiveCardSubmitform();
        await livechatpage.sendMessageforC1("inputs");
        expect(await livechatpage.validateC1Messages(LiveChatWidgetPageConstants.BotMessagesXpathMessage,
            "inputs")).toBeTruthy();
        await livechatpage.validateAdaptiveCardInputSubmitform();
        await livechatpage.sendMessageforC1("flight itinerary");
        expect(await livechatpage.validateC1Messages(LiveChatWidgetPageConstants.BotMessagesXpathMessage,
            "flight itinerary")).toBeTruthy();
        expect(await livechatpage.validateC1Controls("flight itinerary")).toBeTruthy();
        await livechatpage.sendMessageforC1("adaptive card toggle action");
        expect(await livechatpage.validateC1Messages(LiveChatWidgetPageConstants.BotMessagesXpathMessage,
            "adaptive card toggle action")).toBeTruthy();
        expect(await livechatpage.validateC1Controls("adaptive card toggle action")).toBeTruthy();
        await livechatpage.closePage();
    });
});