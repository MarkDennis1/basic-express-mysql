import Joi from "joi";
import db from "../db/db_config.js";

export const create = async (req, res) => {
  const { email, password, is_admin } = req.body;

  //validate input
  const validate = await validator(email, password, is_admin);
  if (validate) return res.status(400).send(validate);

  //run mysql query
  const sqlString = `INSERT INTO account(email, password, is_admin) VALUES('${email}', '${password}', ${is_admin})`;
  db.query(sqlString, (err, result) => {
    if (err) return res.status(400).send(err.message);
    res.status(200).send(result);
  });
};

export const findAll = (req, res) => {
  const queryString = `SELECT * from account`;
  db.query(queryString, (err, result) => {
    res.send(result);
  });
};

export const findOne = (req, res) => {
  const { id } = req.params;
  const sqlString = `SELECT * from account WHERE id = ${id}`;
  db.query(sqlString, (err, result) => {
    if (!err) res.status(200).send(result);
    else res.status(400).send(err.message);
  });
};

export const findAllAdmin = (req, res) => {
    const sqlString = `SELECT * from account WHERE is_admin = true`;
    db.query(sqlString, (err, result) => {
      if (!err) res.status(200).send(result);
      else res.status(400).send(err.message);
    });
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { email, password, is_admin } = req.body;

  //validate input
  const validate = await validator(email, password, is_admin);
  if (validate) return res.status(400).send(validate);

  const sqlString = `UPDATE account SET email = '${email}', password = '${password}', is_admin = ${is_admin} WHERE id = ${id}`;
  db.query(sqlString, (err, result) => {
    if (err) return res.status(400).send(err.message);
    if (!result.affectedRows) return res.status(404).send("Account not found");
    res.status(200).send(result);
  });
};

export const removeAll = (req, res) => {
  db.query(`DELETE FROM account`, (err, result) => {
    if (!err) res.status(200).send(result);
    else res.status(404).send(err.message);
  });
};

export const remove = (req, res) => {
  const { id } = req.params;
  db.query(`DELETE FROM account WHERE id = ${id}`, (err, result) => {
    if (!err) res.status(200).send(result);
    else res.status(404).send(err.message);
  });
};

const schema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  is_admin: Joi.boolean(),
});

const validator = async (email, password, is_admin) => {
  let isValid = "";

  try {
    const value = await schema.validateAsync({
      email: email,
      password: password,
      is_admin: is_admin,
    });
  } catch (err) {
    isValid = err.details[0].message;
  }

  return isValid;
};
