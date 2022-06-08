import { BrowserContext, Page } from "playwright";
import { Constants, CustomLiveChatWidgetConstants, SelectorConstants } from "Utility/constants";
import { BasePage } from "./base.page";
import { DefaultTimeoutConstants, TimeoutConstants } from "./timeout-constants";

export const LCWConstants = {
    SendButtonXPathBlob:
        "//*[@type='button' and contains(@class,'send')]|//*[@id='web-chat-root-div']//div[@class='main']//div//button[@title='Send']",
    SendButtonXPathRu:
        "//*[@id='web-chat-root-div']//div[@class='main']//div//button[@title='Отправить']|//*[@type='button' and contains(@class,'send')]",
    TextareaXPath: "//*[@data-id='webchat-sendbox-input']",
    BotMessagesXpathMessage: "(//div[contains(text(),'You said:')])",
    closeChat: "//*[@id='webChatHeaderCloseButton']",
};

export enum LiveChatMessageConstants {
    AutoCloseMessageXpaths = "//p[contains(text(),'The session has paused due to inactivity. Please reply to continue this chat.')]",
    BotwaitGreetMsg = "//p[contains(text(),'Hi Customer! This is your Omnichannel Test Bot 🤖')]",
}

export enum LiveChatConstants {
    AdaptivecardHeroCardImback="hero card imback",
    AdaptiveCardHerocard = "hero card",
    AdaptiveCardFlightcard = "flight update",
    AdaptiveCardActivityUpdate = "activity update",
    AdaptiveCardShowAction = "adaptive card show action",
    AdaptiveCardAdaptiveOpenurl = "adaptive card openurl action",
    AdaptivecardFlightItinerary = "flight itinerary",
    AdaptivecardToggleAction = "adaptive card toggle action",
    AdaptivecardAudio = "Audio Card",
    AdaptivecardReceipt = "Receipt Card",
    AdaptivecardThumbnail = "Thumbnail Card",
    AdaptivecardSigninCard = "signin card",
    AdaptivecardSubmitAction="adaptive card submit action",
    AdaptivecardInputs="inputs",
    AdaptivecardButtonWrap="Adaptive Card Button Wrap"
}

