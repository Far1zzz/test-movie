import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import LiveTvTwoToneIcon from "@mui/icons-material/LiveTvTwoTone";
import LocalMoviesOutlinedIcon from "@mui/icons-material/LocalMoviesOutlined";
import { useNavigate } from "react-router-dom";

const useStyle = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "#2d313a",
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyle();
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (value === 0) {
      navigate("/");
    } else if (value === 1) {
      navigate("/movie");
    } else if (value === 2) {
      navigate("/series");
    } else if (value === 3) {
      navigate("/search");
    }
  }, [value, navigate]);

  return (
    <>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          style={{ color: "black" }}
          label="Trending"
          icon={<TrendingUpIcon />}
        />
        <BottomNavigationAction
          style={{ color: "black" }}
          label="Film"
          icon={<LocalMoviesOutlinedIcon />}
        />
        <BottomNavigationAction
          style={{ color: "black" }}
          label="Serial TV"
          icon={<LiveTvTwoToneIcon />}
        />
        <BottomNavigationAction
          style={{ color: "black" }}
          label="Cari"
          icon={<SearchTwoToneIcon />}
        />
      </BottomNavigation>
    </>
  );
}
