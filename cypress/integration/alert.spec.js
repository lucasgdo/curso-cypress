/// <reference types="cypress" />

describe('Work with alerts', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    });

    beforeEach(() => {
        cy.reload();
    });

    it.only('Alert', () => {
        // cy.get('#alert').click();
        // cy.on('window:alert', msg => {
        //     expect(msg).to.be.equal('Alert Simples');
        // });
        cy.clickAlert('#alert', 'Alert Simples');
    });

    it('Alert com mock', () => {
        const stub = cy.stub().as('alerta');
        cy.on('window:alert', stub);
        cy.get('#alert').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples');
        });
    });

    it('Confirm', () => {
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples');
        });
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Confirmado');
        });
        cy.get('#confirm').click();
    });

    it('Deny', () => {
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples');
            return false;
        });
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Negado');
        });
        cy.get('#confirm').click();
    });

    it('Prompt', () => {
        // cy.on('window:prompt', msg => {
        //     expect(msg).to.be.equal('Confirm Simples');
        // });
        cy.window().then(win => {
            cy.stub(win, 'prompt').as('prompt').returns('42');
        });
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Era 42?');
        });
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal(':D');
        });
        cy.get('#prompt').click();
    });
});