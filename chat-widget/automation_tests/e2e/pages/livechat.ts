import { basename } from "path";
import { Page } from "playwright";
import { Constants, CustomLiveChatWidgetConstants } from "Utility/constants";
import { BasePage } from "./base.page";

export class LiveChatPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    public async waitUntilSelectorIsVisible(selectorVal: string, maxCount = 3, page: Page = null, timeout: number = Constants.DefaultTimeout) {
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

    public async OpenChatWidget() {
        await this.waitUntilSelectorIsVisible(CustomLiveChatWidgetConstants.LiveChatButtomId, Constants.Two, this._page, Constants.MaxTimeout);
        await this.Page.click(CustomLiveChatWidgetConstants.LiveChatButtomId);
        await this._page.waitForTimeout(Constants.DefaultTimeout);
    }

}