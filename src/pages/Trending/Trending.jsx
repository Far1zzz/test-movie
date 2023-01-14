/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import { movieTrending } from "./api";
import "./style.css";
import "../../App.css";
import Paging from "../../components/Pagination/Paging";

const Trending = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    movieTrending().then((res) => {
      console.log(res.results);
      setMovie(res.results);
    });
  }, []);

  return (
    <>
      {" "}
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
        <Paging />
      </div>
    </>
  );
};

export default Trending;
