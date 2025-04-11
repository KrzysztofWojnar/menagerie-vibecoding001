import type { Page } from "@playwright/test";
import { BasePage } from "./basePage";
import type { NavigationPage } from "./navigation";

export class HomePage extends BasePage {
    readonly navigation: NavigationPage;
    readonly suggestion = this.page.getByTestId('profile-card');
    constructor(page: Page, navigationPage: NavigationPage) {
        super(page);
        this.navigation = navigationPage;
    }
}