import { getIdVideoYoutube } from "../../../utils/videoUtil";
import YouTube from "react-youtube";
import "../../../../node_modules/video-react/dist/video-react.css"; // import css
import classes from "./YoutubeVideoPlayer.module.css";
export default function YouTubeVideoPlayer(props) {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const _onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const _onStateChange = (event) => {
    console.log(event.target.getCurrentTime());
  };
  const id = getIdVideoYoutube(props.url);
  const url = `https://www.youtube.com/embed/${id}`;
  console.log(url);
  return (
    <YouTube
      videoId={id}
      opts={opts}
      onReady={_onReady}
      onStateChange={_onStateChange}
      className={classes.wrapper}
    />
  );
}
