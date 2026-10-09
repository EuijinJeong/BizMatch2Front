import React, { useRef, useState, useEffect } from "react";
import FreelancerSignupStyle from "./FreelancerSignup.module.css";
import {
  emailSend,
  emailCheck,
  authNumCheck,
  signupFreelancerMember,
} from "../http/api/userApi";
import CategoryBar from "../common/CategoryBar";
import CategoryBar2 from "../common/CategoryBar2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  faUserTie,
  faUser,
  faCalendarDays,
  faLocationDot,
  faPhone,
  faEnvelope,
  faLock,
  faShieldHalved,
  faPaperclip,
  faFileContract,
  faCloudArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SignupPageHeader from "./SignupPageHeader";
import SignupStepProgress from "./SignupStepProgress";

const FREELANCER_TRUST_BULLETS = [
  "본인 인증 절차",
  "에스크로 안전 정산",
  "맞춤 프로젝트 추천",
];

const STEP_LABELS = ["기본 정보", "첨부 및 추가 정보", "약관 동의"];
const TOTAL_STEPS = STEP_LABELS.length;

const SignupBox = styled.div`
  max-width: 34rem;
  margin: 0 auto 3rem;
  padding: 2.5rem;
  background-color: #ffffff;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  box-shadow: 0 12px 32px rgba(19, 30, 74, 0.08);
`;

const StepPanel = styled.div`
  display: ${(props) => (props.$active ? "block" : "none")};
`;

const SectionLabel = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: var(--color-primary);
  background: #edf1ff;
  border: 1px solid rgba(93, 120, 230, 0.3);
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  margin: 1.5rem 0;
`;

const NavRow = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 2rem;

  button {
    flex: 1;
  }
`;

const PrevButton = styled.button`
  width: 100%;
  padding: 0.95rem 2rem;
  font-size: 1.05rem;
  font-weight: 700;
  background-color: #ffffff;
  color: var(--color-navy-900);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;

  &:hover {
    background-color: var(--color-bg);
    transform: translateY(-2px);
  }
`;

const RedWord = styled.span`
  color: #e5484d;
`;

const AuthNumField = styled.input`
  padding: 0.85rem 1rem;
  font-size: 0.95rem;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background-color: #f8f9fd;
  flex-grow: 1;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease,
    background-color 0.2s ease;

  &:focus {
    border-color: var(--color-primary);
    background-color: var(--color-surface);
    box-shadow: 0 0 0 4px rgba(51, 80, 224, 0.12);
  }
`;

const ConfirmAuthNumButton = styled.button`
  padding: 0.85rem 1.2rem;
  font-size: 0.95rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--color-teal), #12bf7e);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  box-shadow: 0 8px 18px rgba(14, 164, 107, 0.3);
  transition: filter 0.2s ease,
    transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;

  &:hover {
    filter: brightness(0.94);
    transform: translateY(-2px);
    box-shadow: 0 12px 22px rgba(14, 164, 107, 0.38);
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }
`;

