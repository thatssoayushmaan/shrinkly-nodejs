const mongoose = require('mongoose')

const connectDB = async () => {
    await mongoose.connect(process.env.URL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true
    })
    console.log("Mongo DB connected")
}

module.exports = connectDB