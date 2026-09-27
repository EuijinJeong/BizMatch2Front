import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Wrap = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-bottom: 2.5rem;
  margin-bottom: 1.5rem;
`;

const Dot = styled.div`
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  transition: background-color 0.2s ease, color 0.2s ease,
    box-shadow 0.2s ease;

  ${(props) =>
    props.$state === "done" &&
    `
      background-color: var(--color-teal);
      color: #ffffff;
    `}

  ${(props) =>
    props.$state === "active" &&
    `
      background-color: var(--color-primary);
      color: #ffffff;
      box-shadow: 0 0 0 4px rgba(51, 80, 224, 0.18);
    `}

  ${(props) =>
    props.$state === "upcoming" &&
    `
      background-color: #edf1ff;
      color: var(--color-text-muted);
    `}
`;

const Bar = styled.div`
  flex-shrink: 0;
  width: 2.25rem;
  height: 2px;
  margin: 0.9rem 0.35rem 0;
  background-color: ${(props) =>
    props.$filled ? "var(--color-teal)" : "var(--color-border)"};
  transition: background-color 0.2s ease;
`;

const StepLabel = styled.span`
  position: absolute;
  top: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 6rem;
  text-align: center;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.4;
  white-space: nowrap;
  color: ${(props) =>
    props.$state === "upcoming" ? "var(--color-text-muted)" : "var(--color-navy-900)"};
`;

const StepItem = styled.div`
  position: relative;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
`;

export default function SignupStepProgress({ steps, currentStep }) {
  return (
    <Wrap>
      {steps.map((label, index) => {
        const stepNum = index + 1;
        const state =
          stepNum < currentStep
            ? "done"
            : stepNum === currentStep
            ? "active"
            : "upcoming";

        return (
          <React.Fragment key={label}>
            <StepItem>
              <Dot $state={state}>
                {state === "done" ? <FontAwesomeIcon icon={faCheck} /> : stepNum}
              </Dot>
              <StepLabel $state={state}>{label}</StepLabel>
            </StepItem>
            {index < steps.length - 1 && (
              <Bar $filled={stepNum < currentStep} />
            )}
          </React.Fragment>
        );
      })}
    </Wrap>
  );
}
