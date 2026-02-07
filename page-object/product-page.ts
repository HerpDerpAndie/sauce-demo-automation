import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { extractNumber } from "../helper/numbers";

export class ProductPage extends BasePage {
    readonly sort_list: Locator;
    readonly item_price_element: Locator;
    readonly check_cart_btn: Locator;
    readonly checkout_btn: Locator;
    readonly first_name_field: Locator;
    readonly last_name_field: Locator;
    readonly zip_field: Locator;
    readonly continue_btn: Locator;
    readonly subtotal_selector: Locator;
    readonly tax_selector: Locator;
    readonly order_confirmation_msg: Locator;
    readonly finish_order_btn: Locator;
    readonly total_selector: Locator;
    readonly cust_first_name: string;
    readonly cust_last_name: string;
    readonly cust_zip: string;

    cart_item_details: Locator;
    remove_from_cart_btn: Locator;
    add_to_cart_btn: Locator;
    subtotal_value: number;
    tax_value: number;
    total_value: number;
    item_prices: number[];
    sort_value: string;
    
    constructor(page: Page) {
        super(page)
        this.check_cart_btn = page.locator('[data-test="shopping-cart-link"]')
        this.add_to_cart_btn = this.setChosenItemAddToCart('Sauce Labs Backpack')
        this.remove_from_cart_btn = this.setChosenItemRemoveFromCart('Sauce Labs Backpack')
        this.cart_item_details = this.setCartItemDetails('Sauce Labs Backpack')
        this.checkout_btn = page.locator('[data-test="checkout"]')
        this.first_name_field = page.locator('[data-test="firstName"]');
        this.last_name_field= page.locator('[data-test="lastName"]');
        this.zip_field = page.locator('[data-test="postalCode"]');
        this.continue_btn = page.locator('[data-test="continue"]');
        this.subtotal_selector = page.locator('[data-test="subtotal-label"]');
        this.tax_selector = page.locator('[data-test="tax-label"]');
        this.total_selector = page.locator('[data-test="total-label"]');
        this.order_confirmation_msg = page.locator('[data-test="complete-header"]');
        this.finish_order_btn = page.locator('[data-test="finish"]');
        
        // sort specific selector
        this.sort_list = page.locator('[data-test="product-sort-container"]');
        this.item_price_element = page.locator("//div[contains(@class, 'price')][@data-test = 'inventory-item-price']")
        
        this.cust_first_name = "first"
        this.cust_last_name = "last"
        this.cust_zip = "12345"
        this.subtotal_value = 0
        this.tax_value = 0
        this.total_value = 0
        this.item_prices = []
        this.sort_value = 'hilo'
    }

    set setSortValue(sort_value: string) {
        this.sort_value = sort_value
    }

    setSortOptions(option: string) {
        return this.page.locator(`option[value="${option}"]`);;
    }

    setChosenItemAddToCart(itemName: string) {
        return this.page.locator(`//div[@data-test="inventory-item"][.//div[@data-test = "inventory-item-name"][contains(text(), '${itemName}')]]//button[contains(@name, 'add')]`)
    }

    setChosenItemRemoveFromCart(itemName: string) {
        return this.page.locator(`//div[@data-test="inventory-item"][.//div[@data-test = "inventory-item-name"][contains(text(), '${itemName}')]]//button[contains(@name, 'remove')]`)
    }

    setCartItemDetails(itemName: string) {
        return this.page.locator(`//div[@data-test = 'inventory-item-name'][contains(text(), '${itemName}')]`)
    }

    async addItemToCart(itemName: string) {
        this.add_to_cart_btn = this.setChosenItemAddToCart(itemName)
        this.remove_from_cart_btn = this.setChosenItemRemoveFromCart(itemName)
        await this.add_to_cart_btn.click()
        await expect(this.remove_from_cart_btn, 'Assert Item is Already Added to Cart').toBeVisible()
    }   

    async checkItemCartDetail(itemName: string) {
        this.cart_item_details = this.setCartItemDetails(itemName)
        await expect(this.cart_item_details, `Assert Item ${itemName} is in Cart`).toBeVisible()
    }

    async checkoutCart(items: string[]) {
        await this.check_cart_btn.click()
        for (let i = 0; i < items.length; i++) {
            await this.checkItemCartDetail(items[i])
        }
        await this.checkout_btn.click()
        await this.first_name_field.fill(this.cust_first_name)
        await this.last_name_field.fill(this.cust_last_name)
        await this.zip_field.fill(this.cust_zip)
        await this.continue_btn.click()

        this.subtotal_value = extractNumber(await this.subtotal_selector.innerHTML())
        this.tax_value = extractNumber(await this.tax_selector.innerHTML());
        this.total_value = extractNumber(await this.total_selector.innerHTML());
        
        expect(this.subtotal_value + this.tax_value, `Assert subtotal ${this.subtotal_value} + ${this.tax_value} = ${this.total_value}`).toEqual(this.total_value)

        await this.finish_order_btn.click()
        await expect(this.order_confirmation_msg, 'Assert "Thank You" Confirmation Message is Visible').toBeVisible()
    }

    async sortItemsHighToLow() {
        await this.sort_list.selectOption({ value: this.sort_value })
        let all_prices_text = await this.item_price_element.allInnerTexts()
        let first_unsorted_price = extractNumber(all_prices_text[0])
        // Extract number to sort
        for (let i = 0; i < all_prices_text.length; i++) {
           this.item_prices.push(extractNumber(all_prices_text[i]))
        }

        // Sort item_prices array to be from highest to lowest
        this.item_prices.sort((a, b) => b - a)

        // Assert first index of both array to be the same
        await expect(first_unsorted_price, `Assert first index of unsorted array: ${first_unsorted_price} to be the same as first index of sorted array ${this.item_prices[0]}`).toEqual(this.item_prices[0])
    }
    
}
