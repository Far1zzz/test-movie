import {
  TextField,
  ThemeProvider,
  createTheme,
  Button,
  Tabs,
  Tab,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import Paging from "../../components/Pagination/Paging";

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [movie, setMovie] = useState([]);
  const [pageNum, setPageNum] = useState();

  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const Search = async () => {
    const data = await axios.get(
      `${process.env.REACT_APP_URL}/search/${type ? "tv" : "movie"}?api_key=${
        process.env.REACT_APP_KEY
      }&language=en-US&query=${search}&page=${page}&include_adult=false`
    );
    setMovie(data.data.results);
    setPageNum(data.data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    Search();

    //eslint-disable-next-line
  }, [type, page]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div style={{ display: "flex", margin: "15px 0" }}>
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Cari....."
            variant="outlined"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            variant="outlined"
            style={{ marginLeft: 10 }}
            onClick={Search}
          >
            <SearchIcon />
          </Button>
        </div>
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(e, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
          aria-label="disabled tabs example"
        >
          <Tab style={{ width: "50%" }} label="Cari Movie" />
          <Tab style={{ width: "50%" }} label="Cari Tv Series" />
        </Tabs>
      </ThemeProvider>
      <div className="trending">
        {movie &&
          movie.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
              overview={c.overview}
            />
          ))}
        {search &&
          !movie &&
          (type ? <h2>No Series Found</h2> : <h2>No Movie Found</h2>)}
      </div>
      {pageNum > 1 && <Paging setPage={setPage} numOfPages={pageNum} />}
    </div>
  );
};

export default Search;
