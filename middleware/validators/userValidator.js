const joi = require("joi");
const HttpStatusCode = require("http-status-codes");
const CommonValidator = require("./commonValidator");

class UserValidator extends CommonValidator {
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
          UserName: joi.string().max(20).required(),
          UserFirstName: joi
            .string()
            .max(50)
            .pattern(new RegExp("^[A-Za-zÇçÖöŞşÜüĞğİı ]+$")),
          UserLastName: joi
            .string()
            .max(50)
            .pattern(new RegExp("^[A-Za-zÇçÖöŞşÜüĞğİı ]+$")),
          UserEmail: joi.string().max(50).email(),
          UserPassword: joi.string().max(50).required(),
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
          UserName: joi.string().max(20).required(),
          UserFirstName: joi
            .string()
            .max(50)
            .pattern(new RegExp("^[A-Za-zÇçÖöŞşÜüĞğİı ]+$"))
            .required(),
          UserLastName: joi
            .string()
            .max(50)
            .pattern(new RegExp("^[A-Za-zÇçÖöŞşÜüĞğİı ]+$"))
            .required(),
          UserEmail: joi.string().max(50).email().required(),

          UserPassword: joi.string().max(50).required(),
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(err.message);
    }
  }
}

module.exports = UserValidator;
