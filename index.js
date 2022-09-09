import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.get("/getWorks", (req, res) => {
    const movies = ({
        movies: "Batman",
        desc: "Filme massinha",
        rating: 5
    });
    res.send(movies);
});
app.listen(8000, () => {
    console.log("Server is running");
});
