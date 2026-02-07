import test from "@playwright/test";
import { LoginPage } from "../page-object/login-page";
import { ProductPage } from "../page-object/product-page";

test.describe('Product Page', () => {
    
    test.beforeEach( 'User should be able to login', async ({ page }) => {
        let loginPage = new LoginPage(page)

        await loginPage.login()
    })

    test('User should be able to add items to cart and checkout', async ({ page }) => {
        let productPage = new ProductPage(page)

        await productPage.addItemToCart('Sauce Labs Backpack')
        await productPage.addItemToCart('Sauce Labs Bike Light')
        await productPage.checkoutCart(['Sauce Labs Backpack', 'Sauce Labs Bike Light'])
    })

    test('User Should be able to sort item from highest to lowest', async ({ page }) => {
        let productPage = new ProductPage(page)

        await productPage.sortItemsHighToLow()
    })
})