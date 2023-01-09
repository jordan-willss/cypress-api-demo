import { indexGetMap, indexClickMap, indexTypeMap } from '../pages/index';
import { strToHex } from '../support/helpers';

describe('API demonstration', () => {
  it('passes', () => {
    cy.visit('http://localhost:5005');


    /**
     * These intercepts are set up before the test, so that if
     * any requests show up matching the given string, i.e.
     * "**\\api\\uuid**", we can grab them.
     * 
     * The .as method is used to create an alias for the API
     * request which we can use later to manipulate the intercepted
     * request.
     */
    cy.intercept('GET', '**/api/uuid**').as('getMethod');
    cy.intercept('POST', '**/api/strToHex**').as('postMethod');

    indexClickMap.uuid.button();

    /**
     * This cy.wait method is waiting for one of the aliased API
     * requests earlier, noted with the @ symbol, see above that it
     * relates to the first API request we intercepted.
     * 
     * The cy.wait method is Promise-like, and therefore we can use
     * the respone from it in a .then method. In this case, the response
     * is the full API request information.
     */
    cy.wait('@getMethod').then(request => {
      const uuid = request.response.body.uuid;
      cy.log(`The GET returned the following UUID: ${uuid}`).then(() => {

        /**
         * This is just a regex (regular expression) to see if the uuid
         * variable matches a certain format.
         * 
         * Read more here: 
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
         */
        expect(uuid).to.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g);
      
        indexGetMap.uuid.output().should('have.text', uuid);
      })
    });

    indexTypeMap.hex.input('Hello world!')
    indexClickMap.hex.button();

    cy.wait('@postMethod').then(request => {
      const text = request.request.body.text;
      const hex = request.response.body.hex;

      cy.log(`The POSTed text was: "${text}", and the Hex response was: "${hex}"`).then(() => {
        /**
         * Notice here that even though we receive back a hex value,
         * we're still locally converting the text to hex to see
         * that it worked properly
         */
        expect(strToHex(text)).to.eq(hex);
      })

      indexGetMap.hex.output().should('have.text', hex);
    });
  })
})