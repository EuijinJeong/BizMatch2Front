import React from "react";
import MemberTypeStyle from "./MemberType.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faUserTie } from "@fortawesome/free-solid-svg-icons";

export default function MemberType() {
  const navigate = useNavigate();

  const goToCompanySignup = () => navigate("/member/company/signup");
  const goToFreelancerSignup = () => navigate("/member/freelancer/signup");
  return (
    <div>
      <div className={MemberTypeStyle.title}>
        <span className={MemberTypeStyle.eyebrow}>회원가입</span>
        <h1>회원 유형을 선택해주세요</h1>
      </div>
      <div className={MemberTypeStyle.selectContainer}>
        <div className={MemberTypeStyle.selectType}>
          <div
            className={MemberTypeStyle.contentBox}
            id="content-box-company"
            onClick={goToCompanySignup}
          >
            <div className={MemberTypeStyle.iconBadge}>
              <FontAwesomeIcon icon={faBuilding} />
            </div>
            <h2>기업형</h2>
            <p>사업자 등록증이 있는 경우</p>
          </div>
          <div
            className={MemberTypeStyle.contentBox}
            id="content-box-free"
            onClick={goToFreelancerSignup}
          >
            <div className={MemberTypeStyle.iconBadge}>
              <FontAwesomeIcon icon={faUserTie} />
            </div>
            <h2>개인형</h2>
            <p>사업자 등록증이 없는 경우</p>
          </div>
        </div>
      </div>
    </div>
  );
}
