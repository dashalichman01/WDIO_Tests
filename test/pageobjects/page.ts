class Page {
    
    async clickElement(element: string, flag = true) {
        if (flag) {
            await this.scrollTo(element);
            await this.waitUntilElementDisplayed(element);
        }
        await (await this.getElement(element)).click();
    }
    
    async getElement(element: string) {
        return await $(element);
    }
    
    async getText(element: string){
        return await (await this.getElement(element)).getText();
    }

    async getTextFromNestedElement(element: string, nestedElement: string, flag = true){
        if (flag) {
            await this.scrollTo(element);
            await this.waitUntilElementDisplayed(element);
        }
        return (await (await this.getElement(element)).$(nestedElement)).getText();
    }
    
    async getAllElements(element: string, flag = true){
        if (flag) {
            await this.scrollTo(element);
            await this.waitUntilElementDisplayed(element);
        }
        return await $$(element);
    }

    async hover(element: string, flag = true){
        if (flag) {
            await this.scrollTo(element);
            await this.waitUntilElementDisplayed(element);
        }
        await (await this.getElement(element)).moveTo();
    }

    async isElementClickable(element: string) {
        return await (await this.getElement(element)).isClickable();
    }

    async isElementDisplayed(element: string, flag = true) {
        if (flag) {
            await this.waitUntilElementDisplayed(element);
        }
        return await (await this.getElement(element)).isDisplayed();
    }
    
    public open (path: string) {
        return browser.url(`${path}`)
    }
    
    async setValue(element: string, value: string, flag = true) {
        if (flag) {
            await this.waitUntilElementDisplayed(element);
        }
        await (await this.getElement(element)).setValue(value);
    }
    
    async scrollTo(element: string) {
        await (await this.getElement(element)).scrollIntoView();
    }

    async waitUntilElementDisplayed(element: string) {
        await browser.waitUntil(
            async () => await (await this.getElement(element)).isDisplayed(),
            {
                timeout: 30000,
                timeoutMsg: 'expected element should be displayed after 30s'
            }
        )
    }
}

export default new Page();
