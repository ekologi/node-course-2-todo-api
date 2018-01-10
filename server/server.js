var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
    text: {
        type: String
    },
    completed: {
        type: Boolean
    }, 
    completedAt: {
        type: Number
    }
});

// var newTodo = new Todo({
//     text: 'Cook Dinner'
// });

// newTodo.save().then ((doc)=>{
//     console.log('Save sukses ' + doc);
// },(e) => {
//     console.log('Error save gagal');
// });

var myTodo = new Todo ({
    text: 'Makan Malam',
    completed: true,
    completedAt: 123
});

myTodo.save().then((doc)=>{
    console.log('Berhasil simpan ' + doc)
}, (e)=> {
    console.log('Gagal simpan');
});