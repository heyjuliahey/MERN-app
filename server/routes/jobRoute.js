import express from "express";
import {create, getAll, getOne, update, deleteJob} from "../controller/jobController.js";

const route = express.Router();

route.post("/create", create);
route.get("/getall", getAll);
route.get("/getone/:id", getOne);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteJob);

export default route;