const InputIconRow = styled.div`
  position: relative;
  flex-grow: 1;

  svg {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    color: var(--color-text-muted);
    font-size: 0.9rem;
    pointer-events: none;
    transition: color 0.2s ease;
  }

  input:focus ~ svg,
  input:not(:placeholder-shown) ~ svg {
    color: var(--color-primary);
  }

  input {
    padding-left: 2.6rem !important;
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 1.75rem;

  p {
    font-size: 0.92rem;
    font-weight: 700;
    color: var(--color-navy-900);
  }

  input {
    padding: 0.85rem 1rem;
    font-size: 0.95rem;
    border: 1px solid var(--color-border);
    border-radius: 12px;
    background-color: #f8f9fd;
    outline: none;
    width: 100%;
    transition: border-color 0.2s ease, box-shadow 0.2s ease,
      background-color 0.2s ease;

    &:focus {
      border-color: var(--color-primary);
      background-color: var(--color-surface);
      box-shadow: 0 0 0 4px rgba(51, 80, 224, 0.12);
    }
  }

  p.cmpMsg {
    color: #e5484d;
    font-size: 0.85rem;
    font-weight: 400;
    margin-top: 0.2rem;
  }
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 1.75rem;

  p {
    font-size: 0.92rem;
    font-weight: 700;
    color: var(--color-navy-900);
  }

  div {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    flex-wrap: wrap;
  }

  input {
    padding: 0.85rem 1rem;
    font-size: 0.95rem;
    border: 1px solid var(--color-border);
    border-radius: 12px;
    background-color: #f8f9fd;
    flex-grow: 1;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease,
      background-color 0.2s ease;

    &:focus {
      border-color: var(--color-primary);
      background-color: var(--color-surface);
      box-shadow: 0 0 0 4px rgba(51, 80, 224, 0.12);
    }
  }

  button {
    padding: 0.85rem 1.2rem;
    font-size: 0.95rem;
    font-weight: 700;
    background: linear-gradient(135deg, var(--color-primary), #4a63e8);
    color: white;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    box-shadow: 0 8px 18px rgba(51, 80, 224, 0.3);
    transition: filter 0.2s ease,
      transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;

    &:hover {
      filter: brightness(0.94);
      transform: translateY(-2px);
      box-shadow: 0 12px 22px rgba(51, 80, 224, 0.38);
    }

    &:active {
      transform: translateY(0) scale(0.98);
    }
  }
`;

const ComAddr = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 1.75rem;

  p {
    font-size: 0.92rem;
    font-weight: 700;
    color: var(--color-navy-900);
  }
`;

const ComDiv = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;

  input {
    padding: 0.85rem 1rem;
    font-size: 0.95rem;
    border: 1px solid var(--color-border);
    border-radius: 12px;
    background-color: #f8f9fd;
    flex-grow: 1;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease,
      background-color 0.2s ease;

    &:focus {
      border-color: var(--color-primary);
      background-color: var(--color-surface);
      box-shadow: 0 0 0 4px rgba(51, 80, 224, 0.12);
    }
  }

  button {
    padding: 0.85rem 1.2rem;
    font-size: 0.95rem;
    font-weight: 700;
    background: linear-gradient(135deg, var(--color-primary), #4a63e8);
    color: white;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    box-shadow: 0 8px 18px rgba(51, 80, 224, 0.3);
    transition: filter 0.2s ease,
      transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;

    &:hover {
      filter: brightness(0.94);
      transform: translateY(-2px);
      box-shadow: 0 12px 22px rgba(51, 80, 224, 0.38);
    }

    &:active {
      transform: translateY(0) scale(0.98);
    }
  }
`;

const Timer = styled.span`
  font-size: 0.9rem;
  color: #e5484d;
  font-weight: 600;
`;

const ErrorMsg = styled.p`
  color: #e5484d;
  font-size: 0.9rem;
  margin-top: 0.4rem;
`;

const FileBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AddFile = styled.div`
  position: relative;
`;

const FileDropLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 2rem 1rem;
  border: 1.5px dashed var(--color-border);
  border-radius: 14px;
  background-color: #f8f9fd;
  color: var(--color-text-muted);
  cursor: pointer;
  text-align: center;
  transition: border-color 0.2s ease, background-color 0.2s ease,
    color 0.2s ease;

  svg {
    font-size: 1.5rem;
    color: var(--color-primary);
  }

  span {
    font-size: 0.88rem;
    font-weight: 600;
  }

  small {
    font-size: 0.78rem;
    color: var(--color-text-muted);
    font-weight: 400;
  }

  &:hover {
    border-color: var(--color-primary);
    background-color: #edf1ff;
  }
`;

const HiddenFileInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const FileList = styled.ul`
  list-style: none;
  padding-left: 0;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
    padding: 0.5rem 0.8rem;
    background-color: var(--color-bg);
    border-radius: 8px;
    margin-bottom: 0.5rem;
  }

  button {
    padding: 0.35rem 0.75rem;
    font-size: 0.85rem;
    font-weight: 600;
    background-color: #ffffff;
    color: #e5484d;
    border: 1px solid #f4c7c6;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #fdeeee;
    }
  }
