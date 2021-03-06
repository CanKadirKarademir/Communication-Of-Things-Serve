const router = require("express")();
const TransactionsFactory = require("../database/transactionFactory");
const { validators, verifyToken } = require("../middleware");
const userTransactions = TransactionsFactory.creating("userTransactions");
const userValidator = validators.userValidator;
const tokenControl = verifyToken.tokenControl;
const HttpStatusCode = require("http-status-codes");
const { errorSender } = require("../utils");

router.get(
  "/user",
  tokenControl,
  userValidator.limitAndOffset,
  async (req, res) => {
    try {
      const result = await userTransactions.selectAsync(req.query);
      res.json(result);
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.get(
  "/user/:Id",
  tokenControl,
  userValidator.paramId,
  async (req, res) => {
    try {
      const result = await userTransactions.findOneAsync(req.params);
      res.json(result || {});
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.delete("/user", tokenControl, userValidator.bodyId, async (req, res) => {
  try {
    const result = await userTransactions.deleteAsync(req.body);
    if (!result.affectedRows)
      throw errorSender.errorObject(
        HttpStatusCode.GONE,
        "There is no such user ID in the system !"
      );
    res.json("The user registration was deleted successfully.");
  } catch (err) {
    res
      .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send(err.message);
  }
});

router.put("/user", tokenControl, userValidator.update, async (req, res) => {
  try {
    const result = await userTransactions.updateAsync(req.body, {
      Id: req.body.Id,
    });
    if (!result.affectedRows)
      throw errorSender.errorObject(
        HttpStatusCode.GONE,
        "There is no such user ID in the system !"
      );
    res.json("User information has been updated");
  } catch (err) {
    res
      .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send(err.message);
  }
});

router.post("/user", tokenControl, userValidator.insert, async (req, res) => {
  try {
    const result = await userTransactions.insertAsync(req.body);
    if (!result.affectedRows)
      throw errorSender.errorObject(
        HttpStatusCode.INTERNAL_SERVER_ERROROR,
        "There was a problem adding the user !"
      );
    res.json("User registered.");
  } catch (err) {
    if (err.errno === 1062)
      res
        .status(HttpStatusCode.CONFLICT)
        .send("Email address is already registered in the system !");
    else
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
  }
});

module.exports = router;
