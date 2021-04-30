import React from "react";

import Plus from "../../assets/img/plus.png";
import Emoji from "../../assets/img/emot.png";
import Select from "../../assets/img/select.png";

export default function Feature(props) {
  return (
    <div className="d-flex justify-content-between img-container">
      <div>
        <img
          src={Plus}
          width={23}
          alt="Plus"
          className="plus"
          onClick={props.attach}
        />
      </div>
      <div>
        <img
          src={Emoji}
          width={23}
          alt="Emoji"
          className="emoji"
          onClick={props.soon}
        />
      </div>
      <div>
        <img
          src={Select}
          width={19}
          alt="Select"
          className="select"
          onClick={props.soon}
        />
      </div>
    </div>
  );
}
