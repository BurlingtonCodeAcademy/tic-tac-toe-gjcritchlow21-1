const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 5000

app.use(express.static('public'))

app.get('*', (req,res) => {
    res.status(404);
    res.sendFile(path.resolve('./public/404.html'))
})

app.listen(PORT, () => {console.log(`Running on port: ${PORT}`)})