describe('Login Form Tests', () => {
  beforeEach(() => {
    // Переход на страницу перед каждым тестом
    cy.visit('https://www.saucedemo.com/')
  })

  it('should successfully login with valid credentials', () => {
    // Проверка видимости элементов формы
    cy.get('[data-test="username"]').should('be.visible')
    cy.get('[data-test="password"]').should('be.visible')
    cy.get('[data-test="login-button"]').should('be.visible')

    // Ввод учетных данных
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')

    // Клик по кнопке входа
    cy.get('[data-test="login-button"]').click()

    // Проверка успешной авторизации (проверяем URL после логина)
    cy.url().should('include', '/inventory.html')
  })

  it('should show error with invalid credentials', () => {
    // Ввод неверных учетных данных
    cy.get('[data-test="username"]').type('invalid_user')
    cy.get('[data-test="password"]').type('wrong_password')
    cy.get('[data-test="login-button"]').click()

    // Проверка появления сообщения об ошибке
    cy.get('[data-test="error"]').should('be.visible')
  })

  it('should handle locked out user', () => {
    // Попытка входа заблокированным пользователем
    cy.get('[data-test="username"]').type('locked_out_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    // Проверка сообщения о блокировке
    cy.get('[data-test="error"]').should('contain', 'locked out')
  })

  it('should validate required fields', () => {
    // Попытка входа с пустыми полями
    cy.get('[data-test="login-button"]').click()

    // Проверка сообщения о необходимости заполнения полей
    cy.get('[data-test="error"]').should('be.visible')
  })
})