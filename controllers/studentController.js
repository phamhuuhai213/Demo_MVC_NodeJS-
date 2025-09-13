const Student = require("../models/studentModel");

const studentController = {
    getAll: (req, res) => {
        Student.getAll((err, rows) =>{
            if (err) return res.status(500).json(err);
            res.json(rows);
        });
    },

    create: (req, res, io) => {
        Student.create(req.body, (err, result) =>{
            if (err) return res.status(500).json(err);
            io.emit("update"); //thong bao realtime cho client
            res.json({ id: result.insertId, ...req.body }); 
        });
    },

    update: (req, res, io) => {
        Student.update(req.params.id, req.body, (err) =>{
            if (err) return res.status(500).json(err);
            io.emit("update");
            res.json({ id: req.params.id, ...req.body});
        });
    },

    delete: (req,res, io) =>{
        Student.delete(req.params.id , (err) =>{
            if(err) return res.status(500).json(err);
            io.emit("update");
            res.json({message: "Deledted"});
        } );
    }

};

module.exports = studentController;