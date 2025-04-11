import { BasePage } from "./basePage";

export class NavigationPage extends BasePage {
    readonly navigation = this.page.getByRole('navigation');
    readonly homeButton = this.navigation.getByLabel('Home');
    readonly matchesButton = this.navigation.getByLabel('Matches');
    readonly messagesButton = this.navigation.getByLabel('Messages');
    readonly profileButton = this.navigation.getByLabel('My profile');
}
