import data from '../../fixtures/properties.json'
class ProductsHomePage {
    getSelectDropDown() {
        return cy.get(data.selectdropdown).select('Price (low to high)')
    }

    getSelectProduct() {
        return cy.get(data.selectproduct)
    }

    getClickAddToCartLink() {
        return cy.get(data.clickaddtocartlink)
    }

    getClickCheckOut() {
        return cy.get(data.clickcheckout)
    }

    getFirstName() {
        return cy.get(data.firstname)
    }

    getLastName() {
        return cy.get(data.lastname)
    }

    getPostalCode() {
        return cy.get(data.postalcode)
    }

    getClickContinueButton() {
        return cy.get(data.clickcontinuebutton)
    }

    getClichFinishButton() {
        return cy.get(data.clickfinishbutton)
    }

    getThankYouForYourOrder() {
        return cy.xpath(data.thankyouforyourorder)
    }

}
export default ProductsHomePage;