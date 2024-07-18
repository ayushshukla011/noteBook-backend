const { connect } = require('mongoose');
const express = require('express')
const connectToMongo=require('./db');
var cors = require('cors')
const swaggerUi=require('swagger-ui-express');
const YAML=require('yamljs');
const path = require('path');

connectToMongo();



const app=express()
app.use(cors())
const port= 5000

app.use(express.json())

// Construct the absolute path to your Swagger YAML file
const swaggerFilePath = path.resolve(__dirname,'swagger.yaml');
// Load your Swagger YAML file
const swaggerDocument = YAML.load(swaggerFilePath);

// Serve Swagger UI on the root URL
app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(swaggerDocument));

app.use('/auth',require('./routes/auth.js'))
app.use('/notes',require('./routes/notes.js'))

app.listen(port,()=>{
    console.log(`NoteBook backend  listening at http://localhost:${port}`)
})