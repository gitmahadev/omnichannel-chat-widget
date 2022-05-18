import { Browser, BrowserContext } from "playwright";
import * as playwright from "playwright"
import { TestSettings } from "../../../configuration/test-settings" // "..../configuration/test-settings";
import { BasePage } from "../../pages/base.page";

describe('width test', () => {
  let newBrowser: Browser;
  let context: BrowserContext;
  let page: BasePage;

  beforeEach(async () => {
    newBrowser = await playwright[TestSettings.Browsers as any].launch(
      TestSettings.LaunchBrowserSettings
      );
      context = await newBrowser.newContext({
        viewport: TestSettings.Viewport,
      });
  });

  afterEach(async () => {
    if (context) {
      await context.close();
    }
   });

  test('Learn React', async () => {
    page = new BasePage(await context.newPage());
    await page.navigateToOrgUrl();
  });
});