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
  console.log("List category: ", listCategory, classes.buttonDropdowmn);

  const listCategoryJSX = listCategory.map((category) => {
    const listTopic = category.topics.map((topic) => {
      return <Dropdown.Item>{topic.title}</Dropdown.Item>
    });
    return (
      <Dropdown.Item onClick={() => {}}>
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
