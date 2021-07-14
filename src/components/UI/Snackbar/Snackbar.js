import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Status from "../../../constants/status-constants";
import { setStatus } from "../../../store/slices/statusSlice";
import classes from "./Snackbar.module.css";

export default function Snackbar(props) {
  const [classStyle, setClassStyle] = useState(
    `${classes.snackbar} ${classes.show}`
  );
  const { status, message } = useSelector((state) => state.status);
  const [style, setStyle] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    setClassStyle(`${classes.snackbar} ${classes.show}`);
    switch (status) {
      case Status.LOADING_STATUS:
        setStyle({ backgroundColor: "yellow" });
        break;
      case Status.SUCCESS_STATUS:
        setStyle({ backgroundColor: "green" });
        break;
      case Status.FAILED_STATUS:
        setStyle({ backgroundColor: "red" });
        break;
      default:
        setClassStyle(`${classes.snackbar}`);
        break;
    }
    const timer = setTimeout(() => {
      setClassStyle(`${classes.snackbar}`);
      dispatch(setStatus({ message: "", status: "" }));
    }, 5000);
    return () => clearTimeout(timer);
  }, [status, message]);

  return (
    <div className={classStyle} style={style}>
      {message}
    </div>
  );
}
