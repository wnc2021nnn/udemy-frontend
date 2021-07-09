export const showTime = (time) => {
  const dateReview = new Date(+time);
  return dateReview.toUTCString();
};