`;

const CheckBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.75rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-bg);
  padding: 1.5rem;
  border-radius: 14px;

  p {
    font-size: 0.92rem;
    color: var(--color-text);
  }

  div {
    display: flex;
    align-items: center;
    gap: 0.7rem;
  }

  input[type="checkbox"] {
    width: 1.1rem;
    height: 1.1rem;
    accent-color: var(--color-primary);
  }
`;

const SignupButton = styled.button`
  width: 100%;
  padding: 0.95rem 2rem;
  font-size: 1.05rem;
  font-weight: 700;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(51, 80, 224, 0.35);
  transition: background-color 0.2s ease, transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    background-color: var(--color-primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 10px 22px rgba(51, 80, 224, 0.45);
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }
`;

export default function FreelancerSignup() {
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]); // 파일 목록 상태 관리

  const [timer, setTimer] = useState(300);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const mins = Math.floor(timer / 60);
    const secs = timer % 60;
    setMinutes(mins);
    setSeconds(secs);
  }, [timer]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(interval);
            setTimer(300);
            return 0;
          } else {
            return prevTimer - 1;
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
      setTimer(300);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  // 파일 추가
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFileList((prevList) => [...prevList, ...files]); // 이전 파일 목록에 새 파일 추가
  };

  // 파일 삭제
  const handleFileRemove = (index) => {
    setFileList((prevList) => prevList.filter((_, i) => i !== index)); // 해당 인덱스 파일 제거
  };

  const nameRef = useRef();
  const birthDtRef = useRef();
  const emailRef = useRef();
  const authNumRef = useRef();
  const phoneNumRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const agreeOneRef = useRef();
  const agreeTwoRef = useRef();
  const agreeThreeRef = useRef();
  const postcodeRef = useRef();
  const addressRef = useRef();
  const detailAddressRef = useRef();
  const extraAddressRef = useRef();
  const fileRef = useRef();

  const [pwdMatch, setPwdMatch] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isAuthVerified, setIsAuthVerified] = useState(false);

  const { selectedMajorCategory, selectedSubCategory } = useSelector(
    (state) => state.category1
  );

  const { selectedMajorCategory2, selectedSubCategory2 } = useSelector(
    (state) => state.category2
  );

  const handlePasswordValidation = () => {
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const isValid = passwordRegex.test(password);

    setPwdMatch(isValid && password === confirmPassword);
  };

  const handleEmailCheck = async () => {
    const email = emailRef.current.value;
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (email.length < 7) {
      alert("이메일은 최소 7자리 이상입니다.");
    }
    try {
      const response = await emailCheck(email);
      if (!response.body) {
        alert("이미 사용 중인 이메일입니다.");
        return;
      }
      await emailSend(email);
      alert("인증번호가 발송되었습니다.");
      setIsRunning(true);
    } catch (error) {
      console.error("Error during email check:", error);
    }
  };

  const handleAuthNum = async () => {
    try {
      const authNum = authNumRef.current.value;
      const email = emailRef.current.value;
      const response = await authNumCheck(email, authNum);
      if (!response) {
        alert("인증번호가 일치하지 않습니다.");
        return;
      } else {
        alert("인증 완료");
        setIsRunning(false);
        setIsAuthVerified(true);
      }
    } catch (error) {
      //console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !agreeOneRef.current.checked ||
      !agreeTwoRef.current.checked ||
      !agreeThreeRef.current.checked
    ) {
      alert("모든 약관에 동의해주세요.");
      return;
    }
    if (pwdMatch === false) {
      alert("비밀번호를 확인해주세요.");
      return;
    }

    const files = fileRef.current.files;
    const formData = new FormData(); // FormData 객체 생성

    fileList.forEach((file) => formData.append("fileList", file)); // 파일 추가

    if (files.length === 0) {
      alert("첨부파일은 필수 입력란입니다.");
      return;
    }

    formData.append("mbrNm", nameRef.current.value); // 회원 이름.
    formData.append("emilAddr", emailRef.current.value); // 이메일 주소
    formData.append("emilAddrCnfrmNmbr", authNumRef.current.value); // 이메일 인증번호
    formData.append("brthDt", birthDtRef.current.value);
    formData.append("pwd", passwordRef.current.value); // 비밀번호
    formData.append("mjrId", selectedMajorCategory); // 대분류 아이디
    formData.append("smjrId", selectedSubCategory); // 중분류 아이디
    formData.append("lkInSdstrId.mjrId", selectedMajorCategory2);
    formData.append("lkInSdstrId.smjrId", selectedSubCategory2);
    formData.append("mbrPhnNum", phoneNumRef.current.value); // 회원 전화번호
    formData.append("addr.postcode", postcodeRef.current.value); // 주소
    formData.append("addr.addr", addressRef.current.value);
    formData.append("addr.detailAddress", detailAddressRef.current.value);
    formData.append("addr.extraAddress", extraAddressRef.current.value);
    formData.append("agree1", agreeOneRef.current.value);
    formData.append("agree2", agreeTwoRef.current.value);
    formData.append("agree3", agreeThreeRef.current.value);

    const respose = await signupFreelancerMember(formData);
    if (respose) {
      alert("회원가입이 완료되었습니다.");
      // 메인화면으로 link
      navigate("/");
    } else if (!respose) {
      //console.log(respose.error);
      return;
    }
  };

  function sample6_execDaumPostcode() {
    // eslint-disable-next-line no-undef
    new daum.Postcode({
      oncomplete: function (data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var addr = ""; // 주소 변수
        var extraAddr = ""; // 참고항목 변수
        //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === "R") {
          // 사용자가 도로명 주소를 선택했을 경우
          addr = data.roadAddress;
        } else {
          // 사용자가 지번 주소를 선택했을 경우(J)
          addr = data.jibunAddress;
        }
        // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
        if (data.userSelectedType === "R") {
          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if (data.buildingName !== "" && data.apartment === "Y") {
            extraAddr +=
              extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
          }
          // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if (extraAddr !== "") {
            extraAddr = " (" + extraAddr + ")";
          }
          // 조합된 참고항목을 해당 필드에 넣는다.
          document.getElementById("extraAddress").value = extraAddr;
        } else {
          document.getElementById("extraAddress").value = "";
        }
        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        document.getElementById("postcode").value = data.zonecode;
        document.getElementById("addr").value = addr;
        // 커서를 상세주소 필드로 이동한다.
        document.getElementById("detailAddress").focus();
      },
    }).open();
  }

  const validateStep1 = () => {
    if (!nameRef.current.value) {
      alert("이용자명을 입력해주세요.");
      return false;
    }
    if (!birthDtRef.current.value) {
      alert("생년월일을 입력해주세요.");
      return false;
    }
    if (!postcodeRef.current.value || !addressRef.current.value) {
      alert("주소를 입력해주세요.");
      return false;
    }
    if (!phoneNumRef.current.value) {
      alert("이용자 전화번호를 입력해주세요.");
      return false;
    }
    if (!emailRef.current.value) {
      alert("이메일을 입력해주세요.");
      return false;
    }
    if (!isAuthVerified) {
      alert("이메일 인증을 완료해주세요.");
      return false;
    }
    if (!passwordRef.current.value || pwdMatch !== true) {
      alert("비밀번호를 확인해주세요.");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!fileRef.current.files || fileRef.current.files.length === 0) {
      alert("첨부파일을 등록해주세요.");
      return false;
    }
    if (!selectedSubCategory) {
      alert("주요 산업분야를 선택해주세요.");
      return false;
    }
    if (!selectedSubCategory2) {
      alert("관심 산업분야를 선택해주세요.");
      return false;
    }
    return true;
  };

  const STEP_VALIDATORS = [validateStep1, validateStep2];

  const goNext = () => {
    const validator = STEP_VALIDATORS[currentStep - 1];
    if (validator && !validator()) return;
    setCurrentStep((step) => Math.min(step + 1, TOTAL_STEPS));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goPrev = () => {
    setCurrentStep((step) => Math.max(step - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <SignupPageHeader
        icon={faUserTie}
        title="프리랜서 회원가입"
        description="사업자 등록증 없이도 가입할 수 있어요."
        bullets={FREELANCER_TRUST_BULLETS}
      />
      <SignupBox>
        <SignupStepProgress steps={STEP_LABELS} currentStep={currentStep} />
        <p>
          <RedWord>*</RedWord>은 필수입력사항입니다.
        </p>

        <StepPanel $active={currentStep === 1}>
        <SectionLabel><FontAwesomeIcon icon={faUser} />기본 정보</SectionLabel>
        <TextBox>
          <p>
            <RedWord>*</RedWord>이용자명
          </p>
          <InputIconRow>
            <input
              id="mbrNm"
              type="text"
              name="mbrNm"
              placeholder="이름 입력"
              ref={nameRef}
            />
            <FontAwesomeIcon icon={faUser} />
          </InputIconRow>
        </TextBox>

        <TextBox>
          <p>
            <RedWord>*</RedWord>생년월일
          </p>
          <InputIconRow>
            <input id="brthDt" type="date" name="brthDt" ref={birthDtRef} />
            <FontAwesomeIcon icon={faCalendarDays} />
          </InputIconRow>
        </TextBox>

        <ComAddr>
          <p>
            <RedWord>*</RedWord>주소
          </p>
          <ComDiv>
            <InputIconRow>
              <input
                type="text"
                id="postcode"
                placeholder="우편번호 입력"
                name="addr.postcode"
                ref={postcodeRef}
              />
              <FontAwesomeIcon icon={faLocationDot} />
            </InputIconRow>
            <button type="button" id="asd" onClick={sample6_execDaumPostcode}>
              도로명 주소 찾기
            </button>
          </ComDiv>
          <ComDiv>
            <input
              type="text"
              id="addr"
              placeholder="도로명 주소 입력"
              name="addr.addr"
              ref={addressRef}
            />
            <input
              type="text"
              id="detailAddress"
              placeholder="상세주소 입력"
              name="addr.detailAddress"
              ref={detailAddressRef}
            />
            <input
              type="text"
              id="extraAddress"
              placeholder="참고항목"
              name="addr.extraAddress"
              ref={extraAddressRef}
            />
          </ComDiv>
        </ComAddr>

        <TextBox>
          <p>
            <RedWord>*</RedWord>이용자 전화번호
          </p>
          <InputIconRow>
            <input
              id="mbrPhnNum"
              type="tel"
              name="mbrPhnNum"
              placeholder="전화번호 입력"
              ref={phoneNumRef}
            />
            <FontAwesomeIcon icon={faPhone} />
          </InputIconRow>
        </TextBox>

        <BtnBox>
          <p>
            <RedWord>*</RedWord>이메일주소
          </p>
          <div>
            <InputIconRow>
              <input
                id="emilAddr"
                type="email"
                name="emilAddr"
                placeholder="업무용 이메일 사용을 권장합니다."
                ref={emailRef}
              />
              <FontAwesomeIcon icon={faEnvelope} />
            </InputIconRow>
            <button
              type="button"
              id="confirm-email"
              className={FreelancerSignupStyle.emailSubmit}
              onClick={handleEmailCheck}
            >
              이메일 주소 인증
            </button>
          </div>
        </BtnBox>

        <BtnBox>
          <p>
            <RedWord>*</RedWord>이메일 주소 인증번호
          </p>
          <div>
            <div>
              <InputIconRow>
                <AuthNumField
                  id="authNumField"
                  name="emilAddrCnfrmNmbr"
                  type="text"
                  placeholder="인증번호 6자리 입력"
                  ref={authNumRef}
                />
                <FontAwesomeIcon icon={faShieldHalved} />
              </InputIconRow>
              <Timer>
                {minutes}:{seconds < 10 ? "0" : ""}
                {seconds}
              </Timer>
            </div>
            <ConfirmAuthNumButton
              id="confirm-auth-num"
              type="button"
              onClick={handleAuthNum}
            >
              인증번호 확인
            </ConfirmAuthNumButton>
          </div>
        </BtnBox>

        <TextBox>
          <p>
            <RedWord>*</RedWord>비밀번호
          </p>
          <InputIconRow>
            <input
              id="pwd"
              type="password"
              name="pwd"
              placeholder="대소문자 및 특수문자 포함 8자리 이상 입력"
              onChange={handlePasswordValidation}
              ref={passwordRef}
            />
            <FontAwesomeIcon icon={faLock} />
          </InputIconRow>
        </TextBox>

        <TextBox>
          <p>
            <RedWord>*</RedWord>비밀번호 확인
          </p>
          <InputIconRow>
            <input
              type="password"
              name="confirmPwd"
              placeholder="비밀번호 확인"
              onChange={handlePasswordValidation}
              ref={confirmPasswordRef}
            />
            <FontAwesomeIcon icon={faLock} />
          </InputIconRow>
          {pwdMatch === false && (
            <ErrorMsg>비밀번호가 일치하지 않습니다.</ErrorMsg>
          )}
        </TextBox>
        </StepPanel>

        <StepPanel $active={currentStep === 2}>
        <SectionLabel><FontAwesomeIcon icon={faPaperclip} />첨부 및 추가 정보</SectionLabel>
        <BtnBox>
          <p>
            <RedWord>*</RedWord>이용자 첨부파일
          </p>
          <FileBox>
            <AddFile>
              <FileDropLabel htmlFor="freelancerFileInput">
                <FontAwesomeIcon icon={faCloudArrowUp} />
                <span>
                  {fileList.length > 0
                    ? `${fileList.length}개 파일 선택됨 · 추가로 선택하기`
                    : "클릭하여 파일을 선택하세요"}
                </span>
                <small>PDF, 이미지 등 여러 개 첨부 가능</small>
              </FileDropLabel>
              <HiddenFileInput
                id="freelancerFileInput"
                type="file"
                name="fileList[0]"
                ref={fileRef}
                onChange={handleFileChange}
                multiple
              />
            </AddFile>
            <FileList>
              {fileList.map((file, index) => (
                <li key={index}>
                  {file.name}{" "}
                  <button
                    type="button"
                    onClick={() => handleFileRemove(index)} // 파일 삭제 핸들러
                  >
                    삭제
                  </button>
                </li>
              ))}
            </FileList>
          </FileBox>
        </BtnBox>

        <TextBox>
          <p>
            <RedWord>*</RedWord>주요 산업분야
          </p>
          <CategoryBar />
        </TextBox>
        <TextBox>
          <p>
            <RedWord>*</RedWord>관심 산업분야
          </p>
          <CategoryBar2 />
        </TextBox>
        </StepPanel>

        <StepPanel $active={currentStep === 3}>
        <SectionLabel><FontAwesomeIcon icon={faFileContract} />약관 동의</SectionLabel>
        <TextBox>
          <p>
            <RedWord>*</RedWord>이용약관
          </p>
        </TextBox>

        <CheckBox>
          <div>
            <input
              id="ageCheck"
              type="checkbox"
              name="agreeOne"
              ref={agreeOneRef}
            />
            <p>만 14세 이상입니다.</p>
          </div>
          <div>
            <input
              id="termsCheck"
              type="checkbox"
              name="agreeTwo"
              ref={agreeTwoRef}
            />
            <p>서비스 이용약관에 동의합니다.</p>
          </div>
          <div>
            <input
              id="privacyCheck"
              type="checkbox"
              name="agreeThree"
              ref={agreeThreeRef}
            />
            <p>개인정보 수집 및 이용에 동의합니다.</p>
          </div>
        </CheckBox>
        </StepPanel>

        <NavRow>
          {currentStep > 1 && (
            <PrevButton type="button" onClick={goPrev}>
              이전
            </PrevButton>
          )}
          {currentStep < TOTAL_STEPS ? (
            <SignupButton type="button" onClick={goNext}>
              다음
            </SignupButton>
          ) : (
            <SignupButton type="submit" onClick={handleSubmit}>
              가입하기
            </SignupButton>
          )}
        </NavRow>
      </SignupBox>
    </>
  );
}
