import { test, expect } from '@playwright/test';

test.describe('Tests Connexion', () => {
  
  test('✅ Connexion avec des identifiants valides', async ({ page }) => {
    await page.goto('https://ztrain-web.vercel.app/home');
    await page.getByRole('img', { name: 'user' }).locator('svg').click();
    await page.getByRole('textbox', { name: 'Email' }).fill('kenne@test.com');
    await page.getByRole('textbox', { name: 'Mot de passe' }).fill('Test1234');
    await page.getByRole('button', { name: 'Connexion', exact: true }).click();

    
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('❌ Connexion avec un mot de passe incorrect', async ({ page }) => {
    await page.goto('https://ztrain-web.vercel.app/home');
    await page.getByRole('img', { name: 'user' }).locator('svg').click();
    await page.getByRole('textbox', { name: 'Email' }).fill('kenne@test.com');
    await page.getByRole('textbox', { name: 'Mot de passe' }).fill('MauvaisMotDePasse');
    await page.getByRole('button', { name: 'Connexion', exact: true }).click();

    
    await expect(page.locator('text=Email ou mot de passe incorrect')).toBeVisible();
  });

});
