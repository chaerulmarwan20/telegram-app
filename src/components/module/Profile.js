import React from "react";
import { Link } from "react-router-dom";

import Settings from "./Settings";

import Back from "../../assets/img/back-profile.png";

export default function Profile(props) {
  return (
    <div className="profile user-detail d-flex flex-column">
      <div className="d-flex justify-content-start">
        <img
          src={Back}
          width={10}
          alt="Back"
          className="mt-1 back"
          onClick={props.back}
        />
      </div>
      <div className="image text-center mt-4">
        <h1>{props.username}</h1>
        <img src={props.image} width={82} alt="User" />
        <p className="mt-3">{props.name}</p>
        <p className="username">
          {props.username === "" ? "none" : props.username}
        </p>
      </div>
      <div className="account d-flex flex-column pb-4">
        <p>Account</p>
        <span>{props.phone === "" ? "none" : props.phone}</span>
        <Link
          className="mt-1"
          to="#"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Tap to change your data
        </Link>
      </div>
      <div className="info-account d-flex flex-column pb-3 mt-4">
        <p>{props.username === "" ? "none" : props.username}</p>
        <span>Username</span>
      </div>
      <div className="detail d-flex flex-column mt-4">
        <p>{props.bio === "" ? "none" : props.bio}</p>
        <span>Bio</span>
        <Settings socket={props.socket}></Settings>
      </div>
    </div>
  );
}
