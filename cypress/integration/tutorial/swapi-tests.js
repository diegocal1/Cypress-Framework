context("SWAPI Test", () =>{

    //Test the endpoint people/2/ and check the success response,
    // the skin color to be gold,
    // and the amount of films it appears on (should be 6)
    it('test #1 ', () => {
        cy.request("https://swapi.dev/api/people/2/").then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property("skin_color","gold")
            expect(response.body.films).to.have.length(6)
        })
    })

    //Request the endpoint of the second movie in which people/2/ was present
    // (using the response from people/2/). Check the release date to be in the correct date format,
    // and the response to include characters, planets, starships, vehicles and species,
    // each element including more than 1 element.
    it('test #2 ', () => {
        cy.request("https://swapi.dev/api/people/2/").then((response) =>{
            return (response.body.films[1])
        }).then((secondMovie) => {
            cy.request(secondMovie)
                .then((response) =>{
                    expect(response.body).to.have.property("characters")
                    expect(response.body.characters.length).to.be.greaterThan(1)

                    expect(response.body).to.have.property("planets")
                    expect(response.body.planets.length).to.be.greaterThan(1)

                    expect(response.body).to.have.property("starships")
                    expect(response.body.starships.length).to.be.greaterThan(1)

                    expect(response.body).to.have.property("vehicles")
                    expect(response.body.vehicles.length).to.be.greaterThan(1)

                    expect(response.body).to.have.property("species")
                    expect(response.body.species.length).to.be.greaterThan(1)

                    expect(isValidDate(response.body.release_date)).to.be.true
                })
        })

        function isValidDate(dateString) {
            const parsedDate = new Date(dateString);
            return !isNaN(parsedDate.getTime()) && dateString.trim() !== '';
        }
    });

    //Request the endpoint of the first planet present in the last film's response
    // (using the previous response).
    // Check the gravity and the terrains matching the exact same values returned by the request
    // (Use fixtures to store and compare the data of terrains and gravity).
    it.only('should ', () => {
        cy.request("https://swapi.dev/api/people/2/").then((response) =>{
            return response.body.films[response.body.films.length-1]
        }).then((lastMovie) =>{
            cy.request(lastMovie).then((response) =>{
                return response.body.planets[0]
            }).then((firstPlanet) => {
                cy.request(firstPlanet).then((response) =>{
                    cy.fixture("fixtures").as("fixturesData")
                    cy.get("@fixturesData").then(data =>{
                        expect(response.body.gravity).to.be.equal(data.gravity)
                    })
                })
            })
        })
    });

})