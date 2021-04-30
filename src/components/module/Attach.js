import React from "react";
import { Link } from "react-router-dom";

import ContactSingle from "../../assets/img/contact-single.png";
import Image from "../../assets/img/image.png";
import Documents from "../../assets/img/documents.png";
import Location from "../../assets/img/location.png";

export default function Attach() {
  return (
    <div className="attach p-4">
      <div className="d-flex align-items-center">
        <Link to="#">
          <img src={Image} width={22} alt="AttachImage" className="mr-4" />
          Image
        </Link>
      </div>
      <div className="d-flex align-items-center mt-4">
        <Link to="#">
          <img
            src={Documents}
            width={22}
            alt="AttachDocuments"
            className="mr-4"
          />
          Documents
        </Link>
      </div>
      <div className="d-flex align-items-center mt-4">
        <Link to="#">
          <img
            src={ContactSingle}
            width={22}
            alt="AttachContacts"
            className="mr-4"
          />
          Contacts
        </Link>
      </div>
      <div className="d-flex align-items-center mt-4">
        <Link to="#">
          <img
            src={Location}
            width={22}
            alt="AttachLocation"
            className="mr-4"
          />
          Location
        </Link>
      </div>
    </div>
  );
}
