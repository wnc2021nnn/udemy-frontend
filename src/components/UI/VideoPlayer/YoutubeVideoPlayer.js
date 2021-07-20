import { getIdVideoYoutube } from "../../../utils/videoUtil";
import YouTube from "react-youtube";
import "../../../../node_modules/video-react/dist/video-react.css"; // import css
import classes from "./YoutubeVideoPlayer.module.css";
//import ReactPlayer from "react-player";
import ReactPlayer from "react-player/youtube";

import { useEffect, useRef } from "react";

const TIME_INTERVAL = 10000;
export default function YouTubeVideoPlayer(props) {
  const refVideo = useRef(null);
  const lesson = props.lesson;
  let timer;
  const sendStatusTimer = () => {
    if (props.sendStatus) {
      clearInterval(timer);
      timer = setInterval(() => {
        const time = refVideo.current.getCurrentTime();
        props.sendStatus(parseInt(time, 10));
      }, TIME_INTERVAL);
    }
  };

  const stopSendStatus = () => {
    if (props.sendStatus) {
      clearInterval(timer);
      const time = refVideo.current.getCurrentTime();
      props.sendStatus(parseInt(time, 10));
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, []);

  const id = getIdVideoYoutube(lesson.video_link);
  const url = `https://www.youtube.com/embed/${id}`;
  return (
    <ReactPlayer
      ref={refVideo}
      controls
      url={url}
      className={classes.wrappter}
      onPlay={sendStatusTimer}
      onPause={stopSendStatus}
      config={{
        youtube: {
          playerVars: {
            start: lesson.current_video_secconds
              ? lesson.current_video_secconds
              : 0,
          },
        },
      }}
    />
  );
}
