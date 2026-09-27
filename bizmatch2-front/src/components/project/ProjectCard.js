/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import projectCardStyle from "./ProjectCard.module.css";
import ReviewModal from "../ui/ReviewModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteScrapProject,
  scrapProject,
} from "../../stores/thunks/projectThunk";

export default function ProjectCard({ project, pjApplyId }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const email = JSON.parse(sessionStorage.getItem("info") || "null")?.emilAddr;
  const applyEmail = project?.applyProjectVOList;
  const foundEmail = applyEmail?.find((item) => item === email);
  const scrapProjectList = useSelector((state) => state.project.scrapProject);
  const [isActive, setIsActive] = useState(false);

  // scrapProjectList에서 pjId와 props.project.pjId가 일치하는지 확인.
  useEffect(() => {
    const isScrapped = scrapProjectList.some(
      (scrapProject) => scrapProject?.pjId === project?.pjId
    );
    setIsActive(isScrapped);
  }, [scrapProjectList, project?.pjId]); // scrapProjectList나 project.pjId가 변경될 때마다 실행

  const toggleActive = () => {
    if (isActive) {
      //스크랩취소
      dispatcher(deleteScrapProject(project?.pjId, email));
      setIsActive(!isActive);
    } else {
      //스크랩 추가
      dispatcher(scrapProject(project?.pjId, email));
      setIsActive(!isActive);
    }
  };
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false); // 리뷰 모달 상태

  // 신청하기 버튼 눌렀을 때
  const handleApplyButtonClick = (project) => {
    window.scrollTo(0, 0);
    navigate(`/project/apply/${project.pjId}`);
  };

  // 지원자 보기 버튼 눌렀을 때
  const handleApplyMemberButtonClick = (project) => {
    if (project?.paymentVO?.grntPdDt) {
      navigate(`/project/applicant/list/${project.pjId}`);
    } else {
      navigate(`/payment/depositPage/${project.pjId}`);
    }
  };

  // 완료하기 버튼 눌렀을 때
  const handleFinProjectButton = (project) => {
    window.scrollTo(0, 0);
    navigate(`/payment/downpaymentPage/${project.pjId}`);
  };

  // 지원서 보기 눌렀을 때
  const handleApplyScriptButtonClick = () => {
    window.scrollTo(0, 0);
    navigate(`/project/myapply/view/${project?.pjApplyId}`);
  };

  // 리뷰 쓰기 버튼 클릭
  const handleWriteReviewButtonClick = () => {
    setIsReviewModalOpen(true);
  };

  // 리뷰 닫는 버튼
  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  const getProjectStatusText = (pjStt) => {
    switch (pjStt) {
      case 0:
        return <div className={projectCardStyle.statusRecruiting}>모집중</div>;
      case 1:
        return <div className={projectCardStyle.statusDone}>완료</div>;
      case 2:
        return <div className={projectCardStyle.statusIng}>진행중</div>;
      case 3:
        return (
          <div className={projectCardStyle.statusAdditionalRecruiting}>
            추가 모집중
          </div>
        );
      case 4:
        return <div className={projectCardStyle.statusEnd}>최종 완료</div>;
      default:
        return "모집중";
    }
  };

  const getProjectStatusTextButton = (pjStt) => {
    switch (pjStt) {
      case 0:
        return (
          <input
            className={projectCardStyle.apply}
            type="button"
            onClick={() => handleApplyMemberButtonClick(project)}
            value="지원 기업 보기"
          />
        );
      case 1:
        return (
          <input
            className={projectCardStyle.apply}
            type="button"
            onClick={() => handleWriteReviewButtonClick(project)} // 리뷰쓰기 클릭이벤트 만들기
            value="리뷰 쓰기"
          />
        );
      case 2:
        return (
          <input
            className={projectCardStyle.apply}
            type="button"
            onClick={() => handleFinProjectButton(project)}
            value="완료하기"
          />
        );
      case 3:
        return (
          <input
            className={projectCardStyle.apply}
            type="button"
            onClick={() => handleApplyMemberButtonClick(project)}
            value="지원 기업 보기"
          />
        );
      default:
        return;
    }
  };

  const formattedAmount = project?.cntrctAccnt?.toLocaleString();

  return (
    <>
      <div className={projectCardStyle.projectCardContainer}>
        <div className={projectCardStyle.projectCard}>
          <div className={projectCardStyle.projectBox}>
            <div className={projectCardStyle.projectHead}>
              <div className={projectCardStyle.projectHeadFront}>
                {getProjectStatusText(project?.pjStt)}
                <div></div>
                <h2 id="pjttl" className={projectCardStyle.projectTitle}>
                  <Link to={`/project/info/${project?.pjId}`}>
                    {project?.pjTtl}
                  </Link>
                </h2>
                <div></div>
                <div className={projectCardStyle.postDate}>
                  {project?.rgstrDt}{" "}
                  {isActive ? (
                    <FontAwesomeIcon
                      onClick={toggleActive}
                      icon={faStar}
                      style={{ color: "#ffd700" }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      onClick={toggleActive}
                      icon={faStarOutline}
                      style={{ color: "#ffd700" }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className={projectCardStyle.projectBody}>
              <div className={projectCardStyle.projectBodyBox}>
                <div className={projectCardStyle.projectBodyTitle}>
                  프로젝트 분야
                </div>
                {project &&
                project.projectIndustryVO &&
                project.projectIndustryVO.indstrInfoVO
                  ? project.projectIndustryVO.indstrInfoVO.indstrNm
                  : "정보 없음"}{" "}
                {/* Null check */}
              </div>
              <div className={projectCardStyle.sidebar}></div>
              <div className={projectCardStyle.projectBodyBox}>
                <div className={projectCardStyle.projectBodyTitle}>
                  관련기술
                </div>
                <div className={projectCardStyle.skillList}>
                  {project?.projectSkillList
                    ?.slice(0, 2)
                    .map((projectSkil, index) => (
                      <label key={index} className={projectCardStyle.skillItem}>
                        <span className={projectCardStyle.dot}></span>
                        {projectSkil.prmStk}
                      </label>
                    ))}
                </div>
                <div className={projectCardStyle.projectBodyContent}>
                  <div className={projectCardStyle.language}></div>
                </div>
              </div>
              <div className={projectCardStyle.sidebar}></div>
              <div className={projectCardStyle.projectBodyBox}>
                <div className={projectCardStyle.projectBodyTitle}>
                  모집 마감일
                </div>
                {project?.pjRcrutEndDt}
              </div>
              <div className={projectCardStyle.sidebar}></div>
              <div className={projectCardStyle.projectBodyBox}>
                <div className={projectCardStyle.projectBodyTitle}>
                  프로젝트 일정
                </div>
                {project?.strtDt}~{project?.endDt}
              </div>
            </div>
            <div className={projectCardStyle.projectFooter}>
              <div className={projectCardStyle.buttonBox}>
                {location.pathname === "/project/findpage" &&
                !foundEmail &&
                project?.ordrId !== email ? (
                  <input
                    className={projectCardStyle.apply}
                    type="button"
                    onClick={() => handleApplyButtonClick(project)}
                    value="신청하기"
                  />
                ) : location.pathname === "/project/findpage" &&
                  project?.ordrId === email ? (
                  <input
                    className={projectCardStyle.apply}
                    type="button"
                    onClick={() => handleApplyMemberButtonClick(project)}
                    value="지원기업 보기"
                  />
                ) : location.pathname === "/project/myorder" &&
                  project?.ordrId === email ? (
                  getProjectStatusTextButton(project.pjStt)
                ) : location.pathname === "/project/myapply" && pjApplyId ? (
                  <input
                    className={projectCardStyle.apply}
                    type="button"
                    onClick={handleApplyScriptButtonClick}
                    value="지원서 수정하기"
                  />
                ) : location.pathname === "/project/scrap" &&
                  project?.ordrId === email ? (
                  <input
                    className={projectCardStyle.apply}
                    type="button"
                    onClick={() => handleApplyMemberButtonClick(project)}
                    value="지원기업 보기"
                  />
                ) : location.pathname === "/project/scrap" ? (
                  <input
                    className={projectCardStyle.apply}
                    type="button"
                    onClick={() => handleApplyButtonClick(project)}
                    value="신청하기"
                  />
                ) : (
                  location.pathname.match(/^\/project\/info\//) && <div></div>
                )}
              </div>

              <div className={projectCardStyle.estimatedAmount}>
                <div className={projectCardStyle.halfSidebar}>
                  <div>예상 금액</div>
                </div>
                {formattedAmount}원
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 리뷰 모달 렌더링 */}
      {isReviewModalOpen && (
        <ReviewModal onClose={closeReviewModal} reviewData={project} />
      )}
    </>
  );
}
