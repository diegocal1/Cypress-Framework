describe ("Llenar todos los campos correctamente", ()=>{
    beforeEach(()=>{
        cy.visit("https://qavalidation.com/demo-form/");

    })

    it ('Test #1: Llenar todos los campos correctamente', ()=>{
        const name = "Diego";
        const email = "calderadiego1@gmail.com"
        const number = "12345678"
        
        //Tomamos cada input y le ingresamos un valor correcto
        cy.get('#g4072-fullname').type(`${name}`);
        cy.get('#g4072-email').type(`${email}`);
        cy.get('#g4072-phonenumber').type(`${number}`)
        //Seleccionamos el drop down para que se despliegue y luego seleccionamos la 3ra opcion N/A
        cy.get('#g4072-gender-button').click().get('#ui-id-3').click();
        //Seleccionamos los años de experiencia 
        cy.get('.grunion-field-radio-wrap > .grunion-field-label').click().get(':nth-child(3) > .radio').click();
        //Seleccionamos el area de experiencia
        cy.get('.grunion-checkbox-multiple-options > :nth-child(1) > .checkbox-multiple').check();
        //Seleccionamos cypress en el drop
        cy.get('#g4072-qatools-button > .ui-selectmenu-icon').click().get('#ui-id-6').click();
        
    })
})