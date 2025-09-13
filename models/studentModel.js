const db = require("../config/db");

const Student ={
    getAll: (callback) =>{
        db.query("SELECT * FROM students", callback);
    },

    create: (data, callback) =>{
        const {name, email, age} = data;
        db.query("INSERT INTO students (name, email, age) VALUE (?,?,?)",[name, email, age],callback);
    },

    update: (id, data, callback) =>{
        const{name, email, age} = data;
        db.query("UPDATE students SET name=?, email=?, age=? WHERE id=?",[name, email, age, id],callback);
    },

    delete: (id, callback) =>{
        db.query("DELETE  FROM students WHERE id=?",[id],callback);
    }

};

module.exports = Student;