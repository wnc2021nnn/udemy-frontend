import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import favoriteIcon from "../../assets/icons/favorite.svg";
import notificationIcon from "../../assets/icons/notification.svg";
import logoIcon from "../../assets/icons/Logo.svg"

const MainNavigation = () => {
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
        <NavLink to="/categories" activeClassName={classes.active}>
          Categories
        </NavLink>
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
        <NavLink to="/profile" activeClassName={classes.active}>
          Profile
        </NavLink>
      </nav>
    </React.Fragment>
  );
};

export default MainNavigation;
