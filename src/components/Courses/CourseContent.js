import classes from "./CourseContent.module.css";
import arrowIcon from "../../assets/icons/arrowIcon.svg";
import { useEffect, useState } from "react";
import { getIdVideoYoutube } from "../../utils/videoUtil";
import YouTubeVideoPlayer from "../UI/VideoPlayer/YoutubeVideoPlayer";

export default function CourseContent(props) {
  const { lessons, chapters } = props.courseContent;
  const isPreview = props.isPreview;
  const onLessonClick = props.onLessonClick;
  const lessonActive = props.lessonActive;
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

  const onLessonClickHandler = (lesson) => {
    if (onLessonClick) {
      onLessonClick(lesson);
    }
  };

  useEffect(() => {
    if (!props.isPreview) {
      setActive((prevState) => {
        return { ...prevState, [lessonActive.chapter_id]: true };
      });
    }
  }, [lessonActive]);

  const courseContentJSX = content.map((contentItem) => {
    const chapter = contentItem.chapter;
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
              <div
                className={classes.lesson}
                key={lesson.lesson_id}
                onClick={() => onLessonClickHandler(lesson)}
                style={
                  !isPreview && lessonActive.lesson_id === lesson.lesson_id
                    ? { color: "blue" }
                    : {}
                }
              >
                {index++}. {lesson.title}
                {isPreview && index % 5 === 0 && (
                  <div style={{ borderRadius: "10px" }}>
                    <YouTubeVideoPlayer
                      lesson={lesson}
                      width="560"
                      height="315"
                    />
                  </div>
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
