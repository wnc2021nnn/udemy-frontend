import classes from "./CourseContent.module.css";
import arrowIcon from "../../assets/icons/arrowIcon.svg";
import { useState } from "react";
import { getIdVideoYoutube } from "../../utils/videoUtil";
import YouTubeVideoPlayer from "../UI/VideoPlayer/YoutubeVideoPlayer";

export default function CourseContent(props) {
  const { lessons, chapters } = props.courseContent;
  let index = 1;
  const content = chapters.map((chapter) => {
    const listLesson = lessons.filter(
      (lesson) => lesson.chapter_id === chapter.chapter_id
    );
    return {
      chapter: {
        chapter_id: chapter.chapter_id,
        title: chapter.title,
        lessons: listLesson,
      },
    };
  });
  const [active, setActive] = useState({});

  const hiddenLessonHandler = (chapter_id) => {
    setActive((prevState) => {
      const activeChapter = !prevState[chapter_id];
      return { ...prevState, [chapter_id]: activeChapter };
    });
  };

  console.log(active);

  const courseContentJSX = content.map((contentItem) => {
    const chapter = contentItem.chapter;
    console.log(chapter.chapter_id, active[chapter.chapter_id]);
    return (
      <div className={classes.chapter} key={chapter.chapter_id}>
        <div
          className={classes.chapterTitle}
          onClick={() => hiddenLessonHandler(chapter.chapter_id)}
        >
          <h4>{chapter.title}</h4>
          <img
            src={arrowIcon}
            alt="arrow icon"
            style={
              active[chapter.chapter_id] ? { transform: "scaleY(-1)" } : {}
            }
          />
        </div>
        <div
          className={
            !active[chapter.chapter_id]
              ? `${classes.lessonWrapper} ${classes.lessonHidden}`
              : `${classes.lessonWrapper}`
          }
        >
          {chapter.lessons.map((lesson) => {
            return (
              <div className={classes.lesson} key={lesson.lesson_id}>
                {index++}. {lesson.title}
                {index % 5 === 0 && (
                  <YouTubeVideoPlayer url={lesson.video_link} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  });

  return <div className={classes.wrapper}>{courseContentJSX}</div>;
}
