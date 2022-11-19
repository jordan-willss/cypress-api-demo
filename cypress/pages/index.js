///<reference types="cypress" />

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