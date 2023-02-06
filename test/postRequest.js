const validPostResponse = {
    status: "Success",
    msg: "Book Successfully Added",
}

const paramsMissingResponse = {
status : "Failed",
msg : "Parameters Missing"
}

const bookAlreayExistsResponse = {
status : "Failed",
msg : "Already Exists"
}

// Passing a Valid Body to the Request
pm.test("Successful Post Request for Adding a Book",() => {
pm.response.to.have.status(200);
pm.response.json() === validPostResponse
})


// Passing the Body with any params of it missing
pm.test("Missing Parameters for Adding a Book",() => {
    pm.response.to.have.status(400);
    pm.response.json() === paramsMissingResponse
})

// Passing the Body containing the info of a book already present in DB
pm.test("Book Already Exists",() => {
    pm.response.to.have.status(409);
    pm.response.json() === bookAlreayExistsResponse
})