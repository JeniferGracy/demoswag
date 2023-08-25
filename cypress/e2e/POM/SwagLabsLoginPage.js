import data from '../../fixtures/properties.json'
class SwagLabsLoginPage {
    getURL() {
        return cy.visit('https://www.saucedemo.com/', { timeout: 320000 }, { force: true })
    }

    getUserName() {
        return cy.get(data.username)
    }

    getpassword() {
        return cy.get(data.password)
    }

    getloginButton() {
        return cy.get(data.loginbutton)
    }

    getClickMenuButton() {
        return cy.get(data.clickmenubutton)
    }

    getLogoutButton() {
        return cy.get(data.logoutbutton)
    }

    getError() {
        return cy.xpath(data.geterror).should('have.text', 'Epic sadface: Sorry, this user has been locked out.')
    }

    getDelayTime() {
        return cy.wrap(performance.now()).then(t1 => {
            cy.log('page load took ${t1-t0} milliseconds');
        })
    }
}
export default SwagLabsLoginPage;