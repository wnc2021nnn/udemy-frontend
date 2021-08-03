import { TextField, Button } from "@material-ui/core";
import ModalMaterial from "../../UI/ModalMaterial/ModalMaterial";

export default function AddChapter(props) {
  return (
    <ModalMaterial
      isOpen={props.isOpenAddNewChapter}
      title={props.title}
      handleOpen={props.setIsOpenAddNewChapter}
    >
      <TextField
        id="standard-basic"
        label="Name"
        onChange={props.handleChangeChapter}
        value={props.value}
      />
      <div style={{ marginTop: "2rem" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={props.submitAddNewChapter}
        >
          Submit
        </Button>
      </div>
    </ModalMaterial>
  );
}
