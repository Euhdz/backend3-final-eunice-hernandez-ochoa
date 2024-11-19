import supertest from "supertest";
import chai from "chai";


const expect = chai.expect;

const requester = supertest("http://localhost:8080");

describe("Testing endpoints", () => {

    describe("Testing Pets endpoints", () => {

    it("POST /api/pets creates a pet", async () => {
        const tequisMock = {
            name: "Tequis",
            specie: "dog",
            birthDate: "2018-08-08",            
        };
        const {statusCode, ok, _body} = await requester.post("/api/pets").send(tequisMock);
        console.log(statusCode);
        console.log(ok);
        console.log(_body);

        expect(_body.payload).to.have.property("_id");

})

    it("Verify POST /api/pets creates a pet with property adopted: false", async () => {
        const newPet = {
            name: "Kitty",
            specie: "Cat",
            birthDate: "2021-01-11",            
        };

        const {statusCode, _body} = await requester.post("/api/pets").send(newPet);
        expect(statusCode).to.equal(200);
        expect(_body.payload).to.have.property("adopted").that.equals(false);

    })

    it("Respond with status 400 if a pet is created without a name", async () => {
        const namelessPet = {
            specie: "cat",
            birthDate: "2021-09-01",            
        };

        const {statusCode} = await requester.post("/api/pets").send(namelessPet);
        expect(statusCode).to.equal(400);
    })

    it("Verify GET /api/pets returns all pets and that response includes status and payload, and tha latter to be an array", async () => {
        const {statusCode, _body} = await requester.get("/api/pets");
        expect(statusCode).to.equal(200);
        expect(_body).to.have.property("status").that.equals("success");
        expect(_body.payload).to.be.an("array");    
    })

    it("Verify PUT /api/pets/:pid updates a pet", async () => {
        
        const idExistingPet = "67172d317195a204b94b3a67";
        const updatedPet = {
            name: "Rito", //Ideally change this name each time you run the test
            specie: "Kangaroo",            
        };
        const {statusCode} = await requester.put(`/api/pets/${idExistingPet}`).send(updatedPet);
        expect(statusCode).to.equal(200);
    })

    it("Verify DELETE /api/pets/:pid deletes a pet", async () => {
        
        const idExistingPet = "673588f866991ee1acbad1c0"; //Change this id each time you run the test
        const {statusCode} = await requester.delete(`/api/pets/${idExistingPet}`);
        expect(statusCode).to.equal(200);
    })

})

//ADOPTIONS ENDPOINTS
//router.post("/:uid/:pid", adoptionsController.createAdoption);
//router.get("/", adoptionsController.getAllAdoptions);
//router.get("/:aid", adoptionsController.getAdoption);

describe("Testing Adoptions endpoints", () => {

    it("Verify POST /api/adoptions/:uid/:pid creates an adoption", async () => { 
        const idExistingPet = "673589a0c62ab4dbf281742a"; //Change this id each time you run the test
        const idExistingUser = "673c3539821a31549e86dc43"; //Ideally change this id each time you run the test
        
        const newAdoption = {
        owner: idExistingUser,
        pet: idExistingPet
        };

        const {statusCode} = await requester.post(`/api/adoptions/${idExistingUser}/${idExistingPet}`).send(newAdoption);
        expect(statusCode).to.equal(200);
    })

    it("Verify POST /api/adoptions/:uid/:pid adds another pet to a user already with previous adoptions", async () => {

        const idOtherExistingPet = "673589a0c62ab4dbf281742c"; //Change this id each time you run the test
        const idUserWithPreviousAdoption = "673c3539821a31549e86dc43"; //here you can use the uid of the previous new adoption

        const newAdoption = {
            owner: idUserWithPreviousAdoption,
            pet: idOtherExistingPet
        };

        const {statusCode} = await requester.post(`/api/adoptions/${idUserWithPreviousAdoption}/${idOtherExistingPet}`).send(newAdoption);
        expect(statusCode).to.equal(200);

    })

    it("Respond with status 400 if a user tries to adopt a pet that is already adopted ", async () => {

        const idAlreadyAdoptedPet = "67172d317195a204b94b3a6a"; //You don't need to change this pet id
        const idOtherExistingUser = "67172e337195a204b94b3a81"; //You don't need to change this user id

        const newAdoption = {
            owner: idOtherExistingUser,
            pet: idAlreadyAdoptedPet
        };

        const {statusCode} = await requester.post(`/api/adoptions/${idOtherExistingUser}/${idAlreadyAdoptedPet}`).send(newAdoption);
        expect(statusCode).to.equal(400);
    })

    
    it("Verify GET /api/adoptions returns all adoptions and that response includes status and payload, and the latter to be an array", async () => {
        const {statusCode, _body} = await requester.get("/api/adoptions");
        expect(statusCode).to.equal(200);
        expect(_body).to.have.property("status").that.equals("success");
        expect(_body.payload).to.be.an("array");    
    })


    it("Verify GET /api/adoptions/:aid returns an adoption", async () => {
        const idExistingAdoption = "67359f92ee18bd5d7da34a8f"; //This adoption id can stay the same
        const {statusCode, _body} = await requester.get(`/api/adoptions/${idExistingAdoption}`);
        expect(statusCode).to.equal(200);

        expect(_body.payload).to.have.property("_id").that.equals(idExistingAdoption);
    })

})

});