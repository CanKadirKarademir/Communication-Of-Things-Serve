const joi = require("joi");
const HttpStatusCode = require("http-status-codes");
const CommonValidator = require("./commonValidator");

class DeviceValidator extends CommonValidator {
  constructor() {}

  static async find(req, res, next) {
    try {
      await joi
        .object({
          Id: joi.number().min(1).required(),
        })
        .validateAsync({ Id: parseInt(req.params.Id) });
      next();
    } catch (err) {
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(err.message);
    }
  }

  static async update(req, res, next) {
    try {
      await joi
        .object({
          Id: joi.number().required(),
          DeviceName: joi
            .string()
            .max(20)
            .pattern(new RegExp("^[A-Za-zÇçÖöŞşÜüĞğİı ]+$")),
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(err.message);
    }
  }

  static async insert(req, res, next) {
    try {
      await joi
        .object({
          DeviceName: joi
            .string()
            .max(20)
            .pattern(new RegExp("^[A-Za-zÇçÖöŞşÜüĞğİı ]+$"))
            .required(),
          DeviceStatus: joi.number(),
          DeviceDateTime: joi.date().required(),
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(err.message);
    }
  }
}

module.exports = DeviceValidator;
