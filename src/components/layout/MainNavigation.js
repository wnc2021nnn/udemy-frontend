import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import favoriteIcon from "../../assets/icons/favorite.svg";
import notificationIcon from "../../assets/icons/notification.svg";
import logoIcon from "../../assets/icons/Logo.svg";
import CategoryDropdown from "../Category/CategoryDropDown";
import SignButton from "../UI/Button/SignButton";
import { useSelector } from "react-redux";
import { getToken } from "../../utils/auth/verify";
import Status from "../../constants/status-constants";
import SearchBar from "../Search/SearchBar";
import { Util } from "../../constants/util-constants";

const MainNavigation = () => {
  const loginInform = useSelector((state) => state.user.userInform);
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    setIsLogin(getToken() || loginInform.user.email_verified);
  }, [loginInform]);

  const clickTopicHandler = (topic_id) => {
    history.push(`/category/${topic_id}`);
  };

  return (
    <React.Fragment>
      <nav className={classes.nav}>
        <NavLink to="/" activeClassName={classes.active}>
          <img src={logoIcon} />
        </NavLink>
        <CategoryDropdown
          clickTopicHandler={clickTopicHandler}
          title={"Category"}
        />
        <SearchBar className={classes.search_bar} />
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

export default MainNavigation;
