const express =require('express');
const app = express();
const router = express.Router();
const routes = require('./Routes/index');
const connectToDb = require('./Db/connect');
const errorMiddleware = require('./Middleware/error.middleware');
const dotenv = require('dotenv');
const passport = require('passport');
const cors = require('cors');

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use('/api',routes);

app.use(errorMiddleware.handle)



app.listen(3000,()=>{
    console.log('Server is running on port 3000');
    connectToDb()
})