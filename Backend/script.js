import express from "express";
import cors from "cors";
import fs from "fs/promises";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

async function getArtists() {
  const artistList = await fs.readFile("artistData.json");
  return JSON.parse(artistList);
  // console.log(artists);

  // return artists;
}

// async function makeNewArtist(artists) {
//   const json = JSON.stringify(artists);
//   await fs.writeFile("artistData.json", json);
// }

app.listen(port, () => {
  console.log(`noget sjovt skete... server kører på http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("vi får respons! 🎉👌");
});

app.get("/artists", async (req, res) => {
  const artists = await getArtists();
  //   res.send("vi får artister! 🎉");
  //   const artistList = await fs.readFile("artistData.json");
  //   const artists = JSON.parse(artistList);
  getArtists(artists);
  res.json(artists);
  // console.log(artists);
});

app.get("/artists/:artistId", async (req, res) => {
  // getArtists(artists);
  const artists = await getArtists();
  console.log(req.params);

  //   const artistList = await fs.readFile("artistData.json");
  //   const artists = JSON.parse(artistList);

  const id = Number(req.params.artistId);
  const findArtist = artists.find((artist) => artist.id === id);
  res.json(findArtist);
});

app.post("/artists", async (req, res) => {
  console.log(req.body);
  const newArtist = req.body;
  newArtist.id = new Date().getTime();
  console.log(newArtist);

  const artists = await getArtists();
  artists.push(newArtist);
  const json = JSON.stringify(artists);
  await fs.writeFile("artistData.json", json);
  res.json(artists);

  // try {
  // await makeNewArtist(artists);
  //   res
  //     .status(201)
  //     .json({ message: "Ny kunstner tilføjet.", artist: newArtist });
  // } catch (error) {
  //   console.error("Fejl ved tilføjelse af kunstner:", error);
  //   res.status(500).json({ error: "Fejl ved tilføjelse af kunstner" });
  // }
});

// const newArtist = {
//   id: new Date().getTime(),
//   name: req.body.name,
//   birthdate: req.body.birthdate,
//   activeSince: req.body.activeSince,
//   genres: req.body.genres,
//   labels: req.body.labels,
//   website: req.body.website,
//   image: req.body.image,
//   shortDescription: req.body.shortDescription
// };

app.put("/artists/:id", async (req, res) => {
  console.log("vi putter");
  const id = req.params.id;
  console.log(id);

  const artists = await getArtists();
  // const artists = JSON.parse(data);

  const artistToUpdate = artists.find(
    (artist) => Number(artist.id) === Number(id)
  );
  const body = req.body;
  console.log(body);
  artistToUpdate.name = body.name;
  artistToUpdate.birthdate = body.birthdate;
  artistToUpdate.activeSince = body.activeSince;
  artistToUpdate.genres = body.genres;
  artistToUpdate.labels = body.labels;
  artistToUpdate.website = body.website;
  artistToUpdate.image = body.image;
  artistToUpdate.shortDescription = body.shortDescription;

  fs.writeFile("artistData.json", JSON.stringify(artists));
  res.json(artists);
});

// app.delete()

// app.post("/artists", async (req, res) => {
//   console.log(req.body);
//   res.send("nnununu");
//   const newArtist = req.body;
//   const artists = await getArtists();
//   artists.push(newArtist);

//   try {
//     // File read and write operations
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Error occurred while reading/writing to the JSON file." });
//   }

// await makeNewArtist(artists);
// res.send("new artist made");

// try {
//   await makeNewArtist(artists);
//   res.status(201).json({ message: "Ny kunstner tilføjet.", artist: newArtist });
// } catch (error) {
//   console.error("Fejl ved tilføjelse af kunstner:", error);
//   res.status(500).json({ error: "Fejl ved tilføjelse af kunstner" });
// }
// // const newArtist = JSON.stringify(data);
// // fs.writeFile("artistData.json", newArtist);

// const json = JSON.stringify(artists);
// await fs.writeFile("artistData.json", json);

// console.log(newArtist);
// makeNewArtist(newArtist);
// artists.push(newArtist);
// console.log(artists);
// res.json(artists);
// });

// const body = { name: "nameOfArtist", birthdate: "1234-12-12", activeSince: "1234", genres: ["pop", "Jazz"], labels: "aLabelName", website: "www.aWebsite.com", image: "www.aPicture.com", shortDescription: "Here I write something." };
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
