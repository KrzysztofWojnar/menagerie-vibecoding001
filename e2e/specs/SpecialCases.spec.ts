import { test, expect } from '../fixtures';

test.describe('special cases', () => {
  test('pets that do not prefer cats do not see cats in the offers', async ({ loginPage, homePage }) => {
    const user = {
      username: 'pepper',
      password: 'password',
      species: 'mouse'
    } as any;
    await loginPage.login(user);
    await expect(homePage.suggestion).toBeVisible();
    while (await homePage.suggestion.isVisible()) {
      expect(await homePage.getInterestedInSpecies()).not.toContain('Cat')
      await homePage.acceptButton.click();
    }
    await expect(homePage.noMoreProfiles).toBeVisible();
  });
});
