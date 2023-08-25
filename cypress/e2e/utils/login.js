import SwagLabsLoginPage from "../POM/SwagLabsLoginPage";

const swaglogin= new SwagLabsLoginPage()

Cypress.Commands.add('login', (username, password) => {
    swaglogin.getURL()
    swaglogin.getUserName().type(username)
    swaglogin.getpassword().type(password)
    swaglogin.getloginButton().should('be.visible').click()
  })