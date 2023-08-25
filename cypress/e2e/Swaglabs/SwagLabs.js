/// <reference types="cypress" />

import SwagLabsLoginPage from '../POM/SwagLabsLoginPage';
import ProductsHomePage from '../POM/ProductsHomePage';
import ProblemHomePage from '../POM/ProblemHomePage';

describe('Swaglabs', () => {

    beforeEach(() => {
        // runs before each tests in the block
        cy.fixture('testData').then(function (data) {
            this.data = data
        })
    })

    const swaglabslogin = new SwagLabsLoginPage()
    const producthomepage = new ProductsHomePage()
    const problemhomepage = new ProblemHomePage()
    

    it('Verify all the users are able to login successfully', function () {
        //Standard User
        cy.login(this.data.standarduser, this.data.password)
        cy.logout()

        //problem_user
        cy.login(this.data.probelemuser, this.data.password)
        cy.logout()

        //performance_glitch_user
        cy.login(this.data.perfomanceglitchuser, this.data.password)
        cy.logout()

        //locked_out_user
        cy.login(this.data.lockedoutuser, this.data.password)
        cy.lockedoutUserError(this.data.lockedusererror)

    })
    it('Verify Standard User, search and add multiple products and complete the purchase and shipping flow', function () {
        cy.login(this.data.standarduser, this.data.password);
        cy.selectProduct(this.data.productname)
        cy.purchaseShippingFlow(this.data.firstname, this.data.lastname, this.data.postalcode, this.data.successmessage)
        cy.logout()

    })
    it('Locked user, verify the locked scenario', function () {
        //locked_out_user
        cy.login(this.data.lockedoutuser, this.data.password)
        cy.lockedoutUserError(this.data.lockedusererror)
    })

    it('Problem user, verify able to login and see products but problem popup is shown', function () {
        //problem_user
        cy.login(this.data.probelemuser, this.data.password)
        //cy.wait(3000)
        problemhomepage.getProducts()
        cy.selectProduct(this.data.problemuserproductname)
        cy.problemUserPurchaseShippingFlow(this.data.firstname, this.data.lastname, this.data.postalcode, this.data.lastnameerror)
        cy.on("window:alert", (str) => {
            expect(str).to.contains(this.data.popuptext)
        })

    })

    it('performance_glitch_user, able to login and delay is observed on the login screen', function () {
        cy.normalUser(this.data.standarduser, this.data.password)
        cy.glitchUser(this.data.perfomanceglitchuser, this.data.password)
        cy.delay()
    })
    it.skip('Verify all the users are able to login successfully', function () {
        cy.login(this.data.standarduser, this.data.password)
        

    })

})


