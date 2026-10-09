import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { readScrapProject } from "../../stores/thunks/projectThunk";
import ProjectCard from "../project/ProjectCard";
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
export default function ProjectScrap() {
  const sessionInfo = JSON.parse(sessionStorage.getItem("info") || "null");
  const email = sessionInfo?.emilAddr;
  const mbrCtgry = sessionInfo?.mbrCtgry;
  const dispatcher = useDispatch();
  const projectList = useSelector((state) => state.project.scrapProject);

  useEffect(() => {
    dispatcher(readScrapProject(email));
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
    setCurrentPageItems(projectList.slice(startIdx, endIdx));
  };

  useEffect(() => {
    if (projectList.length > 0) {
      handlePageChange(1);
    } else {
      setCurrentPageItems([]); // 댓글이 없을 경우 currentPageItems 초기화
    }
  }, [projectList]);

  return (
    <>
      {" "}
      {ctgrtView(mbrCtgry)}
      {currentPageItems.map((project) => {
        return <ProjectCard key={project.pjId} project={project.projectVO} />;
      })}
      <Pagination
        items={projectList}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}
