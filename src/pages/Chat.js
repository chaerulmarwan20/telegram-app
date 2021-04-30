import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Swal from "sweetalert2";
import { findUser, update } from "../configs/redux/actions/user";

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
import Gloria from "../assets/img/gloria.png";
import Search from "../assets/img/search.png";
import Back from "../assets/img/back-profile.png";
import UnionBlack from "../assets/img/union-black.png";
import Lock from "../assets/img/lock.png";
import Chart from "../assets/img/data.png";
import ChatSetting from "../assets/img/chat-setting.png";
import Device from "../assets/img/device.png";
import UnionWhite from "../assets/img/union-white.png";
import SearchWhite from "../assets/img/search-white.png";
import Trash from "../assets/img/trash.png";
import Image from "../assets/img/image.png";
import Documents from "../assets/img/documents.png";
import Location from "../assets/img/location.png";
import ChatBlue from "../assets/img/chat-blue.png";
import ContactInfo1 from "../assets/img/contact1.png";
import ContactInfo2 from "../assets/img/contact2.png";
import ContactInfo3 from "../assets/img/contact3.png";
import ContactInfo4 from "../assets/img/contact4.png";
import ContactInfo5 from "../assets/img/contact5.png";
import ContactInfo6 from "../assets/img/contact6.png";
import ContactInfo7 from "../assets/img/contact7.png";
import ContactInfo8 from "../assets/img/contact8.png";
import ContactInfo9 from "../assets/img/contact9.png";
import ContactInfo10 from "../assets/img/contact10.png";
import ContactInfo11 from "../assets/img/contact11.png";
import ContactInfo12 from "../assets/img/contact12.png";

