import { host } from "../../../utils/hosts";
import axios from "axios";
/**
 * 특정 프로젝트의 지원자 목록을 불러오는 요청을 하는 api 메서드
 * @param {*} pjApplyId
 * @returns
 */
export const getApply = async (pjApplyId) => {
  const applyUrl = `${host()}/api/project/apply/script?pjApplyId=${pjApplyId}`;
  const jwt = sessionStorage.getItem("token");
  let fetchOption = {
    method: "GET",
    headers: {
      Authorization: jwt,
    },
  };
  const response = await fetch(applyUrl, fetchOption);

  return response.json();
};

/**
 * 프로젝트 리스트 조회
 * @returns projectListJson
 */
export const getProjectList = async () => {
  const projectListUrl = `${host()}/api/project/find`;
  const jwt = sessionStorage.getItem("token");

  const response = await fetch(projectListUrl, {
    method: "get",
    headers: jwt ? { Authorization: jwt } : {},
  });

  const projectListJson = await response.json();

  return projectListJson;
};

/**
 * 개별 프로젝트 상세 조회
 * @param {*} pjId
 * @returns oneProjectJson
 */
export const getOneProject = async (pjId) => {
  const oneProjectUrl = `${host()}/api/project/info/${pjId}`;
  const jwt = sessionStorage.getItem("token");

  const response = await fetch(oneProjectUrl, {
    method: "get",
    headers: jwt ? { Authorization: jwt } : {},
  });

  const oneProjectJson = await response.json();
  return oneProjectJson;
};

/**
 * 프로젝트 등록
 * @param {*} param0
 * @returns registProjectJson
 */
export const registProject = async (formData) => {
  const registProjectUrl = `${host()}/api/project/write`;
  const jwt = sessionStorage.getItem("token");

  const fetchOption = {
    method: "post",
    body: formData,
    headers: {
      Authorization: jwt,
    },
  };

  const response = await fetch(registProjectUrl, fetchOption);

  const registProjectJson = await response.json();
  return registProjectJson;
};

/**
 * 프로젝트 수정
 * @param {} formData
 * @returns
 */
export const editProject = async (formData, pjId) => {
  const editProjectUrl = `${host()}/api/project/update/content/${pjId}`;
  const jwt = sessionStorage.getItem("token");

  const fetchOption = {
    method: "post",
    body: formData,
    headers: {
      Authorization: jwt,
    },
  };

  const response = await fetch(editProjectUrl, fetchOption);

  const editProjectJson = await response.json();
  return editProjectJson;
};
export const deleteProject = async (id) => {
  const deleteProjectUrl = `${host()}/api/project/delete/${id}`;

  const response = await fetch(deleteProjectUrl, {
    method: "post",
    headers: {
      Authorization: sessionStorage.getItem("token"),
    },
  });

  return response.json();
};

/**
 * 프로젝트 지원하기
 * @param {*} formData
 * @param {*} pjId
 * @returns
 */
export const applyProject = async (formData) => {
  const pjId = formData.get("pjId");
  const applyProjectUrl = `${host()}/api/project/apply/${pjId}`;
  const jwt = sessionStorage.getItem("token");

  const fetchOption = {
    method: "post",
    body: formData,
    headers: {
      Authorization: jwt,
    },
  };

  const response = await fetch(applyProjectUrl, fetchOption);

  if (!response.ok) {
    throw new Error(response.error);
  }

  const applyProjectJson = await response.json();
  return applyProjectJson;
};

export const readSkilList = async () => {
  const skilUrl = `${host()}/api/project/skill`;
  const jwt = sessionStorage.getItem("token");
  let fetchOption = {
    method: "GET",
    headers: {
      Authorization: jwt,
    },
  };
  const response = await fetch(skilUrl, fetchOption);
  const skill = await response.json();
  return skill;
};

export const readOrderProjectList = async (email) => {
  const getOrderUrl = `${host()}/api/project/myproject/orderproject?email=${email}`;
  const jwt = sessionStorage.getItem("token");
  let fetchOption = {
    method: "GET",
    headers: {
      Authorization: jwt,
    },
  };

  const response = await fetch(getOrderUrl, fetchOption);
  const orderProjectListJson = await response.json();

  return orderProjectListJson;
};

/**
 * 내가 지원한 지원 리스트를 조회하는 요청 api 메서드.
 * @param {*} email
 * @returns
 */
export const readMyApplyProjectList = async (email) => {
  const getApplyUrl = `${host()}/api/project/apply/list?email=${email}`;
  const jwt = sessionStorage.getItem("token");
  let fetchOption = {
    method: "GET",
    headers: {
      Authorization: jwt,
    },
  };
  const response = await fetch(getApplyUrl, fetchOption);
  const applyProjectListJson = await response.json();

  return applyProjectListJson;
};
export const editApply = async (formData) => {
  const editUrl = `${host()}/api/project/apply/edit`;
  const jwt = sessionStorage.getItem("token");
  let fetchOption = {
    method: "POST",
    headers: {
      Authorization: jwt,
    },
    body: formData,
  };
  const response = await fetch(editUrl, fetchOption);

  return response.json();
};

