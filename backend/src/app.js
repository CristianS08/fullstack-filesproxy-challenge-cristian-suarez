const express = require('express')
const cors = require('cors')
const filesRouter = require('./routes/files')

const app = express()
const PORT = process.env.PORT || 3001

const corsOptions = {
  origin: '*',
  methods: ['GET'],
  optionsSuccessStatus: 204
}

app.use(cors(corsOptions))
app.use('/files', filesRouter)

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`)
})

module.exports = app
