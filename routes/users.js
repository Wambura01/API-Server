const userRoutes = (app, fs) => {
  const dataPath = "./data/users.json";

  const readFile = (
    callback,
    returnJson = false,
    filePath = dataPath,
    encoding = "utf8"
  ) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        throw err;
      }
      callback(returnJson ? JSON.parse(data) : data); //fires once read operation is complete
    });
  };

  const writeFile = (
    fileData,
    callback,
    filePath = dataPath,
    encoding = "utf8"
  ) => {
    fs.writeFile(filePath, fileData, encoding, (err) => {
      if (err) {
        throw err;
      }

      callback(); //fires once write operation is complete
    });
  };

  //route to get and read the data
  app.get("/users", (req, res) => {
    readFile((data) => {
      res.send(data);
    }, true);
  });

  //creating new user
  app.post("/users", (req, res) => {
    readFile((data) => {
      const newUserId = Date.now().toString();

      //adding the new user
      data[newUserId] = req.body;

      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send("New User added");
      });
    }, true);
  });

  //updating user
  app.put("/users/:id", (req, res) => {
    readFile((data) => {
      //get the new user with their id
      const userId = req.params["id"];
      data[userId] = req.body;

      writeFile(JSON.stringify(data, ull, 2), () => {
        res.status(200).send(`users ID: ${userId} updated`);
      });
    }, true);
  });

  //deleting a user
  app.delete("users/:id", (req, res) => {
    readFile((data) => {
      //get the new user with their id
      const userId = req.params["id"];
      delete data[userId];

      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send(`users ID: ${userId} removed`);
      });
    }, true);
  });
};

module.exports = userRoutes;
