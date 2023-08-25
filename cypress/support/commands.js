// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//custom command for login purpose
import SwagLabsLoginPage from "../e2e/POM/SwagLabsLoginPage"
import ProductsHomePage from "../e2e/POM/ProductsHomePage"
import ProblemHomePage from "../e2e/POM/ProblemHomePage"

const swaglogin = new SwagLabsLoginPage()
const productpage = new ProductsHomePage()
const problempage = new ProblemHomePage()

Cypress.Commands.add('login', (username, password) => {
  swaglogin.getURL()
  swaglogin.getUserName().type(username)
  swaglogin.getpassword().type(password)
  swaglogin.getloginButton().should('be.visible').click()
})
Cypress.Commands.add('logout', () => {
  swaglogin.getClickMenuButton().should('be.visible').click()
  //cy.wait(3000)
  swaglogin.getLogoutButton().click()

})

Cypress.Commands.add('selectProduct', (productName) => {
  productpage.getSelectDropDown()
  productpage.getSelectProduct().each(($el, index, $list) => {
    const textproduct = $el.find('div.inventory_item_name').text()
    for (let element of productName) {
      if (textproduct == (element)) {
        let addCartselector = "#add-to-cart-" + textproduct.replace(/\s/gm, "-").toLowerCase();
        console.log(addCartselector);
        cy.get(addCartselector).click();
      }
    }
  })
})


Cypress.Commands.add('purchaseShippingFlow', (firstname, lastname, postalcode, successmessage) => {
  productpage.getClickAddToCartLink().should("be.visible").click()
  productpage.getClickCheckOut().should("be.visible").click()
  productpage.getFirstName().type(firstname)
  productpage.getLastName().type(lastname)
  productpage.getPostalCode().type(postalcode)
  productpage.getClickContinueButton().should("be.visible").click()
  productpage.getClichFinishButton().should("be.visible").click()
  cy.wait(3000)
  productpage.getThankYouForYourOrder().should('have.text', successmessage)
})

Cypress.Commands.add('problemUserPurchaseShippingFlow', (firstname, lastname, postalcode, lastnameerror) => {
  problempage.getClickAddToCartLink().should("be.visible").click()
  problempage.getClickCheckOut().should("be.visible").click()
  problempage.getFirstName().type(firstname)
  problempage.getLastName().type(lastname)
  problempage.getPostalCode().type(postalcode)
  problempage.getClickContinueButton().should("be.visible").click()
  problempage.getError().each(($el, index, $list) => {
    const txt = $el.text();
    cy.log(txt)
    if (txt.includes(lastnameerror)) {
      cy.log('Shipping flow is failed')
    }
  })

})

Cypress.Commands.add('lockedoutUserError', (lockedusererror) => {
  swaglogin.getError().each(($el, index, $list) => {
    const txt = $el.text();
    cy.log(txt)
    if (txt.includes(lockedusererror)) {
      cy.log('Cant able to login lockedout user')
    }
  })
})


let normalUser;
let glitchUser;
Cypress.Commands.add('normalUser', (username, password) => {
  var start = 0;
  swaglogin.getURL()
  swaglogin.getUserName().type(username)
  swaglogin.getpassword().type(password)
  cy.then(() => {
    start = performance.now();
  });
  swaglogin.getloginButton().click();
  productpage.getClickAddToCartLink()
    .should("be.visible")
    .then(() => {
      normalUser = (performance.now() - start) * 0.001;

    });
})
Cypress.Commands.add('glitchUser', (username, password) => {
  var start = 0;
  swaglogin.getURL()
  swaglogin.getUserName().type(username)
  swaglogin.getpassword().type(password)
  cy.then(() => {
    start = performance.now();
  });
  swaglogin.getloginButton().click();
  productpage.getClickAddToCartLink()
    .should("be.visible")
    .then(() => {
      glitchUser = (performance.now() - start) * 0.001;
    });
})
Cypress.Commands.add('delay', () => {
  cy.log(`Normal User duration: ${normalUser} sec`);
  cy.log(`Glitch User duration: ${glitchUser} sec`);
  if (expect(glitchUser).to.be.greaterThan(normalUser)) {
    let delayInSeconds = Math.round(glitchUser - normalUser)
    cy.log(`Performance glitch is seen by ${delayInSeconds}seconds`);
  }
})

