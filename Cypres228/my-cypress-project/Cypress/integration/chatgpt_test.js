describe('ChatGPT Website', () => {
    it('should load the ChatGPT homepage', () => {
      // Открываем сайт chat.openai.com
      cy.visit('https://chat.openai.com')
  
      // Проверяем, что сайт загрузился (например, проверяем, что заголовок страницы существует)
      cy.title().should('include', 'ChatGPT')
  
      // Проверяем, что на странице есть элемент для ввода (например, поле ввода или кнопка)
      cy.get('textarea').should('be.visible')
  
      // Дополнительно, можно проверить, что на странице есть кнопка или другой элемент
      cy.get('button').contains('Send').should('be.visible')
    })
  })
  