import React from "react";
import propTypes from "prop-types";

export default function Col(props) {
  const className = ["col"];
  className.push(props.className);
  if (props.className) {
    if (props.className.includes("col")) {
      className.shift();
    }
  }
  return <div className={className.join(" ")}>{props.children}</div>;
}

Col.propTypes = {
  className: propTypes.string,
};
