import React, { useState, useEffect } from "react";
import useGenres from "../../hooks/useGenre";
import axios from "axios";
import Genres from "../../components/Genres/Genres";
import SingleContent from "../../components/SingleContent/SingleContent";
import Paging from "../../components/Pagination/Paging";

const Series = () => {
  const [page, setPage] = useState(1);
  const [movie, setMovie] = useState([]);
  const [pageNum, setPageNum] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreForURL = useGenres(selectedGenres);

  const getMovie = async () => {
    const film = await axios.get(
      `${process.env.REACT_APP_URL}/discover/tv?api_key=${process.env.REACT_APP_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForURL}`
    );
    setMovie(film.data.results);
    setPageNum(film.data.total_pages);
  };

  useEffect(() => {
    getMovie();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, genreForURL]);

  return (
    <div>
      <span className="pageTitle">Series</span>

      <span className="pageTitle">Movies</span>
      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="trending">
        {movie &&
          movie.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="tv"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {pageNum > 1 && <Paging setPage={setPage} numOfPages={pageNum} />}
    </div>
  );
};

export default Series;
