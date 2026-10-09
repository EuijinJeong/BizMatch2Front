import { useNavigate } from "react-router-dom";
import mainViewStyle from "./MainView.module.css";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import LoginModal from "../ui/LoginModal";
import ProjectShowcase from "./ProjectShowcase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandshake,
  faBuilding,
  faChartLine,
  faShieldHalved,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

const FEATURES = [
  {
    icon: faHandshake,
    title: "맞춤형 전문가 매칭",
    desc: "업종과 프로젝트에 맞는 전문가를 신속하게 연결하고, 필요한 서비스를 맞춤형으로 지원받으세요.",
  },
  {
    icon: faBuilding,
    title: "기업 맞춤형 지원",
    desc: "기업의 특정 요구에 맞춘 다양한 아웃소싱 솔루션으로 업무를 효율적으로 처리하세요.",
  },
  {
    icon: faChartLine,
    title: "실시간 프로젝트 관리",
    desc: "프로젝트 진행 상황을 한눈에 확인하고, 필요한 변경 사항을 즉시 반영할 수 있어요.",
  },
  {
    icon: faShieldHalved,
    title: "안전한 거래 및 결제",
    desc: "철저한 보안과 신뢰성 있는 에스크로 결제 시스템으로 안전한 거래 환경을 보장합니다.",
  },
];

const WHY_ITEMS = [
  {
    title: "시간 절약",
    desc: "전문가 탐색 시간을 단축하고 빠르게 프로젝트를 시작하세요.",
  },
  {
    title: "신뢰할 수 있는 네트워크",
    desc: "다양한 산업군의 인증된 전문가와 안정적으로 거래하세요.",
  },
  {
    title: "유연한 가격 책정",
    desc: "예산에 맞는 합리적인 가격으로 최상의 결과를 얻으세요.",
  },
];

const FAQ_ITEMS = [
  {
    q: "플랫폼에서 제공하는 서비스는 어떤 것인가요?",
    a: "다양한 프로젝트 등록, 기업과의 매칭, 지원 관리 및 결제 시스템 등을 제공합니다.",
  },
  {
    q: "프로젝트 등록 후 어떻게 지원 기업을 선택하나요?",
    a: "등록한 프로젝트에 관심 있는 기업이 지원하면, 해당 기업들의 프로필과 제안을 검토하여 선택할 수 있습니다.",
  },
  {
    q: "결제는 어떻게 진행되나요?",
    a: "플랫폼 내에서 제공하는 안전한 결제 시스템을 통해, 계약 체결 후 정해진 금액을 결제할 수 있습니다.",
  },
  {
    q: "분쟁이 발생했을 때 어떻게 해결되나요?",
    a: "고객 지원팀에 문의하거나, 플랫폼 내 분쟁 해결 프로세스를 통해 중재를 요청할 수 있습니다.",
  },
];

