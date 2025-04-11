import type { Page } from "@playwright/test";
import { BasePage } from "./basePage";
import type { NavigationPage } from "./navigation";

export class MatchesPage extends BasePage {
    readonly navigation: NavigationPage;
    constructor(page: Page, navigationPage: NavigationPage) {
        super(page);
        this.navigation = navigationPage;
    }
}