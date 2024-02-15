describe('Computer Database Tests', () => {
  beforeEach(() => {
    // access the website using the definition in commands.js
    cy.visitHomePage();
  });

  it('Add New Computer with valid data', () => {
    cy.get('#add').click(); 
    cy.url().should('include', '/computers/new'); // Verify the new url

    cy.get('#name').type('Computer Test');
    cy.get('#introduced').type('2022-01-01');
    cy.get('#discontinued').type('2024-01-01');
    cy.get('#company').select('Apple Inc.'); // Select menu

    cy.get('input[type="submit"]').click(); // Click on save
    cy.url().should('include', '/computers'); // check if it is redirecting to homepage
    cy.get('.alert-message').should('contain', 'Done'); // Verify success msg
  });

  it('Select and Delete a computer', () => {
    const computerName = 'ACE'; // Using existend data

    // Find the register in the table
    cy.contains('table tbody tr', computerName)
      .find('td a')
      .click();

    // Verify edit page using computer ID
    cy.url().should('include', '/computers/381');

    // Click on delete button
    cy.contains('input[type="submit"]', 'Delete this computer').click({force: true});

    // Verify the message and redirect page
    cy.url().should('include', '/computers'); 
    cy.contains('.alert-message', 'has been deleted').should('exist');
  });

  it('Validate it does not create a register with empty fields', () => {
    cy.get('#add').click(); 
    cy.url().should('include', '/computers/new'); // Verify the new url

    
    cy.get('input[type="submit"]').click(); // Click on save
    cy.get('.error > .input').should('contain', ' Failed to refine type'); // Verify error msg
  });
 
  it('Validate it does not allow invalid date parameters', () => {
    cy.get('#add').click(); 
    cy.url().should('include', '/computers/new'); // Verify the new url

    
    cy.get('#name').type('Computer Test');
    cy.get('#introduced').type('invalidformat');
    cy.get('#discontinued').type('invalidformat');
    cy.get('#company').select('Apple Inc.'); // Select menu

    cy.get('input[type="submit"]').click(); // Click on save
    cy.get('.error > .input > .help-inline').should('contain', 'Failed to decode date : java.time.format.DateTimeParseException'); // Verify error msg
  });

  it('Validate Cancel button returns to homepage', () => {
    cy.get('#add').click(); 
    cy.url().should('include', '/computers/new'); // Verify the new url

    cy.get('a.btn').click(); 
    cy.url().should('include', '/computers'); // check if it is redirecting to homepage
  });

  it('Validate pagination button Next', () => {
    cy.get('.next > a').click(); 
    
    // Verifying the new list page
    cy.get('.current > a').should('contain', 'Displaying 11 to 20');
  });

  it('Validate pagination button Back', () => {
    cy.get('.next > a').click(); 
    
    // Verifying the new list page
    cy.get('.current > a').should('contain', 'Displaying 11 to 20');
    cy.get('.prev > a').click(); 
    cy.get('.current > a').should('contain', 'Displaying 1 to 10');
 
   
  });
  it('Validate filter by name with existent data', () => {
    const nameComputer = 'Amiga 600'; // Using an existent value on DV as new register dont seem to be added

    // Type the value in the searchbox
    cy.get('#searchbox').type(nameComputer);

    // click on filter button
    cy.contains('Filter by name').click();

    // Check the result in the list table
    cy.get('table tbody').contains('td', nameComputer).should('exist');
 
   
  });

  it('Validate filter by name with empty searchbox', () => {
    const nameComputer = 'Amiga 600'; // Using an existent value on DV as new register dont seem to be added

    // Type the value in the searchbox
    cy.get('#searchbox').type(nameComputer);

    // click on filter button
    cy.contains('Filter by name').click();

    // Check the result in the list table
    cy.get('table tbody').contains('td', nameComputer).should('exist');
 
   
  });

});
