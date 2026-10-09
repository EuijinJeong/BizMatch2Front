import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectListThunk } from "../../stores/thunks/projectThunk";
import { projectActions } from "../../stores/ToolkitStrore";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import ProjectCard from "./ProjectCard";
import CmsPagination from "../../admin/components/CmsPagination";

const PageContainer = styled.div`
  background: var(--color-bg);
  padding: 3rem 2rem;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--color-navy-900);
  letter-spacing: -0.01em;
  margin-bottom: 2rem;
`;

const SearchForm = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const SearchBar = styled.div`
  position: relative;
  width: 100%;
  max-width: 42rem;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  left: 1.25rem;
  transform: translateY(-50%);
  color: var(--color-text-muted);
  font-size: 1rem;
  pointer-events: none;
  transition: color 0.2s ease;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 3.3rem;
  padding: 0 2.75rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background-color: var(--color-surface);
  font-size: 0.98rem;
  color: var(--color-text);
  outline: none;
  box-shadow: 0 8px 20px rgba(19, 30, 74, 0.06);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 4px rgba(51, 80, 224, 0.12);
  }

  &:focus ~ ${SearchIcon} {
    color: var(--color-primary);
  }
`;

const ClearButton = styled.button`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background-color: var(--color-bg);
  color: var(--color-text-muted);
  cursor: pointer;
  font-size: 0.75rem;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: #edf1ff;
    color: var(--color-primary);
  }
`;

const Filters = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const FiltersInner = styled.div`
  display: inline-flex;
  gap: 0.25rem;
  padding: 0.3rem;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 999px;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1.1rem;
  border: none;
  background-color: transparent;
  color: var(--color-text-muted);
  font-size: 0.88rem;
  font-weight: 600;
  border-radius: 999px;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;

  &.active {
    background-color: var(--color-primary);
    color: #fff;
    box-shadow: 0 6px 14px rgba(51, 80, 224, 0.3);
  }

  &:hover:not(.active) {
    color: var(--color-primary);
  }
`;

const FILTER_OPTIONS = [
  { value: "latest", label: "최신순" },
  { value: "deadline", label: "마감임박순" },
  { value: "budget", label: "금액높은순" },
];

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
const NoResultsMessage = styled.div`
  text-align: center;
  font-size: 1.05rem;
  color: var(--color-text-muted);
  margin-top: 3rem;
`;

export default function ProjectFind() {
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

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
  const searchProjects = (overrideKeyword) => {
    const keyword = (overrideKeyword ?? searchKeyword).toLowerCase();
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
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 폼 제출을 방지
      clearTimeout(debounceRef.current);
      searchProjects(); // 엔터키를 눌렀을 때 바로 검색 실행
    }
  };

  // 검색 버튼 클릭 시 처리
  const handleSearch = (e) => {
    e.preventDefault(); // 페이지 새로고침 방지
    searchProjects(); // 검색 버튼 클릭 시 검색 실행
  };

  const handleClear = () => {
    clearTimeout(debounceRef.current);
    setSearchKeyword("");
    searchProjects("");
    inputRef.current?.focus();
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

      <SearchForm onSubmit={handleSearch}>
        <SearchBar>
          <SearchIcon icon={faMagnifyingGlass} />
          <SearchInput
            ref={inputRef}
            type="text"
            name="searchKeyword"
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              const value = e.target.value;
              setSearchKeyword(value);
              clearTimeout(debounceRef.current);
              debounceRef.current = setTimeout(() => {
                searchProjects(value);
              }, 300);
            }}
            placeholder="어떤 프로젝트를 찾으시나요?"
            value={searchKeyword}
          />
          {searchKeyword.length > 0 && (
            <ClearButton type="button" onClick={handleClear}>
              <FontAwesomeIcon icon={faXmark} />
            </ClearButton>
          )}
        </SearchBar>
      </SearchForm>

      <Filters>
        <FiltersInner>
          {FILTER_OPTIONS.map((option) => (
            <FilterButton
              key={option.value}
              type="button"
              className={selectedFilter === option.value ? "active" : ""}
              onClick={() => setSelectedFilter(option.value)}
            >
              {option.label}
            </FilterButton>
          ))}
        </FiltersInner>
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