export class LiveChatPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    public async waitUntilSelectorIsVisible(selectorVal: string, maxCount = 3, page: Page = null, timeout: number = TimeoutConstants.DefaultTimeout) {
        let dataCount = 0;
        const pageObject = page ?? this.Page;
        while (dataCount < maxCount) {
            try {
                await pageObject.waitForSelector(selectorVal, { timeout });
                return true;
            } catch {
                dataCount++;
            }
        }
        return false;
    }

    public async waitForDomContentLoaded() {
        await this.Page.waitForLoadState(Constants.DomContentLoaded);
    }

    public async OpenChatWidget() {
        await this.waitUntilSelectorIsVisible(CustomLiveChatWidgetConstants.LiveChatButtomId, Constants.Two, this._page, TimeoutConstants.MaxTimeout);
        await this.Page.click(CustomLiveChatWidgetConstants.LiveChatButtomId);
        await this._page.waitForTimeout(TimeoutConstants.DefaultTimeout);
    }

    public async waitUntilChatWidgetIsVisible(
        maxCount: number = Constants.Three,
        timeout: number = TimeoutConstants.DefaultTimeout
    ) {
        let dataCount = 0;
        while (dataCount < maxCount) {
            try {
                const liveChatiframeName = await this.Page.$(
                    SelectorConstants.LiveChatiframeName
                );
                const chatiFrame = await liveChatiframeName.contentFrame();
                await chatiFrame.waitForSelector(SelectorConstants.Letschat, {
                    timeout,
                });
                return true;
            } catch {
                Error("Can't find the chat widget selector");
            }
            dataCount++;
            await this.Page.waitForTimeout(timeout); // wait for provided timeout if chat widget is not visible with in given time frame and causes an exception, post this time frame it will recheck condition to see if chat widget is visible.
        }
        return false;
    }

    public async OpeniframeLiveChat(isAuthUser = false) {
        await this.waitUntilSelectorIsVisible(
            SelectorConstants.LiveChatiframeName,
            Constants.Three,
            null,
            TimeoutConstants.MaxTimeout
        );
        await this.waitUntilChatWidgetIsVisible(
            Constants.Three,
            TimeoutConstants.MaxTimeout
        );
        const liveChatiframeName = await this.Page.$(
            SelectorConstants.LiveChatiframeName
        );
        const iFrame = await liveChatiframeName.contentFrame();
        await iFrame.waitForSelector(SelectorConstants.Letschat);
        await iFrame.$eval(SelectorConstants.Letschat, (el) =>
            (el as HTMLElement).click()
        );
        if (!isAuthUser) {
            await iFrame.waitForSelector(LCWConstants.closeChat);
        }
    }

    public async getChatIframe() {
        const liveChatiframeName = await this.Page.$(
            SelectorConstants.LiveChatiframeName
        );
        return await liveChatiframeName.contentFrame();
    }

    public async waitUntilFrameIsVisible(selectorVal: string, maxCount: number, frame: any, timeout: number) {
        let dataCount = 0;
        while (dataCount < maxCount) {
            try {
                await frame.waitForSelector(selectorVal, { timeout });
                return true;
            } catch {
                dataCount++;
            }
        }
        return false;
    }

    public async sendMessage(message: string, language: "en" | "ru" = "en") {
        const sendXPath =
            language === "en"
                ? LCWConstants.SendButtonXPathBlob
                : LCWConstants.SendButtonXPathRu;
        await this.waitUntilSelectorIsVisible(
            SelectorConstants.LiveChatiframeName,
            Constants.Three,
            null,
            TimeoutConstants.OpenWsWaitTimeout
        );
        const liveChatiframeName = await this.Page.$(
            SelectorConstants.LiveChatiframeName
        );
        const iFrame = await liveChatiframeName.contentFrame();
        await this.waitForDomContentLoaded();
        const textArea = await iFrame.waitForSelector(
            LCWConstants.TextareaXPath
        );
        await this.waitForDomContentLoaded();
        await textArea.fill(message);
        await this.Page.keyboard.press(Constants.EnterKey, {
            delay: DefaultTimeoutConstants.Default,
        });
        await this.waitUntilFrameIsVisible(
            sendXPath,
            Constants.Five,
            iFrame,
            TimeoutConstants.DefaultTimeout
        );
        await Promise.all([
            iFrame.$eval(sendXPath, (el) => (el as HTMLElement).click()),
        ]);
    }

    public async validateAdaptiveCardMsgWrap() {
        const iframe = await this.getChatIframe();
        expect(await iframe.waitForSelector(SelectorConstants.AdaptiveCardWrapButton1)).toBeTruthy();
        expect(await iframe.waitForSelector(SelectorConstants.AdaptiveCardWrapButton2)).toBeTruthy();
        expect(await iframe.waitForSelector(SelectorConstants.AdaptiveCardMsgWrap)).toBeTruthy();
        const Ellisis = await iframe.$eval(SelectorConstants.AdaptiveCardNoEllipsis, e => getComputedStyle(e).wordBreak);
        expect(Ellisis.includes("break-word")).toBeTruthy();
        return true;
    }

    public async waituntilBotMsg(botmessage: string, maxCount = 1) {
        let dataCount = 0;
        while (dataCount < maxCount) {
            try {
                await this.Page.waitForTimeout(TimeoutConstants.DefaultTimeout);
                await this.Page.waitForSelector(botmessage);
                return true;
            } catch {
                dataCount++;
            }
        }
        return false;
    }

    public async sendMessageforC1(message: string, language: "en" | "ru" = "en") {
        const sendXPath =
            language === "en"
                ? LCWConstants.SendButtonXPathBlob
                : LCWConstants.SendButtonXPathRu;

        const textArea = await this.Page.waitForSelector(
            LCWConstants.TextareaXPath
        );
        await textArea.fill(message);
        await this.Page.waitForSelector(sendXPath);
        await Promise.all([
            this.Page.$eval(LCWConstants.SendButtonXPathBlob, (el) =>
                (el as HTMLElement).click()
            ),
        ]);
        await this._page.waitForTimeout(TimeoutConstants.DefaultTimeout);
    }

    public async validateC1Messages(messageXpath: string, text: string) {
        let systemmessage;
        try {
            await this.waitUntilSelectorIsVisible(`${messageXpath}/following::p[text()="${text}"][last()]`);
            systemmessage = await this.Page.waitForSelector(`${messageXpath}/following::p[text()="${text}"][last()]`);
        } catch {
            systemmessage = await this.Page.waitForSelector(
                LiveChatMessageConstants.AutoCloseMessageXpaths
            );
        }
        const entityItemText = await systemmessage.textContent();
        if (entityItemText.search(text) != -1) {
            return true;
        }
    }

    public async validateC1Images(adaptivecardName: string) {
        switch (adaptivecardName) {
        case LiveChatConstants.AdaptiveCardHerocard: {
            return await this.Page.waitForSelector(
                SelectorConstants.AdaptivecardherocardImage
            );
        }
        case LiveChatConstants.AdaptiveCardFlightcard: {
            return await this.Page.waitForSelector(
                SelectorConstants.AdaptivecardFlightupdateImage
            );
        }
        case LiveChatConstants.AdaptiveCardAdaptiveOpenurl: {
            return await this.Page.waitForSelector(
                SelectorConstants.AdaptivecardOpenurlImage
            );
        }
        }
    }

    public async validateC1Controls(adaptivecardName: string) {
        switch (adaptivecardName) {
        case LiveChatConstants.AdaptiveCardHerocard: {
            return await this.Page.waitForSelector(
                SelectorConstants.AdaptivecardherocardNavigate
            );
        }
        case LiveChatConstants.AdaptiveCardActivityUpdate: {
            return await this.Page.waitForSelector(
                SelectorConstants.AdaptivecardActivityUpdateNavigate
            );
        }
        case LiveChatConstants.AdaptiveCardShowAction: {
            return await this.Page.waitForSelector(
                SelectorConstants.AdaptivecardShowActionMsg
            );
        }
        case LiveChatConstants.AdaptiveCardFlightcard: {
            return await this.Page.waitForSelector(
                SelectorConstants.AdaptivecardFlightUpdate
            );
        }
        case LiveChatConstants.AdaptivecardFlightItinerary: {
            return await this.Page.waitForSelector(
                SelectorConstants.AdaptivecardFlightUpdate
            );
        }
        case LiveChatConstants.AdaptivecardToggleAction: {
            await this.Page.waitForSelector(
                SelectorConstants.AdaptivecardToggle
            );
            await this.Page.click(
                SelectorConstants.AdaptivecardToggle
            );
            return await this.Page.waitForSelector(
                SelectorConstants.AdaptivecardToggle
            );
        }
        }
    }

    public async setduedateforAdaptivecardActivityUpdate() {
        await this.Page.waitForSelector(SelectorConstants.AdaptivecardActivityUpdateSetduedate);
        await this.Page.click(SelectorConstants.AdaptivecardActivityUpdateSetduedate);
        await this.fillInputDate();
        await this.Page.click(SelectorConstants.AdaptivecardActivityUpdateSetduedateOk);
    }

    public async fillInputDate() {
        const today = new Date();
        const dd = String(today.getDate());
        const mm = String(today.getMonth() + 1);
        const yyyy = String(today.getFullYear());
        const todaysDate = (dd + "-0" + mm + "-" + yyyy).toString();
        await this.Page.type("[type=date]", todaysDate);
    }

    public async fillInputTime() {
        const today = new Date();
        const time = String(today.getTime());
        await this.Page.type("[type=time]", time);
    }

    public async clickItem(selector: string) {
        const chatIframe = await this.getChatIframe();
        await chatIframe.waitForSelector(selector);
        return chatIframe.$eval(selector, (el) => (el as HTMLElement).click());
    }

    public async verifyLinkOpens(liveChatContext: BrowserContext, linkSelector: string, linkUrl: string) {
        const pagesBeforeClickCount = liveChatContext.pages().length;
        await this.Page.waitForSelector(linkSelector);
        await this.Page.click(linkSelector);
        await liveChatContext.waitForEvent("page");
        const allPages = liveChatContext.pages();
        expect(allPages.length - pagesBeforeClickCount).toBe(1);
        expect(allPages[allPages.length - 1].url()).toMatch(new RegExp(linkUrl));
        return true;  
    }

    public async validateAdaptiveCardPopupOption() {
        await this.Page.waitForSelector(SelectorConstants.AdaptivecardShowActionMsg);
        await this.Page.click(SelectorConstants.AdaptivecardShowActionMsg);
        expect(await this.Page.waitForSelector(SelectorConstants.AdaptivecardShowActionPopup)).toBeTruthy();
    }

    public async validateAdaptiveCardSubmitform() {
        await this.Page.waitForSelector(SelectorConstants.AdaptivecardSubmitName);
        await this.Page.fill(SelectorConstants.AdaptivecardSubmitName, "Microsoft");
        await this.Page.waitForSelector(SelectorConstants.AdaptivecardSubmitEmail);
        await this.Page.fill(SelectorConstants.AdaptivecardSubmitEmail, "lcw@microsoft.com");
        await this.Page.click(SelectorConstants.AdaptivecardSubmitbutton);
    }

    public async validateAdaptiveCardInputSubmitform() {
        await this.Page.waitForSelector(SelectorConstants.AdaptivecardInputName);
        await this.Page.fill(SelectorConstants.AdaptivecardInputName, "Microsoft");
        await this.fillInputTime();
        const selectElement = await this.Page.waitForSelector(SelectorConstants.AdaptivecardInputSelect);
        await this.Page.click(SelectorConstants.AdaptivecardInputSelect);
        selectElement.selectOption({ label: Constants.Green.toString(), });
        await this.Page.click(SelectorConstants.AdaptivecardInputRadioButton);
        await this.Page.click(SelectorConstants.AdaptivecardInputCheckbox);
        await this.Page.click(SelectorConstants.AdaptivecardInputSubmitbutton);
    }

    public static async sendAdaptiveCardMessageandresponse(liveChatPage: LiveChatPage,
        adaptiveCardMessage: string) {
        await liveChatPage.sendMessageforC1(adaptiveCardMessage);
    }

    public async validateAdaptiveCardResponse(triggerPhrase: string) {
        await this.Page.$(
            SelectorConstants.LiveChatiframeName
        );
        //Timeout is required as bot taking time to load.
        switch (triggerPhrase) {
        case LiveChatConstants.AdaptivecardAudio: {
            return await this.Page.waitForSelector(
                SelectorConstants.AdptivecardMsgAudio
            );
        }
        case LiveChatConstants.AdaptivecardReceipt: {
            return await this.Page.waitForSelector(
                SelectorConstants.AdptivecardMsgReceiptCard
            );
        }
        case LiveChatConstants.AdaptivecardThumbnail: {
            return await this.Page.waitForSelector(
                SelectorConstants.AdptivecardMsgThumbnailCard
            );
        }
        case LiveChatConstants.AdaptivecardSigninCard: {
            return await this.Page.waitForSelector(
                SelectorConstants.AdptivecardSigninCardMsg
            );
        }
        default: throw new Error(`'${triggerPhrase}' does not match an expected trigger phrase`);
        }
    }

    public async verifyThumbnail(){
        await this.Page.hover(SelectorConstants.AdptivecardThumbnailmsg);
        await this.Page.hover(SelectorConstants.AdptivecardThumbnailimg);
    }

    public async navigatetoGetstarted(){
        await this.Page.click(SelectorConstants.AdptivecardGetstarted);
    }

    public async verifyReceiptcards(){
        await this.Page.hover(SelectorConstants.AdptivecardReceiptcardOrderNo);

    }
  
    public async verifySiginbutton(){
        await this.Page.hover(SelectorConstants.AdptivecardSigininCard);
    }

    public async navigateToMoreinformation(){
        await this.Page.click(SelectorConstants.AdptivecardMoreInformation);
    }

    public async navigatetoSiginincard(){
        await this.Page.click(SelectorConstants.AdptivecardSigininCard);
    }

    public async validatelcwNoramlChatflow()
    {
        expect(await this.Page.waitForSelector(CustomLiveChatWidgetConstants.LiveChatButtomId)).toBeTruthy();
        await this.Page.click(CustomLiveChatWidgetConstants.LiveChatButtomId);
        expect(await this.Page.waitForSelector(SelectorConstants.NormalChatLoading)).toBeTruthy();
        expect(await this.Page.waitForSelector(SelectorConstants.NoramlChatContainer)).toBeTruthy();
        expect(await this.Page.waitForSelector(SelectorConstants.NoramlChatAgentWithYouMessage)).toBeTruthy();
        expect(await this.Page.waitForSelector(SelectorConstants.BotwaitGreetMsg)).toBeTruthy();
        await this.sendMessageforC1("hero card");
        expect(await this.validateC1Messages(LCWConstants.BotMessagesXpathMessage,
            "hero card")).toBeTruthy();
        await this.Page.click(SelectorConstants.NoramlChatClose);
        expect(await this.Page.waitForSelector(SelectorConstants.NoramlChatCloseConfirmation)).toBeTruthy();
        expect(await this.Page.waitForSelector(SelectorConstants.NoramlChatConfirmCancel)).toBeTruthy();
        await this.Page.click(SelectorConstants.NoramlChatConfirmCancel);
        expect(await this.Page.waitForSelector(SelectorConstants.NoramlChatMinimize)).toBeTruthy();    
        await this.Page.click(SelectorConstants.NoramlChatMinimize);
        expect(await this.Page.waitForSelector(CustomLiveChatWidgetConstants.LiveChatButtomId)).toBeTruthy();
        await this.Page.click(CustomLiveChatWidgetConstants.LiveChatButtomId);
        expect(await this.Page.waitForSelector(SelectorConstants.NoramlChatClose)).toBeTruthy();    
        await this.Page.click(SelectorConstants.NoramlChatClose);
        expect(await this.Page.waitForSelector(SelectorConstants.NoramlChatCloseConfirmation)).toBeTruthy();
        await this.Page.click(SelectorConstants.NoramlChatConfirmClose);
        expect(await this.Page.waitForSelector(CustomLiveChatWidgetConstants.LiveChatButtomId)).toBeTruthy();
        await this.Page.click(CustomLiveChatWidgetConstants.LiveChatButtomId);
        expect(await this.Page.waitForSelector(SelectorConstants.BotwaitGreetMsg)).toBeTruthy();
    }

    public async validateSpecialSymbolMessages(text: string,selector:string) {
        const replymsg=await this.Page.waitForSelector(selector);
        const ItemText = await replymsg.innerText();
        if (ItemText.includes(text)) {
            return true;
        }
    }

    
    public async FillPrechatSurvey() {
        await this.Page.waitForSelector(SelectorConstants.PrechatSurveyInput);
        await this.Page.fill(SelectorConstants.PrechatSurveyInput,"Ok");
        await this.Page.click(SelectorConstants.PrechatSurveySubmit);
    }

    public async sendAttachment(file:string) {
        await this.waitForDomContentLoaded();
        await this.Page.setInputFiles(SelectorConstants.UploadFile, file);
        await this.waitForDomContentLoaded();
    }

    public async validateUploadedFile(uploadfilename:string){
        const filecontrol= await this.Page.waitForSelector(SelectorConstants.UploadedFilename);
        const filename=await filecontrol.textContent();
        if(filename===uploadfilename){
            return true;
        }
    }

    public async validateUploadedImagePreview(filename:string){
        const filecontrol= await this.Page.waitForSelector(SelectorConstants.ImagePreview+`[@alt='${filename}']`);
        const altfilename=await filecontrol.getAttribute("alt");
        if(altfilename===filename){
            return true;
        }
    }
    
    public async validateSelectorMessages(text:string,selector:string){
        const control= await this.Page.waitForSelector(selector);
        const selectortext=await control.textContent();
        if(selectortext.includes(text)){
            return true;
        }
    }

    public async submitPrechatSurvey(){
        await this.Page.waitForSelector(SelectorConstants.PrechatSurveySubmit);
        await this.Page.click(SelectorConstants.PrechatSurveySubmit);
    }

    public async validateBlankPrechatSurveyQuestions(selector:string) {
        const text= await this.validateSelectorMessages(Constants.PrechatBlankFieldMessage,selector);
        return text;
    }
}