const joi = require("joi");
const HttpStatusCode = require("http-status-codes");

class AuthValidator {
  constructor() {}

  static async login(req, res, next) {
    try {
      await joi
        .object({
          UserEmail: joi.string().email().max(50).required(),
          UserPassword: joi.string().max(99).required(),
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(err.message);
    }
  }

  static async delete(req, res, next) {
    try {
      await joi
        .object({
          UserPassword: joi.string().max(8).required(),
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(err.message);
    }
  }

  static async register(req, res, next) {
    try {
      await joi
        .object({
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
      console.log(err);
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(err.message);
    }
  }

  static async update(req, res, next) {
    try {
      await joi
        .object({
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
      console.log(err);
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(err.message);
    }
  }

  static async changePassword(req, res, next) {
    try {
      await joi
        .object({
          UserPassword: joi.string().min(6).max(99).required(),
          NewPassword: joi.string().min(6).max(99).required(),
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(err.message);
    }
  }

  static async passwordControl(req, res, next) {
    try {
      await joi
        .object({
          UserPassword: joi.string().max(99).required(),
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(err.message);
    }
  }
}

module.exports = AuthValidator;
