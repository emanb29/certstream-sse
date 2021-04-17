const express = require('express')
const app = express()
const port = process.env['PORT'] || 3334
const { v4: uuidv4 } = require('uuid')
const SSE = require('express-sse')
const CertStreamClient = require('certstream')

// const apiKey = process.env['API_KEY']

const certStreamSse = new SSE();

app.get('/', (req, res) => {
  // res.sendFile(`${__dirname}/index.html`)
  res.redirect(301, '/certstream')
})

app.get('/certstream', certStreamSse.init)

const csClient = new CertStreamClient((msg) => {
  certStreamSse.send(msg, msg.message_type, uuidv4())
})

csClient.connect()

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})