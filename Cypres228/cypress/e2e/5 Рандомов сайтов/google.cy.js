describe('Google Search Tests', () => {
  const searchQueries = ['Париж', '2+2=?', '1984', 'TikTok'];
  
  beforeEach(() => {
    // Переходим на Google перед каждым тестом
    cy.visit('https://www.google.com');
    
    // Принимаем cookies если появится такое окно
    cy.get('body').then(($body) => {
      if ($body.find('[aria-label="Принять все"]').length > 0) {
        cy.get('[aria-label="Принять все"]').click();
      }
    });
  });

  searchQueries.forEach((query) => {
    it(`Должен искать "${query}" в Google`, () => {
      // Находим поле поиска по ID
      cy.get('#APjFqb')
        .should('be.visible')
        .clear()
        .type(query);
      
      // Нажимаем Enter для поиска
      cy.get('#APjFqb').type('{enter}');
      
      // Проверяем, что появились результаты поиска
      cy.get('#search')
        .should('exist')
        .and('be.visible');
      
      // Проверяем, что в результатах есть наш поисковый запрос
      cy.get('#search').should('contain', query);
    });
  });
});