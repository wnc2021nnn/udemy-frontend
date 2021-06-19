import React, { Fragment } from "react";
import classes from "./MainPanel.module.css";
import HorizontalList from "../UI/List/HorizontalList";
import logoIcon from "../../assets/icons/Logo.svg";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";

const MainPanel = (props) => {
  return (
    <Fragment>
      <div className={classes.root}>
      <Slide easing="ease">
        <div className="each-slide">
          <div style={{ backgroundImage: `url(https://picsum.photos/300/200)` }}>
            <span>Slide 1</span>
          </div>
        </div>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(https://picsum.photos/300/200)` }}>
            <span>Slide 2</span>
          </div>
        </div>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(https://picsum.photos/300/200)` }}>
            <span>Slide 3</span>
          </div>
        </div>
      </Slide>
      </div>
    </Fragment>
  );
};

export default MainPanel;
