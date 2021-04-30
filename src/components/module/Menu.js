import React from "react";

import Button from "./Button";

export default function Menu(props) {
  return (
    <div className="menu d-flex justify-content-between align-items-center mt-4">
      <Button
        type="button"
        className={`btn-menu ${props.category === "All" && "active"}`}
        onClick={() => props.changeCategory("All")}
      >
        All
      </Button>
      <Button
        type="button"
        className={`btn-menu ${props.category === "Important" && "active"}`}
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
