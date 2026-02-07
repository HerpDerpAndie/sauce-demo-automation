import { test } from "@playwright/test"
import { LoginPage } from "../page-object/login-page";

test('User should be able to log in using correct credentials', async ({ page }) => {
    let loginPage: LoginPage = new LoginPage(page)

    await loginPage.login()
})

test('User should not be able to log in when using invalid credentials', async({ page }) => {
    let loginPage: LoginPage = new LoginPage(page)

    await loginPage.negativeLogin()
})
