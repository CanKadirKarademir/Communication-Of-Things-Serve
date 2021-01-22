const router = require("express")();
const TransactionsFactory = require("../database/transactionFactory");
const { validators, verifyToken } = require("../middleware");
const deviceTransactions = TransactionsFactory.creating("deviceTransactions");
const deviceValidator = validators.deviceValidator;
const tokenControl = verifyToken.tokenControl;
const HttpStatusCode = require("http-status-codes");
const { errorSender } = require("../utils");

router.get(
  "/device",
  tokenControl,
  deviceValidator.limitAndOffset,
  async (req, res) => {
    try {
      const result = await deviceTransactions.selectAsync({
        where: { UserID: req.decode.UserID },
      });
      res.json(result);
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.get(
  "/device/:Id",
  tokenControl,
  deviceValidator.paramId,
  async (req, res) => {
    try {
      const result = await deviceTransactions.findOneAsync(req.params, {
        UserID: req.decode.UserID,
      });
      res.json(result || {});
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.delete(
  "/device",
  tokenControl,
  deviceValidator.bodyId,
  async (req, res) => {
    try {
      const result = await deviceTransactions.deleteAsync(req.body, {
        UserID: req.decode.UserID,
      });
      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.GONE,
          "There is no such device ID in the system !"
        );
      res.json("The device registration was deleted successfully.");
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.put(
  "/device",
  tokenControl,
  deviceValidator.update,
  async (req, res) => {
    try {
      const result = await deviceTransactions.updateAsync(req.body, {
        Id: req.body.Id,
      });
      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.GONE,
          "There is no such device ID in the system !"
        );
      res.json("Device information has been updated");
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.post(
  "/device",
  tokenControl,
  deviceValidator.insert,
  async (req, res) => {
    try {
      const deviceSecret = require("crypto").randomBytes(64).toString("hex");
      const result = await deviceTransactions.insertAsync(
        Object.assign(req.body, {
          UserID: req.decode.UserID,
          DeviceSecret: deviceSecret,
        })
      );
      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.INTERNAL_SERVER_ERROROR,
          "There was a problem adding the device !"
        );
      res.json("device registered.");
    } catch (err) {
      if (err.errno === 1062)
        res
          .status(HttpStatusCode.CONFLICT)
          .send("Device is already registered in the system !");
      else
        res
          .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
          .send(err.message);
    }
  }
);

module.exports = router;
