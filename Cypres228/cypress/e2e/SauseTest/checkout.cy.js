describe('Checkout Process Test', () => {
  // Тестовые данные
  const userData = {
    firstName: 'John',
    lastName: 'Doe',
    zipCode: '12345'
  }

  beforeEach(() => {
    // Авторизация
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
  })

  it('should complete checkout with two items', () => {
    // Добавление первого товара (рюкзак)
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
      .click()

    // Добавление второго товара (велосипедный свет)
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]')
      .click()

    // Проверка количества товаров в корзине
    cy.get('.shopping_cart_badge')
      .should('exist')
      .and('have.text', '2')

    // Переход в корзину
    cy.get('.shopping_cart_link')
      .click()

    // Проверка наличия обоих товаров в корзине
    cy.get('.cart_item')
      .should('have.length', 2)

    // Начало оформления заказа
    cy.get('[data-test="checkout"]')
      .click()

    // Заполнение формы информации о покупателе
    cy.get('[data-test="firstName"]')
      .type(userData.firstName)
    
    cy.get('[data-test="lastName"]')
      .type(userData.lastName)
    
    cy.get('[data-test="postalCode"]')
      .type(userData.zipCode)

    // Продолжение оформления
    cy.get('[data-test="continue"]')
      .click()

    // Проверка страницы подтверждения заказа
    cy.get('.summary_info')
      .should('exist')

    // Проверка наличия обоих товаров на странице подтверждения
    cy.get('.cart_item')
      .should('have.length', 2)

    // Проверка итоговой суммы
    cy.get('.summary_subtotal_label')
      .should('exist')
      .invoke('text')
      .then((text) => {
        const total = parseFloat(text.replace(/[^0-9.]/g, ''))
        expect(total).to.equal(39.98) // $29.99 + $9.99
      })

    // Завершение заказа
    cy.get('[data-test="finish"]')
      .click()

    // Проверка успешного завершения заказа
    cy.get('.complete-header')
      .should('exist')
      .and('contain', 'Thank you for your order')
  })

  // Дополнительный тест для проверки валидации формы
  it('should validate checkout form fields', () => {
    // Добавление товара и переход к оформлению
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
      .click()
    cy.get('.shopping_cart_link')
      .click()
    cy.get('[data-test="checkout"]')
      .click()

    // Попытка продолжить без заполнения полей
    cy.get('[data-test="continue"]')
      .click()

    // Проверка сообщения об ошибке
    cy.get('[data-test="error"]')
      .should('exist')
      .and('contain', 'First Name is required')

    // Заполнение только имени
    cy.get('[data-test="firstName"]')
      .type(userData.firstName)
    cy.get('[data-test="continue"]')
      .click()

    // Проверка сообщения об ошибке для фамилии
    cy.get('[data-test="error"]')
      .should('contain', 'Last Name is required')

    // Заполнение фамилии
    cy.get('[data-test="lastName"]')
      .type(userData.lastName)
    cy.get('[data-test="continue"]')
      .click()

    // Проверка сообщения об ошибке для почтового индекса
    cy.get('[data-test="error"]')
      .should('contain', 'Postal Code is required')
  })

  // Тест для проверки возможности удаления товаров из корзины
  it('should allow removing items during checkout process', () => {
    // Добавление двух товаров
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
      .click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]')
      .click()

    // Переход в корзину
    cy.get('.shopping_cart_link')
      .click()

    // Удаление одного товара
    cy.get('[data-test="remove-sauce-labs-backpack"]')
      .first()
      .click()

    // Проверка, что остался только один товар
    cy.get('.cart_item')
      .should('have.length', 1)
    
    // Проверка обновления счетчика корзины
    cy.get('.shopping_cart_badge')
      .should('have.text', '1')
  })
})