import React, { useState, useRef } from "react";
import CategoryBarStyle from "./CategoryBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions2 } from "../../stores/ToolkitStrore";

const categoryOptions = {
  major: [
    { label: "IT 컨설팅과 기타 서비스", value: 1 },
    { label: "데이터 처리와 아웃소싱 서비스", value: 2 },
    { label: "인터넷 서비스와 인프라", value: 3 },
    { label: "애플리케이션 소프트웨어", value: 4 },
    { label: "시스템 소프트웨어", value: 5 },
    { label: "게임 소프트웨어", value: 6 },
    { label: "디자인 및 미디어", value: 7 },
    { label: "카탈로그 소매 및 인터넷 소매", value: 8 },
    { label: "마케팅 및 광고 서비스", value: 9 },
    { label: "번역 및 통역 서비스", value: 10 },
    { label: "헬스케어 및 의료 솔루션", value: 11 },
    { label: "교육 및 학습 서비스", value: 12 },
  ],
  sub: [
    { label: "기술 자문 및 전략 컨설팅", value: 13 },
    { label: "정보화 기획 및 시스템 설계", value: 14 },
    { label: "디지털 전환 및 혁신 서비스", value: 15 },
    { label: "비즈니스 프로세스 개선 컨설팅", value: 16 },
    { label: "규제 준수 및 인증 지원", value: 17 },
    { label: "프로젝트 관리 및 PMO 서비스", value: 18 },
    { label: "데이터 분석 및 처리 서비스", value: 19 },
    { label: "클라우드 데이터 관리", value: 20 },
    { label: "백오피스 아웃소싱 (HR, 회계)", value: 21 },
    { label: "고객 지원 및 콜센터 운영", value: 22 },
    { label: "IT 아웃소싱 및 관리 서비스", value: 23 },
    { label: "프로세스 자동화 (RPA) 서비스", value: 24 },
    { label: "웹사이트 및 온라인 플랫폼 구축", value: 25 },
    { label: "클라우드 인프라 및 서버 관리", value: 26 },
    { label: "네트워크 설계 및 보안 관리", value: 27 },
    { label: "콘텐츠 관리 시스템 (CMS)", value: 28 },
    { label: "검색 최적화 및 디지털 마케팅", value: 29 },
    { label: "소셜 미디어 및 커뮤니티 운영", value: 30 },
    { label: "웹 및 모바일 앱 개발", value: 31 },
    { label: "ERP, CRM 등 비즈니스 애플리케이션", value: 32 },
    { label: "전자상거래 솔루션 개발", value: 33 },
    { label: "고객 경험 및 사용자 인터페이스 설계", value: 34 },
    { label: "교육용 소프트웨어 및 e-Learning 시스템", value: 35 },
    { label: "금융 및 핀테크 애플리케이션", value: 36 },
    { label: "운영체제 개발 및 유지보수", value: 37 },
    { label: "데이터베이스 관리 시스템 (DBMS)", value: 38 },
    { label: "네트워크 운영 소프트웨어", value: 39 },
    { label: "시스템 모니터링 및 관리 도구", value: 40 },
    { label: "백업 및 복구 소프트웨어", value: 41 },
    { label: "보안 소프트웨어 및 바이러스 백신", value: 42 },
    { label: "게임 콘텐츠 개발 (모바일, PC, 콘솔)", value: 43 },
    { label: "가상 현실 및 증강 현실 게임", value: 44 },
    { label: "인터랙티브 미디어 및 메타버스 개발", value: 45 },
    { label: "게임 디자인 및 그래픽 제작", value: 46 },
    { label: "게임 운영 및 리워드 시스템", value: 47 },
    { label: "시각 디자인 및 브랜드 구축", value: 48 },
    { label: "3D 모델링 및 애니메이션", value: 49 },
    { label: "영상 제작 및 편집", value: 50 },
    { label: "그래픽 디자인 및 인쇄물 제작", value: 51 },
    { label: "디지털 일러스트 및 캐릭터 디자인", value: 52 },
    { label: "홍보 및 마케팅 콘텐츠 제작", value: 53 },
    { label: "온라인 쇼핑몰 구축 및 운영", value: 54 },
    { label: "디지털 카탈로그 제작 및 관리", value: 55 },
    { label: "상품 촬영 및 콘텐츠 생성", value: 56 },
    { label: "물류 및 재고 관리 솔루션", value: 57 },
    { label: "고객 리뷰 및 피드백 관리", value: 58 },
    { label: "전자상거래 마케팅 전략 수립", value: 59 },
    { label: "디지털 광고 및 배너 제작", value: 60 },
    { label: "브랜드 전략 및 시장 분석", value: 61 },
    { label: "소셜 미디어 캠페인 관리", value: 62 },
    { label: "콘텐츠 마케팅 및 블로그 운영", value: 63 },
    { label: "인플루언서 및 바이럴 마케팅", value: 64 },
    { label: "오프라인 및 이벤트 마케팅", value: 65 },
    { label: "전문 문서 번역 및 현지화", value: 66 },
    { label: "영상 자막 및 더빙 서비스", value: 67 },
    { label: "비즈니스 및 법률 통역", value: 68 },
    { label: "다국어 고객 지원 서비스", value: 69 },
    { label: "의료 소프트웨어 개발 (EMR, EHR)", value: 70 },
    { label: "원격 의료 및 진료 플랫폼", value: 71 },
    { label: "병원 관리 시스템", value: 72 },
    { label: "헬스케어 데이터 분석", value: 73 },
    { label: "학습 관리 시스템 (LMS)", value: 74 },
    { label: "온라인 강의 및 교육 콘텐츠 개발", value: 75 },
    { label: "교육용 앱 및 소프트웨어", value: 76 },
  ],
};

