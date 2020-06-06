import { globalDefaultTheme } from '../../../leda/components/LedaProvider';

const theme = globalDefaultTheme.input;

describe('Input', () => {
  let lastConsole;
  let stub;
  beforeEach(() => {
    cy.visit('http://localhost:9000/cypress/input');
  });

  describe('Display', () => {
    it('Input should be displayed', () => {
      cy.name('UpperInput')
        .should('be.visible');
    });

    it('Placeholder should be displayed  ', () => {
      cy.name('UpperInput')
        .should('have.attr', 'placeholder', 'Type only capitals...');
    });

    it('IsDisabled must set the component to disabled (the component is visible on the form, but it is inactive, there is no way to enter text)', () => {
      cy.name('DisabledInput')
        .should('be.visible')
        .should('be.disabled');
    });

    it('DefaultValue must be visible', () => {
      cy.name('DisabledInput')
        .should('have.value', 'Wow, u r so gud')
    });

    it('ClearButton should be rendered if hasClearButton and ClearButton should work', () => {
      cy.get('button')
        .eq(0)
        .dblclick()
        .dblclick()
        .name('UpperInput')
        .type('falalala')
        .should('have.value', 'FALA')
        .parent()
        .find('.input-clear-icon')
        .click()
      cy.name('UpperInput')
        .should('have.value', '')
        .get('button')
    });

    it('InputRender should customize Input', () => {
      cy.name('PredefinedSymbolsInput')
        .siblings()
        .should('have.length', 2)
        .eq(0)
        .contains('from')
        .siblings()
        .eq(1)
        .should('have.class', 'txt-success')
        .contains('€')
    });

    it('WrapperRender should customize Wrapper', () => {
      cy.name('PredefinedSymbolsInput')
        .parent()
        .parent()
        .should('have.attr', 'data-some-attribute', 'hello world')
    })

  });

  describe('Interaction', () => {
    it('Should accept and display only numbers, with allowedSymbols="numbers"', () => {
      cy.name('PredefinedSymbolsInput')
        .type('9818862798')
        .should('have.value', '9818862798')
        .clear()
        .type('981g88627h9d8')
        .should('have.value', '9818862798');
    });

    it('Should accept and display only allowedSymbols={/[A-S]/}', () => {
      cy.name('RegExpInput')
        .type('ABCDS')
        .should('have.value', 'ABCDS')
        .clear()
        .type('999onlyPPPP888AAA')
        .should('have.value', 'PPPPAAA');
    });

    it('Should not accept and not display numbers with ForbiddenSymbols="numbers', () => {
      cy.get('button')
        .eq(0)
        .dblclick()
        .dblclick()
        .name('UpperInput')
        .type('H3LL0')
        .should('have.value', 'HLL')
        .clear()
        .type('1234567890')
        .should('have.value', '')
    });

    it('Should not accept and not display numbers with forbiddenSymbols={/[s-z]/}', () => {
      cy.name('LowerInput')
        .type('pesot4')
        .should('have.value', 'peo4')
    })


    it('LetterCase should convert all letters into upper or lower case', () => {
      cy.get('button')
        .eq(0)
        .dblclick()
        .dblclick()
        .dblclick()
        .dblclick()
        .name('UpperInput')
        .type('test WOW')
        .should('have.value', 'TEST WOW')
      cy.name('LowerInput')
        .type('POP dog')
        .should('have.value', 'pop dog');
    });

    it('MaxLength should limit the number of characters', () => {
      cy.get('button')
        .eq(0)
        .dblclick()
        .dblclick()
        .dblclick()
        .dblclick()
      cy.name('UpperInput')
        .type('test text')
        .should('have.value', 'TEST TEX')
    });

    it('Should display characters equivalent to those entered', () => {
      cy.name('BasicInput')
        .type('oklhdskjgfлдопрлдшп9304587230')
        .should('have.value', 'oklhdskjgfлдопрлдшп9304587230');
    });
  });
  describe('Required and Validation actions', () => {
    it('IsRequired must check that the field is required (highlight the field in red if it has been removed from focus)', () => {
      cy.name('LowerInput')
        .focus()
        .closest(`.${theme.inputWrapper}`)
        .should('not.have.class', 'input-element-wrapper danger');
      cy.name('LowerInput')
        .blur();
      cy.name('LowerInput')
        .closest(`.${theme.inputWrapper}`)
        .should('have.class', 'input-element-wrapper danger');
    });

    it('IsRequired must check that the field is required (highlight the field in red if it has been validated by button)', () => {
      cy.name('BasicInput')
        .focus()
        .closest(`.${theme.inputWrapper}`)
        .should('not.have.class', 'input-element-wrapper danger');
      cy.get('button')
        .contains('Validate OneInputForm')
        .click()
      cy.name('BasicInput')
        .closest(`.${theme.inputWrapper}`)
        .should('have.class', 'input-element-wrapper danger');
    });

    it('IsRequired must check that the two or more fields is required (highlight the field in red if it has been validated by button)', () => {
      cy.name('LowerInput')
        .focus()
        .closest(`.${theme.inputWrapper}`)
        .should('not.have.class', 'input-element-wrapper danger');
      cy.name('RegExpInput')
        .focus()
        .closest(`.${theme.inputWrapper}`)
        .should('not.have.class', 'input-element-wrapper danger');
      cy.get('button')
        .contains('Validate an awesome input')
        .click()
      cy.name('LowerInput')
        .closest(`.${theme.inputWrapper}`)
        .should('have.class', 'input-element-wrapper danger');
      cy.name('RegExpInput')
        .closest(`.${theme.inputWrapper}`)
        .should('have.class', 'input-element-wrapper danger');
    });

    it('RequiredMessage should output a message when the focus is lost from an empty mandatory field', () => {
      cy.name('LowerInput')
        .focus()
        .closest(`.${theme.inputWrapper}`)
        .should('not.have.class', 'input-element-wrapper danger');
      cy.get('.invalid-message-list')
        .should('not.exist')
      cy.get('button')
        .contains('Validate OneInputForm')
        .click()
      cy.name('LowerInput')
        .closest(`.${theme.inputWrapper}`)
        .should('have.class', 'input-element-wrapper danger')
      cy.get('.invalid-message-list')
        .should('exist')
        .find('.invalid-message-item')
        .contains('requiredMessage')
    });

    it('Must show a message if the validation isn\'t past + Validator function check', () => {
      cy.name('LowerInput')
        .type('12335')
        .blur()
        .closest(`.${theme.inputWrapper}`)
        .should('have.class', 'input-element-wrapper danger');
      cy.get('.invalid-message-list')
        .should('exist')
        .find('.invalid-message-item')
        .eq(0)
        .contains('invalidMessage')
      cy.get('.invalid-message-list')
        .find('.invalid-message-item')
        .eq(1)
        .contains('Wrong chars')
      cy.get('.invalid-message-list')
        .find('.invalid-message-item')
        .eq(2)
        .contains('Minimum 10 symbols')
      cy.name('LowerInput')
        .type('paparapa@papa.pa')
        .blur()
        .closest(`.${theme.inputWrapper}`)
        .should('not.have.class', 'input-element-wrapper danger');
    });
  });

  describe('Events', () => {
    beforeEach(() => {
      cy.visit('http://localhost:9000/cypress/input', {
        onBeforeLoad(win) {
          stub = cy.stub(win.console, 'log', (ev) => { lastConsole = ev; });
        },
      });
    });

    it('onEnterPress', () => {
      cy.name('LowerInput')
        .type('a')
        .type('{enter}')
        .then(() => {
          expect(stub).to.be.called;
          expect(lastConsole).to.have.property('type', 'keydown');
          expect(lastConsole).to.have.property('key', 'Enter');
          expect(lastConsole.component).to.have.property('name', "LowerInput");
          expect(lastConsole.component).to.have.property('value', 'a');
        });
    });

    it('onFocus', () => {
      cy.name('LowerInput')
        .click()
        .then(() => {
          expect(stub).to.be.called;
          expect(lastConsole).to.have.property('type', 'focus');
          expect(lastConsole.component).to.have.property('name', "LowerInput");
          expect(lastConsole.component).to.have.property('value', '');
        });
    });

    it('onBlur', () => {
      cy.name('LowerInput')
        .focus()
        .blur()
        .then(() => {
          expect(stub).to.be.called;
          expect(lastConsole).to.have.property('type', 'blur');
          expect(lastConsole.component).to.have.property('name', "LowerInput");
          expect(lastConsole.component).to.have.property('isValid', false);
        });
    });

    it('onChange', () => {
      cy.get('button')
        .eq(0)
        .click()
      cy.name('UpperInput')
        .type('a')
        .then(() => {
          expect(stub).to.be.called;
          expect(lastConsole).to.have.property('type', 'change');
          expect(lastConsole.target).to.have.property('name', "UpperInput");
          expect(lastConsole.component).to.have.property('value', 'A');
        });
    });
  });

  xit('invalidMessageRender', () => { })
  xit('isValid', () => { })
  xit('shouldValidateUnmounted', () => { })
  xit('Validation by helper validate')
});
