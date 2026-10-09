import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./ServiceFees.module.css";

const PRICING_CARDS = [
  {
    label: "기업 회원",
    rate: "10%",
    description: "프로젝트 계약 금액 기준 성사 수수료가 부과됩니다.",
    accent: false,
  },
  {
    label: "프리랜서 회원",
    rate: "무료",
    description: "계약 성사 시 수수료 없이 전액 정산 받습니다.",
    accent: true,
  },
];

const REFUND_RULES = [
  { condition: "프로젝트 시작 전 취소", rate: "100% 반환", tone: "good" },
  { condition: "프로젝트 중단", rate: "50% 반환 불가", tone: "warn" },
  { condition: "완료된 프로젝트", rate: "반환 불가", tone: "bad" },
];

const PAYMENT_METHODS = [
  { icon: "💳", label: "신용/체크카드" },
  { icon: "🏦", label: "가상계좌" },
  { icon: "🔁", label: "계좌이체" },
];

export default function ServiceFees() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>PRICING</span>
          <h1 className={styles.title}>이용 요금 안내</h1>
          <p className={styles.subtitle}>
            회원가입과 프로젝트 등록은 무료입니다. 거래가 성사되었을 때만
            합리적인 수수료가 발생합니다.
          </p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.pricingGrid}>
          {PRICING_CARDS.map((card) => (
            <div
              key={card.label}
              className={`${styles.pricingCard} ${
                card.accent ? styles.pricingCardAccent : ""
              }`}
            >
              <span className={styles.pricingLabel}>{card.label}</span>
              <div className={styles.pricingRate}>{card.rate}</div>
              <p className={styles.pricingDescription}>{card.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>보증금 정책</h2>
          <p className={styles.cardText}>
            프로젝트 진행을 위해 클라이언트는 <strong>보증금</strong>을
            결제해야 하며, 이는 안전 거래를 보장하기 위해 플랫폼에서
            관리합니다.
          </p>
          <ul className={styles.bulletList}>
            <li>보증금은 거래 금액의 <strong>10%</strong>로 책정됩니다.</li>
            <li>프로젝트 완료 후, 보증금은 클라이언트에게 <strong>전액 반환</strong>됩니다.</li>
          </ul>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>수수료 반환 규정</h2>
          <p className={styles.cardText}>
            거래 취소 및 중단 시 수수료 반환은 다음과 같이 적용됩니다.
          </p>
          <div className={styles.refundTable}>
            {REFUND_RULES.map((rule) => (
              <div className={styles.refundRow} key={rule.condition}>
                <span className={styles.refundCondition}>
                  {rule.condition}
                </span>
                <span
                  className={`${styles.refundBadge} ${
                    styles[`refund-${rule.tone}`]
                  }`}
                >
                  {rule.rate}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>결제 방법</h2>
          <p className={styles.cardText}>
            결제는 안전한 전자 결제 시스템을 통해 처리되며, 다음 방법을
            지원합니다.
          </p>
          <div className={styles.paymentGrid}>
            {PAYMENT_METHODS.map((method) => (
              <div className={styles.paymentItem} key={method.label}>
                <span className={styles.paymentIcon}>{method.icon}</span>
                {method.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaBanner}>
        <div className={styles.ctaInner}>
          <span className={styles.ctaEyebrow}>지금 바로 시작하기</span>
          <h3 className={styles.ctaTitle}>프로젝트 등록, 지금 시작해보세요</h3>
          <p className={styles.ctaSubtitle}>
            등록은 무료이며, 거래가 성사될 때만 수수료가 부과됩니다.
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
