import express, { Router } from "express";
import { create, findAll, findAllAdmin, findOne, remove, removeAll, update } from "../controllers/account.js";
const router = Router();

router.use(express.json());
router.use(express.urlencoded());

//get all records
router.get("/", findAll);

//get record admin
router.get("/admin", findAllAdmin);

//get record with specific id
router.get("/:id", findOne);

//insert new record
router.post("/", create);

//update selected record
router.put("/:id", update);

//delete all
router.delete("/", removeAll);

//delete single record
router.delete("/:id", remove);

export default router;
