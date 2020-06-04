import { globalDefaultTheme } from '../../../leda/components/LedaProvider';

const theme = globalDefaultTheme.maskedInput;

describe('MaskedInput', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/cypress/masked-input');
  });

  describe('Display', () => {
    it('should display placeholder', () => {
      cy.name('PhoneMask')
        .clear()
        .should('have.attr', 'placeholder', 'введи')
        .blur()
        .should('have.attr', 'value', '')
    });

    it('should display mask', () => {
      cy.name('PhoneMask')
        .clear()
        .should('have.attr', 'value', '+7 (___)-___-__-__')
    });

    it('should display defaultValue', () => {
      cy.name('PhoneMask')
        .should('have.attr', 'value', '+7 (800)-555-35-35')
    });

    it('InputRender should customize Input', () => {
      cy.name('PhoneMask')
        .siblings()
        .contains('телефон')
    })

    it('WrapperRender should customize Wrapper', () => {
      cy.name('PhoneMask')
        .parent()
        .parent()
        .should('have.attr', 'data-some-attribute', 'hello world')
    })

    describe('isDisabled', () => {
      it('should be disabled', () => {
        cy.contains('Toggle isDisabled')
          .click()
          .name('DisabledMask')
          .should('be.disabled')
          .closest('.masked-input-wrapper')
          .should('have.class', 'disabled')
          .closest('.demo-story')
          .contains('Toggle isDisabled')
          .click();
      });
    });
  });

  describe('InputInteraction', () => {
    it('should clear one char per backspace press', () => {
      cy.name('PhoneMask')
        .focusMasked()
        .clear()
        .type('9818862798')
        .should('have.value', '+7 (981)-886-27-98')
        .type('{backspace}'.repeat(5))
        .should('have.value', '+7 (981)-886-__-__')
        .type('{backspace}'.repeat(9))
        .should('have.value', '+7 (___)-___-__-__')
        .type('9818862798')
        .should('have.value', '+7 (981)-886-27-98')
        .type('{leftarrow}'.repeat(7))
        .type('{backspace}'.repeat(3))
        .type('{rightarrow}')
        .type('22')
        .should('have.value', '+7 (981)-226-27-98')
        .type('{selectall}')
        .type('{del}')
        .should('have.value', '+7 (___)-___-__-__')
        .type('9818862798')
        .should('have.value', '+7 (981)-886-27-98')
        .type('{selectall}')
        .type('{backspace}')
        .should('have.value', '+7 (___)-___-__-__');
    });

    it('should fill different masks', () => {
      cy.name('DisabledMask')
        .should('have.value', '+7 (987)-654-32-10')
        .focusMasked()
        .clear()
        .type('9818862798')
        .should('have.value', '+7 (981)-886-27-98')
        .name('CardMask')
        .should('have.attr', 'placeholder', '___-___-___ __')
        .focusMasked()
        .type('12345678901')
        .should('have.value', '123-456-789 01')
    });

    it('should forbid non-mask chars', () => {
      cy.name('PhoneMask')
        .focusMasked()
        .should('have.value', '+7 (___)-___-__-__')
        .type('ABC!@#$%^&*)_=+?/.<>,БЛА')
        .should('have.value', '+7 (___)-___-__-__');
    });
  
  });
});