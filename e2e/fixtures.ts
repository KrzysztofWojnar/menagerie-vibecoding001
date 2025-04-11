import { test as base } from '@playwright/test';
import { LoginPage } from './pageObjects/login';
import { NavigationPage } from './pageObjects/navigation';
import { HomePage } from './pageObjects/home';
import { MatchesPage } from './pageObjects/matches';
import { MessagesPage } from './pageObjects/messages';
import { ProfilePage } from './pageObjects/profile';

type TestFixtures = {
    homePage: HomePage,
    loginPage: LoginPage,
    navigationPage: NavigationPage,
    matchesPage: MatchesPage,
    messagesPage:MessagesPage,
    profilePage: ProfilePage,
}

export const test = base.extend<TestFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    navigationPage: async ({ page }, use) => {
        await use(new NavigationPage(page));
    },
    homePage: async ({ page, navigationPage}, use) => {
        await use(new HomePage(page, navigationPage));
    },
    matchesPage: async ({ page, navigationPage }, use) => {
        await use(new MatchesPage(page, navigationPage));
    },
    messagesPage: async ({ page, navigationPage }, use) => {
        await use(new MessagesPage(page, navigationPage));
    },
    profilePage: async ({ page, navigationPage }, use) => {
        await use(new ProfilePage(page, navigationPage));
    },

});
