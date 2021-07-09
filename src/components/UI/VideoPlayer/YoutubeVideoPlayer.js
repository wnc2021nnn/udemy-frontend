import { getIdVideoYoutube } from "../../../utils/videoUtil";

export default function YouTubeVideoPlayer(props) {
  const id = getIdVideoYoutube(props.url);
  const url = `https://www.youtube.com/embed/${id}`;
  console.log(url);
  return (
    <iframe
      width={props.width}
      height={props.height}
      src={url}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{
        marginTop: "1rem",
        borderRadius: "10px",
      }}
    ></iframe>
  );
}
