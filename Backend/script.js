import express from "express";
import cors from "cors";
import fs from "fs/promises";

const app = express();
const port = 3000;

async function getArtists() {
  const artistList = await fs.readFile("artistData.json");
  const artists = JSON.parse(artistList);
  console.log(artists);

  return artists;
}

app.listen(port, () => {
  console.log(`noget sjovt skete... server kører på http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("vi får respons! 🎉👌");
});

app.get("/artists", async (req, res, artists) => {
  //   res.send("vi får artister! 🎉");
  //   const artistList = await fs.readFile("artistData.json");
  //   const artists = JSON.parse(artistList);
  getArtists(artists);
  res.json(artists);
  console.log(artists);
});

app.get("/artists/:artistId", async (req, res, artists) => {
  getArtists(artists);
  console.log(req.params);

  //   const artistList = await fs.readFile("artistData.json");
  //   const artists = JSON.parse(artistList);

  const id = req.params.artistId;
  const findObj = artists.find((artist) => artist.id === id);
  res.json(findObj);
});

app.post("/artists", (req, res) => {
  console.log(req.body);

  const newArtist = {
    id: new Date().getTime(),
    name: req.body.name,
    birthdate: req.body.birthdate,
    activeSince: req.body.activeSince,
    genres: req.body.genres,
    labels: req.body.labels,
    website: req.body.website,
    image: req.body.image,
    shortDescription: req.body.shortDescription
  };

  console.log(newArtist);
  artists.push(newArtist);
  console.log(artists);
  res.json(artists);
});

const body = { name: "nameOfArtist", birthdate: "1234-12-12", activeSince: "1234", genres: ["pop", "Jazz"], labels: "aLabelName", website: "www.aWebsite.com", image: "www.aPicture.com", shortDescription: "Here I write something." };
//  {
//      "name": "nameOfArtist",
//     "birthdate": "1234-12-12",
//     "activeSince": "1234",
//     "genres": ["pop", "Jazz"],
//     "labels": "aLabelName",
//     "website": "www.aWebsite.com",
//     "image": "www.aPicture.com",
//     "shortDescription": "Here I write something."
//  }
