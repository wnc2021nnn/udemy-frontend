import ModalMaterial from "../UI/ModalMaterial/ModalMaterial";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { register, verifyEmailOTP, resendEmailOTP } from "../../api/user-api";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

export default function VerifyEmail(props) {
  const history = useHistory();
  const token = props.token;
  const isLogin = props.setError;
  const [verify, setVerify] = useState({
    id: "",
    code: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    setVerify(props.verify);
  }, [props.verify]);
  const handleChangeOTP = (event) => {
    setError("");
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setVerify((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  console.log(verify);

  const handleVerifyEmail = () => {
    if (verify.code.trim().length != 0) {
      verifyEmailOTP(token, verify)
        .then((res) => {
          props.setIsOpen(false);
          if (!isLogin) history.push("/login");
          else isLogin("");
        })
        .catch((err) => setError("Wrong OTP"));
    }
  };

  const handleResendOTP = () => {
    resendEmailOTP(token).then((res) => {
      setVerify((prevState) => {
        return { ...prevState, id: res.data.data.id };
      });
    });
  };
  return (
    <ModalMaterial
      isOpen={props.isOpen}
      handleOpen={props.setIsOpen}
      title={"Verify email"}
    >
      <TextField
        id="standard-basic"
        label="OTP"
        onChange={handleChangeOTP}
        name="code"
      />
      <h4>Please check spam</h4>
      <h4 style={{ color: "red" }}>{error}</h4>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "2rem",
        }}
      >
        <Button variant="contained" color="primary" onClick={handleVerifyEmail}>
          Verify
        </Button>
        <Button variant="contained" onClick={handleResendOTP}>
          Resend
        </Button>
      </div>
    </ModalMaterial>
  );
}
