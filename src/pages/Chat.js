import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Swal from "sweetalert2";
import { findUser, update } from "../configs/redux/actions/user";

import Col from "../components/module/Col";
import Input from "../components/module/Input";
import Button from "../components/module/Button";
import Channel from "../components/module/Channel";
import DetailMenu from "../components/module/DetailMenu";
import MenuComp from "../components/module/Menu";
import ChatMenu from "../components/module/ChatMenu";
import ProfileMenuComp from "../components/module/ProfileMenu";
import Attach from "../components/module/Attach";
import Feature from "../components/module/Feature";
import ContactInfo from "../components/module/ContactInfo";
import Profile from "../components/module/Profile";

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
import ProfileMenu from "../assets/img/profile-menu.png";
import Gloria from "../assets/img/gloria.png";
import Search from "../assets/img/search.png";

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
                {showChannel && <Channel></Channel>}
                <Button type="button" onClick={() => handleClickMenu()}>
                  <img src={Menu} width={22} alt="Menu" />
                </Button>
                {showDetail && (
                  <DetailMenu showProfile={handleClickProfile}></DetailMenu>
                )}
              </div>
              <div className="search mt-4 d-flex justify-content-between align-items-center">
                <div className="input-search">
                  <img src={Search} width={22} alt="search" />
                  <Input
                    type="text"
                    name="search"
                    placeholder="Type your message..."
                  />
                </div>
                <Button
                  type="button"
                  className="btn"
                  onClick={() => handleClickPlus()}
                >
                  <img src={Plus} width={23} alt="Plus" />
                </Button>
              </div>
              <MenuComp
                category={category}
                changeCategory={handleClickCategory}
              ></MenuComp>
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
              <Profile
                back={handleClickBack}
                username={user.username}
                image={`${UrlImage}${user.image}`}
                phone={user.phoneNumber}
                bio={user.bio}
                name={user.name}
              ></Profile>
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
                <ProfileMenuComp
                  contactInfo={handleClickContactInfo}
                ></ProfileMenuComp>
                <Button type="button" onClick={() => handleClickChatMenu()}>
                  <img src={ProfileMenu} width={20} alt="Profile Menu" />
                </Button>
                {showChatMenu && <ChatMenu></ChatMenu>}
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
                {showAttach && <Attach></Attach>}
                <div className="input w-100">
                  <Input
                    type="text"
                    name="message"
                    placeholder="Type your message..."
                  />
                  <Feature
                    attach={handleClickAttach}
                    soon={handleClickSoon}
                  ></Feature>
                </div>
              </div>
            </>
          )}
        </Col>
        <ContactInfo
          showInfo={showContactInfo}
          info={infoCategory}
          changeInfo={handleClickInfoCategory}
          back={handleClickBackInfo}
        ></ContactInfo>
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
                <Button type="button" className="close" isModal>
                  <span aria-hidden="true">&times;</span>
                </Button>
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
                  <Input
                    type="text"
                    name="username"
                    placeholder="Write your username"
                    label="Username"
                    value={`${data.username !== "none" ? data.username : ""}`}
                    onChange={handleFormChange}
                    isFormGroup
                  />
                  <Input
                    type="text"
                    name="name"
                    placeholder="Write your name"
                    label="Name"
                    value={data.name}
                    onChange={handleFormChange}
                    isFormGroup
                  />
                  <Input
                    type="text"
                    name="phoneNumber"
                    placeholder="Write your phone number"
                    label="Phone Number"
                    value={`${
                      data.phoneNumber !== "none" ? data.phoneNumber : ""
                    }`}
                    onChange={handleFormChange}
                    isFormGroup
                  />
                  <Input
                    type="text"
                    name="bio"
                    placeholder="Write your bio"
                    label="Bio"
                    value={`${data.bio !== "none" ? data.bio : ""}`}
                    onChange={handleFormChange}
                    isFormGroup
                  />
                </form>
              </div>
              <div className="modal-footer">
                <Button
                  type="button"
                  className="btn-changes"
                  onClick={handleSaveChanges}
                  isModal
                >
                  Save changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
}
