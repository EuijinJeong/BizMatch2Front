import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../ui/LoginModal.module.css";
import { useDispatch } from "react-redux";
import { getMyToken } from "../../stores/thunks/loginThunk";
import { memberActions } from "../../stores/memberSlice";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const Error = styled.span`
  display: block;
  margin-top: -0.4rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #d64545;
`;

export default function LoginModal({ onClose, loginState }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const loginDispatcher = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    loginDispatcher(memberActions.reload());
  }, [loginDispatcher]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        //console.log("ESC 키 눌림 - 모달 닫기");
        onClose(); // ESC 키를 누르면 onClose 호출
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown); // 이벤트 리스너 정리
    };
  }, [onClose]);

  const isValidEmail = (email) => {
    const regex =
      /^[a-zA-Z0-9._%+-]{4,10}@[a-zA-Z0-9.-]{4,10}$|^[a-zA-Z0-9._%+-]{4,10}@[a-zA-Z0-9.-]{4,10}\.[a-zA-Z]{2,}$/;

    return regex.test(email);
  };

  const onChangeEmailHandler = () => {
    if (isSubmit) {
      const email = emailRef.current.value;
      if (!email) {
        setErrorMsg("이메일을 입력해주세요.");
        emailRef.current.style.border = "2px solid #d64545";
      } else if (!isValidEmail(email) && email) {
        setErrorMsg("이메일 형식이 올바르지 않습니다.");
        emailRef.current.style.border = "2px solid #d64545";
      } else {
        setErrorMsg("");
        emailRef.current.style.border = "";
      }
    }
  };

  const onChangePasswordHandler = () => {
    if (isSubmit) {
      const password = passwordRef.current.value;
      if (!password) {
        setErrorMsg("비밀번호를 입력해주세요");
        passwordRef.current.style.border = "2px solid #d64545";
      } else {
        setErrorMsg("");
        passwordRef.current.style.border = "";
      }
    }
  };
  // mbrStt
  const onClickLoginHandler = async () => {
    setIsSubmit(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email && !password) {
      setErrorMsg("이메일과 비밀번호를 입력해주세요.");
      emailRef.current.style.border = "2px solid #d64545";
      passwordRef.current.style.border = "2px solid #d64545";
    } else if (!email) {
      setErrorMsg("이메일을 입력해주세요");
      emailRef.current.style.border = "2px solid #d64545";
    } else if (!password) {
      setErrorMsg("비밀번호를 입력해주세요");
      passwordRef.current.style.border = "2px solid #d64545";
    }

    try {
      // getMyToken 호출 후 오류 메시지 처리
      const errorMessage = await loginDispatcher(getMyToken(email, password));

      if (errorMessage) {
        setErrorMsg(errorMessage);
        emailRef.current.style.border = "1px solid #d64545";
        passwordRef.current.style.border = "1px solid #d64545";
      } else if (!email && !password) {
        setErrorMsg("이메일과 비밀번호를 입력해주세요.");
        emailRef.current.style.border = "1px solid #d64545";
        passwordRef.current.style.border = "1px solid #d64545";
      } else if (!email) {
        setErrorMsg("이메일을 입력해주세요");
        emailRef.current.style.border = "1px solid #d64545";
      } else if (!password) {
        setErrorMsg("비밀번호를 입력해주세요");
        passwordRef.current.style.border = "1px solid #d64545";
      } else {
        loginDispatcher(getMyToken(email, password));

        if (loginState.info && loginState.info.emilAddr) {
          onClose();
          alert("로그인되었습니다");
          navigate("/");
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("로그인 처리 중 오류 발생:", error);
    }
  };

  return (
    <>
      <div className={styles.overlay} id="overlay"></div>
      <div className={styles.loginModal} id="login-modal">
        <div className={styles.modalHeader}>
          <span
            className={styles.modalCloseBtn}
            id="modal-close-btn"
            onClick={onClose}
          >
            x
          </span>
          <span className={styles.modalEyebrow}>WELCOME BACK</span>
          <div className={styles.modalWordmark}>
            Biz<span>Match</span>
          </div>
          <p className={styles.modalSubtitle}>
            다시 만나서 반가워요. 이메일로 로그인해주세요.
          </p>
        </div>

        <div className={styles.loginModalContainer}>
          <div className={styles.signinBox}>
            <div className={styles.sameBox}>
              <FontAwesomeIcon
                icon={faEnvelope}
                className={styles.inputIcon}
              />
              <input
                type="email"
                placeholder=" "
                name="emailAddr"
                ref={emailRef}
                onChange={onChangeEmailHandler}
                required
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // 폼 제출 방지 (필요한 경우)
                    onClickLoginHandler();
                  }
                }}
              />
              <label htmlFor="login-input-email">이메일</label>
            </div>

            <div className={styles.sameBox}>
              <FontAwesomeIcon icon={faLock} className={styles.inputIcon} />
              <input
                type="password"
                placeholder=" "
                name="pwd"
                onChange={onChangePasswordHandler}
                ref={passwordRef}
                required
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // 폼 제출 방지 (필요한 경우)
                    onClickLoginHandler();
                  }
                }}
              />
              <label htmlFor="login-input-pwd">비밀번호</label>
            </div>

            {errorMsg && <Error>{errorMsg}</Error>}

            <button
              onClick={onClickLoginHandler}
              className={styles.signinButton}
            >
              로그인
              <FontAwesomeIcon
                icon={faArrowRight}
                className={styles.signinButtonIcon}
              />
            </button>
          </div>

          <div className={styles.accountMenu}>
            <NavLink
              className={styles.accountMenuText}
              to="/member/findpwd"
              onClick={onClose}
            >
              비밀번호 찾기
            </NavLink>
            <span className={styles.accountMenuDivider} />
            <NavLink
              className={styles.accountMenuText}
              to="/member/select/membertype"
              onClick={onClose}
            >
              회원가입
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
