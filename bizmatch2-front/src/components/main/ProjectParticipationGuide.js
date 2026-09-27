import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./ProjectParticipationGuide.module.css";

const STEPS = [
  {
    title: "외주 찾기",
    description:
      "필터링 및 검색을 활용해 원하는 프로젝트 카테고리를 선택합니다.",
  },
  {
    title: "외주 리스트 확인",
    description:
      "등록된 외주 리스트를 확인하고, 관심 있는 프로젝트를 클릭하면 상세페이지로 이동합니다.",
  },
  {
    title: "외주 지원 여부 선택",
    description:
      "상세페이지에서 프로젝트 정보를 확인한 후, 외주 지원 여부를 결정합니다.",
  },
  {
    title: "외주 신청서 작성",
    description:
      "외주 신청 페이지로 이동하여 필요한 서류 및 정보를 입력합니다.",
  },
  {
    title: "프로젝트 진행",
    description: "클라이언트의 승인이 완료되면 프로젝트가 시작됩니다.",
  },
];

export default function ProjectParticipationGuide() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>PARTICIPATION GUIDE</span>
          <h1 className={styles.title}>프로젝트 참여 방법 안내</h1>
          <p className={styles.subtitle}>
            아래 5단계를 따라 진행하면 누구나 쉽게 원하는 외주 프로젝트를
            찾아 지원할 수 있습니다.
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

        <div className={styles.ctaBanner}>
          <div className={styles.ctaGlow} />
          <span className={styles.ctaEyebrow}>지금 바로 시작하기</span>
          <h3 className={styles.ctaTitle}>마음에 드는 프로젝트를 찾아보세요</h3>
          <p className={styles.ctaSubtitle}>
            지금 등록된 다양한 외주 프로젝트를 둘러보고 원하는 일을 찾아보세요.
          </p>
          <NavLink className={styles.ctaButton} to="/project/findpage">
            프로젝트 둘러보기
            <span className={styles.ctaArrow} aria-hidden="true">
              →
            </span>
          </NavLink>
        </div>
      </section>
    </div>
  );
}
