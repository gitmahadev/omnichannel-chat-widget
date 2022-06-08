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
});