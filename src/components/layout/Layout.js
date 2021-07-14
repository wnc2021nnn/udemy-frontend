import MainNavigation from "./MainNavigation";
import React, { useEffect } from "react";
import classes from "./Layout.module.css";
import { useDispatch } from "react-redux";
import { getToken } from "../../utils/auth/verify";
import { fetchWatchlist } from "../../store/slices/watchlistSlice";
import { fetchMyCourses } from "../../store/slices/coursesSlice";

const Layout = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (getToken()) {
      dispatch(fetchWatchlist());
      dispatch(fetchMyCourses());
    }
  }, []);

  return (
    <React.Fragment>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </React.Fragment>
  );
};

export default Layout;
