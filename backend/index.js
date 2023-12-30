const express = require('express');
const cors = require('cors');

const app = express()

// confg JSON response
app.use(express.json());

// Solve CORS
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

//Public folder for images
app.use(express.static('public'));

//Routes
const UserRoutes = require('./routes/UserRoutes')
const MoveRoutes = require('./routes/MoveRoutes')

app.use('/users', UserRoutes)
app.use('/moves', MoveRoutes)

app.listen(5000);

