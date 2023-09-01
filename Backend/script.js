import express from "express";
import cors from "cors";

const app = express(); 

app.listen(3000, () => {
    console.log("noget sjovt skete... server kører på port 3000");
}); 

