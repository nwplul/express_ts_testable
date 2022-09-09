import express from 'express';
import {Request, Response} from 'express';
import cors from 'cors';
 
const app = express()
app.use(cors()) 

interface typeMovies {
    movies: string,
    desc: string,
    rating: number
}

app.get("/getWorks", (req:Request, res:Response ) => {
    const movies: typeMovies = ({
        movies: "Batman",
        desc: "Filme massinha",
        rating: 5
    })

    res.send(movies)
})

app.listen(8000, () => {
    console.log("Server is running")
})