export default function MainView() {
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.member);

  // 모달 관련한 변수
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 첫 화면 진입 시 자연스러운 페이드인
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  useEffect(() => {
    const frameId = requestAnimationFrame(() => setIsHeroVisible(true));
    return () => cancelAnimationFrame(frameId);
  }, []);

  const projectShowcaseRef = useRef(null);
  const secondSectionRef = useRef(null);
  const thirdSectionRef = useRef(null);
  const fourthSectionRef = useRef(null);
  const fifthSectionRef = useRef(null);

  // 프로젝트 등록 페이지로 이동하는 핸들러
  const goToRegistPage = () => {
    if (loginState && loginState.info) {
      navigate("/project/regist");
    } else {
      openModal();
    }
  };

  // 공고 둘러보기로 이동하는 핸들러
  const goToFindPage = () => {
    navigate("/project/findpage");
  };

  // 게시판으로 이동하는 핸들러
  const handlerQuestionClick = () => {
    navigate("/board");
  };

  return (
    <>
      <div
        id="container"
        className={`${mainViewStyle.container} ${
          isHeroVisible ? mainViewStyle.visible : ""
        }`}
      >
        <div className={mainViewStyle.hero}>
          <div className={mainViewStyle.heroInner}>
            <span className={mainViewStyle.eyebrow}>
              중소기업 B2B 매칭 플랫폼
            </span>
            <h1 className={mainViewStyle.regTitleMent}>
              믿을 수 있는 파트너를
              <br />
              가장 빠르게 찾는 방법
            </h1>
            <p className={mainViewStyle.regSmallMent}>
              검증된 기업과 프리랜서를 연결하고, 에스크로 결제로 안전하게
              거래하세요.
            </p>
            <div className={mainViewStyle.regBtnArea}>
              <button
                className={mainViewStyle.regBtn}
                id="reg-btn"
                onClick={goToRegistPage}
              >
                프로젝트 등록하기
              </button>
              <button
                className={mainViewStyle.secondaryBtn}
                onClick={goToFindPage}
              >
                등록된 공고 둘러보기
              </button>
            </div>
            <div className={mainViewStyle.trustRow}>
              <div className={mainViewStyle.trustItem}>
                <span className={mainViewStyle.trustDot}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                사업자 인증 완료 기업만 매칭
              </div>
              <div className={mainViewStyle.trustItem}>
                <span className={mainViewStyle.trustDot}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                에스크로 기반 안전 결제
              </div>
              <div className={mainViewStyle.trustItem}>
                <span className={mainViewStyle.trustDot}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                실시간 프로젝트 현황 관리
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref={projectShowcaseRef}>
        <ProjectShowcase />
      </div>

      <div id="secondSection" className={mainViewStyle.secondSection} ref={secondSectionRef}>
        <div className={mainViewStyle.secondSectionBox}>
          <div className={mainViewStyle.sectionHead}>
            <div className={mainViewStyle.sectionEyebrow}>HOW IT WORKS</div>
            <p className={mainViewStyle.sectionTitle}>
              BizMatch에서 아웃소싱 고민을 해결하세요
            </p>
            <p className={mainViewStyle.sectionSub}>
              등록부터 정산까지, 외주 프로세스 전체를 한 곳에서 관리할 수
              있어요.
            </p>
          </div>

          <div className={mainViewStyle.cards}>
            {FEATURES.map((feature) => (
              <div className={mainViewStyle.card} key={feature.title}>
                <div className={mainViewStyle.featureIcon}>
                  <FontAwesomeIcon icon={feature.icon} />
                </div>
                <div className={mainViewStyle.cardText}>
                  <h3>{feature.title}</h3>
                </div>
                <p className={mainViewStyle.cardCaption}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={mainViewStyle.thirdSection} ref={thirdSectionRef}>
        <div className={mainViewStyle.thirdSectionBox}>
          <p className={mainViewStyle.thirdSectionTitle}>왜 BizMatch 인가요?</p>
          <div className={mainViewStyle.thirdSectionCards}>
            {WHY_ITEMS.map((item, index) => (
              <div className={mainViewStyle.thirdSectionCard} key={item.title}>
                <span className={mainViewStyle.whyNum}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className={mainViewStyle.thirdSectionCardHeader}>
                  <p className={mainViewStyle.thirdSectionCardHeaderTitle1}>
                    {item.title}
                  </p>
                </div>
                <div className={mainViewStyle.thirdSectionCardBody}>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div id="fourthSection" className={mainViewStyle.fourthSection} ref={fourthSectionRef}>
        <div className={mainViewStyle.fourthSectionContainer}>
          <p className={mainViewStyle.fourthSectionTitle}>
            자주 묻는 질문 ( FAQ )
          </p>
        </div>
        <div className={mainViewStyle.fourthSectionBox}>
          {FAQ_ITEMS.map((item, index) => (
            <div className={mainViewStyle.card1} key={item.q}>
              <div className={mainViewStyle.faqQuestionRow}>
                <span className={mainViewStyle.faqBadge}>Q{index + 1}</span>
                <span className={mainViewStyle.fourthSectionText}>
                  {item.q}
                </span>
              </div>
              <div className={mainViewStyle.cardCaption1}>
                <p>A. {item.a}</p>
              </div>
            </div>
          ))}

          <div className={mainViewStyle.fourthSectionBoxQnaArea}>
            <p
              className={mainViewStyle.fourthSectionBoxQna}
              onClick={handlerQuestionClick}
            >
              질문 모두 보기
            </p>
          </div>
        </div>
      </div>
      <div className={mainViewStyle.fifthSection} ref={fifthSectionRef}>
        <div className={mainViewStyle.fifthSectionContainer}>
          <div className={mainViewStyle.fifthSectionTitle}>
            <p>지금 바로 등록하고 새로운 기회를</p>
            <p>만나보세요!</p>
          </div>
          <div className={mainViewStyle.fifthSectionBtnArea}>
            <button
              className={mainViewStyle.fifthSectionBtn}
              onClick={goToRegistPage}
            >
              프로젝트 등록하기
            </button>
          </div>
        </div>
      </div>

      {/* 로그인 모달 */}
      {isModalOpen && (
        <LoginModal onClose={closeModal} loginState={loginState} />
      )}
    </>
  );
}
