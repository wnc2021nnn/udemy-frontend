import { NavLink } from "react-router-dom";
import classes from "./SignButton.module.css";

export default function SignButton() {
  return (
    <div className={classes.wrapper}>
      <NavLink to="/login">Log in</NavLink> /
      <NavLink to="/register">Sign up</NavLink>
    </div>
  );
}
