pm.test("Success",() => {

    // Getting the Status of the request and checking whether it is 200 or not
    pm.response.to.have.status(200);

    // Checking a response time limit on the request
    pm.expect(pm.response.responseTime).to.be.below(600);
});