export default function Chat() {
  const UrlImage = process.env.REACT_APP_API_IMG;

  const dispatch = useDispatch();

  const imageRef = useRef(null);

  const { user } = useSelector((state) => state.user);

  const [data, setData] = useState({
    username: "",
    name: "",
    phoneNumber: "",
    bio: "",
  });
  const [dataImage, setDataImage] = useState({
    image: user.image,
  });
  const [imgUrl, setImgUrl] = useState("");
  const [status, setStatus] = useState(false);
  const [showChannel, setShowChannel] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showChatMenu, setShowChatMenu] = useState(false);
  const [showAttach, setShowAttach] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [category, setCategory] = useState("Important");
  const [infoCategory, setInfoCategory] = useState("Image");

  const handleFormChange = (event) => {
    const dataNew = { ...data };
    dataNew[event.target.name] = event.target.value;
    setData(dataNew);
  };

  const handleChangeImage = (event) => {
    const imgFiles = event.target.files[0];
    setImgUrl(URL.createObjectURL(event.target.files[0]));
    setStatus(true);
    setDataImage({
      image: imgFiles,
    });
  };

  const handleClickMenu = () => {
    setShowChannel(false);
    setShowDetail(!showDetail);
  };

  const handleClickContactInfo = () => {
    setShowContactInfo(!showContactInfo);
  };

  const handleClickPlus = () => {
    setShowChannel(!showChannel);
  };

  const handleClickCategory = (params) => {
    setCategory(params);
  };

  const handleClickInfoCategory = (params) => {
    setInfoCategory(params);
  };

  const handleClickChat = () => {
    setShowChat(!showChat);
  };

  const handleClickProfile = () => {
    setShowProfile(!showProfile);
  };

  const handleClickChatMenu = () => {
    setShowChatMenu(!showChatMenu);
  };

  const handleClickBack = () => {
    setShowDetail(false);
    setShowProfile(false);
  };

  const handleClickBackInfo = () => {
    setShowContactInfo(false);
  };

  const handleSaveChanges = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("name", data.name);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("bio", data.bio);
    if (status) {
      formData.append("image", dataImage.image);
    }
    dispatch(update(formData))
      .then((res) => {
        dispatch(findUser());
        Swal.fire({
          title: "Success!",
          text: res,
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#7E98DF",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: err.message,
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "#7E98DF",
        });
      });
  };

  const handleClickAttach = () => {
    setShowAttach(!showAttach);
  };

  const handleClickSoon = () => {
    Swal.fire({
      title: "This feature is coming soon",
      icon: "info",
      confirmButtonText: "Ok",
      confirmButtonColor: "#7E98DF",
    });
  };

  useEffect(() => {
    dispatch(findUser())
      .then((res) => {
        setImgUrl(`${UrlImage}${res.image}`);
        setData({
          username: res.username,
          name: res.name,
          phoneNumber: res.phoneNumber,
          bio: res.bio,
        });
      })
      .catch((err) => {
        if (
          err.message !== "Token is expired" &&
          err.message !== "Token is not active" &&
          err.message !== "Invalid signature"
        ) {
          Swal.fire({
            title: "Error!",
            text: err.message,
            icon: "error",
            confirmButtonText: "Ok",
            confirmButtonColor: "#7E98DF",
          });
        }
      });
  }, [dispatch, UrlImage]);

  return (
    <HelmetProvider>
      <section className="chat">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Telegram App - Chat</title>
        </Helmet>
        <Col className="col-3 pl-4 pr-3 py-4 left">
          {!showProfile && (
            <>
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
                      <Link to="#" onClick={() => handleClickProfile()}>
                        <img
                          src={Settings}
                          width={22}
                          alt="Settings"
                          className="mr-4"
                        />
                        Settings
                      </Link>
                    </div>
                    <div className="d-flex align-items-center mt-4">
                      <Link to="#">
                        <img
                          src={ContactSingle}
                          width={22}
                          alt="Contacts"
                          className="mr-4"
                        />
                        Contacts
                      </Link>
                    </div>
                    <div className="d-flex align-items-center mt-4">
                      <Link to="#">
                        <img
                          src={Call}
                          width={22}
                          alt="Calls"
                          className="mr-4"
                        />
                        Calls
                      </Link>
                    </div>
                    <div className="d-flex align-items-center mt-4">
                      <Link to="#">
                        <img
                          src={Label}
                          width={22}
                          alt="Save Messages"
                          className="mr-4"
                        />
                        Save Messages
                      </Link>
                    </div>
                    <div className="d-flex align-items-center mt-4">
                      <Link to="#">
                        <img
                          src={Friends}
                          width={22}
                          alt="Invite Friends"
                          className="mr-4"
                        />
                        Invite Friends
                      </Link>
                    </div>
                    <div className="d-flex align-items-center mt-4">
                      <Link to="#">
                        <img
                          src={Faq}
                          width={22}
                          alt="Telegram FAQ"
                          className="mr-4"
                        />
                        Telegram FAQ
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <div className="search mt-4 d-flex justify-content-between align-items-center">
                <div className="input-search">
                  <img src={Search} width={22} alt="search" />
                  <input
                    type="text"
                    name="search"
                    placeholder="Type your message..."
                    className="form-control"
                  />
                </div>
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
                  className={`btn btn-menu ${
                    category === "Important" && "active"
                  }`}
                  onClick={() => handleClickCategory("Important")}
                >
                  Important
                </button>
                <button
                  type="button"
                  className={`btn btn-menu ${
                    category === "Unread" && "active"
                  }`}
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
                      <img
                        src={Union}
                        width={16}
                        alt="Union"
                        className="ml-2"
                      />
                    </span>
                    <span className="message active mt-2">
                      Why did you do that?
                    </span>
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
                    <img
                      src={Online}
                      width={20}
                      alt="Online"
                      className="online"
                    />
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
                      <img
                        src={Union}
                        width={16}
                        alt="Union"
                        className="ml-2"
                      />
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
                    <img
                      src={Online}
                      width={20}
                      alt="Online"
                      className="online"
                    />
                  </div>
                  <div className="info d-flex flex-column ml-3">
                    <span className="name">Mother ❤</span>
                    <span className="message mt-2">
                      Me: Yes, of course come, ...
                    </span>
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
            </>
          )}
          {showProfile && (
            <>
              <div className="profile user-detail d-flex flex-column">
                <div className="d-flex justify-content-start">
                  <img
                    src={Back}
                    width={10}
                    alt="Back"
                    className="mt-1 back"
                    onClick={() => handleClickBack()}
                  />
                </div>
                <div className="image text-center mt-4">
                  <h1>{user.username}</h1>
                  <img src={`${UrlImage}${user.image}`} width={82} alt="User" />
                  <p className="mt-3">{user.name}</p>
                  <p className="username">{user.username}</p>
                </div>
                <div className="account d-flex flex-column pb-4">
                  <p>Account</p>
                  <span>{user.phoneNumber}</span>
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
                  <p>{user.username}</p>
                  <span>Username</span>
                </div>
                <div className="detail d-flex flex-column mt-4">
                  <p>{user.bio}</p>
                  <span>Bio</span>
                  <p className="settings mt-3">Settings</p>
                  <Link to="#" className="mt-2">
                    <img
                      src={UnionBlack}
                      width={22}
                      alt="Notification"
                      className="mr-4"
                    />
                    Notification and Sounds
                  </Link>
                  <Link to="#">
                    <img src={Lock} width={22} alt="Privacy" className="mr-4" />
                    Privacy and Security
                  </Link>
                  <Link to="#">
                    <img src={Chart} width={22} alt="Data" className="mr-4" />
                    Data and Stronge
                  </Link>
                  <Link to="#">
                    <img
                      src={ChatSetting}
                      width={22}
                      alt="Chat"
                      className="mr-4"
                    />
                    Chat settings
                  </Link>
                  <Link to="#">
                    <img
                      src={Device}
                      width={22}
                      alt="Device"
                      className="mr-4"
                    />
                    Devices
                  </Link>
                </div>
              </div>
            </>
          )}
        </Col>
        <Col
          className={`${
            !showContactInfo ? "col-9" : "col-6"
          } d-flex flex-column px-0 py-0 right ${
            !showChat
              ? "justify-content-center align-items-center"
              : "justify-content-between"
          }`}
        >
          {!showChat && <h2>Please select a chat to start messaging</h2>}
          {showChat && (
            <>
              <div className="profile-menu d-flex justify-content-between align-items-center w-100 py-4 px-5">
                <div className="d-flex align-items-center">
                  <img
                    src={Mother}
                    width={64}
                    alt="Mother"
                    className="user-img"
                    onClick={() => handleClickContactInfo()}
                  />
                  <div
                    className="d-flex flex-column ml-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleClickContactInfo()}
                  >
                    <span className="name">Mother ❤</span>
                    <span className="status mt-1">Online</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn"
                  onClick={() => handleClickChatMenu()}
                >
                  <img src={ProfileMenu} width={20} alt="Profile Menu" />
                </button>
                {showChatMenu && (
                  <div className="chat-menu d-flex flex-column p-4">
                    <Link to="#">
                      <img src={Call} width={22} alt="Call" className="mr-4" />
                      Call
                    </Link>
                    <Link to="#" className="mt-4">
                      <img
                        src={Trash}
                        width={22}
                        alt="Delete"
                        className="mr-4"
                      />
                      Delete chat history
                    </Link>
                    <Link to="#" className="mt-4">
                      <img
                        src={UnionWhite}
                        width={22}
                        alt="Mute"
                        className="mr-4"
                      />
                      Mute notification
                    </Link>
                    <Link to="#" className="mt-4">
                      <img
                        src={SearchWhite}
                        width={22}
                        alt="Search"
                        className="mr-4"
                      />
                      Search
                    </Link>
                  </div>
                )}
              </div>
              <div className="chating d-flex flex-column h-100 py-4 px-5">
                <div className="body d-flex align-items-end justify-content-start">
                  <div className="mr-3">
                    <img src={Mother} width={54} alt="Mother" />
                  </div>
                  <div className="send py-3 px-4">
                    Hi, Gloria, how are you doing? Today, my father and I went
                    to buy a car, bought a cool car.
                  </div>
                  <p className={`date-send ${showContactInfo && "d-none"}`}>
                    Wed. 20:32
                  </p>
                </div>
                <div className="body d-flex align-items-start justify-content-end mt-5">
                  <div className="reply py-3 px-4">
                    Oh! Cool Send me photo sadsadasdsad sadsadsad sadsad sadsad
                  </div>
                  <div className="ml-3">
                    <img src={Gloria} width={54} alt="Gloria" />
                  </div>
                  <p className={`date-reply ${showContactInfo && "d-none"}`}>
                    Wed. 20:32
                  </p>
                </div>
                <div className="body d-flex align-items-end justify-content-start mt-5">
                  <div className="mr-3">
                    <img src={Mother} width={54} alt="Mother" />
                  </div>
                  <div className="send py-3 px-4">Ok😉</div>
                </div>
                <div className="body d-flex align-items-start justify-content-end mt-5">
                  <div className="reply py-3 px-4">Oh! Cool Send me photo</div>
                  <div className="ml-3">
                    <img src={Gloria} width={54} alt="Gloria" />
                  </div>
                </div>
                <div className="body d-flex align-items-end justify-content-start mt-5">
                  <div className="mr-3">
                    <img src={Mother} width={54} alt="Mother" />
                  </div>
                  <div className="send py-3 px-4">Will we arrive tomorrow?</div>
                </div>
                <div className="body d-flex align-items-start justify-content-end mt-5">
                  <div className="reply py-3 px-4">Oh! Cool Send me photo</div>
                  <div className="ml-3">
                    <img src={Gloria} width={54} alt="Gloria" />
                  </div>
                </div>
                <div className="body d-flex align-items-end justify-content-start mt-5">
                  <div className="mr-3">
                    <img src={Mother} width={54} alt="Mother" />
                  </div>
                  <div className="send py-3 px-4">Thankyou</div>
                </div>
              </div>
              <div className="message w-100 py-4 px-5 d-flex justify-content-center align-items-center">
                {showAttach && (
                  <div className="attach p-4">
                    <div className="d-flex align-items-center">
                      <Link to="#">
                        <img
                          src={Image}
                          width={22}
                          alt="AttachImage"
                          className="mr-4"
                        />
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
                )}
                <div className="input w-100">
                  <input
                    type="text"
                    name="message"
                    className="form-control"
                    placeholder="Type your message..."
                  />
                  <div className="d-flex justify-content-between img-container">
                    <div>
                      <img
                        src={Plus}
                        width={23}
                        alt="Plus"
                        className="plus"
                        onClick={() => handleClickAttach()}
                      />
                    </div>
                    <div>
                      <img
                        src={Emoji}
                        width={23}
                        alt="Emoji"
                        className="emoji"
                        onClick={() => handleClickSoon()}
                      />
                    </div>
                    <div>
                      <img
                        src={Select}
                        width={19}
                        alt="Select"
                        className="select"
                        onClick={() => handleClickSoon()}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Col>
        <Col
          className={`${
            showContactInfo ? "d-flex" : "d-none"
          } col-3 pl-4 pr-3 py-4 contact-info flex-column`}
        >
          <div className="user-info d-flex justify-content-center align-items-center">
            <div>
              <img
                src={Back}
                width={10}
                alt="Back"
                className="back"
                onClick={() => handleClickBackInfo()}
              />
            </div>
            <h1 className="text-center ml-4">@mmldolg</h1>
          </div>
          <div className="d-flex justify-content-center mt-5">
            <img src={Mother} width={82} alt="Mother" className="img-user" />
          </div>
          <div className="detail-info d-flex justify-content-between mt-4">
            <div className="d-flex flex-column">
              <h2>Mother ❤</h2>
              <p>Online</p>
            </div>
            <div>
              <img src={ChatBlue} width={22} alt="Chat" />
            </div>
          </div>
          <div className="phone-info d-flex flex-column mt-4 pb-2">
            <h2>Phone number</h2>
            <p className="mt-1">+375(29)9239003</p>
          </div>
          <div className="menu-info d-flex justify-content-between align-items-center mt-4">
            <button
              type="button"
              className={`btn btn-menu-info ${
                infoCategory === "Location" && "active"
              }`}
              onClick={() => handleClickInfoCategory("Location")}
            >
              Location
            </button>
            <button
              type="button"
              className={`btn btn-menu-info ${
                infoCategory === "Image" && "active"
              }`}
              onClick={() => handleClickInfoCategory("Image")}
            >
              Image
            </button>
            <button
              type="button"
              className={`btn btn-menu-info ${
                infoCategory === "Documents" && "active"
              }`}
              onClick={() => handleClickInfoCategory("Documents")}
            >
              Documents
            </button>
          </div>
          <div className="img-info-container d-flex justify-content-around align-content-between flex-wrap mt-4">
            <img src={ContactInfo1} width={85} alt="Contact1" />
            <img src={ContactInfo2} width={85} alt="Contact2" />
            <img src={ContactInfo3} width={85} alt="Contact3" />
            <img src={ContactInfo4} width={85} alt="Contact4" />
            <img src={ContactInfo5} width={85} alt="Contact5" />
            <img src={ContactInfo6} width={85} alt="Contact6" />
            <img src={ContactInfo7} width={85} alt="Contact7" />
            <img src={ContactInfo8} width={85} alt="Contact8" />
            <img src={ContactInfo9} width={85} alt="Contact9" />
            <img src={ContactInfo10} width={85} alt="Contact10" />
            <img src={ContactInfo11} width={85} alt="Contact11" />
            <img src={ContactInfo12} width={85} alt="Contact12" />
            <img src={ContactInfo4} width={85} alt="Contact4" />
            <img src={ContactInfo5} width={85} alt="Contact5" />
            <img src={ContactInfo6} width={85} alt="Contact6" />
          </div>
        </Col>
        <div
          className="modal fade"
          id="exampleModal"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header d-flex align-items-center">
                <h5 className="modal-title" id="exampleModalLabel">
                  Change your data
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="text-center mb-3 img-wrapper">
                    <img
                      src={imgUrl}
                      width={82}
                      alt="User"
                      className="img-user"
                    />
                    <input
                      type="file"
                      name="image"
                      className="file-input"
                      ref={imageRef}
                      onChange={(event) => handleChangeImage(event)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      id="username"
                      placeholder="Write your username"
                      value={`${data.username !== "none" ? data.username : ""}`}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="name"
                      placeholder="Write your name"
                      value={data.name}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phoneNumber"
                      id="phoneNumber"
                      placeholder="Write your phone number"
                      value={`${
                        data.phoneNumber !== "none" ? data.phoneNumber : ""
                      }`}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <input
                      type="text"
                      className="form-control"
                      name="bio"
                      id="bio"
                      placeholder="Write your bio"
                      value={`${data.bio !== "none" ? data.bio : ""}`}
                      onChange={handleFormChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-changes"
                  data-dismiss="modal"
                  onClick={handleSaveChanges}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
}
