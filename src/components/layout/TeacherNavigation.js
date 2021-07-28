import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import favoriteIcon from "../../assets/icons/favorite.svg";
import notificationIcon from "../../assets/icons/notification.svg";
import logoIcon from "../../assets/icons/Logo.svg";
import CategoryDropdown from "../Category/CategoryDropDown";
import SignButton from "../UI/Button/SignButton";
import { useSelector } from "react-redux";
import { getToken } from "../../utils/auth/verify";
import Status from "../../constants/status-constants";

const TeacherNavigation = () => {
  const loginInform = useSelector((state) => state.user.userInform);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    setIsLogin(
      loginInform.status.status === Status.SUCCESS_STATUS || getToken()
    );
  }, [loginInform]);
  return (
    <React.Fragment>
      <nav className={classes.nav}>
        <NavLink to="/" activeClassName={classes.active}>
          <img src={logoIcon} />
        </NavLink>
        <NavLink to="/" activeClassName={classes.active}>
          Post course
        </NavLink>
        {isLogin ? (
          <NavLink to="/profile" activeClassName={classes.active}>
            Profile
          </NavLink>
        ) : (
          <SignButton />
        )}
      </nav>
    </React.Fragment>
  );
};

export default TeacherNavigation;
