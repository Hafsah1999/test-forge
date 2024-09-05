const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const adminRouter = require('./Routers/adminRouter');
const teacherRouter = require('./Routers/teacherRouter');
const utilRouter = require('./Routers/utils');
const formRouter = require('./Routers/formRouter');
const studentRouter = require('./Routers/studentRouter');
const submissionRouter = require('./Routers/submission');


// middleware
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

app.use( '/admin', adminRouter );
app.use( '/form', formRouter );
app.use( '/teacher', teacherRouter );
app.use( '/student', studentRouter );
app.use( '/response', submissionRouter );
app.use( '/util', utilRouter );

app.use( express.static('./static/uploads') );


app.listen( port, () => { console.log('server started'); } );