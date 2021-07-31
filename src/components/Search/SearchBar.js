import { useState } from "react";
import { useHistory } from "react-router";

export default function SearchBar(props) {
  const history = useHistory();
  const [keyword, setKeyword] = useState();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    history.push(`/search/${keyword}`);
  };

  const onChangeHandler = (event) => {
    const value = event.target.value;
    setKeyword(value);
  };

  return (
    <form className={props.className} onSubmit={onSubmitHandler}>
      <input placeholder="Search..." onChange={onChangeHandler}></input>
    </form>
  );
}
