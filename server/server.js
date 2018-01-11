var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }, 
    completedAt: {
        type: Number,
        default: null
    }
});

var User = mongoose.model('User' , {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

var newUser = new User ({
    email: '    ebaskom@gmail.com'
});

newUser.save().then((doc)=> {
    console.log('Simpan sukses',doc)
}, (e) => {
    console.log('Simpan gagal ' , e);
});
// var newTodo = new Todo({
//     text: 'Cook Dinner'
// });

// newTodo.save().then ((doc)=>{
//     console.log('Save sukses ' + doc);
// },(e) => {
//     console.log('Error save gagal');
// });

// var myTodo = new Todo ({
//     text: '  Makan Siang       '
// });

// myTodo.save().then((doc)=>{
//     console.log(JSON.stringify(doc,undefined, 2));
// }, (e)=> {
//     console.log('Gagal simpan');
// });