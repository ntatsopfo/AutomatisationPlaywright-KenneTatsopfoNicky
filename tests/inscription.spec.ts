import { test, expect } from '@playwright/test';

test.describe('Tests Inscription', () => {
  
  test('✅ Inscription avec des données valides', async ({ page }) => {
    await page.goto('https://ztrain-web.vercel.app/home');

    await page.getByRole('img', { name: 'user' }).locator('svg').click();
    await page.getByRole('tab', { name: 'Inscription' }).click();

    const randomEmail = `test${Math.floor(Math.random() * 10000)}@mail.com`;
    await page.getByRole('textbox', { name: 'Email' }).fill(randomEmail);
    await page.getByRole('textbox', { name: 'Mot de passe', exact: true }).fill('Test@1234');
    await page.getByRole('textbox', { name: 'Confirmer votre mot de passe' }).fill('Test@1234');
    
    await page.getByRole('button', { name: 'Inscription' }).click();

    
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('❌ Mot de passe trop court', async ({ page }) => {
    await page.goto('https://ztrain-web.vercel.app/home');

    await page.getByRole('img', { name: 'user' }).locator('svg').click();
    await page.getByRole('tab', { name: 'Inscription' }).click();

    await page.getByRole('textbox', { name: 'Email' }).fill('test@short.com');
    await page.getByRole('textbox', { name: 'Mot de passe', exact: true }).fill('123');
    await page.getByRole('textbox', { name: 'Confirmer votre mot de passe' }).fill('123');
    
    await page.getByRole('button', { name: 'Inscription' }).click();

    
    await expect(page.locator('text=Le mot de passe doit avoir au moins 8 caractères')).toBeVisible();
  });

  test('❌ Email invalide', async ({ page }) => {
    await page.goto('https://ztrain-web.vercel.app/home');

    await page.getByRole('img', { name: 'user' }).locator('svg').click();
    await page.getByRole('tab', { name: 'Inscription' }).click();

    await page.getByRole('textbox', { name: 'Email' }).fill('testemailcom');
    await page.getByRole('textbox', { name: 'Mot de passe', exact: true }).fill('Test@1234');
    await page.getByRole('textbox', { name: 'Confirmer votre mot de passe' }).fill('Test@1234');
    
    await page.getByRole('button', { name: 'Inscription' }).click();

    await expect(page.locator("text=Le format de l'email est invalid")).toBeVisible();
  });

  test('❌ Mots de passe non correspondants', async ({ page }) => {
    await page.goto('https://ztrain-web.vercel.app/home');

    await page.getByRole('img', { name: 'user' }).locator('svg').click();
    await page.getByRole('tab', { name: 'Inscription' }).click();

    await page.getByRole('textbox', { name: 'Email' }).fill('test@password.com');
    await page.getByRole('textbox', { name: 'Mot de passe', exact: true }).fill('Test@1234');
    await page.getByRole('textbox', { name: 'Confirmer votre mot de passe' }).fill('WrongPass123');
    
    await page.getByRole('button', { name: 'Inscription' }).click();

    await expect(page.locator('text=Les deux mots de passe ne sont pas identiques')).toBeVisible();
  });

});
