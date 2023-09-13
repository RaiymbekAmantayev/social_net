const express = require('express')
const cors = require('cors')


const app = express()

// middleware

app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }))


// routers
const router = require('./routers/PostRouters')
app.use('/api/posts', router)

//static Images Folder

// app.use('/Images', express.static('./Images'))


//port

const PORT = process.env.PORT || 3001

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})