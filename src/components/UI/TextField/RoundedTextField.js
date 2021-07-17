import { TextField } from "@material-ui/core";

export function RoundedTextField(props) {
  return (
    <TextField margin="normal" value={props.value} variant="outlined" placeholder={props.placeHolder}/>
  );
}
