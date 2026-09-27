import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProjectListThunk } from "../../stores/thunks/projectThunk";
import { projectActions } from "../../stores/ToolkitStrore";
import styled from "styled-components";
import ProjectCard from "./ProjectCard";
import CmsPagination from "../../admin/components/CmsPagination";

const PageContainer = styled.div`
  background: #f9f9f9;
  padding: 2rem;
  font-family: "Roboto", sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
`;

const SearchForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

// eslint-disable-next-line no-unused-vars
const Input = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  width: 300px;
`;

const Filters = styled.div`
  width: 45%;
  display: flex;
  justify-content: end;
  margin-bottom: 2rem;
  gap: 1rem;
  margin: 0 auto;
  padding-bottom: 1rem;
`;

const FilterLink = styled(NavLink)`
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #555;
  font-size: 1rem;
  /* border: 1px solid #ddd; */
  border-radius: 5px;
  /* &.active {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
  } */
  &:hover {
    color: #555;
  }
`;

// eslint-disable-next-line no-unused-vars
const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
const NoResultsMessage = styled.div`
  text-align: center;
  font-size: 1.5rem;
  color: #666;
  margin-top: 2rem;
`;

//////////////////////////////////////

const Container = styled.div`
  text-align: center;
  color: #2c3e50;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Finder = styled.div`
  width: 52.5rem;
  border: 1px solid #fff;
  height: 5rem;
  background-color: #f6f5f0;
  border-radius: 15px;
  padding: 8px;
  box-shadow: 9px 9px 16px rgba(189, 189, 189, 0.6),
    -9px -9px 16px rgba(255, 255, 255, 0.5);
`;

const FinderOuter = styled.div`
  display: flex;
  height: 4rem;
  padding: 1.5rem 2rem;
  border-radius: 10px;
  box-shadow: inset 10px 10px 15px -10px #c3c3c3,
    inset -10px -10px 15px -10px #ffffff;
`;

const FinderInner = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  flex: 1;
`;

const FinderInput = styled.input`
  height: calc(100% + 3rem);
  border: none;
  background-color: transparent;
  outline: none;
  font-size: 1.5rem;
  letter-spacing: 0.75px;
  width: 100%;
  transition: all 0.3s ease-in-out;

  &.active {
    border-color: #2c3e50;
  }

  &:disabled {
    background-color: #e0e0e0;
  }
`;

const FinderIcon = styled.div`
  width: 30px; /* 기존 40px에서 줄임 */
  height: 30px; /* 기존 40px에서 줄임 */
  margin-right: 0.75rem; /* 간격도 줄임 */
  transition: all 0.2s;
  box-shadow: inset 0 0 0 15px #292929; /* 크기에 맞게 조정 */
  border-radius: 50%;
  position: relative;

  &::after,
  &::before {
    display: block;
    content: "";
    position: absolute;
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  &::after {
    width: 7px; /* 기존 10px에서 줄임 */
    height: 7px; /* 기존 10px에서 줄임 */
    background-color: #292929;
    border: 2px solid #f6f5f0; /* 기존 3px에서 줄임 */
    top: 50%;
    position: absolute;
    transform: translateY(-50%);
    left: 0px;
    right: 0;
    margin: auto;
    border-radius: 50%;
  }

  &.active::after {
    border-width: 8px; /* 크기에 맞게 줄임 */
    background-color: #f6f5f0;
  }

  &::before {
    width: 3px; /* 기존 4px에서 줄임 */
    height: 10px; /* 기존 13px에서 줄임 */
    background-color: #f6f5f0;
    top: 50%;
    left: 15px; /* 크기에 맞게 위치 조정 */
    transform: rotateZ(45deg) translate(-50%, 0);
    transform-origin: 0 0;
    border-radius: 3px; /* 기존 4px에서 줄임 */
  }

  &.active::before {
    background-color: #292929;
    width: 4px; /* 크기에 맞게 조정 */
    transform: rotateZ(45deg) translate(-50%, 20px); /* 위치 조정 */
  }

  &.processing {
    transform-origin: 50%;
    animation: spinner 0.3s linear infinite;
    animation-delay: 0.5s;
  }

  &.active {
    transform: translateY(-3px); /* 기존 -5px에서 줄임 */
  }

  @keyframes spinner {
    0% {
      transform: rotateZ(45deg);
    }
    100% {
      transform: rotateZ(405deg);
    }
  }
`;

