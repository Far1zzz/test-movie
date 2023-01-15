import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Backdrop from "@material-ui/core/Backdrop";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import "../SingleContent/style.css";
import { Button } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import Carousel from "../Carousel/Carousel";
import {
  img_500,
  unavailableLandscape,
  unavailable,
} from "../../config/config";
import "./style.css";

const useStyle = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

export default function ContentModal({ children, media_type, id }) {
  const classes = useStyle();
  const [open, setOpen] = React.useState(false);
  const [movie, setMovie] = useState();
  const [trailer, setTrailer] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getDescription = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_URL}/${media_type}/${id}?api_key=${process.env.REACT_APP_KEY}&language=en-US`
    );
    setMovie(data);
  };

  const getTrailer = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_URL}/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_KEY}&language=en-US`
    );
    console.log({ trailer: data });
    setTrailer(data.results[0]?.key);
  };

  useEffect(() => {
    getDescription();
    getTrailer();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        style={{ cursor: "pointer" }}
        color="inherit"
        className="media"
        onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {movie && (
            <div className={classes.paper}>
              <div className="modalContent">
                <img
                  className="contentPotrait"
                  src={
                    movie.poster_path
                      ? `${img_500}/${movie.poster_path}`
                      : unavailable
                  }
                  alt={movie.name || movie.title}
                />
                <img
                  className="contentLandScape"
                  src={
                    movie.backdrop_path
                      ? `${img_500}/${movie.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={movie.name || movie.title}
                />
                <div className="aboutModal">
                  <span className="modalTitle">
                    {movie.name || movie.title}(
                    {(
                      movie.first_air_date ||
                      movie.release_date ||
                      "------"
                    ).substring(0.4)}
                    )
                  </span>
                  {movie.tagline && <i className="tagline">{movie.tagline}</i>}
                  <span className="descriptionModal">{movie.overview}</span>
                  <div>
                    <Carousel media_type={media_type} id={id} />
                  </div>
                  <Button
                    variant="contained"
                    startIcont={<YouTubeIcon />}
                    color="secondary"
                    target="_blank"
                    href={`${process.env.REACT_APP_YOUTUBE}/watch?v=${trailer}`}
                  >
                    Watch Trailer
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </>
  );
}
