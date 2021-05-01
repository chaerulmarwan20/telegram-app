import React from "react";

import Col from "./Col";
import Button from "./Button";

import ChatBlue from "../../assets/img/chat-blue.png";
import ContactInfo1 from "../../assets/img/contact1.png";
import ContactInfo2 from "../../assets/img/contact2.png";
import ContactInfo3 from "../../assets/img/contact3.png";
import ContactInfo4 from "../../assets/img/contact4.png";
import ContactInfo5 from "../../assets/img/contact5.png";
import ContactInfo6 from "../../assets/img/contact6.png";
import ContactInfo7 from "../../assets/img/contact7.png";
import ContactInfo8 from "../../assets/img/contact8.png";
import ContactInfo9 from "../../assets/img/contact9.png";
import ContactInfo10 from "../../assets/img/contact10.png";
import ContactInfo11 from "../../assets/img/contact11.png";
import ContactInfo12 from "../../assets/img/contact12.png";
import Back from "../../assets/img/back-profile.png";

export default function ContactInfo(props) {
  return (
    <Col
      className={`${
        props.showInfo ? "d-none d-lg-flex" : "d-none"
      } col-12 col-lg-3 col-xl-3 pl-4 pr-3 py-4 contact-info flex-column`}
    >
      <div className="user-info d-flex justify-content-center align-items-center">
        <div>
          <img
            src={Back}
            width={10}
            alt="Back"
            className="back"
            onClick={props.back}
          />
        </div>
        <h1 className="text-center ml-4">{props.username}</h1>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <img src={props.image} width={82} alt="Mother" className="img-user" />
      </div>
      <div className="detail-info d-flex justify-content-between mt-4">
        <div className="d-flex flex-column">
          <h2>{props.name}</h2>
          <p>Online</p>
        </div>
        <div>
          <img src={ChatBlue} width={22} alt="Chat" />
        </div>
      </div>
      <div className="phone-info d-flex flex-column mt-4 pb-2">
        <h2>Phone number</h2>
        <p className="mt-1">{props.phone}</p>
      </div>
      <div className="menu-info d-flex justify-content-center align-items-center flex-wrap mt-4">
        <Button
          type="button"
          className={`btn btn-menu-info ${
            props.info === "Location" && "active"
          }`}
          onClick={() => props.changeInfo("Location")}
        >
          Location
        </Button>
        <Button
          type="button"
          className={`btn-menu-info ${props.info === "Image" && "active"}`}
          onClick={() => props.changeInfo("Image")}
        >
          Image
        </Button>
        <Button
          type="button"
          className={`btn-menu-info ${props.info === "Documents" && "active"}`}
          onClick={() => props.changeInfo("Documents")}
        >
          Documents
        </Button>
      </div>
      <div className="img-info-container d-flex justify-content-center flex-wrap mt-4">
        <img src={ContactInfo1} width={85} className="mr-2" alt="Contact1" />
        <img src={ContactInfo2} width={85} className="mr-2" alt="Contact2" />
        <img src={ContactInfo3} width={85} className="mr-2" alt="Contact3" />
        <img src={ContactInfo4} width={85} className="mr-2" alt="Contact4" />
        <img src={ContactInfo5} width={85} className="mr-2" alt="Contact5" />
        <img src={ContactInfo6} width={85} className="mr-2" alt="Contact6" />
        <img src={ContactInfo7} width={85} className="mr-2" alt="Contact7" />
        <img src={ContactInfo8} width={85} className="mr-2" alt="Contact8" />
        <img src={ContactInfo9} width={85} className="mr-2" alt="Contact9" />
        <img src={ContactInfo10} width={85} className="mr-2" alt="Contact10" />
        <img src={ContactInfo11} width={85} className="mr-2" alt="Contact11" />
        <img src={ContactInfo12} width={85} className="mr-2" alt="Contact12" />
        <img src={ContactInfo4} width={85} className="mr-2" alt="Contact4" />
        <img src={ContactInfo5} width={85} className="mr-2" alt="Contact5" />
        <img src={ContactInfo6} width={85} className="mr-2" alt="Contact6" />
      </div>
    </Col>
  );
}
