const express = require('express');
const cors = require('cors');
const app = express();

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`))