require('dotenv').config()

const express = require('express')
const app = express()

const cors = require('cors')

const connectDB = require('./config/db.config')
connectDB()

const ShortUrl = require('./models/shortUrl')

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cors())

app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find()
    res.render('index', {shortUrls : shortUrls})
})

app.post('/shorturls', async (req, res) => {
    await ShortUrl.create({full : req.body.fullUrl})
    res.redirect('/')
})

app.get('/:shortUrl', async (req,res) => {
    const shortUrl = await ShortUrl.findOne({ short : req.params.shortUrl })
    if(shortUrl === null){
        return res.sendStatus(404)
    }

    shortUrl.clicks ++
    shortUrl.save()

    res.redirect(shortUrl.full)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("Server up and running")
})