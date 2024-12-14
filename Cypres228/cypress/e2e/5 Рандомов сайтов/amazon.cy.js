// amazon.spec.js

describe('Заходим на амазон', () => {
  beforeEach(() => {
    // Отключаем проверку незащищенных сертификатов
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });
    
    // Посещаем главную страницу Amazon
    cy.visit('https://www.amazon.com');
    
    // Принимаем cookies если появится окно
    cy.get('body').then(($body) => {
      if ($body.find('#sp-cc-accept').length > 0) {
        cy.get('#sp-cc-accept').click();
      }
    });
  });

  it('Ищем товар наушники', () => {
    const searchTerm = 'wireless headphones';
    
    // Вводим поисковый запрос
    cy.get('#twotabsearchtextbox')
      .should('be.visible')
      .type(searchTerm);
    
    // Нажимаем кнопку поиска
    cy.get('#nav-search-submit-button')
      .click();
    
    // Проверяем результаты поиска
    cy.get('.s-result-item')
      .should('have.length.gt', 0);
      
    // Проверяем, что заголовок страницы содержит искомый термин
    cy.title()
      .should('include', searchTerm);
  });

  it('Добавляем в корзину', () => {
    // Находим первый товар и сохраняем его название
    let productTitle;
    
    cy.get('.s-result-item')
      .first()
      .find('h2 .a-link-normal')
      .invoke('text')
      .then((text) => {
        productTitle = text;
      });
    
    // Кликаем на первый товар
    cy.get('.s-result-item')
      .first()
      .find('h2 .a-link-normal')
      .click();
    
    // Добавляем товар в корзину
    cy.get('#add-to-cart-button')
      .click();
    
    // Переходим в корзину
    cy.get('#nav-cart')
      .click();
    
    // Проверяем, что товар добавлен в корзину
    cy.get('.sc-product-title')
      .should('contain', productTitle);
  });

  it('Тестируем навигиацию и категории', () => {
    // Открываем меню категорий
    cy.get('#nav-hamburger-menu')
      .click();
    
    // Ждем загрузки меню
    cy.get('.hmenu-visible')
      .should('be.visible');
    
    // Выбираем категорию Electronics
    cy.contains('Electronics')
      .click();
    
    // Выбираем подкатегорию Headphones
    cy.contains('Headphones')
      .click();
    
    // Проверяем, что мы на странице категории
    cy.get('#searchDropdownBox')
      .should('contain', 'Electronics');
  });

  it('Изменяем цену', () => {
    const searchTerm = 'laptop';
    
    // Выполняем поиск
    cy.get('#twotabsearchtextbox')
      .type(`${searchTerm}{enter}`);
    
    // Устанавливаем минимальную цену
    cy.get('#low-price')
      .type('500');
    
    // Устанавливаем максимальную цену
    cy.get('#high-price')
      .type('1000');
    
    // Применяем фильтр цен
    cy.get('.a-button-input[type="submit"]')
      .first()
      .click();
    
    // Проверяем, что URL содержит параметры фильтрации
    cy.url()
      .should('include', 'price');
    
    // Проверяем, что все цены находятся в указанном диапазоне
    cy.get('.a-price-whole').each(($price) => {
      const price = parseInt($price.text().replace(',', ''));
      expect(price).to.be.within(500, 1000);
    });
  });

  it('Ищем рейтинг товара', () => {
    // Выполняем поиск
    cy.get('#twotabsearchtextbox')
      .type('bluetooth speaker{enter}');
    
    // Фильтруем по рейтингу 4+ звезд
    cy.get('section[aria-label="4 Stars & Up"]')
      .click();
    
    // Проверяем, что URL содержит параметр рейтинга
    cy.url()
      .should('include', 'review-rank');
    
    // Проверяем, что все товары имеют рейтинг 4+
    cy.get('.a-icon-star-small')
      .each(($rating) => {
        const ratingText = $rating.text();
        const ratingValue = parseFloat(ratingText);
        expect(ratingValue).to.be.at.least(4.0);
      });
  });
});