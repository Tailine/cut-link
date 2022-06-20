import express from 'express'
import cors from 'cors'
import linkRoutes from './link/routes'

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())

app.use(express.json())
app.use(linkRoutes)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
