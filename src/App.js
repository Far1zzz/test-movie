import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SimpleBottomNavigation from "./components/BottomNav";
import Header from "./components/Header/Header";
import Trending from "./pages/Trending/Trending";
import Movies from "./pages/Movie/Movies";
import TvSeries from "./pages/Series/Series";
import Search from "./pages/Search/Search";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Routes>
            <Route path="/" element={<Trending />} exact />
            <Route path="/movie" element={<Movies />} />
            <Route path="/series" element={<TvSeries />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
