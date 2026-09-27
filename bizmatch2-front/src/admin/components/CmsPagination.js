import React, { useMemo } from "react";
import PaginationStyle from "../../admin/components/CmsPagination.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faAnglesRight,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function CmsPagination({
  totalItems = 0, // 기본값 0 설정
  itemsPerPage = 10, // 기본값 10 설정
  currentPage = 1, // 기본값 1 설정
  onPageChange,
}) {
  // totalItems, itemsPerPage 값을 안전하게 처리한 후 totalPages 계산
  const totalPages = totalItems ? Math.ceil(totalItems / itemsPerPage) : 1;

  // 페이지 번호 배열 계산 (useMemo로 최적화)
  const pageNumbers = useMemo(() => {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }, [totalPages]);

  if (totalPages <= 1) return null; // 페이지가 1개 이하일 경우 표시하지 않음

  return (
    <div className={PaginationStyle.pagination}>
      <button
        className={PaginationStyle.navBtn}
        aria-label="처음 페이지로 이동"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        <FontAwesomeIcon icon={faAnglesLeft} />
      </button>
      <button
        className={PaginationStyle.navBtn}
        aria-label="이전 페이지로 이동"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <div className={PaginationStyle.numberGroup}>
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`${PaginationStyle.pageBtn} ${
              currentPage === number ? PaginationStyle.pageBtnActive : ""
            }`}
            onClick={() => onPageChange(number)}
            aria-current={currentPage === number ? "page" : undefined}
          >
            {number}
          </button>
        ))}
      </div>

      <button
        className={PaginationStyle.navBtn}
        aria-label="다음 페이지로 이동"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
      <button
        className={PaginationStyle.navBtn}
        aria-label="마지막 페이지로 이동"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <FontAwesomeIcon icon={faAnglesRight} />
      </button>
    </div>
  );
}
