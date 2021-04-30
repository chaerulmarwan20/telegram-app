import React from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";

import Settings from "../../assets/img/settings.png";
import ContactSingle from "../../assets/img/contact-single.png";
import Call from "../../assets/img/call.png";
import Label from "../../assets/img/label.png";
import Friends from "../../assets/img/friends.png";
import Faq from "../../assets/img/faq.png";

export default function DetailMenu(props) {
  return (
    <div className="detail-menu p-4">
      <div className="d-flex align-items-center">
        <Link to="#" onClick={props.showProfile}>
          <img src={Settings} width={22} alt="Settings" className="mr-4" />
          Settings
        </Link>
      </div>
      <div className="d-flex align-items-center mt-4">
        <Link to="#">
          <img src={ContactSingle} width={22} alt="Contacts" className="mr-4" />
          Contacts
        </Link>
      </div>
      <div className="d-flex align-items-center mt-4">
        <Link to="#">
          <img src={Call} width={22} alt="Calls" className="mr-4" />
          Calls
        </Link>
      </div>
      <div className="d-flex align-items-center mt-4">
        <Link to="#">
          <img src={Label} width={22} alt="Save Messages" className="mr-4" />
          Save Messages
        </Link>
      </div>
      <div className="d-flex align-items-center mt-4">
        <Link to="#">
          <img src={Friends} width={22} alt="Invite Friends" className="mr-4" />
          Invite Friends
        </Link>
      </div>
      <div className="d-flex align-items-center mt-4">
        <Link to="#">
          <img src={Faq} width={22} alt="Telegram FAQ" className="mr-4" />
          Telegram FAQ
        </Link>
      </div>
    </div>
  );
}

DetailMenu.propTypes = {
  showProfile: propTypes.func,
};
