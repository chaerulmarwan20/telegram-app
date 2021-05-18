import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { animateScroll as scroll } from "react-scroll";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  findUser,
  update,
  getUser,
  searchUser,
  getReceiver,
  getMessages,
  deleteMessages,
} from "../configs/redux/actions/user";

import "react-toastify/dist/ReactToastify.css";

import Title from "../components/module/Title";
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
import ContactInfoMobile from "../components/module/ContactInfoMobile";
import Profile from "../components/module/Profile";

import Menu from "../assets/img/menu.png";
import Plus from "../assets/img/plus.png";
import ProfileMenu from "../assets/img/profile-menu.png";
import Search from "../assets/img/search.png";
import Online from "../assets/img/dot.png";

export default function Chat(props) {
  const UrlImage = process.env.REACT_APP_API_IMG;

  const socket = props.socket;

  const dispatch = useDispatch();

  const imageRef = useRef(null);

  const notify = (params) => toast(`You have new message from ${params}!`);

  const { user, userTarget, receiver } = useSelector((state) => state.user);

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
  const [chatMobile, setChatMobile] = useState(true);
  const [chatingMobile, setChatingMobile] = useState(false);
  const [infoMobile, setInfoMobile] = useState(false);
  const [category, setCategory] = useState("Important");
  const [infoCategory, setInfoCategory] = useState("Image");
  const [query, setQuery] = useState("");
  const [keyword, setKeyword] = useState("");
  const [empty, setEmpty] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [idFriend, setIdFriend] = useState(null);

  const handleChangeImage = (event) => {
    const imgFiles = event.target.files[0];
    setImgUrl(URL.createObjectURL(event.target.files[0]));
    setStatus(true);
    setDataImage({
      image: imgFiles,
    });
  };

  const handleClickChatMobile = (id) => {
    setChatingMobile(true);
    setChatMobile(false);
    setIdFriend(id);
    dispatch(getMessages(localStorage.getItem("id"), id))
      .then((res) => {
        setMessages(res);
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
    dispatch(getReceiver(id))
      .then((res) => {})
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: err.message,
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "#7E98DF",
        });
      });
    scroll.scrollToBottom();
  };

  const handleClickBackMobile = () => {
    setChatingMobile(false);
    setChatMobile(true);
  };

  const handleClickContactInfoMobile = () => {
    setChatingMobile(false);
    setInfoMobile(true);
  };

  const handleClickBackInfoMobile = () => {
    setChatingMobile(true);
    setInfoMobile(false);
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

  const handleClickChat = (id) => {
    setShowChat(true);
    setIdFriend(id);
    dispatch(getMessages(localStorage.getItem("id"), id))
      .then((res) => {
        setMessages(res);
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
    dispatch(getReceiver(id))
      .then((res) => {})
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: err.message,
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "#7E98DF",
        });
      });
    scroll.scrollToBottom();
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

  const formik = useFormik({
    initialValues: {
      username: "",
      name: "",
      phoneNumber: "",
      bio: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Minimum 3 characters")
        .required("Required!"),
      name: Yup.string().min(3, "Minimum 3 characters").required("Required!"),
      phoneNumber: Yup.number()
        .typeError("Invalid phone number")
        .positive("A phone number can't start with a minus")
        .integer("A phone number can't include a decimal point")
        .required("Required!"),
      bio: Yup.string().min(3, "Minimum 3 characters").required("Required!"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("name", values.name);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("bio", values.bio);
      if (status) {
        formData.append("image", dataImage.image);
      }
      dispatch(update(formData))
        .then((res) => {
          formik.resetForm();
          Swal.fire({
            title: "Success!",
            text: res,
            icon: "success",
            confirmButtonText: "Ok",
            confirmButtonColor: "#7E98DF",
          }).then(() => {
            dispatch(findUser()).then((res) => {
              const result = res;
              formik.setValues(result);
            });
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
    },
  });

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

  const handleChangeSearch = (event) => {
    setQuery(event.target.value);
    dispatch(searchUser(event.target.value))
      .then((res) => {
        if (event.target.value === "") {
          dispatch(getUser())
            .then((res) => {
              setEmpty(false);
            })
            .catch((err) => {
              setEmpty(true);
            });
          setEmpty(false);
        }
        setEmpty(false);
      })
      .catch((err) => {
        setEmpty(true);
      });
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    setKeyword(e.target.value);
    if (e.keyCode === 13) {
      setKeyword("");
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    socket.emit(
      "sendMessage",
      {
        message: message,
        receiverId: idFriend,
        senderId: localStorage.getItem("id"),
      },
      (data) => {
        setMessages(data);
      }
    );
  };

  const handleClickDelete = (idSender, idTarget, idMessage) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will delete this message!",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
      confirmButtonColor: "#FF0000",
      cancelButtonText: "No, cancel!",
      cancelButtonColor: "#1EC15F",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteMessages(idSender, idTarget, idMessage))
          .then((res) => {
            socket.emit("delMessage", idSender, idTarget);
            Swal.fire({
              title: "Success!",
              text: res,
              icon: "success",
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
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Info!",
          text: "Delete message cancelled :)",
          icon: "info",
          confirmButtonColor: "#7E98DF",
        });
      }
    });
  };

  useEffect(() => {
    dispatch(findUser())
      .then((res) => {
        setImgUrl(`${UrlImage}${res.image}`);
        const result = res;
        formik.setValues(result);
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

  useEffect(() => {
    if (socket) {
      socket.on("recMessage", (data, senderName) => {
        notify(senderName[0].name);
        setMessages(data);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("delete", (idSender, idTarget) => {
        if (idSender === Number(localStorage.getItem("id"))) {
          dispatch(getMessages(idSender, idTarget))
            .then((res) => {
              setMessages(res);
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
        } else if (idTarget === Number(localStorage.getItem("id"))) {
          dispatch(getMessages(idSender, idTarget))
            .then((res) => {
              setMessages(res);
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
        }
      });
    }
  }, [socket, dispatch]);

  useEffect(() => {
    if (socket) {
      socket.emit("initialLogin", localStorage.getItem("id"));
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("login", (data) => {
        dispatch(getUser())
          .then((res) => {
            setEmpty(false);
          })
          .catch((err) => {
            setEmpty(true);
          });
        if (idFriend !== null) {
          dispatch(getReceiver(idFriend))
            .then((res) => {})
            .catch((err) => {});
        } else {
          dispatch(getReceiver(data))
            .then((res) => {})
            .catch((err) => {});
        }
      });
    }
  }, [socket, dispatch, idFriend]);

  useEffect(() => {
    if (socket) {
      socket.on("logout", (data) => {
        dispatch(getUser())
          .then((res) => {
            setEmpty(false);
          })
          .catch((err) => {
            setEmpty(true);
          });
        if (idFriend !== null) {
          dispatch(getReceiver(idFriend))
            .then((res) => {})
            .catch((err) => {});
        } else {
          dispatch(getReceiver(data))
            .then((res) => {})
            .catch((err) => {});
        }
      });
    }
  }, [socket, dispatch, idFriend]);

  useEffect(() => {
    dispatch(getUser())
      .then((res) => {
        setEmpty(false);
      })
      .catch((err) => {
        setEmpty(true);
      });
  }, [dispatch]);

  return (
    <section className="chat">
      <Title title="Chat"></Title>
      <ToastContainer />
      <Col className="d-none d-lg-block col-xl-3 col-lg-4 col-12 pl-4 pr-3 py-4 left">
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
            <div className="search mt-4 d-flex justify-content-center align-items-center">
              <div className="input-search">
                <img src={Search} width={22} alt="search" />
                <Input
                  type="text"
                  name="search"
                  placeholder="Search user here..."
                  value={query}
                  onChange={handleChangeSearch}
                />
              </div>
              <Button
                type="button"
                className="d-none"
                onClick={() => handleClickPlus()}
              >
                <img src={Plus} width={23} alt="Plus" />
              </Button>
            </div>
            <MenuComp
              category={category}
              changeCategory={handleClickCategory}
            ></MenuComp>
            {empty === false &&
              userTarget.map((item, index) => {
                return (
                  <div
                    className="user d-none d-lg-flex justify-content-between align-items-center mt-4"
                    key={index}
                    onClick={() => handleClickChat(item.id)}
                  >
                    <div className="profile d-flex align-items-center">
                      <div className="image">
                        {item.image !== undefined && (
                          <img
                            src={`${UrlImage}${item.image}`}
                            width={64}
                            alt="Theresa"
                          />
                        )}
                        {item.userSocket && (
                          <img
                            src={Online}
                            width={20}
                            alt="Online"
                            className="online"
                          />
                        )}
                      </div>
                      <div className="info d-flex flex-column ml-3">
                        <span className="name">
                          {item.name}
                          {/* <img
                              src={Union}
                              width={16}
                              alt="Union"
                              className="ml-2"
                            /> */}
                        </span>
                        <span className="message active mt-2">
                          {item.username}
                        </span>
                      </div>
                    </div>
                    {/* <div className="time d-flex flex-column">
                        <span>15:20</span>
                        <div className="notif mt-2">2</div>
                      </div> */}
                  </div>
                );
              })}
            {empty === true && (
              <p className="text-center mt-4">User not found</p>
            )}
          </>
        )}
        {showProfile && (
          <>
            <Profile
              back={handleClickBack}
              username={user.username}
              image={`${user.image !== undefined && UrlImage + user.image}`}
              phone={user.phoneNumber}
              bio={user.bio}
              name={user.name}
              socket={socket}
            ></Profile>
          </>
        )}
      </Col>
      {chatMobile && (
        <Col className="d-block d-lg-none col-xl-3 col-lg-4 col-12 pl-4 pr-3 py-4 left">
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
              <div className="search mt-4 d-flex justify-content-center align-items-center">
                <div className="input-search">
                  <img src={Search} width={22} alt="search" />
                  <Input
                    type="text"
                    name="keyword"
                    placeholder="Search user here..."
                    value={query}
                    onChange={handleChangeSearch}
                  />
                </div>
                <Button
                  type="button"
                  className="d-none"
                  onClick={() => handleClickPlus()}
                >
                  <img src={Plus} width={23} alt="Plus" />
                </Button>
              </div>
              <MenuComp
                category={category}
                changeCategory={handleClickCategory}
              ></MenuComp>
              {empty === false &&
                userTarget.map((item, index) => {
                  return (
                    <div
                      className="user d-flex d-lg-none justify-content-between align-items-center mt-4"
                      key={index}
                      onClick={() => handleClickChatMobile(item.id)}
                    >
                      <div className="profile d-flex align-items-center">
                        <div className="image">
                          {item.image !== undefined && (
                            <img
                              src={`${UrlImage}${item.image}`}
                              width={64}
                              alt="Theresa"
                            />
                          )}
                          {item.userSocket && (
                            <img
                              src={Online}
                              width={20}
                              alt="Online"
                              className="online"
                            />
                          )}
                        </div>
                        <div className="info d-flex flex-column ml-3">
                          <span className="name">
                            {item.name}
                            {/* <img
                              src={Union}
                              width={16}
                              alt="Union"
                              className="ml-2"
                            /> */}
                          </span>
                          <span className="message active mt-2">
                            {item.username}
                          </span>
                        </div>
                      </div>
                      {/* <div className="time d-flex flex-column">
                        <span>15:20</span>
                        <div className="notif mt-2">2</div>
                      </div> */}
                    </div>
                  );
                })}
              {empty === true && (
                <p className="text-center mt-4">User not found</p>
              )}
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
                socket={socket}
              ></Profile>
            </>
          )}
        </Col>
      )}
      <Col
        className={`${
          !showContactInfo
            ? "col-xl-9 col-lg-8 col-12"
            : "col-xl-6 col-lg-5 col-12"
        } d-none d-lg-flex flex-column px-0 py-0 right ${
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
                image={`${
                  receiver.image !== undefined && UrlImage + receiver.image
                }`}
                name={receiver.name}
                status={receiver.userSocket}
                contactInfo={handleClickContactInfo}
              ></ProfileMenuComp>
              <Button type="button" onClick={() => handleClickChatMenu()}>
                <img src={ProfileMenu} width={20} alt="Profile Menu" />
              </Button>
              {showChatMenu && <ChatMenu></ChatMenu>}
            </div>
            <div className="chating d-flex flex-column h-100 pb-4 px-5">
              {messages.map((item, index) =>
                item.type === "send" &&
                item.senderId === Number(localStorage.getItem("id")) &&
                item.targetId === idFriend ? (
                  <div
                    className="body d-flex align-items-start justify-content-end mt-4"
                    key={index}
                  >
                    <p
                      className={`date-reply mt-4 mr-3 ${
                        showContactInfo && "d-none"
                      }`}
                    >
                      {item.time}
                    </p>
                    <div
                      className="reply py-3 px-4"
                      style={{ cursor: "pointer" }}
                      onClick={
                        item.message !== "Pesan ini telah dihapus" &&
                        (() =>
                          handleClickDelete(
                            item.senderId,
                            item.targetId,
                            item.id
                          ))
                      }
                    >
                      {item.message}
                    </div>
                    <div className="ml-3">
                      <img
                        src={`${UrlImage + user.image}`}
                        width={54}
                        alt="User"
                      />
                    </div>
                  </div>
                ) : item.type === "receive" &&
                  item.senderId === Number(localStorage.getItem("id")) &&
                  item.targetId === idFriend ? (
                  <div
                    className="body d-flex align-items-end justify-content-start mt-4"
                    key={index}
                  >
                    <div className="mr-3">
                      <img
                        src={`${UrlImage + receiver.image}`}
                        width={54}
                        alt="User"
                      />
                    </div>
                    <div
                      className="send py-3 px-4"
                      style={{ cursor: "pointer" }}
                    >
                      {item.message}
                    </div>
                    <p
                      className={`date-send ml-3 ${
                        showContactInfo && "d-none"
                      }`}
                    >
                      {item.time}
                    </p>
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
            <div className="message w-100 py-4 px-5 d-flex justify-content-center align-items-center">
              {showAttach && <Attach></Attach>}
              <div className="input w-100">
                <input
                  type="text"
                  name="message"
                  className="form-control"
                  placeholder="Type your message..."
                  value={keyword}
                  onChange={handleMessageChange}
                  onKeyUp={handleMessageChange}
                  autoFocus
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
      {chatingMobile && (
        <Col
          className={`${
            !showContactInfo
              ? "col-xl-9 col-lg-8 col-12"
              : "col-xl-6 col-lg-5 col-12"
          } d-flex d-lg-none flex-column px-0 py-0 right mobile ${
            !showChat
              ? "justify-content-center align-items-center"
              : "justify-content-between"
          }`}
        >
          <div className="profile-menu d-flex justify-content-between align-items-center w-100 py-4 px-5">
            <ProfileMenuComp
              image={`${
                receiver.image !== undefined && UrlImage + receiver.image
              }`}
              name={receiver.name}
              status={receiver.userSocket}
              contactInfo={handleClickContactInfoMobile}
              back={handleClickBackMobile}
            ></ProfileMenuComp>
            <Button type="button" onClick={() => handleClickChatMenu()}>
              <img src={ProfileMenu} width={20} alt="Profile Menu" />
            </Button>
            {showChatMenu && <ChatMenu></ChatMenu>}
          </div>
          <div className="chating mobile d-flex flex-column h-100 pb-4 px-5 w-100">
            {messages.map((item, index) =>
              item.type === "send" &&
              item.senderId === Number(localStorage.getItem("id")) &&
              item.targetId === idFriend ? (
                <div
                  className="body d-flex align-items-start justify-content-end mt-4"
                  key={index}
                >
                  <p
                    className={`date-reply mt-4 mr-3 ${
                      showContactInfo && "d-none"
                    }`}
                  >
                    {item.time}
                  </p>
                  <div
                    className="reply py-3 px-4"
                    style={{ cursor: "pointer" }}
                    onClick={
                      item.message !== "Pesan ini telah dihapus" &&
                      (() =>
                        handleClickDelete(
                          item.senderId,
                          item.targetId,
                          item.id
                        ))
                    }
                  >
                    {item.message}
                  </div>
                  <div className="ml-3">
                    <img
                      src={`${UrlImage + user.image}`}
                      width={54}
                      alt="User"
                    />
                  </div>
                </div>
              ) : item.type === "receive" &&
                item.senderId === Number(localStorage.getItem("id")) &&
                item.targetId === idFriend ? (
                <div
                  className="body d-flex align-items-end justify-content-start mt-5"
                  key={index}
                >
                  <div className="mr-3">
                    <img
                      src={`${UrlImage + receiver.image}`}
                      width={54}
                      alt="User"
                    />
                  </div>
                  <div className="send py-3 px-4" style={{ cursor: "pointer" }}>
                    {item.message}
                  </div>
                  <p
                    className={`date-send ml-3 ${showContactInfo && "d-none"}`}
                  >
                    {item.time}
                  </p>
                </div>
              ) : (
                ""
              )
            )}
          </div>
          <div className="message w-100 py-4 px-5 d-flex justify-content-center align-items-center">
            {showAttach && <Attach></Attach>}
            <div className="input w-100">
              <input
                type="text"
                name="message"
                className="form-control"
                placeholder="Type your message..."
                value={keyword}
                onChange={handleMessageChange}
                onKeyUp={handleMessageChange}
                autoFocus
              />
              <Feature
                attach={handleClickAttach}
                soon={handleClickSoon}
              ></Feature>
            </div>
          </div>
        </Col>
      )}
      <ContactInfo
        image={`${receiver.image !== undefined && UrlImage + receiver.image}`}
        name={receiver.name}
        username={receiver.username}
        phone={receiver.phoneNumber}
        status={receiver.userSocket}
        showInfo={showContactInfo}
        info={infoCategory}
        changeInfo={handleClickInfoCategory}
        back={handleClickBackInfo}
      ></ContactInfo>
      {infoMobile && (
        <ContactInfoMobile
          image={`${receiver.image !== undefined && UrlImage + receiver.image}`}
          name={receiver.name}
          username={receiver.username}
          phone={receiver.phoneNumber}
          showInfo={true}
          info={infoCategory}
          status={receiver.userSocket}
          changeInfo={handleClickInfoCategory}
          back={handleClickBackInfoMobile}
        ></ContactInfoMobile>
      )}
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
                <div className="text-center mb-3 img-wrapper mx-auto">
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
                  <div className="shadow">Edit</div>
                </div>
                <Input
                  type="text"
                  name="username"
                  placeholder="Write your username"
                  label="Username"
                  value={
                    formik.values.username !== "none"
                      ? formik.values.username
                      : ""
                  }
                  onChange={formik.handleChange}
                  classFormGroup={`${
                    formik.errors.username && formik.touched.username && "mb-0"
                  }`}
                  classInput={`${
                    formik.errors.username && formik.touched.username && "error"
                  }`}
                  isFormGroup
                />
                {formik.errors.username && formik.touched.username && (
                  <small className="error">{formik.errors.username}</small>
                )}
                <Input
                  type="text"
                  name="name"
                  placeholder="Write your name"
                  label="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  classFormGroup={`${
                    formik.errors.name && formik.touched.name && "mb-0"
                  }`}
                  classInput={`${
                    formik.errors.name && formik.touched.name && "error"
                  }`}
                  isFormGroup
                />
                {formik.errors.name && formik.touched.name && (
                  <small className="error">{formik.errors.name}</small>
                )}
                <Input
                  type="text"
                  name="phoneNumber"
                  placeholder="Write your phone number"
                  label="Phone Number"
                  value={
                    formik.values.phoneNumber !== "none"
                      ? formik.values.phoneNumber
                      : ""
                  }
                  onChange={formik.handleChange}
                  classFormGroup={`${
                    formik.errors.phoneNumber &&
                    formik.touched.phoneNumber &&
                    "mb-0"
                  }`}
                  classInput={`${
                    formik.errors.phoneNumber &&
                    formik.touched.phoneNumber &&
                    "error"
                  }`}
                  isFormGroup
                />
                {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                  <small className="error">{formik.errors.phoneNumber}</small>
                )}
                <Input
                  type="text"
                  name="bio"
                  placeholder="Write your bio"
                  label="Bio"
                  value={formik.values.bio !== "none" ? formik.values.bio : ""}
                  onChange={formik.handleChange}
                  classFormGroup={`${
                    formik.errors.bio && formik.touched.bio && "mb-0"
                  }`}
                  classInput={`${
                    formik.errors.bio && formik.touched.bio && "error"
                  }`}
                  isFormGroup
                />
                {formik.errors.bio && formik.touched.bio && (
                  <small className="error">{formik.errors.bio}</small>
                )}
              </form>
            </div>
            <div className="modal-footer">
              <Button
                type="button"
                className="btn-changes"
                onClick={formik.handleSubmit}
              >
                Save changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
