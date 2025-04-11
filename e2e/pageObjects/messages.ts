import type { Page } from "@playwright/test";
import { BasePage } from "./basePage";
import type { NavigationPage } from "./navigation";

export class MessagesPage extends BasePage {
    readonly navigation: NavigationPage;
    constructor(page: Page, navigationPage: NavigationPage) {
        super(page);
        this.navigation = navigationPage;
    }
}