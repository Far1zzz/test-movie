import React, { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import "./style.css";
import Paging from "../../components/Pagination/Paging";
import axios from "axios";

const Trending = () => {
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);

  const movieTrending = async () => {
    const trending = await axios.get(
      `${process.env.REACT_APP_URL}/trending/all/day?api_key=${process.env.REACT_APP_KEY}&page=${page}`
    );
    setMovie(trending.data.results);
  };

  useEffect(() => {
    window.scroll(0, 0);
    movieTrending();
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Trending Movie</span>
      <div className="trending">
        {movie &&
          movie.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
              overview={c.overview}
            />
          ))}
      </div>
      <Paging setPage={setPage} />
    </div>
  );
};

export default Trending;
