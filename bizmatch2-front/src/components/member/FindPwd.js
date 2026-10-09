import React, { useRef } from "react";
import FindPwdStyle from "./FindPwd.module.css";
import { askFindPwdEmail } from "../http/api/userApi";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faKey,
  faEnvelope,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

export default function FindPwd() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const handleSendFindPwd = async () => {
    try {
      const result = await askFindPwdEmail(emailRef.current.value);
      if (result) {
        alert("이메일이 전송되었습니다. 이메일읠 확인해주세요.");
        navigate("/");
      }
    } catch (error) {
      //console.log(error);
    }
  };

  return (
    <div className={FindPwdStyle.page}>
      <div className={FindPwdStyle.card}>
        <div className={FindPwdStyle.cardHeader}>
          <div className={FindPwdStyle.iconBadge}>
            <FontAwesomeIcon icon={faKey} />
          </div>
          <span className={FindPwdStyle.eyebrow}>RESET PASSWORD</span>
          <p className={FindPwdStyle.title}>비밀번호 찾기</p>
          <p className={FindPwdStyle.subtitle}>
            가입된 이메일을 입력하시면
            <br />
            비밀번호 재설정 메일을 보내드려요.
          </p>
        </div>

        <div className={FindPwdStyle.cardBody}>
          <div className={FindPwdStyle.inputBox}>
            <FontAwesomeIcon
              icon={faEnvelope}
              className={FindPwdStyle.inputIcon}
            />
            <input
              className={FindPwdStyle.email}
              type="email"
              id="email"
              name="email"
              placeholder=" "
              ref={emailRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSendFindPwd();
                }
              }}
            />
            <label htmlFor="email">이메일</label>
          </div>

          <button
            type="submit"
            className={FindPwdStyle.submitBtn}
            onClick={handleSendFindPwd}
          >
            인증번호 받기
            <FontAwesomeIcon
              icon={faArrowRight}
              className={FindPwdStyle.submitBtnIcon}
            />
          </button>

          <NavLink to="/" className={FindPwdStyle.backLink}>
            <FontAwesomeIcon icon={faArrowLeft} />
            메인으로 돌아가기
          </NavLink>
        </div>
      </div>
    </div>
  );
}
