import { TestSettings } from "configuration/test-settings";
import { LiveChatConstants, LiveChatPage, LCWConstants } from "pages/liveChat";
import { testHelper } from "pages/testHelper";
import { BrowserContext } from "playwright";
import { CustomLiveChatWidgetConstants, SelectorConstants } from "Utility/constants";

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
    /// </summary>
    it("2698901: [LCW Customization] [Adaptive Cards] Verify customer getting appropriate Hero Card IMBack ,Hero Card,Action show card,Adaptive Card OpenUrl Action,Adaptive Card Submit Action ", async () => {
        livechatpage = new LiveChatPage(await liveChatContext.newPage());
        await livechatpage.openLiveChatWidget(CustomLiveChatWidgetConstants.CustomLCWAdaptiveCardWidgetFilePath);
        await livechatpage.OpenChatWidget();
        await livechatpage.waituntilBotMsg(SelectorConstants.BotwaitGreetMsg);
        await livechatpage.sendMessageforC1(LiveChatConstants.AdaptivecardHeroCardImback);
        expect(await livechatpage.validateC1Messages(LCWConstants.BotMessagesXpathMessage,
            LiveChatConstants.AdaptivecardHeroCardImback)).toBeTruthy();
        await livechatpage.sendMessageforC1(LiveChatConstants.AdaptiveCardHerocard);
        expect(await livechatpage.validateC1Messages(LCWConstants.BotMessagesXpathMessage,
            LiveChatConstants.AdaptiveCardHerocard)).toBeTruthy();
        expect(await livechatpage.validateC1Images(LiveChatConstants.AdaptiveCardHerocard)).toBeTruthy();
        expect(await livechatpage.validateC1Controls(LiveChatConstants.AdaptiveCardHerocard)).toBeTruthy();
        await livechatpage.verifyLinkOpens(liveChatContext, SelectorConstants.AdaptivecardherocardNavigate, SelectorConstants.AdaptivecardheroCardLinkUrl);
        await livechatpage.sendMessageforC1(LiveChatConstants.AdaptiveCardFlightcard);
        expect(await livechatpage.validateC1Messages(LCWConstants.BotMessagesXpathMessage,
            LiveChatConstants.AdaptiveCardFlightcard)).toBeTruthy();
        expect(await livechatpage.validateC1Images(LiveChatConstants.AdaptiveCardFlightcard)).toBeTruthy();
        expect(await livechatpage.validateC1Controls(LiveChatConstants.AdaptiveCardFlightcard)).toBeTruthy();
        await livechatpage.sendMessageforC1(LiveChatConstants.AdaptiveCardActivityUpdate);
        expect(await livechatpage.validateC1Messages(LCWConstants.BotMessagesXpathMessage,
            LiveChatConstants.AdaptiveCardActivityUpdate)).toBeTruthy();
        expect(await livechatpage.validateC1Controls(LiveChatConstants.AdaptiveCardActivityUpdate)).toBeTruthy();
        await livechatpage.setduedateforAdaptivecardActivityUpdate();
        await livechatpage.verifyLinkOpens(liveChatContext, SelectorConstants.AdaptivecardActivityUpdateNavigate, SelectorConstants.AdaptivecardActivityUpdatelinkUrl);
        await livechatpage.sendMessageforC1(LiveChatConstants.AdaptiveCardShowAction);
        expect(await livechatpage.validateC1Messages(LCWConstants.BotMessagesXpathMessage,
            LiveChatConstants.AdaptiveCardShowAction)).toBeTruthy();
        expect(await livechatpage.validateC1Controls(LiveChatConstants.AdaptiveCardShowAction)).toBeTruthy();
        await livechatpage.validateAdaptiveCardPopupOption();
        await livechatpage.sendMessageforC1(LiveChatConstants.AdaptiveCardAdaptiveOpenurl);
        expect(await livechatpage.validateC1Messages(LCWConstants.BotMessagesXpathMessage,
            LiveChatConstants.AdaptiveCardAdaptiveOpenurl)).toBeTruthy();
        expect(await livechatpage.validateC1Images(LiveChatConstants.AdaptiveCardAdaptiveOpenurl)).toBeTruthy();
        await livechatpage.verifyLinkOpens(liveChatContext, SelectorConstants.AdaptivecardOpenurlActionNavigate, SelectorConstants.AdaptivecardOpenurl);
        await livechatpage.sendMessageforC1(LiveChatConstants.AdaptivecardSubmitAction);
        expect(await livechatpage.validateC1Messages(LCWConstants.BotMessagesXpathMessage,
            LiveChatConstants.AdaptivecardSubmitAction)).toBeTruthy();
        await livechatpage.validateAdaptiveCardSubmitform();
        await livechatpage.sendMessageforC1(LiveChatConstants.AdaptivecardInputs);
        expect(await livechatpage.validateC1Messages(LCWConstants.BotMessagesXpathMessage,
            LiveChatConstants.AdaptivecardInputs)).toBeTruthy();
        await livechatpage.validateAdaptiveCardInputSubmitform();
        await livechatpage.sendMessageforC1(LiveChatConstants.AdaptivecardFlightItinerary);
        expect(await livechatpage.validateC1Messages(LCWConstants.BotMessagesXpathMessage,
            LiveChatConstants.AdaptivecardFlightItinerary)).toBeTruthy();
        expect(await livechatpage.validateC1Controls(LiveChatConstants.AdaptivecardFlightItinerary)).toBeTruthy();
        await livechatpage.sendMessageforC1(LiveChatConstants.AdaptivecardToggleAction);
        expect(await livechatpage.validateC1Messages(LCWConstants.BotMessagesXpathMessage,
            LiveChatConstants.AdaptivecardToggleAction)).toBeTruthy();
        expect(await livechatpage.validateC1Controls(LiveChatConstants.AdaptivecardToggleAction)).toBeTruthy();
        await livechatpage.closePage();
    });

    /// <summary>
    /// Test Case 2698900: [LCW Customization] [Adaptive Cards] Verify customer getting appropriate Audio cards, Video cards, Thumbnail cards,Receipt,Animation cards and Signin cards
    /// </summary>
    it("2698900: [LCW Customization] [Adaptive Cards] Verify customer getting appropriate Audio cards, Video cards, Thumbnail cards,Receipt,Animation cards and Signin cards", async () => {
        livechatpage = new LiveChatPage(await liveChatContext.newPage());
        await livechatpage.openLiveChatWidget(CustomLiveChatWidgetConstants.CustomLCWAdaptiveCardWidgetFilePath);
        await livechatpage.OpenChatWidget();
        await livechatpage.waitUntilLiveChatSelectorIsVisible(
            CustomLiveChatWidgetConstants.LiveChatButtomId
        );
        await LiveChatPage.sendAdaptiveCardMessageandresponse(livechatpage, LiveChatConstants.AdaptivecardAudio);
        expect(await livechatpage.validateAdaptiveCardResponse(LiveChatConstants.AdaptivecardAudio)).toBeTruthy();
        await LiveChatPage.sendAdaptiveCardMessageandresponse(livechatpage, LiveChatConstants.AdaptivecardThumbnail);
        expect(await livechatpage.validateAdaptiveCardResponse(LiveChatConstants.AdaptivecardThumbnail)).toBeTruthy();
        await livechatpage.verifyThumbnail();
        await livechatpage.navigatetoGetstarted();
        await LiveChatPage.sendAdaptiveCardMessageandresponse(livechatpage, LiveChatConstants.AdaptivecardReceipt);
        expect(await livechatpage.validateAdaptiveCardResponse(LiveChatConstants.AdaptivecardReceipt)).toBeTruthy();
        await livechatpage.verifyReceiptcards();
        await livechatpage.navigateToMoreinformation();
        await LiveChatPage.sendAdaptiveCardMessageandresponse(livechatpage, LiveChatConstants.AdaptivecardSigninCard);
        expect(await livechatpage.validateAdaptiveCardResponse(LiveChatConstants.AdaptivecardSigninCard)).toBeTruthy();
        await livechatpage.verifySiginbutton();
        await livechatpage.navigatetoSiginincard();
        await livechatpage.closePage();
    });
});