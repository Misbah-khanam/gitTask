import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import userRoutes from './routes/user.js'

const app = express();
dotenv.config();
app.use(cors());

app.get("/",(req, res) =>{
    res.send("this is api")
})

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())


app.use('/user',userRoutes)


app.listen(5000, () => {console.log(`server running on port ${5000}`)})
