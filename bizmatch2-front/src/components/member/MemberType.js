import React from "react";
import MemberTypeStyle from "./MemberType.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faUserTie,
  faCheck,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const MEMBER_TYPES = [
  {
    id: "content-box-company",
    icon: faBuilding,
    title: "기업형",
    description: "사업자 등록증이 있는 경우",
    bullets: ["사업자 등록증 인증", "프로젝트 등록 및 외주 발주", "에스크로 안전 결제"],
    cta: "기업으로 시작하기",
    action: "company",
  },
  {
    id: "content-box-free",
    icon: faUserTie,
    title: "개인형",
    description: "사업자 등록증이 없는 경우",
    bullets: ["사업자 등록증 없이 가입", "프로젝트 지원 및 수주", "에스크로 안전 정산"],
    cta: "개인으로 시작하기",
    action: "freelancer",
  },
];

export default function MemberType() {
  const navigate = useNavigate();

  const goToCompanySignup = () => navigate("/member/company/signup");
  const goToFreelancerSignup = () => navigate("/member/freelancer/signup");

  const handleSelect = (action) => {
    if (action === "company") goToCompanySignup();
    else goToFreelancerSignup();
  };

  return (
    <div className={MemberTypeStyle.page}>
      <div className={MemberTypeStyle.hero}>
        <div className={MemberTypeStyle.heroInner}>
          <span className={MemberTypeStyle.eyebrow}>JOIN BIZMATCH</span>
          <h1>회원 유형을 선택해주세요</h1>
          <p className={MemberTypeStyle.subtitle}>
            유형에 따라 필요한 정보와 이용 방식이 달라요. 맞는 쪽을 골라주세요.
          </p>
        </div>
      </div>

      <div className={MemberTypeStyle.selectContainer}>
        <div className={MemberTypeStyle.selectType}>
          {MEMBER_TYPES.map((type) => (
            <div
              key={type.id}
              className={MemberTypeStyle.contentBox}
              id={type.id}
              onClick={() => handleSelect(type.action)}
            >
              <div className={MemberTypeStyle.iconBadge}>
                <FontAwesomeIcon icon={type.icon} />
              </div>
              <h2>{type.title}</h2>
              <p className={MemberTypeStyle.description}>{type.description}</p>

              <ul className={MemberTypeStyle.bulletList}>
                {type.bullets.map((bullet) => (
                  <li key={bullet}>
                    <span className={MemberTypeStyle.bulletIcon}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className={MemberTypeStyle.ctaButton}>
                {type.cta}
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className={MemberTypeStyle.ctaIcon}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
