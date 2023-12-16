describe("Validación de formulario QA", () => {
    beforeEach(() =>{
        cy.visit("https://qavalidation.com/demo-form/");
        //cy.visit('https://www.wikipedia.org/');
    })

    it('Test #1: LLenar todos los campos correctamente', () =>{
        const name = "Rolando";
        const email = "begaj93182@frandin.com"
        const number = "812344567"

        //Tomamos cada input y le ingresamos un valor correcto
        cy.get('#g4072-fullname').type(`${name}`);//input NOMBRE
        cy.get('#g4072-email').type(`${email}`);//input EMAIL
        cy.get('#g4072-phonenumber').type(`${number}`);//input TELEFONO

        //seleccionamos el Drop down para que se despliegue y luego seleccionamos la 3era opción (NA)
        cy.get('#g4072-gender-button').click()
            .get('#ui-id-3').click();
        
        //Seleccionamos un (1°) check de la lista de años de experiencia
        cy.get(':nth-child(1) > .radio').click

        //seleccionamos un check de los checks multiples
        cy.get('.grunion-checkbox-multiple-options > :nth-child(2) > .checkbox-multiple').check();

        //otro drop-down
        cy.get('#ui-id-6').click();

        //
        cy.get('#contact-form-comment-g4072-otherdetails').type("Este es un test con cypress")

        //click en botón SUBMIT para enviaar información
        cy.get('.wp-block-jetpack-button > .wp-block-button__link').click();

        //Validamos que la información subida sea la correcta  SHOULD => ASSERTION
        cy.get('.contact-form-submission > :nth-child(4)').should('have.text', name);
        cy.get('.contact-form-submission > :nth-child(6)').should('have.text', email);
        cy.get('.contact-form-submission > :nth-child(8)').should('have.text', number);
        })

})