import app from './app'
import { mongoConection } from './config/config'
import mongoose = require('mongoose')

// MongoDB Connection
mongoose.connect(mongoConection, { useNewUrlParser: true })

let port = process.env.PORT || 3000

app.listen(port)

console.log(`API Online http://localhost:${port}`)
