import React from "react";

import Contact from "../../assets/img/contact.png";
import Secret from "../../assets/img/secret.png";
import ChannelImg from "../../assets/img/channel.png";

export default function Channel() {
  return (
    <div className="create-channel d-flex justify-content-between align-items-center px-4">
      <div>
        <img src={Contact} width={31} alt="Contact" />
      </div>
      <div>
        <img src={Secret} width={14} alt="Secret" />
      </div>
      <div>
        <img src={ChannelImg} width={20} alt="Channel" />
      </div>
    </div>
  );
}
