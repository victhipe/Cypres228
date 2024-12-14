describe('Добавляем римворлд аномалию в корзину', () => {
    const steamUrl = 'https://store.steampowered.com';
  
    it('Searches for RimWorld - Anomaly and adds it to cart', () => {
      // Открыть главную страницу Steam
      cy.visit(steamUrl);
  
      // Ввести в строку поиска "RimWorld - Anomaly" и нажать Enter
      const dlcName = 'RimWorld - Anomaly';
      cy.get('#store_nav_search_term').type(`${dlcName}{enter}`);
  
      // Проверить, что в результатах есть дополнение "RimWorld - Anomaly"
      cy.get('.responsive_search_name_combined')
        .contains(dlcName)
        .should('be.visible')
        .click();
  
      // Проверить, что мы находимся на странице дополнения
      cy.url().should('include', 'RimWorld_Anomaly');
      cy.get('.apphub_AppName').should('contain', dlcName);
  
    });
  });
  