import axios from "axios";

export const movieTrending = async () => {
  // get data api
  const movie = await axios.get(
    `${process.env.REACT_APP_URL}/trending/all/day?api_key=${process.env.REACT_APP_KEY}`
  );
  // cek apakah data api sudah didapat
  //   console.log({ list: movie });
  //   kirim data api nya ke app.js
  return movie.data;
};
