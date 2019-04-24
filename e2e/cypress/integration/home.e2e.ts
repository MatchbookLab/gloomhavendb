describe('Home Page', () => {
  it('should work', () => {
    cy.visit('http://localhost:4200');

    cy.get('.body').should('contain', 'Future home of the Gloomhaven DB');
  });
});
