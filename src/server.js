const express = require('express');
const routes = require('./routes/routes');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(routes);
app.use(cors());

mongoose.connect(process.env.DB_STRING, 
                  { useNewUrlParser: true, useUnifiedTopology: true }
                );

app.listen(process.env.APP_PORT, () => console.log('Online Api - Port:' + process.env.APP_PORT));