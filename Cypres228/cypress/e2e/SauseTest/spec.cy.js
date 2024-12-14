

describe('Price Sorting Tests', () => {
  beforeEach(() => {
    // Переход на сайт и авторизация перед каждым тестом
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
  })

  it('should sort products by price low to high correctly', () => {
    // Выбор сортировки по цене от низкой к высокой
    cy.get('[data-test="product-sort-container"]').select('lohi')

    // Получение всех цен и проверка их сортировки
    cy.get('[data-test="inventory-item-price"]')
      .then($prices => {
        const prices = $prices
          .map((_, el) => parseFloat(el.innerText.replace('$', '')))
          .get()
        
        // Проверка, что цены отсортированы по возрастанию
        const sortedPrices = [...prices].sort((a, b) => a - b)
        expect(prices).to.deep.equal(sortedPrices)
        
        // Проверка конкретных значений
        expect(prices[0]).to.equal(7.99) // Первый товар должен быть самым дешевым
        expect(prices[prices.length - 1]).to.equal(49.99) // Последний товар должен быть самым дорогим
      })
  })

  it('should sort products by price high to low correctly', () => {
    // Выбор сортировки по цене от высокой к низкой
    cy.get('[data-test="product-sort-container"]').select('hilo')

    // Получение всех цен и проверка их сортировки
    cy.get('[data-test="inventory-item-price"]')
      .then($prices => {
        const prices = $prices
          .map((_, el) => parseFloat(el.innerText.replace('$', '')))
          .get()
        
        // Проверка, что цены отсортированы по убыванию
        const sortedPrices = [...prices].sort((a, b) => b - a)
        expect(prices).to.deep.equal(sortedPrices)
        
        // Проверка конкретных значений
        expect(prices[0]).to.equal(49.99) // Первый товар должен быть самым дорогим
        expect(prices[prices.length - 1]).to.equal(7.99) // Последний товар должен быть самым дешевым
      })
  })

  // Дополнительный тест для проверки соответствия цен и названий товаров
  it('should maintain price-product correspondence after sorting', () => {
    // Сохранение исходных пар название-цена
    const originalPairs = []
    cy.get('.inventory_item').each($item => {
      const name = $item.find('[data-test="inventory-item-name"]').text()
      const price = parseFloat($item.find('[data-test="inventory-item-price"]').text().replace('$', ''))
      originalPairs.push({ name, price })
    }).then(() => {
      // Сортировка по цене (низкая к высокой)
      cy.get('[data-test="product-sort-container"]').select('lohi')
      
      // Проверка, что цены и названия соответствуют друг другу после сортировки
      cy.get('.inventory_item').each(($item, index) => {
        const name = $item.find('[data-test="inventory-item-name"]').text()
        const price = parseFloat($item.find('[data-test="inventory-item-price"]').text().replace('$', ''))
        
        // Находим соответствующую пару в исходном массиве
        const originalPair = originalPairs.find(pair => pair.name === name)
        expect(originalPair.price).to.equal(price)
      })
    })
  })

  // Тест для проверки корректности отображения цен
  it('should display correct price format', () => {
    cy.get('[data-test="inventory-item-price"]').each($price => {
      // Проверка формата цены ($XX.XX)
      expect($price.text()).to.match(/^\$\d+\.\d{2}$/)
    })
  })
})