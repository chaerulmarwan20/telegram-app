import React from "react";
import propTypes from "prop-types";

export default function Button(props) {
  const className = ["btn"];
  className.push(props.className);
  return props.isModal ? (
    <button
      type={props.type}
      className={className.join(" ")}
      onClick={props.onClick}
      data-dismiss="modal"
      aria-label="Close"
    >
      {props.children}
    </button>
  ) : (
    <button
      type={props.type}
      className={className.join(" ")}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

Button.propTypes = {
  type: propTypes.string,
  className: propTypes.string,
  onClick: propTypes.func,
  isModal: propTypes.bool,
};
