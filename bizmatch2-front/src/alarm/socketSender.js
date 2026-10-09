import SockJS from "sockjs-client";
import { frontendHost, host } from "../utils/hosts";

var socket = undefined;

// 서버의 웹소켓 URL
socket = new SockJS("http://3.34.180.91:8080/ws");
socket.onopen = () => {
  if (sessionStorage.getItem("info") !== null) {
    const email = JSON.parse(sessionStorage.getItem("info")).emilAddr;
    signinAlarmSender(email);
  }
};

export const signinAlarmSender = (email) => {
  var sendMessage = {
    email: email,
    action: "LOGIN",
    message: "로그인",
    url: null,
  };
  try {
    socket.send(JSON.stringify(sendMessage));
  } catch (e) {
    // 소켓이 아직 연결되지 않았으면 조용히 무시한다.
    // (호출부의 finally에서 실행되므로, 여기서 던지면 상위 함수의 반환값이 사라진다.)
  }
};

export const penatlyAlarmSender = (receiveEmail, message) => {
  var sendMessage = {
    receivePenatlyEmail: receiveEmail,
    message: message,
    action: "RECEIVE_PENATLY",
    url: null,
  };
  socket.send(JSON.stringify(sendMessage));
};
export const projectNewReply = (pjId) => {
  var sendMessage = {
    email: JSON.parse(sessionStorage.getItem("info")).emilAddr,
    action: "NEW_PJREPLY",
    url: `${frontendHost()}/project/info/${pjId}`, // 리액트 뷰를 반환
    pjId: pjId,
    message: `프로젝트에 댓글이 작성되었습니다.`,
  };
  socket.send(JSON.stringify(sendMessage));
};
export const boardNewReply = (pstId, message) => {
  var sendMessage = {
    email: JSON.parse(sessionStorage.getItem("info")).emilAddr,
    pstId: pstId,
    action: "NEW_BDREPLY",
    message: message,
    url: `${frontendHost()}/board/view/${pstId}`, // 리액트 뷰를 반환
  };
  socket.send(JSON.stringify(sendMessage));
};

export const deadLineReq = (loginEmail, pjId, message) => {
  var sendMessage = {
    email: loginEmail,
    pjId,
    message,
    url: `askldjanncansc`,
    action: "DEADLINE_REQ",
  };
  socket.send(JSON.stringify(sendMessage));
};
export const paymentReq = (loginEmail, pjId, message) => {
  var sendMessage = {
    email: loginEmail,
    pjId,
    message,
    action: "PAYMENT_REQ",
    url: "asndjknkmn",
  };
  socket.send(JSON.stringify(sendMessage));
};
export const getSocket = () => {
  if (!socket) {
    socket = new SockJS(host() + "/ws");
    socket.onopen = () => {};
  }
  return socket;
};
