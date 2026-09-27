import React from "react";
import styles from "./DisputeResolutionPolicy.module.css";

export default function DisputeResolutionPolicy() {
  return (
    <div className={styles.policyContainer}>
      <h1 className={styles.title}>BizMatch 분쟁 해결 정책</h1>
      <div className={styles.policyContent}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. 분쟁 해결의 원칙</h2>
          <p>
            BizMatch는 회원 간, 또는 회사와 회원 간 발생하는 분쟁을 공정하고
            신속하게 해결하기 위해 최선을 다합니다.
          </p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>2. 내부 분쟁 해결 절차</h2>
          <p>
            (1) 회원은 분쟁 발생 시, 플랫폼 내 제공되는 &quot;문의하기&quot;
            또는 &quot;신고&quot; 기능을 통해 문제를 접수할 수 있습니다.
          </p>
          <p>
            (2) 회사는 접수된 분쟁에 대해 7일 이내로 초기 검토를 진행하며,
            필요한 경우 추가 자료를 요청할 수 있습니다.
          </p>
          <p>
            (3) 검토가 완료된 후, 공정한 기준에 따라 분쟁 해결 방안을 회원에게
            안내합니다.
          </p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. 중재 및 조정</h2>
          <p>
            회원 간 합의가 이루어지지 않는 경우, 회사는 중재자로서 객관적인
            해결책을 제안할 수 있습니다. 중재 결과는 법적 구속력을 가지지
            않으며 회원 간 자발적인 합의를 기반으로 합니다.
          </p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>4. 외부 기관 이용</h2>
          <p>
            (1) 회사의 내부 분쟁 해결 절차에도 불구하고 분쟁이 해결되지 않는
            경우, 회원은 관련 법률에 따라 외부 기관(예: 한국소비자원,
            공정거래위원회) 또는 관할 법원에 분쟁 해결을 요청할 수 있습니다.
          </p>
          <p>
            (2) 외부 기관의 권고사항 및 판결에 대해 회사는 해당 법률에 따라
            이행할 의무를 가집니다.
          </p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>5. 관할 법원</h2>
          <p>
            회사와 회원 간의 분쟁은 협의로 해결함을 원칙으로 하며, 합의가
            이루어지지 않을 경우 회사의 본사 소재지에 위치한 관할 법원에서
            최종적으로 해결됩니다.
          </p>
        </section>
      </div>
    </div>
  );
}
