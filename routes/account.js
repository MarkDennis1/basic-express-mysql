import express, { Router } from "express";
import db from "../db/db_config.js";
const router = Router();

router.use(express.json());

//get all records
router.get("/", (req, res) => {
  const queryString = `SELECT * from account`;
  db.query(queryString, (err, row) => {
    res.send(row);
  });
});

//get record with specific id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sqlString = `SELECT * from account WHERE id = ${id}`;
  db.query(sqlString, (err, row) => {
    if (!err) res.status(200).send(row);
    else res.status(400).send(new Error(err.message));
  });
});

//insert new record
router.post("/", (req, res) => {
  const { email, password, is_admin } = req.body;
  const sqlString = `INSERT INTO account(email, password, is_admin) VALUES('${email}', '${password}', ${is_admin})`;
  db.query(sqlString, (err, row) => {
    if (!err) res.status(200).send(row);
    else res.status(400).send(err.message);
  });
});

//delete all
router.delete("/", (req, res) => {
  db.query(`DELETE FROM account`, (err, row) => {
    if (!err) res.status(200).send("Items successfully removed.");
    else res.status(404).send(new Error(err.message));
  });
});

//delete single record
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query(`DELETE FROM account WHERE id = ${id}`, (err, row) => {
    if (!err) res.status(200).send("Item successfully removed.");
    else res.status(404).send(new Error(err.message));
  });
});

export default router;
