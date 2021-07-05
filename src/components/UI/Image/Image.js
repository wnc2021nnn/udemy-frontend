import classes from "./Image.module.css";
import thumbnailImage from "../../../assets/images/thumbnail.jpg";
import { useState } from "react";

export default function Image(props) {
  const [image, setImage] = useState(props.src);

  const loadImageFailedHanler = () => {
    setImage(thumbnailImage);
  };

  return (
    <img
      onError={loadImageFailedHanler}
      onClick={props.onClick}
      className={`${classes.wrapper} ${props.className ? props.className : ""}`}
      src={image}
      alt={props.src}
    />
  );
}
