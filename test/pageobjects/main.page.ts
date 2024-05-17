import page from './page.ts';

const buyBtn = '.button.buy';
const closeCartPreviewBtn = '.cart .popup-close.close-icon';
const cartBtn = '.header-basket';
const chanelBrand = '#input-checkbox-2243-23957';
const deodorantGroup = '#input-checkbox-2251-22453';
const itemName = '.product-item__name';
const itemDescription = '.product-item__category';
const itemPrice = '.product-item__price';
const filteredItems = '.catalog-products li.simple-slider-list__item.simple-slider-list__item_action';
const firstItem = '.simple-slider-list__link';
const perfumeryBtn = '.menu-list__link_category[href="/ua/categorys/3/"]';
const priceFrom = '#price-from';
const priceTo = '#price-to';
const searchBtn = '[data-popup-handler="search"]';
const searchField = '#search-input';
const makeupBtn = '.menu-list__link_category[href="/ua/categorys/2419/"]';

class MainPage{
    
    async addToCart(){
        await page.clickElement(buyBtn);
        await page.clickElement(closeCartPreviewBtn);
    }
    
    async clickPerfumeryBtn(){
        await page.clickElement(perfumeryBtn);
    }
    async clickChanelBrand(){
        await page.clickElement(chanelBrand);
    }
    
    async clickDeodorantGroup(){
        await page.clickElement(deodorantGroup);
    }
    
    async clickFirstItem(){
        await page.clickElement(firstItem);
    }
    
    async clickMakeupBtn(){
        await page.clickElement(makeupBtn);
    }
    
    async getItemName(){
        return await page.getText(itemName);
    }
    
    async getAllItems(){
        return await page.getAllElements(filteredItems);
    }
    
    async getItemInfo(){
        const itemInfo = [];
        itemInfo.push(await this.getItemName());
        itemInfo.push(await this.getItemDescription());
        itemInfo.push(await this.getItemPrice());
        return itemInfo;
    }
    async getItemDescription(){
        return await page.getText(itemDescription);
    }
    
    async getItemPrice(){
        return await page.getText(itemPrice);
    }
    
    async isCorrectPrice(price: number, priceFromValue: number, priceToValue: number){
        return price >= priceFromValue && price <= priceToValue;
    }

    async open () {
        await page.open('/');
    }

    async openCart(){
        await page.clickElement(cartBtn);
    }

    async setPriceFromTo(minPrice: number, maxPrice :number){
        await page.setValue(priceFrom, minPrice.toString());
        await page.setValue(priceTo, maxPrice.toString());
    }

    async searchItem(itemName: string){
        await page.clickElement(searchBtn);
        await page.setValue(searchField, itemName);
        await browser.keys('Enter');
    }
}

export default new MainPage();
