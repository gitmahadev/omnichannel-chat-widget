import { TestSettings } from "configuration/test-settings";
import { LiveChatPage } from "pages/liveChat";
import { testHelper } from "pages/testHelper";
import { BrowserContext } from "playwright";
import { Constants, CustomLiveChatWidgetConstants, SelectorConstants } from "Utility/constants";

describe("LCW customization for file attachment", () => {
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
    /// Test Case 2698815: [LCW Customization] [File Attachment] Ability to upload and download a file of supported file type/file size using file upload button
    /// </summary>
    it("2698815: [LCW Customization] [File Attachment] Ability to upload and download a file of supported file type/file size using file upload button", async () => {
        livechatpage = new LiveChatPage(await liveChatContext.newPage());
        await livechatpage.openLiveChatWidget(CustomLiveChatWidgetConstants.CustomLCWAttachmentPrechatWidgetFilePath);
        await livechatpage.OpenChatWidget();
        await livechatpage.FillPrechatSurvey();
        await livechatpage.sendAttachment(Constants.PDFFile);
        expect(await livechatpage.validateUploadedFile(SelectorConstants.FileUpload)).toBeTruthy();
        await livechatpage.closePage();
    });

    ///<summary>
    /// Test Case 2698824: [LCW Customization] [File Attachment] Validate ability to see picture preview if the file is an image file (jpg, jpeg, png, etc.)
    /// </summary>
    it("2698824: [LCW Customization] [File Attachment] Validate ability to see picture preview if the file is an image file (jpg, jpeg, png, etc.)", async () => {
        livechatpage = new LiveChatPage(await liveChatContext.newPage());
        await livechatpage.openLiveChatWidget(CustomLiveChatWidgetConstants.CustomLCWAttachmentPrechatWidgetFilePath);
        await livechatpage.OpenChatWidget();
        await livechatpage.FillPrechatSurvey();
        const files=[Constants.JPGFile,Constants.PNGFile];
        for(const file of files){
            const startindex=file.toString().indexOf("//")+2;
            const filename = file.toString().substring(startindex);
            await livechatpage.sendAttachment(file.toString());
            expect(await livechatpage.validateUploadedImagePreview(filename)).toBeTruthy();
        }
        await livechatpage.closePage();
    });

    ///<summary>
    /// Test Case 2698817: [LCW Customization] [File Attachment] Validate files of unsupported file size and unsupported file extension cannot be uploaded
    /// </summary>
    it("2698817: [LCW Customization] [File Attachment] Validate files of unsupported file size and unsupported file extension cannot be uploaded", async () => {
        livechatpage = new LiveChatPage(await liveChatContext.newPage());
        await livechatpage.openLiveChatWidget(CustomLiveChatWidgetConstants.CustomLCWAttachmentPrechatWidgetFilePath);
        await livechatpage.OpenChatWidget();
        await livechatpage.FillPrechatSurvey();
        await livechatpage.sendAttachment(Constants.LargePNGFile);
        expect(await livechatpage.validateSelectorMessages(Constants.UnsupportedFileSizeMessage,SelectorConstants.LimitExceedsMsg)).toBeTruthy();
        await livechatpage.sendAttachment(Constants.UnsupportedFile);
        expect(await livechatpage.validateSelectorMessages(Constants.UnsupportedFileTypeMessage,SelectorConstants.UnsupportedFileTypeMsg)).toBeTruthy();
        livechatpage.closePage();
    });

    ///<summary>
    /// Test Case 2698817: [LCW Customization] [File Attachment] Validate files of unsupported file size and unsupported file extension cannot be uploaded
    /// </summary>
    it("2698817: [LCW Customization] [File Attachment] Validate files of unsupported file size and unsupported file extension cannot be uploaded", async () => {
        livechatpage = new LiveChatPage(await liveChatContext.newPage());
        await livechatpage.openLiveChatWidget(CustomLiveChatWidgetConstants.CustomLCWAttachmentPrechatWidgetFilePath);
        await livechatpage.OpenChatWidget();
        await livechatpage.FillPrechatSurvey();
        await livechatpage.sendAttachment(Constants.LargePNGFile);
        expect(await livechatpage.validateSelectorMessages(Constants.UnsupportedFileSizeMessage,SelectorConstants.LimitExceedsMsg)).toBeTruthy();
        await livechatpage.sendAttachment(Constants.UnsupportedFile);
        expect(await livechatpage.validateSelectorMessages(Constants.UnsupportedFileTypeMessage,SelectorConstants.UnsupportedFileTypeMsg)).toBeTruthy();
        livechatpage.closePage();
    });

    ///<summary>
    /// Test Case 2698820: [LCW Customization] [File Attachment] Validate files with zero size (0 bytes) cannot be uploaded and it doesn't block runtime
    /// </summary>
    it.only("2698820: [LCW Customization] [File Attachment] Validate files with zero size (0 bytes) cannot be uploaded and it doesn't block runtime", async () => {
        livechatpage = new LiveChatPage(await liveChatContext.newPage());
        await livechatpage.openLiveChatWidget(CustomLiveChatWidgetConstants.CustomLCWAttachmentPrechatWidgetFilePath);
        await livechatpage.OpenChatWidget();
        await livechatpage.FillPrechatSurvey();
        await livechatpage.sendAttachment(Constants.EmptyFile);
        expect(await livechatpage.validateSelectorMessages(Constants.EmptyFileAttachmentErrorMessage,SelectorConstants.EmptyFileMsg)).toBeTruthy();
        livechatpage.closePage();
    });
});