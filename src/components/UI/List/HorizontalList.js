import React, { Fragment } from "react";
import classes from "./HorizontalList.module.css";
const HorizontalList = (props) => {
  return (
    <Fragment>
      <div className={`${classes.wrapper} ${props.className?props.className:""}`}>
        <div className={classes.title}>{props.title}</div>
        <div className={classes.scrollingwrapper}>
          {props.children}
        </div>
      </div>
    </Fragment>
  );
};

export default HorizontalList;
