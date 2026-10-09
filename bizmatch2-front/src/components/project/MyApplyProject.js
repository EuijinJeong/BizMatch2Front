import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getApplyProjectList } from "../../stores/thunks/projectThunk";
import ProjectCard from "./ProjectCard";
import styled from "styled-components";
import Pagination from "../pagenationApi/Pagination";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
`;

const MainContainerHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const MainTitle = styled.h1`
  padding-top: 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #495057;
  margin: 0;
  text-align: center;
  a {
    text-decoration: none;
    color: inherit;
    transition: color 0.3s ease;

    &:hover {
      color: #007bff;
    }
  }
`;
export default function MyApplyProject() {
  const sessionInfo = JSON.parse(sessionStorage.getItem("info") || "null");
  const email = sessionInfo?.emilAddr;
  const mbrCtgry = sessionInfo?.mbrCtgry;
  const dispatcher = useDispatch();
  const myApplyProjectList = useSelector((state) => state.project.myApplyData);
  useEffect(() => {
    dispatcher(getApplyProjectList(email));
  }, [email, dispatcher]);
  const ctgrtView = (mbrCtgry) => {
    if (mbrCtgry === 0 || mbrCtgry === 2) {
      return (
        <MainContainer>
          <MainContainerHeader>
            <MainTitle>
              <NavLink to={"/project/myapply"}>
                내가 지원한 프로젝트 목록
              </NavLink>
            </MainTitle>

            <MainTitle>/</MainTitle>

            <MainTitle>
              <NavLink to={"/project/myorder"}>내 프로젝트 목록</NavLink>
            </MainTitle>

            <MainTitle>/</MainTitle>

            <MainTitle>
              <NavLink to={"/project/scrap"}>즐겨찾는 프로젝트</NavLink>
            </MainTitle>
          </MainContainerHeader>
        </MainContainer>
      );
    } else if (mbrCtgry === 1) {
      return (
        <MainContainer>
          <MainContainerHeader>
            <MainTitle>
              <NavLink to={"/project/myapply"}>
                내가 지원한 프로젝트 목록
              </NavLink>
            </MainTitle>

            <MainTitle>/</MainTitle>

            <MainTitle>
              <NavLink to={"/project/scrap"}>즐겨찾는 프로젝트</NavLink>
            </MainTitle>
          </MainContainerHeader>
        </MainContainer>
      );
    }
  };
  const [currentPageItems, setCurrentPageItems] = useState([]);
  const itemsPerPage = 5;
  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    setCurrentPageItems(myApplyProjectList.slice(startIdx, endIdx));
  };

  useEffect(() => {
    if (myApplyProjectList.length > 0) {
      handlePageChange(1);
    } else {
      setCurrentPageItems([]); // 댓글이 없을 경우 currentPageItems 초기화
    }
  }, [myApplyProjectList]);
  return (
    <>
      {ctgrtView(mbrCtgry)}
      {currentPageItems?.length === 0 ? (
        <MainTitle>지원서가 없습니다.</MainTitle>
      ) : (
        currentPageItems?.map((project) => (
          <ProjectCard
            key={`${project.pjId}-${project?.pjApplyId}`}
            project={project?.projectVO}
            pjApplyId={project?.pjApplyId}
          />
        ))
      )}

      <Pagination
        items={myApplyProjectList}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}
