import React from "react";
import styles from "./PrivacyPolicy.module.css";

export default function PrivacyPolicy() {
  return (
    <div className={styles.privacyContainer}>
      <h1 className={styles.title}>BizMatch 개인정보 처리방침</h1>
      <div className={styles.policyContent}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. 개인정보의 처리 목적</h2>
          <p>
            BizMatch는 회원가입, 서비스 제공, 고객 문의 대응, 마케팅 및 광고 등
            다양한 목적으로 개인정보를 처리합니다.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            2. 개인정보의 수집 항목 및 방법
          </h2>
          <p>
            (1) 필수 수집 항목: 이름, 이메일 주소, 비밀번호, 연락처, 회사명 등
          </p>
          <p>(2) 선택 수집 항목: 프로젝트 관심사, 선호 산업 분야 등</p>
          <p>
            (3) 수집 방법: 홈페이지 회원가입, 서비스 이용, 고객센터 문의 등을
            통해 수집
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            3. 개인정보의 보유 및 이용 기간
          </h2>
          <p>
            BizMatch는 법령에 따른 개인정보 보유 기간 또는 이용자로부터
            동의받은 기간 내에서 개인정보를 처리 및 보유합니다.
          </p>
          <p>
            - 회원 탈퇴 시 즉시 삭제 (단, 법령에서 정한 일정 기간 보존 필요 시
            제외)
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>4. 개인정보의 제3자 제공</h2>
          <p>
            BizMatch는 이용자의 개인정보를 원칙적으로 외부에 제공하지
            않습니다. 다만, 아래의 경우에는 예외로 합니다:
          </p>
          <ul className={styles.list}>
            <li>법령에 따라 제공이 필요한 경우</li>
            <li>이용자의 동의를 받은 경우</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>5. 개인정보 처리 위탁</h2>
          <p>
            BizMatch는 원활한 서비스 제공을 위해 개인정보 처리를 외부 업체에
            위탁할 수 있으며, 위탁 업체와의 계약을 통해 개인정보 보호를 철저히
            관리합니다.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>6. 이용자의 권리</h2>
          <p>
            이용자는 언제든지 본인의 개인정보에 대한 열람, 정정, 삭제, 처리
            정지 등을 요청할 수 있습니다.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>7. 개인정보 보호책임자</h2>
          <p>개인정보 보호 관련 문의는 아래의 연락처로 연락주시기 바랍니다.</p>
          <p>- 이메일: support@bizmatch.com</p>
          <p>- 전화번호: 02-1234-5678</p>
        </section>
      </div>
    </div>
  );
}
