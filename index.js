const express = require('express')
const path = require('path')
const routes = require('./routes')

const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const dbConnection = require('./config/db');
dbConnection();

const app = express();

const port = process.env.PORT || 9000;

app.use(require('./utils/response/responseHandler'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads",express.static(path.join(__dirname, "uploads")));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


app.use(routes);

app.get('/', async (req, res) => {
    try {
        res.render('')
    } catch (error) {
        console.log(error);
    }
});


app.listen(port,()=>{
    console.log(`Application is running on port no: ${port}`);
})
