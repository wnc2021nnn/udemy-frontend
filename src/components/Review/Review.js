import starIcon from "../../assets/icons/star.svg";

export default function Review(props) {
  const review = props.review;
  const dateReview = new Date(+review.created_at);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginTop: "1rem",
        border: "1px black solid",
        borderRadius: "10px",
        padding: "0.5rem 1rem 0.5rem 1rem",
      }}
    >
      <div>{`${review.first_name} ${review.last_name}`}</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", padding: "0.5rem 0" }}>
          <div>{review.rating}</div>
          <img src={starIcon} alt="star icon" />
        </div>
        <div>{dateReview.toUTCString()}</div>
      </div>
      <div>{review.reviews_text}</div>
    </div>
  );
}
