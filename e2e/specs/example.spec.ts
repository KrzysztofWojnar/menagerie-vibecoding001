import { expect } from '@playwright/test';
import { test } from '../fixtures';
import { users } from '../data/users';

const user = users.fluffy;
test('test', async ({ loginPage }) => {

  await loginPage.login(user);
  // await page.getByText('Energetic Golden Retriever').click();
  // await page.getByText('Max34 miles awayDogEnergetic').click();
  // await page.getByText('Max34 miles awayDogEnergetic').click();
  // await page.locator('body').press('Escape');
  // await page.getByText('Max34 miles away').click();
  // await page.locator('body').press('Escape');
  // await page.locator('body').press('Escape');
  // await page.locator('#root').click();
  // await page.locator('#root').dblclick();
  // await page.locator('.relative > .p-2').click();
  // await page.getByRole('button').nth(3).click();
  // await page.getByRole('button').nth(3).click();
  // await page.locator('button:nth-child(3)').click();
  // await page.getByRole('button').nth(1).click();
  // await page.getByRole('button').nth(1).click();
  // await page.locator('.relative > .p-2').click();
  // await page.getByRole('button').nth(3).click();
  // await page.getByRole('button').nth(3).click();
  // await page.locator('div:nth-child(3) > button').first().click();
  // await page.locator('button:nth-child(4)').click();
  // await page.locator('.bg-white > .relative > .p-2').click();
  // await page.getByRole('button').nth(3).click();
  // await page.getByRole('button').nth(3).click();
  // await page.locator('div:nth-child(3) > button').first().click();
  // await page.locator('.max-w-md > div:nth-child(3)').click();
  // await page.locator('button:nth-child(4)').click();
  // await page.getByRole('heading', { name: 'Fluffy' }).click();
  // await page.getByRole('heading', { name: 'About Me' }).click();
  // await expect(page.getByRole('heading', { name: 'Fluffy' })).toBeVisible();
  // await expect(page.getByRole('heading', { name: 'About Me' })).toBeVisible();
  // await expect(page.getByRole('heading', { name: 'I\'m interested in' })).toBeVisible();
  // await expect(page.getByRole('button', { name: 'Log Out' })).toBeVisible();
  // await expect(page.getByText('I\'m interested inCatDogBirdRabbit')).toBeVisible();
  // await page.getByRole('heading', { name: 'I\'m interested in' }).click({
  //   button: 'right'
  // });
});