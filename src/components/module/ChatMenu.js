import React from "react";
import { Link } from "react-router-dom";

import Call from "../../assets/img/call.png";
import UnionWhite from "../../assets/img/union-white.png";
import SearchWhite from "../../assets/img/search-white.png";
import Trash from "../../assets/img/trash.png";

export default function ChatMenu() {
  return (
    <div className="chat-menu d-flex flex-column p-4">
      <Link to="#">
        <img src={Call} width={22} alt="Call" className="mr-4" />
        Call
      </Link>
      <Link to="#" className="mt-4">
        <img src={Trash} width={22} alt="Delete" className="mr-4" />
        Delete chat history
      </Link>
      <Link to="#" className="mt-4">
        <img src={UnionWhite} width={22} alt="Mute" className="mr-4" />
        Mute notification
      </Link>
      <Link to="#" className="mt-4">
        <img src={SearchWhite} width={22} alt="Search" className="mr-4" />
        Search
      </Link>
    </div>
  );
}
