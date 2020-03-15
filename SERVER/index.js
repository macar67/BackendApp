const express = require('express');
const bodyParser = require('body-parser');

require('./db/mongoose');

const userRouter = require('./routes/user.route')
const roomRouter = require('./routes/room.route')
const teamRouter = require('./routes/team.route')
const formRouter = require('./routes/form.route')
const postRouter = require('./routes/post.route')
const eventRouter = require('./routes/event.route')
const newsFeedRouter = require('./routes/newsFeed.route')


const app = express();
const port = process.env.PORT || 3000



app.use(express.json())


app.use(userRouter)
app.use(postRouter)
app.use(teamRouter)
app.use(formRouter)
app.use(eventRouter)
app.use(newsFeedRouter)
app.use(roomRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})