import { Box, Grid, TextField, Button } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserById, changePassword } from "../../api/user-api";
import Status from "../../constants/status-constants";
import { Util } from "../../constants/util-constants";
import { setStatus } from "../../store/slices/statusSlice";
import { fetchUserInfor } from "../../store/slices/userSlice";
import { RoundedTextField } from "../UI/TextField/RoundedTextField";
import { HeaderContainer } from "./Profile Components/HeaderContainer";

export function ProfileContainer(props) {
  const dispatch = useDispatch();
  const userInfor = props.userInfor;

  const [changePasswordInfor, setChangePassword] = useState({});
  const [changeNameInfor, setChangeName] = useState({
    first_name: userInfor.first_name,
    last_name: userInfor.last_name,
  });

  useEffect(() => {
    setChangeName({
      first_name: userInfor.first_name,
      last_name: userInfor.last_name,
    });
  }, [userInfor]);

  const changePasswordAPI = () => {
    changePassword(changePasswordInfor)
      .then((res) => {
        if (res.status === 201) {
          dispatch(
            setStatus({
              message: "Update password successfully!",
              status: Status.SUCCESS_STATUS,
            })
          );
        } else
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

  const changeName = () => {
    changePassword(changeNameInfor)
      .then((res) => {
        if (res.status === 201) {
          dispatch(
            setStatus({
              message: "Update name successfully!",
              status: Status.SUCCESS_STATUS,
            })
          );
          dispatch(fetchUserInfor(userInfor.user_id));
        } else
          dispatch(
            setStatus({
              message: "Update name failed!",
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

  const handleChangeInputName = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setChangeName((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return (
    <Box padding="16px" borderLeft={0.5} borderColor="grey.500">
      <Grid container direction="column">
        <HeaderContainer text="My Profile" />
        <ProfileField
          name="first_name"
          onChange={handleChangeInputName}
          label="First Name"
          value={changeNameInfor.first_name}
        />

        <ProfileField
          name="last_name"
          onChange={handleChangeInputName}
          label="Last Name"
          value={changeNameInfor.last_name}
        />
        <ProfileField label="Email" value={userInfor.email} />
        <Box my="32px">
          <Button variant="contained" color="primary" onClick={changeName}>
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
  const handlerChange = (event) => {
    if (props.onChange) {
      props.onChange(event);
    }
  };
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
      <TextField
        onChange={handlerChange}
        name={props.name}
        id="outlined-basic"
        value={props.value}
        variant="outlined"
      />
    </Grid>
  );
}
