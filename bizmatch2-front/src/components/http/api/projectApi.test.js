// 이 파일에서 axios는 getProjectList/getOneProject와 무관한 다른 함수에서만 쓰이는데,
// 설치된 axios 배포판이 ESM(import)만 제공해서 CRA 기본 Jest 설정으로는 파싱이 안 된다.
// 여기서 검증하려는 로직과 무관하므로 목으로 대체해서 파싱 실패를 피한다.
jest.mock("axios", () => ({ __esModule: true, default: {} }));

import { getProjectList, getOneProject } from "./projectApi";

describe("projectApi - 비로그인 시 Authorization 헤더 처리", () => {
  beforeEach(() => {
    sessionStorage.clear();
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue([]),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("getProjectList: 토큰이 없으면 Authorization 헤더 없이 요청한다", async () => {
    await getProjectList();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const [, options] = global.fetch.mock.calls[0];
    expect(options.headers).toEqual({});
  });

  test("getProjectList: 토큰이 있으면 Authorization 헤더에 담아 요청한다", async () => {
    sessionStorage.setItem("token", "Bearer abc.def.ghi");

    await getProjectList();

    const [, options] = global.fetch.mock.calls[0];
    expect(options.headers).toEqual({ Authorization: "Bearer abc.def.ghi" });
  });

  test("getOneProject: 토큰이 없으면 Authorization 헤더 없이 요청한다", async () => {
    await getOneProject("PJ001");

    const [url, options] = global.fetch.mock.calls[0];
    expect(url).toContain("/api/project/info/PJ001");
    expect(options.headers).toEqual({});
  });

  test("getOneProject: 토큰이 있으면 Authorization 헤더에 담아 요청한다", async () => {
    sessionStorage.setItem("token", "Bearer abc.def.ghi");

    await getOneProject("PJ001");

    const [, options] = global.fetch.mock.calls[0];
    expect(options.headers).toEqual({ Authorization: "Bearer abc.def.ghi" });
  });
});
