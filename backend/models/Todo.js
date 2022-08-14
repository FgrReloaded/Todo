const mongoose = require('mongoose');
const {Schema} = mongoose;
const TodoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
	user: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'user' 
	}
});

const Todo = mongoose.model('todos', TodoSchema)
Todo.createIndexes();
module.exports = Todo;