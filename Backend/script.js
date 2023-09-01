import express from "express";
import cors from "cors";
import fs from "fs/promises";

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`noget sjovt skete... server kører på http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("vi får respons! 🎉👌");
});

app.get("/artists", async (req, res) => {
  //   res.send("vi får artister! 🎉");
  const artistList = await fs.readFile("artistData.json");
  const artists = JSON.parse(artistList);
  res.json(artists);
  //   console.log(artists);
});

http: app.get("/artist/:id", (req, res) => {
  res.send("vi får respons! med id 👌");
});
