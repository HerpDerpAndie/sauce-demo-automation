import { expect, Locator, Page, test } from "@playwright/test"
import { BasePage } from "./base-page"

export class LoginPage extends BasePage {
    readonly username: string = "standard_user"
    readonly password: string = "secret_sauce"
    readonly wrong_credentials: string = "invalid"
    readonly username_field: Locator;
    readonly password_field: Locator;
    readonly error_msg: Locator;
    readonly login_btn: Locator;

    constructor (page: Page) {
        super(page);
        this.username_field = page.locator('[data-test="username"]');
        this.password_field = page.locator('[data-test="password"]');
        this.login_btn = page.locator('[data-test="login-button"]');
        this.error_msg = page.locator('[data-test="error"]');
    }

    async login() {
        await this.page.goto('/')
        await this.username_field.click()
        await this.username_field.fill(this.username)
        await this.password_field.click()
        await this.password_field.fill(this.password)
        await this.login_btn.click()
        await expect(this.page, "Assert Page is Redirected to Product Listing Page").toHaveURL(/.*inventory.html/)
    }

    async negativeLogin() {
        await this.page.goto('/')
        await this.username_field.click()
        await this.username_field.fill(this.wrong_credentials)
        await this.password_field.click()
        await this.password_field.fill(this.wrong_credentials)
        await this.login_btn.click()
        await expect(this.error_msg, "Assert Login Error Message is Displayed").toBeVisible()
    }   
}