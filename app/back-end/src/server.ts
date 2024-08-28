import expresss from 'express'

const port = 3000

const app = expresss()

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
