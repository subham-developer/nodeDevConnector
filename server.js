const express = require('express');
const connectDB = require('./config/db');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
var cors = require('cors');

const app = express();


// Connect Database
connectDB();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use((req, res, next) => {
    // res.header('Access-Control-Allow-Origin','https://wwww.abc.com')
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,PATCH,UPDATE,GET,POST,DELETE')
        return res.status(200).json({})
    }
    next();
})

// Init Middleware
// app.use(express.json({ extended: false }));
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users/', require('./routes/api/users'));
app.use('/api/auth/', require('./routes/api/auth'));
app.use('/api/profiles', require('./routes/api/profiles'));
app.use('/api/posts/', require('./routes/api/posts'));

// Server Static assets in Production
if(process.env.NODE_ENV === 'production'){
    // Set Static folde
    app.use(express.static('client/build'));
    app.get('*',(req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });

}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is Rinning on Port number ${PORT}`))