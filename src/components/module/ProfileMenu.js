import React from "react";

import Mother from "../../assets/img/mother.png";

export default function ProfileMenu(props) {
  return (
    <div className="d-flex align-items-center">
      <img
        src={Mother}
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
        <span className="name">Mother ❤</span>
        <span className="status mt-1">Online</span>
      </div>
    </div>
  );
}
