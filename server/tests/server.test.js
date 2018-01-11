const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    text: 'Teks yg pertama'
}, {
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