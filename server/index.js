const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const passport = require('passport')
const cors = require('cors')
const routes = require('./routes/index')
const auth = require('./routes/auth')



dotenv.config()

const app = express()
mongoose.connect(process.env.MONGODBURI,{
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
  }, (err) =>{
      if(err){
          console.log(err)
      }else{
          console.log('connected to MongoDB')
      }
  })

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(passport.initialize())
  app.use('/api', auth)
  app.use('/api', routes)
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'welcome to OG DRIVE' });
  })

  const port = process.env.PORT || 5000

  app.listen(port, ()=>{
      console.log(`OG Drive running on port ${port}...`)
  })

