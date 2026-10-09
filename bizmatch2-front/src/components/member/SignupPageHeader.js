import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Header = styled.div`
  max-width: 34rem;
  margin: 3rem auto 1.75rem;
  padding: 0 1.5rem;
  text-align: center;
`;

const IconBadge = styled.div`
  width: 3.25rem;
  height: 3.25rem;
  margin: 0 auto;
  border-radius: 14px;
  background: #edf1ff;
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  line-height: 1;

  svg {
    display: block;
  }
`;

const Title = styled.h1`
  margin-top: 1.1rem;
  font-size: 1.7rem;
  font-weight: 800;
  color: var(--color-navy-900);
  letter-spacing: -0.01em;
`;

const Description = styled.p`
  margin-top: 0.6rem;
  color: var(--color-text-muted);
  font-size: 0.95rem;
  line-height: 1.6;
`;

const TrustRow = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.6rem 1.4rem;
`;

const TrustItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-text-muted);
`;

const TrustDot = styled.span`
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  background: rgba(14, 164, 107, 0.14);
  color: var(--color-teal);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  flex-shrink: 0;
`;

export default function SignupPageHeader({ icon, title, description, bullets }) {
  return (
    <Header>
      <IconBadge>
        <FontAwesomeIcon icon={icon} />
      </IconBadge>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <TrustRow>
        {bullets.map((bullet) => (
          <TrustItem key={bullet}>
            <TrustDot>
              <FontAwesomeIcon icon={faCheck} />
            </TrustDot>
            {bullet}
          </TrustItem>
        ))}
      </TrustRow>
    </Header>
  );
}
