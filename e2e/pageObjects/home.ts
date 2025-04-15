import type { Page } from "@playwright/test";
import { BasePage } from "./basePage";
import type { NavigationPage } from "./navigation";

export class HomePage extends BasePage {
    readonly navigation: NavigationPage;
    readonly suggestion = this.page.getByTestId('profile-card');
    readonly aboutMe = this.suggestion.getByLabel('About me');
    readonly acceptButton = this.page.getByRole('button', { name: 'Accept', exact: true });
    readonly rejectButton = this.page.getByRole('button', { name: 'Reject', exact: true });
    readonly yay = this.suggestion.getByText('YAY!', { exact: true });
    readonly noMoreProfiles = this.page.getByText('No more profiles!', { exact: true });
    readonly interestedInSpecies = this.page.getByTestId('interested-in');
    constructor(page: Page, navigationPage: NavigationPage) {
        super(page);
        this.navigation = navigationPage;
    }
    async moveCursor(direction: 'right' | 'left') {
        const bb = await this.suggestion.boundingBox();
        if (!bb) {
            throw new Error('Suggestion tile not found');
        }
        const target =
            direction === 'right' ?
                bb?.width + bb.x + 100 :
                bb.x - 100;
        await this.page.locator('body').hover({ 
            position: {
                x: bb.y + bb.height / 2,
                y: target
            }
        });
    }
    async getInterestedInSpecies() {
        return await this.interestedInSpecies.locator('span').allInnerTexts();
    }
}