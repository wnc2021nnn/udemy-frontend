import { useState } from "react";
import classes from "./Register.module.css";
import { verifyEmail, verifyPassword } from "../../utils/auth/verify";
import { useDispatch, useSelector } from "react-redux";
import { register, verifyEmailOTP, resendEmailOTP } from "../../api/user-api";
import { useHistory } from "react-router";
import Loader from "../UI/Loader";

import { Util } from "../../constants/util-constants";
import VerifyEmail from "./VerifyEmail";

export default function Register(props) {
  const [error, setError] = useState({
    message: "",
  });
  const [registerInform, setRegisterInform] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    role: 2,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState("");
  const [verify, setVerify] = useState({
    id: "",
    code: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const registerHandler = (e) => {
    e.preventDefault();
    if (isLoading) return;
    if (!verifyEmail(registerInform.email)) {
      setError({
        message: "Invalid email",
      });
      return;
    }
    if (!verifyPassword(registerInform.password)) {
      setError({
        message: "Password phải không có khoảng trắng và hơn 6 ký tự",
      });
      return;
    }
    if (
      registerInform.first_name.trim().length === 0 ||
      registerInform.last_name.trim().length === 0
    ) {
      setError({
        message: "Vui lòng điền đẩy đủ thông tin",
      });
      return;
    }
    setIsLoading(true);
    register(registerInform)
      .then((res) => {
        setToken(res.data.data.access_token);
        setVerify((prevState) => {
          return { ...prevState, id: res.data.data.otp.id };
        });
        setIsLoading(false);
        setIsOpen(true);
      })
      .catch((error) => {
        console.log("Loi ne", error);
        setIsLoading(false);
        setError({
          message: "Email đã được đăng ký! Vui lòng chọn email khác.",
        });
      });
  };
  console.log(verify);

  const handleEventChange = (event) => {
    setError({
      message: "",
    });
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setRegisterInform((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <div className={classes.wrapper}>
      <h3 className={classes.title}>Register</h3>
      <form onSubmit={registerHandler}>
        <input onChange={handleEventChange} name="email" placeholder="Email" />
        <input
          onChange={handleEventChange}
          name="password"
          placeholder="Password"
          type="password"
        />
        <input
          onChange={handleEventChange}
          name="first_name"
          placeholder="First Name"
        />
        <input
          onChange={handleEventChange}
          name="last_name"
          placeholder="Last Name"
        />
        <div className={classes.errorText}>{error.message}</div>

        <button onClick={registerHandler}>
          <Loader isLoading={isLoading} size={20}>
            Register
          </Loader>
        </button>
      </form>
      <VerifyEmail
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        verify={verify}
        token={token}
      />
    </div>
  );
}
