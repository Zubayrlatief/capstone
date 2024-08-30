import express from 'express'
import cors from 'cors'
import itemsRouter from './routes/itemsRouter.js'
import usersRouter from './routes/usersRouter.js'

let port = process.env.PORT || 5001
const app = express()

app.use(express.static('public'))
app.use(express.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Request-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Expose-Headers", "Authorization");
  next()
})

app.use(cors())

app.use('/items', itemsRouter)
app.use('/users', usersRouter)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
