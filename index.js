const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    // Returing the list of Books
  res.status(200).json(JSON.parse(fs.readFileSync("books.json", "utf-8")));
});

app.post("/", (req, res) => {
  const { id, name, author, description, image, price, category, subcategory, quantity, rating, pages, language, publisher, year, isbn, binding, edition } = req.body;
  let resObj = {};

  let array = JSON.parse(fs.readFileSync("books.json", "utf-8"));

  // Params Missing Case
  if (!name || !author || !price  || !category || !subcategory || !quantity || !rating || !pages || !language || !publisher || !year || !isbn || !binding || !edition) {
    resObj = {
      status: "Failed",
      msg: "Parameters Missing",
    };
    res.status(400)
  } else {

    // Book Already Exists Case
    for (let i of array) {
      if (i.name === name) {
        resObj = {
          status: "Failed",
          msg: "Already Exists",
        };

        res.status(409);
        break;
      }
    }

    // Valid Request for Adding a Book
    if (!resObj["status"]) {
      array.push({ id, name, author, description, image, price, category, subcategory, quantity, rating, pages, language, publisher, year, isbn, binding, edition });
      fs.writeFileSync("books.json", JSON.stringify(array));

      resObj = {
        status: "Success",
        msg: "Book Successfully Added",
      };

      res.status(200);
    }
  }

  res.send(resObj);
});


// Listening for Requests
app.listen(8000, () => {
  console.log("Listening at http://localhost:8000");
});