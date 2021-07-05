import { useState } from "react";
import classes from "./Modal.module.css";

export default function Modal(props) {
  const [style, setStyle] = useState({});
  const closeHandler = () => {
    props.onClose();
    setStyle({ display: "none" });
  };

  return (
    <div className={classes.modal} style={style}>
      <div className={classes.modalContent}>
        <span className={classes.close} onClick={closeHandler}>
          &times;
        </span>
        <p>{props.message}</p>
      </div>
    </div>
  );
}
