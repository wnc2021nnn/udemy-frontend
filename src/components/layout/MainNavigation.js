import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import favoriteIcon from "../../assets/icons/favorite.svg";
import notificationIcon from "../../assets/icons/notification.svg";
import logoIcon from "../../assets/icons/Logo.svg"
import CategoryDropdown from "../Category/CategoryDropDown";
import SignButton from "../UI/Button/SignButton";
import { useSelector } from "react-redux";
import { getToken } from "../../utils/auth/verify";
import Status from "../../constants/status-constants";

const MainNavigation = () => {

  const loginInform = useSelector((state) => state.user.userInform);
  const isLogin = loginInform.status.status === Status.SUCCESS_STATUS || getToken();
  return (
    <React.Fragment>
      <nav className={classes.nav}>
        <NavLink to="/" activeClassName={classes.active}>
        {/* <div className={classes.logo}>
          <div className={classes.logo}>Logo</div>
          <div className={classes.logo}>Academy</div>
        </div> */}
        <img src={logoIcon}/>
        </NavLink>
        <CategoryDropdown/>
        <form className={classes.search_bar}>
          <input placeholder="Search..."></input>
        </form>

        <NavLink to="/mylearning" activeClassName={classes.active}>
          My Learning
        </NavLink>
        <NavLink to="/favorite" activeClassName={classes.active}>
          <img src={favoriteIcon} />
        </NavLink>
        <NavLink to="/notification" activeClassName={classes.active}>
          <img src={notificationIcon} />
        </NavLink>
        {isLogin? <NavLink to="/profile" activeClassName={classes.active}>
          Profile
        </NavLink> :<SignButton/>}
      </nav>
    </React.Fragment>
  );
};

export default MainNavigation;
