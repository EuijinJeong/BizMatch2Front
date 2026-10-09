import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./ProjectRegistrationGuide.module.css";

const STEPS = [
  {
    title: "기업 계정 로그인 후 등록",
    description:
      "기업 회원 페이지에서 프로젝트 등록을 클릭하여 등록을 시작합니다.",
  },
  {
    title: "프로젝트 상세 입력",
    description:
      "프로젝트 카테고리, 상세 업무 내용, 관련 기술을 입력합니다.",
  },
  {
    title: "예산 및 일정 설정",
    description:
      "지출 가능한 예산, 예상 시작일과 종료일을 입력합니다.",
  },
  {
    title: "첨부파일 등록",
    description:
      "프로젝트 신청에 참고할만한 프로젝트 정보 관련 파일을 등록합니다.",
  },
  {
    title: "모집 요건 입력",
    description: "지원자 모집 마감일, 모집 인원 등을 설정합니다.",
  },
  {
    title: "외주 신청 등록 완료",
    description:
      "모든 정보 입력이 완료되면 프로젝트 신청 등록이 완료됩니다.",
  },
];

export default function ProjectRegistrationGuide() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>PROJECT GUIDE</span>
          <h1 className={styles.title}>프로젝트 등록 방법 안내</h1>
          <p className={styles.subtitle}>
            아래 6단계를 따라 진행하면 누구나 쉽게 외주 프로젝트를 등록하고
            지원자를 모집할 수 있습니다.
          </p>
        </div>
      </section>

      <section className={styles.stepsSection}>
        <ol className={styles.stepsContainer}>
          {STEPS.map((step, index) => (
            <li className={styles.step} key={step.title}>
              <div className={styles.stepBadge}>{index + 1}</div>
              <div className={styles.stepBody}>
                <h2 className={styles.stepTitle}>{step.title}</h2>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.ctaBanner}>
        <div className={styles.ctaInner}>
          <span className={styles.ctaEyebrow}>지금 바로 시작하기</span>
          <h3 className={styles.ctaTitle}>프로젝트 등록, 지금 시작해보세요</h3>
          <p className={styles.ctaSubtitle}>
            등록은 몇 분이면 충분합니다. 필요한 인재를 빠르게 만나보세요.
          </p>
          <NavLink className={styles.ctaButton} to="/project/regist">
            프로젝트 등록하기
            <span className={styles.ctaArrow} aria-hidden="true">
              →
            </span>
          </NavLink>
        </div>
      </section>
    </div>
  );
}
