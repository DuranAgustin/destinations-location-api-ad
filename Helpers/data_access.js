import fetch from "node-fetch";

export async function getPhotoURL({ location, destination }) {
  const URL = `https://api.unsplash.com/search/photos?client_id=TpOBnGBvqR8GpKDlMAuiasNytRYy7AS-D903LVpSEv0&query=${destination} ${location}`;

  try {
    const res = await fetch(URL);
    const data = await res.json();
    //get random photo
    const allPhotos = data.results;
    const randIdx = Math.floor(Math.random() * allPhotos.length);
    const randPhoto = allPhotos[randIdx];
    return randPhoto.urls.thumb;
  } catch (error) {
    console.log(error);
  }
}
