/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import BoardListStyle from "./BoardList.module.css";
import Pagination from "../pagenationApi/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBoards } from "../../stores/thunks/boardThunk";
import { NavLink } from "react-router-dom";
export default function BoardList() {
  const { board } = useSelector((state) => ({ ...state }));
  const boardDispatcher = useDispatch();
  const error = board?.error;

  useEffect(() => {
    boardDispatcher(fetchAllBoards());
  }, [boardDispatcher]);

  const items = Array.isArray(board?.data) ? board.data : [];

  const [currentPageItems, setCurrentPageItems] = useState([]);
  const itemsPerPage = 10;

  const handlePageChange = (page) => {
    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    setCurrentPageItems(items.slice(startIdx, endIdx));
  };

  const jwt = useSelector((state) => ({ ...state.member }));
  const currUserEmail = jwt.info?.emilAddr;
  const memberInfo = jwt.info;

  useEffect(() => {
    if (items.length > 0) {
      handlePageChange(1);
    } else {
      setCurrentPageItems([]);
    }
  }, [items]);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    <div className={BoardListStyle.mainBox}>
      <div className={BoardListStyle.contentBox}>
        <h2 className={BoardListStyle.mainTitle}>통합게시판</h2>
        <div className={BoardListStyle.functionLine}>
          {currUserEmail != null ? (
            <NavLink className={BoardListStyle.writeBtn} to={"/board/write"}>
              글쓰기
            </NavLink>
          ) : (
            <></>
          )}
        </div>
        <div className={BoardListStyle.postListBox}>
          <div className={BoardListStyle.subjectLine}>
            <div>종류</div>
            <div>제목</div>
            <div>작성자</div>
            <div>공개여부</div>
            <div>수정일</div>
            <div>조회수</div>
          </div>

          {currentPageItems.length > 0 ? (
            <>
              {currentPageItems.map((line) => (
                <div className={BoardListStyle.subjectLine} key={line.pstId}>
                  {line.pstCtgry === 0 && (
                    <div>
                      <span className={BoardListStyle.redBox}>공지</span>
                    </div>
                  )}
                  {line.pstCtgry === 1 && (
                    <div>
                      <span className={BoardListStyle.blueBox}>문의</span>
                    </div>
                  )}

                  {line.athrId !== currUserEmail && memberInfo?.mbrCtgry !== 2 && line.isPstOpn === 1  ? (
                    <div> {line.pstNm}</div>
                  ) : (
                    <div>
                      <NavLink
                        to={`/board/view/${line.pstId}`}
                        className={BoardListStyle.title}
                      >
                        {line.pstNm}
                      </NavLink>
                    </div>
                  )}

                  <div>{maskName(line.mbrNm)}</div>
                  {line.isPstOpn === 0 && (
                    <div className={BoardListStyle.openLabel}>공개</div>
                  )}
                  {line.isPstOpn === 1 && (
                    <div className={BoardListStyle.closedLabel}>비공개</div>
                  )}
                  <div>{formatDate(line.lstModDt)}</div>
                  <div>{line.pstHt}</div>
                </div>
              ))}
            </>
          ) : (
            <div className={BoardListStyle.emptyState}>게시글이 없습니다.</div>
          )}
        </div>
        <Pagination
          items={items}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
function maskName(name) {
  if (!name) return "";

  if (name.length === 1) {
    return name;
  }

  const firstChar = name.substring(0, 1);
  const lastChar = name.substring(name.length - 1);
  const middleMask = "*".repeat(name.length - 2);

  return firstChar + middleMask + lastChar;
}

function formatDate(dateTimeStr) {
  if (!dateTimeStr) {
    return "Invalid Date"; // dateTimeStr이 유효하지 않으면 기본값 반환
  }

  const datePart = dateTimeStr.split(" ")[0];
  const [year, month, day] = datePart.split("-");

  if (!year || !month || !day) {
    return "Invalid Date"; // 날짜 포맷이 잘못된 경우 처리
  }

  return `${year.substring(2)}.${month}.${day}`; // 연도는 두 자리로 출력
}
