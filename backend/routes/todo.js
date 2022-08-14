const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
var fetchuser = require('../middleware/fetchuser');

router.get('/view/pending', fetchuser, async (req, res) => {
    try {
        const todo = await Todo.find({ user: req.user.id, status: "Pending" })
        res.json(todo);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured")
    }
});
router.get('/view/completed', fetchuser, async (req, res) => {
    try {
        const todo = await Todo.find({ user: req.user.id, status: "Completed" })
        res.json(todo);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured")
    }
});

router.post('/add', fetchuser, async (req, res) => {
    try {
        const name  = req.body.todo;
        const todo = new Todo({
            name, status: "Pending", user: req.user.id
        })
        const addTodo = await todo.save();
        res.json({addTodo, success: true});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured")
    }
});
router.put('/update/:id', fetchuser, async (req, res) => {
    try {
        let todo = await Todo.findById(req.params.id);
        todo = await Todo.findByIdAndUpdate(req.params.id, {$set: {status: "Completed"}}, {new:true})
        res.json({todo})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured")
    }
});
router.delete('/delete/:id', fetchuser, async (req, res) => {
    try {
        let todo = await Todo.findById(req.params.id);
        todo = await Todo.findByIdAndDelete(req.params.id);
        res.json({success: true})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured")
    }
});

module.exports = router