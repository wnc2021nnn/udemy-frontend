import React, { useEffect, useState } from "react";
import Dropdown from "react-multilevel-dropdown";
import "react-dropdown/style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesList } from "../../store/slices/categoriesSlice";
import classes from "./CategoryDropDown.module.css";

const CategoryDropdown = () => {
  const dispatch = useDispatch();
  const listCategory = useSelector(
    (state) => state.categories.listCategory.entities
  );

  const listCategoryJSX = listCategory.map((category) => {
    const listTopic = category.topics.map((topic) => {
      return <Dropdown.Item key={topic.topic_id}>{topic.title}</Dropdown.Item>
    });
    return (
      <Dropdown.Item onClick={() => {}} key={category.category_id}>
        {category.title}
        <Dropdown.Submenu position="right" className={classes.submenu}>
          {listTopic}
        </Dropdown.Submenu>
      </Dropdown.Item>
    );
  });
  useEffect(() => {
    dispatch(fetchCategoriesList());
  }, []);

  return (
    <Dropdown title="Category" buttonClassName={classes.buttonDropdowmn}>
      {listCategoryJSX}
    </Dropdown>
  );
};
export default CategoryDropdown;
