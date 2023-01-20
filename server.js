const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
//for parsing the res.body.email
app.use(bodyParser.json());
app.use(cors());

const db = {
    users: [
        {
            id: '123',
            name: 'silas',
            username: 'andychankahou76',
            email: 'silaschanuwb@gmail.com',
            password: '456',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'andy',
            username: 'andychankahou76',
            email: 'decadedw@gmail.com',
            password: '457',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send(db.users);
})

app.post('/signin', (req, res) =>{

    if(req.body.username === db.users[0].username && req.body.password === db.users[0].password){
        res.json("signing in");
    }else{
        res.status(400).json("error logging in");
    }
   
})

app.post('/register', (req, res) => {
    const { username, name, password} = req.body;
    
    db.users.push({
        id: '125',
        name: 'april',
        username: 'paco1228',
        email: 'silaschanuwb@gmail.com',
        password: '457',
        entries: 0,
        joined: new Date()
    })
    //send it to the tail
    res.json(db.users[db.users.length-1]);
})

app.get('/profile/:id', (req, res) =>{
    const { id } = req.params;
    let found = false;
    db.users.forEach(user => {
        if(user.id === id){
            found = true;
            return res.json(user);
        }
    })
    if(!found){
        res.status(400).json('Not Found user');
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    db.users.forEach(user => {
        if(user.id === id){
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if(!found){
        res.status(400).json('Not Found user');
    }
})

app.listen(3000, ()=> {
    console.log("app is running on port 3000");
})

/*
--> res = this is working fine
    signin --> post = sucess / fail
    register --> post = user
    profile:/userId --> get = user
    image --> put --> user
*/