export default function CategoryBar2() {
  const dispatch = useDispatch();
  const { selectedMajorCategory2, selectedSubCategory2 } = useSelector(
    (state) => state.category2
  );

  const [filteredMajorOptions, setFilteredMajorOptions] = useState(
    categoryOptions.major
  );
  const [filteredSubOptions, setFilteredSubOptions] = useState(
    categoryOptions.sub
  );

  const majorInputRef = useRef(null);
  const subInputRef = useRef(null);

  const filterOptions = (options, searchValue) => {
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  const handleSearchChange = (e, type) => {
    const value = e.target.value;
    if (type === "major") {
      // setMajorSearchValue(value);
      setFilteredMajorOptions(filterOptions(categoryOptions.major, value));
    } else {
      // setSubSearchValue(value);
      setFilteredSubOptions(filterOptions(categoryOptions.sub, value));
    }
  };

  // const handleKeyPress = (e, type) => {
  //   if (e.key === "Enter") {
  //     if (type === "major") {
  //       const firstOption = categoryOptions.major[0];
  //       dispatch(categoryActions2.setMajorCategory(firstOption));
  //       // setMajorSearchValue(firstOption.label);
  //       if (majorInputRef.current) majorInputRef.current.blur();
  //     }

  //     if (type === "sub") {
  //       const firstOption = categoryOptions.sub[0];
  //       dispatch(categoryActions2.setSubCategory(firstOption));
  //       // setSubSearchValue(firstOption.label);
  //       if (subInputRef.current) subInputRef.current.blur();
  //     }

  //     const firstOption =
  //       type === "major" ? filteredMajorOptions[0] : filteredSubOptions[0];

  //     if (firstOption) {
  //       if (type === "major") {
  //         dispatch(categoryActions2.setMajorCategory(firstOption.value));
  //         dispatch(categoryActions2.setDefaultMajorCategory(firstOption.label));

  //         // setMajorSearchValue(firstOption.label);
  //       } else {
  //         dispatch(categoryActions2.setSubCategory(firstOption.value));
  //         dispatch(
  //           categoryActions2.setDefaultSubMajorCategory(firstOption.label)
  //         );
  //         // setSubSearchValue(firstOption.label);
  //       }
  //     }
  //   }
  // };

  const handleKeyPress = (e, type) => {
    if (e.key === "Enter") {
      const firstOption =
        type === "major" ? filteredMajorOptions[0] : filteredSubOptions[0];
      if (firstOption) {
        const selectedValue = Number(firstOption.value);

        if (type === "major") {
          dispatch(categoryActions2.setMajorCategory(selectedValue));
        } else {
          dispatch(categoryActions2.setSubCategory(selectedValue));
        }
      }
    }
  };

  const handleChange = (e, type) => {
    const result = e.target;

    // 선택된 값을 숫자로 변환
    const selectedValue = Number(result.value);

    if (type === "major") {
      dispatch(categoryActions2.setMajorCategory(selectedValue));
    } else {
      dispatch(categoryActions2.setSubCategory(selectedValue));
    }
  };

  return (
    <>
      <div className={CategoryBarStyle.selectBox}>
        <select
          id="cmpnyBizCtgry"
          name="cmpnyIndstrId.mjrId"
          className={CategoryBarStyle.levelCategory}
          value={selectedMajorCategory2}
          onChange={(e) => handleChange(e, "major")}
          // style={{ width: "15rem" }}
        >
          <option value="0">대분류</option>
          {filteredMajorOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          ref={majorInputRef}
          type="text"
          className={CategoryBarStyle.searchInput}
          placeholder="검색"
          // value={majorSearchValue}
          onChange={(e) => handleSearchChange(e, "major")}
          onKeyPress={(e) => handleKeyPress(e, "major")}
          // style={{ width: "12rem" }}
        />
      </div>

      <div className={CategoryBarStyle.selectBox}>
        <select
          id="cmpnyIndstrId"
          name="cmpnyIndstrId.smjrId"
          value={selectedSubCategory2}
          className={CategoryBarStyle.levelCategory}
          onChange={(e) => handleChange(e, "sub")}
          // style={{ width: "15rem" }}
        >
          <option value="0">중분류</option>
          {filteredSubOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          ref={subInputRef}
          type="text"
          className={CategoryBarStyle.searchInput}
          placeholder="검색"
          // value={subSearchValue}
          onChange={(e) => handleSearchChange(e, "sub")}
          onKeyPress={(e) => handleKeyPress(e, "sub")}
          // style={{ width: "12rem" }}
        />
      </div>
    </>
  );
}
