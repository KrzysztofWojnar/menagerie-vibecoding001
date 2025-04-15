import { Page } from "@playwright/test";

export abstract class BasePage {
    constructor(readonly page: Page){}
    async goto() {
        await this.page.goto('/');
    }
}