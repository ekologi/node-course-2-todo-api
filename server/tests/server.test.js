const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'Teks yg pertama'
}, {
    _id: new ObjectID(),
    text: 'Teks yg kedua'
}];

beforeEach((done) => {
    Todo.remove({}).then(()=> {
        return Todo.insertMany(todos);
    }).then(() => done()); 
});

describe('POST/todos', () => {
    it ('Harusnya membuat todos', (done) => {
        var text = 'Coba melakukan test';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);            
            })
            .end((err,res) => {
                if (err) {
                    return done(err);
                }
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1)
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e)=>done(e));
            });    
    });

    it('harus menggunakan nilai yang valid', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err,res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();        
                }).catch((e) => done(e));
            });

    });
});

describe('GET/todos', () => {
    it('Ambil seluruh data ', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                console.log(res);
                expect(res.body.todo.length).toBe(2); 
            })
            .end(done);
    });
});

describe('GET/todos/:id', () => {
    it('Mengembalikan todo berdasarkan ID ', (done) => {
        request(app)
            .get('/todos/' + todos[0]._id.toHexString())
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });
    it('Harus mengembalikan 404 jika tdk ketemu todo', (done) => {
        var hexId = new ObjectID().toHexString();
        request(app)
            .get('/todos/' + hexId)
            .expect(404)
            .end(done);
    });
    it('Harus mengembalikan 404 jika non-object id', (done) => {
        request(app)
            .get('/todos/123abc')
            .expect(404)
            .end(done);
    });
});

describe ('DELETE /todos/:id', () => {
    it('Harusnya me-remove todo', (done) => {
        var hexId = todos[1]._id.toHexString();
        request(app)
            .delete('/todos/' + hexId)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err,res) => {
                if (err) {
                    return done(err);
                }
                Todo.findById(hexId).then((todo) => {
                    expect(todo).toNotExist();
                    done();        
                }).catch ((e) => done(e));
            });
    });
    it('Harus mengembalikan 404 jika todo tdk ditemukan', (done) => {
        var hexId = new ObjectID().toHexString();
        request(app)
            .delete('/todos/' + hexId)
            .expect(404)
            .end(done);
    });
    it('Harusnya mengembalikan 404 jika object id invalid', (done) => {
        request(app)
            .delete('/todos/123abc')
            .expect(404)
            .end(done);
    });

});