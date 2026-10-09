import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getOrderProjectList } from "../../stores/thunks/projectThunk";
import ProjectCard from "./ProjectCard";
import Pagination from "../pagenationApi/Pagination";

// Styled Components
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

  a {
    text-decoration: none;
    color: inherit;
    transition: color 0.3s ease;

    &:hover {
      color: #007bff;
    }
  }
`;

export default function MyOrderProject() {
  const email = JSON.parse(sessionStorage.getItem("info") || "null")?.emilAddr;
  const dispatcher = useDispatch();
  const myOrderProjectList = useSelector((state) => state.project.myData);

  useEffect(() => {
    dispatcher(getOrderProjectList(email));
  }, [email, dispatcher]);

  const [currentPageItems, setCurrentPageItems] = useState([]);
  const itemsPerPage = 5;
  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    setCurrentPageItems(myOrderProjectList.slice(startIdx, endIdx));
  };

  useEffect(() => {
    if (myOrderProjectList.length > 0) {
      handlePageChange(1);
    } else {
      setCurrentPageItems([]); // 댓글이 없을 경우 currentPageItems 초기화
    }
  }, [myOrderProjectList]);
  return (
    <>
      <MainContainer>
        <MainContainerHeader>
          <MainTitle>
            <NavLink to={"/project/myapply"}>내가 지원한 프로젝트 목록</NavLink>
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
      {currentPageItems &&
        currentPageItems.map((project) => {
          return <ProjectCard key={project.pjId} project={project} />;
        })}

      <Pagination
        items={myOrderProjectList}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}
