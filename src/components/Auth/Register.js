import { useState } from "react";
import classes from "./Register.module.css";
import { verifyEmail, verifyPassword } from "../../utils/auth/verify";
import { useDispatch, useSelector } from "react-redux";
import { register, verifyEmailOTP, resendEmailOTP } from "../../api/user-api";
import { useHistory } from "react-router";
import Loader from "../UI/Loader";
import ModalMaterial from "../UI/ModalMaterial/ModalMaterial";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Util } from "../../constants/util-constants";

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

  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const [verify, setVerify] = useState({
    id: "",
    code: "",
  });

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
        localStorage.setItem(Util.ACCESS_TOKEN, res.data.data.access_token);
        localStorage.setItem(Util.REFRESH_TOKEN, res.data.data.refresh_token);
        localStorage.setItem(Util.USER_ID, res.data.data.user_id);
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
  const handleChangeOTP = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setVerify((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleVerifyEmail = () => {
    if (verify.code.trim().length != 0) {
      verifyEmailOTP(verify).then((res) => history.push("/login"));
    }
  };

  const handleResendOTP = () => {
    resendEmailOTP().then((res) => {
      setVerify((prevState) => {
        return { ...prevState, id: res.data.data.id };
      });
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
      <ModalMaterial
        isOpen={isOpen}
        handleOpen={setIsOpen}
        title={"Verify email"}
      >
        <TextField
          id="standard-basic"
          label="OTP"
          onChange={handleChangeOTP}
          name="code"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2rem",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleVerifyEmail}
          >
            Verify
          </Button>
          <Button variant="contained" onClick={handleResendOTP}>
            Resend
          </Button>
        </div>
      </ModalMaterial>
    </div>
  );
}