export default function ProjectFind() {
  const [isActive, setIsActive] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const inputRef = useRef(null);
  const finderRef = useRef(null);

  // Handle focus and blur events
  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    if (inputRef.current.value.length === 0) {
      setIsActive(false);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    setIsProcessing(true);
    setIsActive(false);
    setIsDisabled(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsDisabled(false);

      if (inputRef.current.value.length > 0) {
        setIsActive(true);
      }
    }, 1000);
  };

  // ///////////////////////////////////////
  const dispatch = useDispatch();
  const { data: projects, pagination } = useSelector((state) => state.project);
  const { currentPage = 1, itemsPerPage = 6 } = pagination || {};

  // 필터 상태와 검색 상태 추가
  const [selectedFilter, setSelectedFilter] = useState("latest");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchType] = useState("entire");
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    dispatch(getProjectListThunk());
  }, [dispatch]);

  // 처음 로드 시 기본적으로 프로젝트 리스트를 필터링해서 보여주기
  useEffect(() => {
    if (projects.length > 0) {
      searchProjects(); // 검색이 필요 없지만 처음에는 전체 프로젝트를 표시하도록
    } else {
      return;
    }
  }, [projects]); // projects 데이터가 로딩될 때마다

  // 검색 처리 함수
  const searchProjects = () => {
    const keyword = searchKeyword.toLowerCase();
    const filtered = projects?.filter((project) => {
      if (searchType === "entire") {
        return (
          project?.pjTtl?.toLowerCase().includes(keyword) ||
          project?.pjDesc?.toLowerCase().includes(keyword)
        );
      } else if (searchType === "pjTtl") {
        return project?.pjTtl?.toLowerCase().includes(keyword);
      } else if (searchType === "pjDesc") {
        return project?.pjDesc?.toLowerCase().includes(keyword);
      }
      return true;
    });
    setFilteredProjects(filtered); // 필터링된 결과를 상태에 저장
  };

  // 필터링 및 검색 함수
  const sortProjects = (filteredProjects, filter) => {
    const sortedProjects = [...filteredProjects]; // 배열을 복사하여 새로운 배열 생성

    switch (filter) {
      case "latest":
        return sortedProjects.sort(
          (a, b) => new Date(b.rgstrDt) - new Date(a.rgstrDt)
        ); // 최신순
      case "deadline":
        return sortedProjects.sort(
          (a, b) => new Date(a.pjRcrutEndDt) - new Date(b.pjRcrutEndDt)
        ); // 마감임박순
      case "budget":
        return sortedProjects.sort((a, b) => b.cntrctAccnt - a.cntrctAccnt); // 금액높은순
      default:
        return sortedProjects;
    }
  };

  // 검색된 프로젝트를 필터링하고 정렬하는 과정
  const sortedProjects = sortProjects(filteredProjects, selectedFilter);

  // 페이지네이션 처리
  const paginatedData = sortedProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 검색 시 엔터키를 눌렀을 때 처리
  // eslint-disable-next-line no-unused-vars
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 폼 제출을 방지
      searchProjects(); // 엔터키를 눌렀을 때 검색 실행
      handleSubmit();
    }
  };

  // 검색 버튼 클릭 시 처리
  const handleSearch = (e) => {
    e.preventDefault(); // 페이지 새로고침 방지
    searchProjects(); // 검색 버튼 클릭 시 검색 실행
  };

  const error = projects?.error;

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    <PageContainer>
      <Title>프로젝트 찾기</Title>

      <SearchForm
        onSubmit={handleSearch} // 버튼 클릭 시 검색 실행
      >
        {/* <Select
          name="searchType"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="entire">전체</option>
          <option value="pjTtl">제목</option>
          <option value="pjDesc">내용</option>
        </Select> */}
        {/* <Input
          type="text"
          name="searchKeyword"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={handleKeyDown} // 엔터키 입력 처리
          placeholder="어떤 프로젝트를 찾으시나요?"
        /> */}

        <Container>
          <Finder>
            <FinderOuter>
              <FinderInner>
                <FinderIcon
                  className={isActive ? "active" : ""}
                  ref={finderRef}
                />
                <FinderInput
                  style={{ border: "none" }}
                  ref={inputRef}
                  className={isActive ? "active" : ""}
                  type="text"
                  name="searchKeyword"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  disabled={isDisabled}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="어떤 프로젝트를 찾으시나요?"
                  value={searchKeyword}
                />
              </FinderInner>
            </FinderOuter>
          </Finder>
          {/* <SubmitButton onClick={handleSubmit} disabled={isDisabled}>
            Submit
          </SubmitButton> */}
        </Container>
        {/* <Button onClick={handleSubmit} disabled={isDisabled}>
          검색
        </Button> */}
      </SearchForm>

      <Filters>
        <FilterLink
          to="#"
          className={selectedFilter === "latest" ? "active" : ""}
          onClick={() => setSelectedFilter("latest")}
        >
          {selectedFilter === "latest" && "✔️"} 최신순
        </FilterLink>
        <FilterLink
          to="#"
          className={selectedFilter === "deadline" ? "active" : ""}
          onClick={() => setSelectedFilter("deadline")}
        >
          {selectedFilter === "deadline" && "✔️"} 마감임박순
        </FilterLink>
        <FilterLink
          to="#"
          className={selectedFilter === "budget" ? "active" : ""}
          onClick={() => setSelectedFilter("budget")}
        >
          {selectedFilter === "budget" && "✔️"} 금액높은순
        </FilterLink>
      </Filters>

      <div style={{ width: "100%" }}>
        {/* 검색된 프로젝트가 없다면 메시지 표시. */}
        {paginatedData.length === 0 ? (
          <NoResultsMessage>검색 결과가 없습니다.</NoResultsMessage>
        ) : (
          paginatedData?.map((project) => (
            <ProjectCard key={project.pjId} project={project} />
          ))
        )}
      </div>
      <PaginationContainer>
        <CmsPagination
          totalItems={filteredProjects.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={(page) => dispatch(projectActions.setCurrentPage(page))}
        />
      </PaginationContainer>
    </PageContainer>
  );
}
