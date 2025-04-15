import { test, expect } from '../fixtures';
import { users } from '../data/users';

const user = users.fluffy;
const LONG_TIMEOUT = 120000;

test.describe('interactions with suggestions', () => {
  test.beforeEach(async ({ homePage, loginPage }) => {
    await loginPage.login(user);
    await expect(homePage.suggestion).toBeVisible();
  });
  test('accept with the button', async ({ homePage, page }) => {
    const acceptRespone = page.waitForResponse(
      response => response.url().endsWith('/api/like')
    );
    await homePage.acceptButton.click();
    expect((await acceptRespone)).toBeOK();
    await expect(homePage.suggestion).toBeVisible();
  });

  test('accept with swipe action', async ({ homePage, page }) => {

    await homePage.aboutMe.hover();
    await page.mouse.down();
    await homePage.moveCursor('right');

    await expect(homePage.yay).toBeVisible();
    const acceptResponse = page.waitForResponse(
      response => response.url().endsWith('/api/like'),
      { timeout: LONG_TIMEOUT }
    );
    await page.mouse.up();

    expect((await acceptResponse)).toBeOK();
    await expect(homePage.suggestion).toBeVisible();
  });
});