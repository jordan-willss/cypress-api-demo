///<reference types="cypress" />

/**
 * This page is just a map of all of the elements, there
 * are many ways to map out elements, however, this is the
 * cleanest way to do so in my opinion as it maintains a
 * logical hierarchy structure.
 * 
 * I can call them like this:
 * 
 * indexClickMap.uuid.button();
 * 
 * Which will click the appropriate button in Cypress
 */

export const indexGetMap = {
    uuid: {
        button: () => cy.get('#uuid-button'),
        output: () => cy.get('#uuid-output')
    },
    hex: {
        input: () => cy.get('#hex-input'),
        button: () => cy.get('#hex-button'),
        output: () => cy.get('#hex-output')
    }
}

export const indexClickMap = {
    uuid: {
        button: () => indexGetMap.uuid.button().click({ force: true }),
    },
    hex: {
        button: () => indexGetMap.hex.button().click({ force: true }),
    }
}

export const indexTypeMap = {
    hex: {
        input: (str) => indexGetMap.hex.input().type(str)
    }
}