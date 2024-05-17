import page from './page.ts';

const ItemName = '.product__header';
const itemDescription = '.product__header-desc';
const itemPrice = '.product__price';
const deleteItemBtn = '.product__button-remove';
const prices = '.product__price:not(.old)';
const productItem = '.product-list_product-item';
const totalPrice = '.total';

class CartPage{
    
    async areItemsInfoEqual(arr1: string[][], arr2: string[][]){
        if (arr1.length !== arr2.length) {
            return false;
        }
        return arr1.every((row, i) => row.every((val, j) => val === arr2[i][j]));
    }

    async getTotalPrice(){
        const price =await page.getText(totalPrice);
        return parseInt(price.replace(/\D/g, ''), 10);
    }
    
    async getCartItemsInfo(){
        const items = await page.getAllElements(productItem);
        const itemsInfo = [];
        for(const item of items){
            const itemInfo = [];
            itemInfo.push(await (await item.$(ItemName)).getText());
            itemInfo.push(await (await item.$(itemDescription)).getText());
            itemInfo.push(await (await item.$(itemPrice)).getText());
            itemsInfo.push(itemInfo);
        }
        return itemsInfo;
    }

    async isClickableDeleteBtn(){
        return await page.isElementClickable(deleteItemBtn);
    }
  
    async SumOfItems(){
        const itemsPrice = await page.getAllElements(prices);
        let sum = 0;
        console.log(itemsPrice, 'itemsPrice');
        
        for(const itemPrice of itemsPrice) {
            const priceText = await itemPrice.getText();
            sum += parseInt(priceText.replace(/\D/g, ''), 10);
        }
        return sum;
    }
}

export default new CartPage();