/**
 * 프로젝트 첨부파일 삭제 요청을 하는 api 메서드.
 * @param {*} pjApplyAttId
 * @returns
 */
export const deleteApplyAttFile = async (pjApplyAttId) => {
  const deleteUrl = `${host()}/api/project/apply/att/delete?pjApplyAttId=${pjApplyAttId}`;
  const jwt = sessionStorage.getItem("token");
  let fetchOption = {
    method: "POST",
    headers: {
      Authorization: jwt,
    },
  };
  const response = await fetch(deleteUrl, fetchOption);

  return response.json();
};

/**
 * 특정 프로젝트에 지원한 지원자의 목록을 조회하는 api 메서드
 * @param {*} pjId
 * @returns
 */
export const getProjectParticipantList = async (pjId) => {
  const url = `${host()}/api/project/apply/member/check/${pjId}`;
  const token = sessionStorage.getItem("token");
  const fetchOption = {
    method: "GET",
    headers: {
      Authorization: token,
    },
  };

  const response = await fetch(url, fetchOption);

  return response.json();
};

/**
 * 특정 프로젝트 삭제 요청을 하는 api 메서드
 * @param {*} pjId
 * @returns
 */
export const postDeleteOneProject = async (pjId) => {
  const url = `${host()}/api/project/delete/${pjId}`;
  const token = sessionStorage.getItem("token");
  const fetchOption = {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, fetchOption);

  return response.json();
};

/**
 * 프로젝트 추가 모집을 요청하는 api 메서드
 * @param {*} pjId
 * @param {*} addDays
 * @returns
 */
export const addProjectRecuritDay = async (pjId, addDays) => {
  const url = `${host()}/api/project/update/addrecruitment/${pjId}?addDate=${addDays}`;
  const token = sessionStorage.getItem("token");
  const fetchOption = {
    method: "POST",
    headers: {
      Authorization: token,
    },
  };

  const response = await fetch(url, fetchOption);

  return response.json();
};
/**
 * 지원서를 선정하는 함수
 * @param {지원서 아이디} pjApplyId
 * @returns
 */
export const acceptApply = async (pjApplyId) => {
  const url = `${host()}/api/project/apply/accept?pjApplyId=${pjApplyId}`;
  const token = sessionStorage.getItem("token");
  const fetchOption = {
    method: "POST",
    headers: {
      Authorization: token,
    },
  };
  const response = await fetch(url, fetchOption);

  return response.json();
};
/**
 * 지원서를 지우는 함수
 * @param {지원서 아이디} pjApplyId
 * @returns
 */
export const deleteApply = async (pjApplyId) => {
  const url = `${host()}/api/project/apply/delete?pjApplyId=${pjApplyId}`;
  const token = sessionStorage.getItem("token");
  const fetchOption = {
    method: "POST",
    headers: {
      Authorization: token,
    },
  };
  const response = await fetch(url, fetchOption);

  return response.json();
};
/**
 * 관심산업리스트 불러오기
 * @param {회원 이메일} email
 * @returns
 */
export const getScrapProjet = async (email) => {
  const url = `${host()}/api/project/scraplist?email=${email}`;
  const token = sessionStorage.getItem("token");
  const fetchOption = {
    method: "GET",
    headers: {
      Authorization: token,
    },
  };
  const response = await fetch(url, fetchOption);

  return response.json();
};
export const doScrapProject = async (pjId) => {
  const url = `${host()}/api/project/scrap/${pjId}`;
  const token = sessionStorage.getItem("token");
  let fetchOption = {
    method: "POST",
    headers: { Authorization: token },
  };
  const response = await fetch(url, fetchOption);

  return response.json();
};
export const doDeleteScrapProject = async (pjId, email) => {
  const url = `${host()}/api/project/delete/scrap`;
  const token = sessionStorage.getItem("token");
  let fetchOption = {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      pjId: pjId,
    }),
  };
  const response = await fetch(url, fetchOption);

  return response.json();
};

const downloadFile = async (fileId, fileName) => {
  try {
    const token = sessionStorage.getItem("token");
    // Make a GET request to the backend
    const response = await axios.get(
      `${host()}:8080/api/project/file/download/${fileId}`,
      {
        responseType: "blob", // This ensures the response is treated as a file
        headers: { Authorization: token },
      }
    );

    // Content-Disposition 헤더에서 파일명 추출
    const contentDisposition = 'attachment; filename="' + fileName + '"';
    console.log(contentDisposition);
    const filenameMatch =
      contentDisposition && contentDisposition.match(/filename="(.+?)"/);
    const filename = filenameMatch ? filenameMatch[1] : "downloaded_file";

    // Blob 객체를 만들어 파일 다운로드 실행
    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("File download failed:", error);
    alert("Failed to download file. Please try again.");
  }
};

export default downloadFile;
