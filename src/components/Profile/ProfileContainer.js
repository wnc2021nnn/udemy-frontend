import { Box, Grid, TextField, Button } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserById, changePassword } from "../../api/user-api";
import Status from "../../constants/status-constants";
import { Util } from "../../constants/util-constants";
import { setStatus } from "../../store/slices/statusSlice";
import { RoundedTextField } from "../UI/TextField/RoundedTextField";
import { HeaderContainer } from "./Profile Components/HeaderContainer";

export function ProfileContainer(props) {
  const [userInfor, setUserInfor] = useState({});
  const dispatch = useDispatch();
  const [changePasswordInfor, setChangePassword] = useState({});
  const confirmPasswordRef = useRef(null);
  const getUserByIdAPI = () => {
    const userId = localStorage.getItem(Util.USER_ID);
    getUserById(userId).then((res) => setUserInfor(res.data.data));
  };

  const changePasswordAPI = () => {
    changePassword(changePasswordInfor)
      .then((res) => {
        if (res.status === 201)
          dispatch(
            setStatus({
              message: "Update password successfully!",
              status: Status.SUCCESS_STATUS,
            })
          );
        else
          dispatch(
            setStatus({
              message: "Update password failed!",
              status: Status.FAILED_STATUS,
            })
          );
      })
      .catch((err) =>
        dispatch(
          setStatus({
            message: err.response,
            status: Status.FAILED_STATUS,
          })
        )
      );
  };

  useEffect(() => {
    getUserByIdAPI();
  }, []);

  const handleChangeInputPassword = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setChangePassword((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSaveChangePassword = () => {
    console.log(confirmPasswordRef);
  };
  return (
    <Box padding="16px" borderLeft={0.5} borderColor="grey.500">
      <Grid container direction="column">
        <HeaderContainer text="My Profile" />
        <ProfileField label="Name" value={"Le Chi Nhin"} />
        <ProfileField label="Email" value={"nhinlechi@gmail.com"} />
        <Box my="32px">
          <Button variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Grid>
      <Grid container direction="column" spacing={1}>
        <Box
          ml="4px"
          mt="32px"
          mb="16px"
          justifyContent="flex-start"
          display="flex"
        >
          <text style={{ fontWeight: "bold" }}>Password</text>
        </Box>
        <RoundedTextField
          name="old_password"
          placeHolder="current password"
          onChange={handleChangeInputPassword}
          type="password"
        />
        <RoundedTextField
          name="password"
          placeHolder="new password"
          onChange={handleChangeInputPassword}
          type="password"
        />
        <Box my="32px">
          <Button
            variant="contained"
            color="primary"
            onClick={changePasswordAPI}
          >
            Change Password
          </Button>
        </Box>
      </Grid>
    </Box>
  );
}

function ProfileField(props) {
  return (
    <Grid container direction="column">
      <Box
        ml="4px"
        mt="32px"
        mb="16px"
        justifyContent="flex-start"
        display="flex"
      >
        <text style={{ fontWeight: "bold" }}>{props.label}</text>
      </Box>
      <TextField id="outlined-basic" value={props.value} variant="outlined" />
    </Grid>
  );
}
