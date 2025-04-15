import { test as base, expect as baseExpect } from '@playwright/test';
import { Response } from 'playwright-core';
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
const customMatchers = {
    toBeOK(response: Response) {
        const expected = '200..299';
        const assertionName = 'toBeOK';
        let pass: boolean;
        let matcherResult: any;
        const responseCode = response.status();
        try {
          baseExpect(responseCode).toBeGreaterThanOrEqual(200);
          baseExpect(responseCode).toBeLessThanOrEqual(299);
          pass = true;
        } catch (e: any) {
          matcherResult = e.matcherResult;
          pass = false;
        }
    
        const message = pass
          ? () => this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot }) +
              '\n\n' +
              `HTTP CODE: ${responseCode}\n` +
              `Expected: not ${this.utils.printExpected(expected)}\n` +
              (matcherResult ? `Received: ${this.utils.printReceived(matcherResult.actual)}` : '')
          : () =>  this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot }) +
              '\n\n' +
              `HTTP CODE: ${responseCode}\n` +
              `Expected: ${this.utils.printExpected(expected)}\n` +
              (matcherResult ? `Received: ${this.utils.printReceived(matcherResult.actual)}` : '');
    
        return {
          message,
          pass,
          name: assertionName,
          expected,
          actual: matcherResult?.actual,
        };
      },
}
export const expect = baseExpect.extend(customMatchers);