import { BasePage } from "./basePage";

export class LoginPage extends BasePage {
    readonly usernameInput = this.page.getByRole('textbox', { name: 'Username' });
    readonly passwordInput = this.page.getByRole('textbox', { name: 'Password' });
    readonly loginButton = this.page.getByRole('button', { name: 'Login' });
    async login(loginCredentials: {
        readonly username: string,
        readonly password: string,
    }) {
        await this.goto();
        await this.usernameInput.fill(loginCredentials.username);
        await this.passwordInput.fill(loginCredentials.password);
        await this.loginButton.click();
    }
}