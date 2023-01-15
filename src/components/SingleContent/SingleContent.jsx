import React from "react";
import { img_300, unavailable } from "../../config/config";
import "./style.css";
import { Badge } from "@material-ui/core";
import ContentModal from "../Modal/Modal";

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  return (
    <>
      <ContentModal media_type={media_type} id={id}>
        <Badge
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          badgeContent={vote_average}
          color={vote_average > 6 ? "primary" : "secondary"}
        />
        <b className="title">{title}</b>
        <img
          className="img"
          src={poster ? `${img_300}/${poster}` : unavailable}
          alt={title}
        />
        <span className="sub">
          {media_type === "tv" ? "TV Series" : "Movie"}
        </span>
        <span className="sub">{date}</span>
      </ContentModal>
    </>
  );
};

export default SingleContent;
