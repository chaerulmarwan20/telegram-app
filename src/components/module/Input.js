import React from "react";
import propTypes from "prop-types";

export default function Input(props) {
  const classInput = ["form-control"];
  const classFormGroup = ["form-group"];
  classInput.push(props.classInput);
  classFormGroup.push(props.classFormGroup);
  return props.isFormGroup && classFormGroup.includes("password") === false ? (
    <div className={classFormGroup.join(" ")}>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type={props.type}
        className={classInput.join(" ")}
        name={props.name}
        id={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        autoComplete="off"
      />
    </div>
  ) : props.isFormGroup && classFormGroup.includes("password") === true ? (
    <div className={classFormGroup.join(" ")}>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type={props.type}
        className={classInput.join(" ")}
        name={props.name}
        id={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        autoComplete="off"
      />
      <img
        src={props.img}
        width={24}
        height={24}
        alt={props.alt}
        className={props.classImg}
        onClick={props.onClick}
      />
    </div>
  ) : (
    <input
      type={props.type}
      className={classInput.join(" ")}
      name={props.name}
      id={props.name}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      autoComplete="off"
    />
  );
}

Input.propTypes = {
  type: propTypes.string,
  classInput: propTypes.string,
  classFormGroup: propTypes.string,
  name: propTypes.string,
  placeholder: propTypes.string,
  onChange: propTypes.func,
  isFormGroup: propTypes.bool,
};
