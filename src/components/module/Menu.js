import React from "react";

import Button from "./Button";

export default function Menu(props) {
  return (
    <div className="menu d-flex align-items-center mt-4 flex-wrap justify-content-center">
      <Button
        type="button"
        className={`btn-menu mr-2 ${props.category === "All" && "active"}`}
        onClick={() => props.changeCategory("All")}
      >
        All
      </Button>
      <Button
        type="button"
        className={`btn-menu mr-2 ${
          props.category === "Important" && "active"
        }`}
        onClick={() => props.changeCategory("Important")}
      >
        Important
      </Button>
      <Button
        type="button"
        className={`btn-menu ${props.category === "Unread" && "active"}`}
        onClick={() => props.changeCategory("Unread")}
      >
        Unread
      </Button>
    </div>
  );
}
