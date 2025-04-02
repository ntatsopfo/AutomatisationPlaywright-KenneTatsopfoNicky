import { test, expect } from '@playwright/test';

test('Test du panier', async ({ page }) => {
  await page.goto('https://ztrain-web.vercel.app/home');
  
//Ajouter un element au panier
  await page.locator('div:nth-child(4) > .style_card_body__QuFGN > .style_card_body_img__mkV1D').click(); 
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(4).click(); 
  await page.getByRole('button', { name: 'Ajouter au panier' }).click(); 
  await expect(page.getByText('Ajout produit au panier')).toBeVisible;
  await page.locator('.ant-notification-notice-close').click();
 
//   Un autre element
  await page.locator('div:nth-child(8) > .style_card_body__QuFGN > .style_card_body_img__mkV1D').click();
  await page.getByRole('button', { name: 'Ajouter au panier' }).click();
  await expect(page.getByText('Ajout produit au panier')).toBeVisible;
  await page.locator('.ant-notification-notice-close').click();

  
// Encore un autre
  await page.locator('.style_card_body_img__mkV1D').first().click(); 
  await page.getByRole('button', { name: 'Ajouter au panier' }).click();
  await expect(page.getByText('Ajout produit au panier')).toBeVisible;
  await page.locator('.ant-notification-notice-close').click();

//   Ouvrir le panie
  await page.locator('#style_content_cart_wrapper__mqNbf').click();
  await expect(page.getByText('I-phone PRO 256...')).toBeVisible;
  await expect(page.getByText('PC Portable 15....')).toBeVisible;
  await expect(page.getByText('Chaise de Burea...')).toBeVisible;

  await page.locator('div').filter({ hasText: /^I-phone PRO 256\.\.\.2518\.04 €2$/ }).getByRole('img').nth(1).click();// Modifier la quantité d'un produit
  await page.locator('div').filter({ hasText: /^Chaise de Burea\.\.\.60\.05 €1$/ }).getByRole('img').nth(3).click();// Retirer un produit du panier

  
  await page.getByRole('button', { name: 'Commander' }).click(); // Passer à la commande
  
// Remplir les informations de connexion
  await page.getByRole('textbox', { name: 'Email' }).fill('kenne@test.com');
  await page.getByRole('textbox', { name: 'Mot de passe' }).fill('Test1234');
  await page.getByRole('button', { name: 'Connexion', exact: true }).click();
  
//Finaliser la commande
await page.getByRole('button', { name: 'Commander' }).click();
await page.getByRole('radio').check();
await page.getByPlaceholder('Card number').click();
await page.getByPlaceholder('Card number').fill('4111 1111 1111 1111');
await page.getByPlaceholder('MM/YY').fill('05 / 26');
await page.getByPlaceholder('CVC').fill('123');
await page.getByRole('textbox', { name: 'Votre adresse de livraison' }).click();
await page.getByRole('textbox', { name: 'Votre adresse de livraison' }).fill('Douala');
await page.getByRole('button', { name: 'Valider' }).click();
await expect(page.getByText('Bravo!!! votre commande a ét')).toBeVisible();


});
