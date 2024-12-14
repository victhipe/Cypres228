describe('Поиск iPhone в Википедии', () => {
  it('Ищет iPhone, переходит на iPhone 3G и затем на Apple', () => {
    // 1. Открываем Википедию
    cy.visit('https://ru.wikipedia.org/wiki/%D0%97%D0%B0%D0%B3%D0%BB%D0%B0%D0%B2%D0%BD%D0%B0%D1%8F_%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86%D0%B0');

    // 2. Вводим "iphone" в поле поиска и нажимаем Enter
    cy.get('#searchInput').type('iphone{enter}');

    // 3. Нажимаем на ссылку с текстом "iPhone 3G"
    cy.contains('iPhone 3G').click();

    // 4. Нажимаем на ссылку с текстом "Apple"
    cy.contains('Apple').click();

    // 5. Проверяем, что перешли на страницу Apple (опционально)
    cy.url().should('include', 'Apple'); 
  });
});