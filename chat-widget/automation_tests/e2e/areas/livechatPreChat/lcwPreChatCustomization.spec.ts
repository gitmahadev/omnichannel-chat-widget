import { TestSettings } from "configuration/test-settings";
import { LiveChatPage } from "pages/livechat";
import { testHelper } from "pages/testHelper";
import { BrowserContext } from "playwright";
import { CustomLiveChatWidgetConstants, SelectorConstants } from "Utility/constants";

describe("LCW Pre Chat customization", () => {
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
    /// Test Case 2696913: [LCW Customization] [Pre Chat] Verify that error message should up on if required fields are not filled up
    /// </summary>
    it("2696913: [LCW Customization] [Pre Chat] Verify that error message should up on if required fields are not filled up", async () => {
        livechatpage = new LiveChatPage(await liveChatContext.newPage());
        await livechatpage.openLiveChatWidget(CustomLiveChatWidgetConstants.CustomLCWPrechatWidgetFilePath);
        await livechatpage.OpenChatWidget();
        await livechatpage.submitPrechatSurvey();
        expect(await livechatpage.validateBlankPrechatSurveyQuestions(SelectorConstants.PrechatNameErrorMessage)).toBeTruthy();
        expect(await livechatpage.validateBlankPrechatSurveyQuestions(SelectorConstants.PrechatConsentErrorMessage)).toBeTruthy();
        livechatpage.closePage();
    });

    ///<Summary>
    ///Test Case 2696909: [LCW Customization] [Pre Chat] Ability to minimize an already maximized unsubmitted prechat widget, and vice versa
    ///</Summary> 
    it("Ability to minimize an already maximized unsubmitted prechat widget, and vice versa", async () => {
        livechatpage = new LiveChatPage(await context.newPage());
        await livechatpage.openLiveChatWidget(CustomLiveChatWidgetConstants.CustomLCWAttachmentPrechatWidgetFilePath);
        await livechatpage.OpenChatWidget();
        await livechatpage.visiblePrechat();
        await livechatpage.minimizePrechatwidget();
        expect(await livechatpage.maximizePrechatwidget()).toBeTruthy();
        await livechatpage.closePage();
    });
});