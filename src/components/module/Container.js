import React from "react";
import propTypes from "prop-types";

export default function Container(props) {
  const className = ["container"];
  className.push(props.className);
  return <div className={className.join(" ")}>{props.children}</div>;
}

Container.propTypes = {
  className: propTypes.string,
};
