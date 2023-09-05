"use strict";

window.addEventListener("load", start);
const endpoint = "http://localhost:3000";

function start() {
  console.log("we have connection to js 👌🙌");

  document
    .querySelector("#btn-create-artist")
    .addEventListener("click", () =>
      document.querySelector("#dialog-create-artist").showModal()
    );

  document
    .querySelector("#form-create")
    .addEventListener("submit", createArtist);

  updateArtistpage();
  console.log("START FUNC");
}

async function updateArtistpage() {
  const artists = await getArtistsFromBackend();
  showArtistsAll(artists);
}

async function getArtistsFromBackend() {
  const response = await fetch(`${endpoint}/artists`);
  const data = await response.json();
  console.log(data);
  return data;
}

function showArtistsAll(array) {
  // document.querySelector("#artist-table-body").innerHTML = "";

  for (const artist of array) {
    showArtist(artist);
  }
}

function showArtist(artist) {
  const html = /* HTML */ `
    <tr class="artist-item">
      <td>
        <button class="btn-update-artist" class="buttonAni">Update</button>
      </td>
      <td>${artist.name}</td>
      <td>${artist.birthdate}</td>
      <td>${artist.activeSince}</td>
      <td>${artist.genres}</td>
      <td>${artist.labels}</td>
      <td>${artist.website}</td>
      <td><img src=${artist.image} /></td>
      <td>${artist.shortDescription}</td>
      <td>
        <input
          type="checkbox"
          id="favoriteArtist"
          name="favoriteArtist"
          value="true"
        />
        <label for="favoriteArtist">Favorite</label><br />
      </td>
    </tr>
  `;

  document
    .querySelector("#artist-table-body")
    .insertAdjacentHTML("beforeend", html);

  document
    .querySelector("#artist-table-body tr:last-child .btn-update-artist")
    .addEventListener("click", () => selectedToUpdate(artist));
}

async function createArtist(event) {
  event.preventDefault();

  const form = event.target;
  const newArtist = {
    name: form.name.value,
    birthdate: form.birthdate.value,
    activeSince: form.activeSince.value,
    genres: form.genres.value,
    labels: form.labels.value,
    website: form.website.value,
    image: form.image.value,
    shortDescription: form.shortDescription.value,
  };

  // JSONify the new artist
  const artistAsJson = JSON.stringify(newArtist);
  const response = await fetch(`${endpoint}/artists`, {
    method: "POST",
    body: artistAsJson,
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    // if success, update the grid
    updateArtistpage();
    // and scroll to top
    // scrollToTop();
    scrollIntoView({ behavior: "smooth" });
  } else {
    console.error("Something went wrong with posting a new artist Lise");
  }
}

function selectedToUpdate(artist) {
  const form = document.querySelector("#form-update");
  form.name.value = artist.name;
  form.birthdate.value = artist.birthdate;
  form.activeSince.value = artist.activeSince;
  form.genres.value = artist.genres;
  form.labels.value = artist.labels;
  form.website.value = artist.website;
  form.image.value = artist.image;
  form.shortDescription.value = artist.shortDescription;

  document.querySelector("#dialog-update-artist").showModal();
}
