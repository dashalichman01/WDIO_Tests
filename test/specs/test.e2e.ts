import cartPage from "../pageobjects/cart.page.ts";
import mainPage from "../pageobjects/main.page.ts"

describe('Test Cases', () => {
    beforeEach(async()=>{
        await mainPage.open();
        await expect(await browser.getUrl()).toEqual("https://makeup.com.ua/ua/");
    })

    it('Should verify if the price filter working correctly', async () => {
        const minPrice = 1500;
        const maxPrice = 2000;

        await mainPage.clickPerfumeryBtn();
        await mainPage.clickChanelBrand();
        await mainPage.clickDeodorantGroup();
        await mainPage.setPriceFromTo(minPrice, maxPrice);
        await browser.pause(2000)
        const items = await mainPage.getAllItems();

        for (let item of items){
            const brand = await item.getAttribute('data-brand');
            const group = await item.getAttribute('data-parent-category');
            const price = await item.getAttribute('data-price');
            
            await expect(brand).toEqual('Chanel');
            await expect(group).toContain('Дезодорант');
            await expect(await mainPage.isCorrectPrice(parseInt(price), minPrice, maxPrice)).toBeTruthy();
        }
    })

    it('Should add items to the basket', async()=>{

        const itemsInfo = [];
        
        await mainPage.clickPerfumeryBtn();
        await mainPage.clickFirstItem();
        
        itemsInfo.unshift(await mainPage.getItemInfo());
        
        await mainPage.addToCart();
        await mainPage.clickMakeupBtn();
        await mainPage.clickFirstItem();

        itemsInfo.unshift(await mainPage.getItemInfo());
        
        await mainPage.addToCart();
        await mainPage.openCart();

        const itemsInfoFromCart = await cartPage.getCartItemsInfo();
        await expect(await cartPage.areItemsInfoEqual(itemsInfo, itemsInfoFromCart)).toBeTruthy();
        await expect(await cartPage.SumOfItems()).toEqual(await cartPage.getTotalPrice());
        await expect(await cartPage.isClickableDeleteBtn()).toBeTruthy();

    })

    it('Should search the item', async()=>{
        const searchName = 'Chanel';
        await mainPage.searchItem(searchName);
        const items = await mainPage.getAllItems();
        for (let item of items){        
            await expect(await item.getText()).toContain(searchName);
        }
    })

    it('Should failed the test', async()=>{
        await mainPage.clickPerfumeryBtn();
        await mainPage.clickFirstItem();
        const itemNameWithSpace = await mainPage.getItemName() + " ";
        await expect(itemNameWithSpace).toEqual(await mainPage.getItemName());
    })
})

