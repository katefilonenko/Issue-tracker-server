const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose');
mongoose.connect(
    'mongodb://localhost:27017/issue-tracker', 
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    () => console.log('CONNECTED TO DB')
)

var corsOptions={
    origin: "http://localhost:8081"
};

const app = express();
app.use(bodyParser.json()); 
app.use(express.json());
app.use(cors(corsOptions));

const api = require('./routes/api');
const location = require('./routes/locations');
const comment = require('./routes/updateComment');
app.use('/api', api);
app.use('/location', location);
app.use('/comment', comment);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
})