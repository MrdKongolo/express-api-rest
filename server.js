const express = require('express');
const cors = require('cors');

let DB = require('./db.config');

const app = express();

app.use(cors({
    origin:'*',
    methods:['POST','GET','PUT','DELETE','PATCH'],
    allowedHeaders:'Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization'
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const user_router = require('./routes/users');
const cocktail_router = require('./routes/cocktails');
const auth_router = require('./routes/auth');

app.get('/', (req, res) => res.send('I am online'));

app.use('/users', user_router);
app.use('/cocktails', cocktail_router);
app.use('/auth', auth_router);

app.use((error, req, res, next) => {
    console.log('je suis dans le middleware');
    console.log(error);
    return res.status(error.statusCode || 500).json({message: error.message, error:error})
});

app.get('*', (req, res) => res.status(501).send('What a hell are you doing ?'));

DB.sequelize.authenticate()
    .then( ()=> console.log('Database connexion OK'))
    .then( () => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`Running on ${process.env.SERVER_PORT}`);
        });
    })
    .catch(err => console.log('Database Error',err));
