import React from "react";

import Back from "../../assets/img/back.png";

export default function ProfileMenu(props) {
  return (
    <div className="d-flex align-items-center">
      <div className="d-lg-none">
        <img
          src={Back}
          width={10}
          alt="Back"
          className="back mr-5"
          style={{ cursor: "pointer" }}
          onClick={props.back}
        />
      </div>
      <img
        src={props.image}
        width={64}
        alt="Mother"
        className="user-img"
        onClick={props.contactInfo}
      />
      <div
        className="d-flex flex-column ml-3"
        style={{ cursor: "pointer" }}
        onClick={props.contactInfo}
      >
        <span className="name">{props.name}</span>
        <span className="status mt-1">
          {props.status ? "Online" : "Offline"}
        </span>
      </div>
    </div>
  );
}
