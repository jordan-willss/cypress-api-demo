import { indexGetMap, indexClickMap, indexTypeMap } from '../pages/index';
import { strToHex } from '../support/helpers';

describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5005');

    cy.intercept('GET', '**/api/uuid**').as('getMethod');
    cy.intercept('POST', '**/api/strToHex**').as('postMethod');

    indexClickMap.uuid.button();
    cy.wait('@getMethod').then(a => {
      const uuid = a.response.body.uuid;
      cy.log(`The GET returned the following UUID: ${uuid}`).then(() => {
        expect(uuid).to.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g);
      
        indexGetMap.uuid.output().should('have.text', uuid);
      })
    });
    indexTypeMap.hex.input('Hello world!')
    indexClickMap.hex.button();
    cy.wait('@postMethod').then(a => {
      const text = a.request.body.text;
      const hex = a.response.body.hex;

      cy.log(`The POSTed text was: "${text}", and the Hex response was: "${hex}"`).then(() => {
        expect(strToHex(text)).to.eq(hex);
      })

      indexGetMap.hex.output().should('have.text', hex);
    });
  })
})