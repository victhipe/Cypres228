
describe('Login Form Tests', () => {
  beforeEach(() => {
    // Переход на страницу логина перед каждым тестом
    cy.visit('https://www.saucedemo.com/')
  })

  it('should successfully login with valid credentials', () => {
    // Ввод корректных данных
    cy.get('[data-test="username"]')
      .type('standard_user')
    
    cy.get('[data-test="password"]')
      .type('secret_sauce')
    
    // Клик по кнопке логина
    cy.get('[data-test="login-button"]')
      .click()
    
    // Проверка успешной авторизации (предполагаем, что после логина URL изменится)
    cy.url().should('include', '/inventory.html')
  })

  it('should show error with invalid credentials', () => {
    // Ввод неверных данных
    cy.get('[data-test="username"]')
      .type('invalid_user')
    
    cy.get('[data-test="password"]')
      .type('wrong_password')
    
    cy.get('[data-test="login-button"]')
      .click()
    
    // Проверка наличия сообщения об ошибке
    cy.get('.error-message-container')
      .should('be.visible')
  })

  it('should show error with empty fields', () => {
    // Клик по кнопке логина без ввода данных
    cy.get('[data-test="login-button"]')
      .click()
    
    // Проверка наличия сообщения об ошибке
    cy.get('.error-message-container')
      .should('be.visible')
  })

  it('should login with locked out user', () => {
    cy.get('[data-test="username"]')
      .type('locked_out_user')
    
    cy.get('[data-test="password"]')
      .type('secret_sauce')
    
    cy.get('[data-test="login-button"]')
      .click()
    
    // Проверка сообщения о блокировке
    cy.get('.error-message-container')
      .should('contain', 'locked out')
  })

  // Проверка всех доступных пользователей
  const users = [
    'standard_user',
    'problem_user',
    'performance_glitch_user',
    'error_user',
    'visual_user'
  ]

  users.forEach((user) => {
    it(`should successfully login with ${user}`, () => {
      cy.get('[data-test="username"]')
        .type(user)
      
      cy.get('[data-test="password"]')
        .type('secret_sauce')
      
      cy.get('[data-test="login-button"]')
        .click()
      
      cy.url().should('include', '/inventory.html')
    })
  })
})