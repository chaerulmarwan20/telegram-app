import React from "react";
import propTypes from "prop-types";

export default function Input(props) {
  const className = ["form-control"];
  className.push(props.className);
  return (
    <input
      type={props.type}
      className={className.join(" ")}
      name={props.name}
      id={props.name}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  );
}

Input.propTypes = {
  type: propTypes.string,
  className: propTypes.string,
  name: propTypes.string,
  placeholder: propTypes.string,
  onChange: propTypes.func,
  isMax: propTypes.bool,
};
