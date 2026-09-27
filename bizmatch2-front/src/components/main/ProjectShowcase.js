import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { getProjectListThunk } from "../../stores/thunks/projectThunk";
import styles from "./ProjectShowcase.module.css";

const SLIDE_INTERVAL_MS = 6000;
const PAGE_SIZE = 3;
const MAX_ITEMS = 9;

function chunk(list, size) {
  const pages = [];
  for (let i = 0; i < list.length; i += size) {
    pages.push(list.slice(i, i + size));
  }
  return pages;
}

function getStatusLabel(pjStt) {
  switch (pjStt) {
    case 3:
      return { text: "추가 모집중", className: styles.statusAdditional };
    default:
      return { text: "모집중", className: styles.statusRecruiting };
  }
}

export default function ProjectShowcase() {
  const dispatch = useDispatch();
  const { data: projects } = useSelector((state) => state.project);
  const [page, setPage] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    dispatch(getProjectListThunk());
  }, [dispatch]);

  const pages = useMemo(() => {
    const sorted = [...(projects || [])].sort(
      (a, b) => new Date(b.rgstrDt) - new Date(a.rgstrDt)
    );
    return chunk(sorted.slice(0, MAX_ITEMS), PAGE_SIZE);
  }, [projects]);

  const pageCount = pages.length;

  useEffect(() => {
    if (page > 0 && page >= pageCount) {
      setPage(0);
    }
  }, [pageCount, page]);

  useEffect(() => {
    if (pageCount <= 1) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return undefined;

    timerRef.current = setInterval(() => {
      setPage((prev) => (prev + 1) % pageCount);
    }, SLIDE_INTERVAL_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [pageCount]);

  const goTo = (index) => {
    setPage(index);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const goPrev = () => goTo((page - 1 + pageCount) % pageCount);
  const goNext = () => goTo((page + 1) % pageCount);

  return (
    <div className={styles.container}>
      <p className={styles.title}>지금 등록된 공고를 둘러보세요</p>
      <p className={styles.subtitle}>
        기업들이 실시간으로 등록한 프로젝트를 바로 확인할 수 있어요.
      </p>

      {pageCount === 0 ? (
        <div className={styles.emptyState}>
          <p>아직 등록된 공고가 없어요.</p>
          <p>가장 먼저 프로젝트를 등록해보세요!</p>
        </div>
      ) : (
        <div className={styles.carouselWrap}>
          {pageCount > 1 && (
            <button
              type="button"
              aria-label="이전 공고 보기"
              className={`${styles.navBtn} ${styles.navBtnLeft}`}
              onClick={goPrev}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          )}

          <div className={styles.viewport}>
            <div
              className={styles.track}
              style={{ transform: `translateX(-${page * 100}%)` }}
            >
              {pages.map((group, index) => (
                <div className={styles.page} key={index}>
                  {group.map((project) => {
                    const status = getStatusLabel(project.pjStt);
                    return (
                      <Link
                        to={`/project/info/${project.pjId}`}
                        className={styles.card}
                        key={project.pjId}
                      >
                        <div className={status.className}>{status.text}</div>
                        <h3 className={styles.cardTitle}>{project.pjTtl}</h3>
                        <p className={styles.cardDesc}>{project.pjDesc}</p>
                        <div className={styles.cardMeta}>
                          <span>모집 마감 {project.pjRcrutEndDt}</span>
                          <span className={styles.cardAmount}>
                            {project.cntrctAccnt?.toLocaleString()}원
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {pageCount > 1 && (
            <button
              type="button"
              aria-label="다음 공고 보기"
              className={`${styles.navBtn} ${styles.navBtnRight}`}
              onClick={goNext}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          )}
        </div>
      )}

      {pageCount > 1 && (
        <div className={styles.dots}>
          {pages.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`${index + 1}번째 공고 페이지로 이동`}
              onClick={() => goTo(index)}
              className={`${styles.dot} ${
                page === index ? styles.dotActive : ""
              }`}
            />
          ))}
        </div>
      )}

      <Link to="/project/findpage" className={styles.viewAllBtn}>
        전체 공고 보기
      </Link>
    </div>
  );
}
