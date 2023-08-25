import data from '../../fixtures/properties.json'
class ProblemHomePage {

    getProducts() {
        return cy.get(data.products).should('have.text', 'Products')
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

    getError() {
        return cy.xpath(data.geterror).should('have.text', 'Error: Last Name is required')
    }

}
export default ProblemHomePage;