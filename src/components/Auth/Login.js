import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import Status from "../../constants/status-constants";
import { Util } from "../../constants/util-constants";
import { userLogin } from "../../store/slices/userSlice";
import { verifyEmail } from "../../utils/auth/verify";
import Loader from "../UI/Loader";
import classes from "./Login.module.css";

export default function Login(props) {
  const history = useHistory();
  const [error, setError] = useState("");
  const location = useLocation();
  const [loginInform, setLoginInform] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const userInform = useSelector((state) => state.user.userInform);
  const [isLoading, setIsLoading] = useState(false);
  const { from } = location.state || { from: { pathname: "/" } };

  const handleChangeInput = (event) => {
    setError("");
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setLoginInform((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const registerClickHandler = (event) => {
    event.preventDefault();
    history.push("/register");
  };

  const loginClickHandler = (event) => {
    event.preventDefault();
    setError("");
    if (
      !verifyEmail(loginInform.email) ||
      loginInform.password.trim().length === 0
    ) {
      setError("Invalid email, password");
      return;
    }
    setIsLoading(true);
    dispatch(userLogin(loginInform));
    setTimeout(() => {
      if (userInform.status.status === Status.LOADING_STATUS) {
        setError("Invalid email, password");
        setIsLoading(false);
      }
    }, 3000);
  };
  useEffect(() => {
    if (userInform.status.status === Status.SUCCESS_STATUS) {
      localStorage.setItem(Util.ACCESS_TOKEN, userInform.user.access_token);
      localStorage.setItem(Util.REFRESH_TOKEN, userInform.user.refresh_token);
      localStorage.setItem(Util.USER_ID, userInform.user.user_id);

      history.push(from.pathname);
    } else if (userInform.status.status === Status.FAILED_STATUS)
      setError("Invalid email, password");
    else
      setTimeout(() => {
        if (userInform.status.status === Status.LOADING_STATUS) {
          setError("Invalid email, password");
          setIsLoading(false);
        }
      }, 2000);
  }, [userInform.status.status]);

  return (
    <div className={classes.wrapper}>
      <h3 className={classes.title}>LOGIN</h3>
      <form>
        <input onChange={handleChangeInput} name="email" placeholder="Email" />
        <input
          type="password"
          onChange={handleChangeInput}
          name="password"
          placeholder="Password"
        />
        <div className={classes.errorText}>{error}</div>
        <button onClick={loginClickHandler}>
          <Loader isLoading={isLoading} size={20}>
            Login
          </Loader>
        </button>
      </form>
      <a onClick={registerClickHandler}>Chưa có tài khoản? Đăng ký ngay!</a>
    </div>
  );
}
