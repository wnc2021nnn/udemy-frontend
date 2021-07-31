import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getAllCourses, searchCourse } from "../../api/api-courses";
import CourseItem from "../Courses/CourseItem";

export default function SearchResult(props) {
  const params = useParams();
  const [listResult, setListResult] = useState({
    total: 0,
    listCourses: [],
  });
  const keyword = params.keyword;
  const [paramsSearch, setParams] = useState({
    search: keyword,
    limit: 8,
    page: 1,
    sort_by: "price",
    sort_dir: "asc",
  });

  const listCourse = listResult.listCourses.map((item) => (
    <CourseItem key={item.course_id} courseItem={item} />
  ));

  const changePaginationHandler = (event, value) => {
    setParams((prevState) => {
      return { ...prevState, page: value };
    });
  };

  useEffect(() => {
    console.log(paramsSearch, params.keyword);
    getAllCourses(paramsSearch).then((res) =>
      setListResult({
        listCourses: res.data.data,
        total: res.data.pagination.total_courses,
      })
    );
  }, [paramsSearch]);

  useEffect(() => {
    setParams((prevState) => {
      return {
        ...prevState,
        search: keyword,
      };
    });
  }, [keyword]);
  const [value, setValue] = useState("female");

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setParams((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return listResult.listCourses.length !== 0 ? (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div
        style={{ position: "fixed", display: "flex", flexDirection: "column" }}
      >
        <FormControl component="fieldset">
          <FormLabel component="legend">Sort by</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="sort_by"
            value={paramsSearch.sort_by}
            onChange={handleChange}
          >
            <FormControlLabel value="price" control={<Radio />} label="Price" />
            <FormControlLabel
              value="rating"
              control={<Radio />}
              label="Rating"
            />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend">Sort</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="sort_dir"
            value={paramsSearch.sort_dir}
            onChange={handleChange}
          >
            <FormControlLabel value="asc" control={<Radio />} label="ASC" />
            <FormControlLabel value="desc" control={<Radio />} label="DESC" />
          </RadioGroup>
        </FormControl>
      </div>
      <div style={{ marginLeft: "2rem" }}>
        {listCourse}
        <Pagination
          count={Math.ceil(listResult.total / 8)}
          style={{
            bottom: "4rem",
            height: "4rem",
            margin: "2rem",
          }}
          onChange={changePaginationHandler}
        />
      </div>
    </div>
  ) : (
    <h1>Not found</h1>
  );
}
