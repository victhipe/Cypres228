// deepl-translation.spec.js

describe('DeepL Translation Tests', () => {
  beforeEach(() => {
    cy.visit('https://www.deepl.com/translator');
    
    // Принимаем cookies если появляется окно
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="cookie-banner-accept-button"]').length > 0) {
        cy.get('[data-testid="cookie-banner-accept-button"]').click();
      }
    });
  });

  it('Проверка перевода текста с английского на русский', () => {
    // Проверяем наличие поля для ввода текста
    cy.get('[data-testid="translator-source-input"]')
      .should('be.visible')
      .clear()
      .type('Hello, this is a test message for DeepL translation service.');

    // Проверяем, что текст появился в поле ввода
    cy.get('[data-testid="translator-source-input"]')
      .should('have.value', 'Hello, this is a test message for DeepL translation service.');

    // Выбираем язык исходного текста (английский)
    cy.get('[data-testid="translator-source-lang-btn"]').click();
    cy.get('[data-testid="translator-lang-option-en"]').click();

    // Выбираем язык перевода (русский)
    cy.get('[data-testid="translator-target-lang-btn"]').click();
    cy.get('[data-testid="translator-lang-option-ru"]').click();

    // Ждем появления перевода
    cy.get('[data-testid="translator-target-input"]')
      .should('be.visible')
      .should('not.be.empty');
  });

  it('Проверка функции очистки текста', () => {
    // Вводим текст
    cy.get('[data-testid="translator-source-input"]')
      .should('be.visible')
      .type('Text for testing clear functionality');

    // Нажимаем кнопку очистки
    cy.get('[data-testid="clear-source-text-button"]')
      .should('be.visible')
      .click();

    // Проверяем, что поле ввода пустое
    cy.get('[data-testid="translator-source-input"]')
      .should('have.value', '');
  });

  it('Проверка функции копирования перевода', () => {
    // Вводим текст для перевода
    cy.get('[data-testid="translator-source-input"]')
      .should('be.visible')
      .type('Text for testing copy functionality');

    // Ждем появления перевода
    cy.get('[data-testid="translator-target-input"]')
      .should('be.visible')
      .should('not.be.empty');

    // Нажимаем кнопку копирования
    cy.get('[data-testid="copy-translation-button"]')
      .should('be.visible')
      .click();

    // Проверяем появление уведомления о копировании
    cy.get('[data-testid="copy-notification"]')
      .should('be.visible');
  });

  it('Проверка переключения языков', () => {
    // Вводим текст
    cy.get('[data-testid="translator-source-input"]')
      .type('Hello world');

    // Выбираем начальные языки
    cy.get('[data-testid="translator-source-lang-btn"]').click();
    cy.get('[data-testid="translator-lang-option-en"]').click();
    cy.get('[data-testid="translator-target-lang-btn"]').click();
    cy.get('[data-testid="translator-lang-option-ru"]').click();

    // Нажимаем кнопку переключения языков
    cy.get('[data-testid="switch-languages-button"]').click();

    // Проверяем, что языки поменялись местами
    cy.get('[data-testid="translator-source-lang-btn"]')
      .should('contain', 'русский');
    cy.get('[data-testid="translator-target-lang-btn"]')
      .should('contain', 'английский');
  });
});