import { Box, Grid, TextField, Button } from "@material-ui/core";
import { RoundedTextField } from "../UI/TextField/RoundedTextField";

export function ProfileContainer(props) {
  return (
    <Box padding="16px" borderLeft={0.5} borderColor="grey.500">
      <Grid container direction="column">
        <Box mb="32px">
          <text style={{ fontSize: "24px" }}>My Profile</text>
        </Box>
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
        <RoundedTextField placeHolder = "current password" />
        <RoundedTextField placeHolder = "new password"/>
        <RoundedTextField placeHolder = "retype password"/>
        <Box my="32px">
          <Button variant="contained" color="primary">
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
