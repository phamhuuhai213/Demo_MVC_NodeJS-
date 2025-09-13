const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

module.exports = (io) => {
    router.get("/", studentController.getAll);

    router.post("/", (req, res) => studentController.create(req, res, io));
    router.put("/:id", (req, res) => studentController.update(req, res, io));
    router.delete("/:id", (req, res) => studentController.delete(req, res, io));

    return router;
};