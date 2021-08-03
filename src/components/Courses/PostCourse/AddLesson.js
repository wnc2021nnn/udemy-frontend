import { TextField, Button } from "@material-ui/core";
import ModalMaterial from "../../UI/ModalMaterial/ModalMaterial";

export default function AddLesson(props) {
  const { title, video_link } = props.lessonInfor;
  return (
    <ModalMaterial
      isOpen={props.isOpenAddNewLesson}
      title={props.title}
      handleOpen={props.setIsOpenAddNewLesson}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <TextField
          id="standard-basic"
          label="Name"
          name="title"
          onChange={props.handleChangeLesson}
          value={title}
        />
        <TextField
          id="standard-basic"
          label="Video"
          name="video_link"
          onChange={props.handleChangeLesson}
          value={video_link}
        />
      </div>
      <div style={{ marginTop: "2rem" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={props.submitAddNewLesson}
        >
          Submit
        </Button>
      </div>
    </ModalMaterial>
  );
}
