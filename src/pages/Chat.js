import React, { useState } from "react";
import { Link } from "react-router-dom";

import Col from "../components/module/Col";

import Menu from "../assets/img/menu.png";
import Plus from "../assets/img/plus.png";
import Union from "../assets/img/union.png";
import Online from "../assets/img/dot.png";
import Theresa from "../assets/img/theresa.png";
import Flores from "../assets/img/flores.png";
import Bell from "../assets/img/bell.png";
import Henry from "../assets/img/henry.png";
import Mother from "../assets/img/mother.png";
import Brother from "../assets/img/brother.png";
import CheckBlue from "../assets/img/check-blue.png";
import CheckGrey from "../assets/img/check-grey.png";
import Contact from "../assets/img/contact.png";
import Secret from "../assets/img/secret.png";
import Channel from "../assets/img/channel.png";
import Settings from "../assets/img/settings.png";
import ContactSingle from "../assets/img/contact-single.png";
import Call from "../assets/img/call.png";
import Label from "../assets/img/label.png";
import Friends from "../assets/img/friends.png";
import Faq from "../assets/img/faq.png";
import ProfileMenu from "../assets/img/profile-menu.png";
import Emoji from "../assets/img/emot.png";
import Select from "../assets/img/select.png";

export default function Chat() {
  const [showChannel, setShowChannel] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [category, setCategory] = useState("Important");

  const handleClickMenu = () => {
    setShowChannel(false);
    setShowDetail(!showDetail);
  };

  const handleClickPlus = () => {
    setShowChannel(!showChannel);
  };

  const handleClickCategory = (params) => {
    setCategory(params);
  };

  const handleClickChat = () => {
    setShowChat(!showChat);
  };

  return (
    <section className="chat">
      <Col className="col-3 pl-4 pr-3 py-4 left">
        <div className="header d-flex justify-content-between align-items-center">
          {!showChannel && <h1>Telegram</h1>}
          {showChannel && (
            <div className="create-channel d-flex justify-content-between align-items-center px-4">
              <div>
                <img src={Contact} width={31} alt="Contact" />
              </div>
              <div>
                <img src={Secret} width={14} alt="Secret" />
              </div>
              <div>
                <img src={Channel} width={20} alt="Channel" />
              </div>
            </div>
          )}
          <button
            type="button"
            className="btn"
            onClick={() => handleClickMenu()}
          >
            <img src={Menu} width={22} alt="Menu" />
          </button>
          {showDetail && (
            <div className="detail-menu p-4">
              <div className="d-flex align-items-center">
                <img src={Settings} width={22} alt="Settings" />
                <Link to="#" className="ml-4">
                  Settings
                </Link>
              </div>
              <div className="d-flex align-items-center mt-4">
                <img src={ContactSingle} width={22} alt="Contacts" />
                <Link to="#" className="ml-4">
                  Contacts
                </Link>
              </div>
              <div className="d-flex align-items-center mt-4">
                <img src={Call} width={22} alt="Calls" />
                <Link to="#" className="ml-4">
                  Calls
                </Link>
              </div>
              <div className="d-flex align-items-center mt-4">
                <img src={Label} width={22} alt="Save Messages" />
                <Link to="#" className="ml-4">
                  Save Messages
                </Link>
              </div>
              <div className="d-flex align-items-center mt-4">
                <img src={Friends} width={22} alt="Invite Friends" />
                <Link to="#" className="ml-4">
                  Invite Friends
                </Link>
              </div>
              <div className="d-flex align-items-center mt-4">
                <img src={Faq} width={22} alt="Telegram FAQ" />
                <Link to="#" className="ml-4">
                  Telegram FAQ
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="search mt-4 d-flex justify-content-between align-items-center">
          <input
            type="text"
            name="search"
            placeholder="Type your message..."
            className="form-control"
          />
          <button
            type="button"
            className="btn"
            onClick={() => handleClickPlus()}
          >
            <img src={Plus} width={23} alt="Plus" />
          </button>
        </div>
        <div className="menu d-flex justify-content-between align-items-center mt-4">
          <button
            type="button"
            className={`btn btn-menu ${category === "All" && "active"}`}
            onClick={() => handleClickCategory("All")}
          >
            All
          </button>
          <button
            type="button"
            className={`btn btn-menu ${category === "Important" && "active"}`}
            onClick={() => handleClickCategory("Important")}
          >
            Important
          </button>
          <button
            type="button"
            className={`btn btn-menu ${category === "Unread" && "active"}`}
            onClick={() => handleClickCategory("Unread")}
          >
            Unread
          </button>
        </div>
        <div
          className="user d-flex justify-content-between align-items-center mt-4"
          onClick={() => handleClickChat()}
        >
          <div className="profile d-flex align-items-center">
            <div className="image">
              <img src={Theresa} width={64} alt="Theresa" />
            </div>
            <div className="info d-flex flex-column ml-3">
              <span className="name">
                Theresa Webb
                <img src={Union} width={16} alt="Union" className="ml-2" />
              </span>
              <span className="message active mt-2">Why did you do that?</span>
            </div>
          </div>
          <div className="time d-flex flex-column">
            <span>15:20</span>
            <div className="notif mt-2">2</div>
          </div>
        </div>
        <div
          className="user d-flex justify-content-between align-items-center mt-4"
          onClick={() => handleClickChat()}
        >
          <div className="profile d-flex align-items-center">
            <div className="image">
              <img src={Flores} width={64} alt="Flores" />
              <img src={Online} width={20} alt="Online" className="online" />
            </div>
            <div className="info d-flex flex-column ml-3">
              <span className="name">Calvin Flores</span>
              <span className="message active mt-2">
                Hi, bro! Come to my house!
              </span>
            </div>
          </div>
          <div className="time d-flex flex-column">
            <span>15:13</span>
            <div className="notif mt-2">1</div>
          </div>
        </div>
        <div
          className="user d-flex justify-content-between align-items-center mt-4"
          onClick={() => handleClickChat()}
        >
          <div className="profile d-flex align-items-center">
            <div className="image">
              <img src={Bell} width={64} alt="Bell" />
            </div>
            <div className="info d-flex flex-column ml-3">
              <span className="name">Gregory Bell</span>
              <span className="message active mt-2">
                Will you stop ignoring me?
              </span>
            </div>
          </div>
          <div className="time d-flex flex-column">
            <span>15:13</span>
            <div className="notif mt-2">164</div>
          </div>
        </div>
        <div
          className="user d-flex justify-content-between align-items-center mt-4"
          onClick={() => handleClickChat()}
        >
          <div className="profile d-flex align-items-center">
            <div className="image">
              <img src={Henry} width={64} alt="henry" />
            </div>
            <div className="info d-flex flex-column ml-3">
              <span className="name">
                Soham Henry
                <img src={Union} width={16} alt="Union" className="ml-2" />
              </span>
              <span className="message mt-2">Me: Bro, just fuck off</span>
            </div>
          </div>
          <div className="time d-flex flex-column">
            <span>8:30</span>
            <div className="check">
              <img
                src={CheckBlue}
                width={20}
                alt="CheckBlue"
                className="mt-2"
              />
            </div>
          </div>
        </div>
        <div
          className="user d-flex justify-content-between align-items-center mt-4"
          onClick={() => handleClickChat()}
        >
          <div className="profile d-flex align-items-center">
            <div className="image">
              <img src={Mother} width={64} alt="Mother" />
              <img src={Online} width={20} alt="Online" className="online" />
            </div>
            <div className="info d-flex flex-column ml-3">
              <span className="name">Mother ❤</span>
              <span className="message mt-2">Me: Yes, of course come, ...</span>
            </div>
          </div>
          <div className="time d-flex flex-column">
            <span>7:20</span>
            <div className="check">
              <img
                src={CheckGrey}
                width={20}
                alt="CheckGrey"
                className="mt-2"
              />
            </div>
          </div>
        </div>
        <div
          className="user d-flex justify-content-between align-items-center mt-4"
          onClick={() => handleClickChat()}
        >
          <div className="profile d-flex align-items-center">
            <div className="image">
              <img src={Brother} width={64} alt="Brother" />
            </div>
            <div className="info d-flex flex-column ml-3">
              <span className="name">Brother</span>
              <span className="message mt-2">Ok. Good bay!</span>
            </div>
          </div>
          <div className="time d-flex flex-column">
            <span>Yesterday</span>
          </div>
        </div>
      </Col>
      <Col
        className={`col-9 d-flex flex-column px-0 py-0 right ${
          !showChat
            ? "justify-content-center align-items-center"
            : "justify-content-between"
        }`}
      >
        {!showChat && <h2>Please select a chat to start messaging</h2>}
        {showChat && (
          <>
            <div className="profile-menu d-flex justify-content-between align-items-center w-100 px-5">
              <div className="d-flex align-items-center">
                <img src={Mother} width={64} alt="Mother" />
                <div className="d-flex flex-column ml-3">
                  <span className="name">Mother ❤</span>
                  <span className="status mt-1">Online</span>
                </div>
              </div>
              <button type="button" className="btn">
                <img src={ProfileMenu} width={20} alt="Profile Menu" />
              </button>
            </div>
            <div className="message w-100 px-5 d-flex justify-content-center align-items-center">
              <div className="input w-100">
                <input
                  type="text"
                  name="message"
                  className="form-control"
                  placeholder="Type your message..."
                />
                <div className="d-flex justify-content-between img-container">
                  <div>
                    <img src={Plus} width={23} alt="Plus" className="plus" />
                  </div>
                  <div>
                    <img src={Emoji} width={23} alt="Emoji" className="emoji" />
                  </div>
                  <div>
                    <img
                      src={Select}
                      width={19}
                      alt="Select"
                      className="select"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Col>
    </section>
  );
}
