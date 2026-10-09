import { signinAlarmSender } from "../../alarm/socketSender";
import { getLoginUserInfo, login } from "../../components/http/api/loginApi";
import { memberActions } from "../memberSlice";

export const getMyToken = (email, password) => {
  return async (dispatcher) => {
    const tokenJson = await login(email, password);
    const status = tokenJson.status;
    try {
      if (status === 200) {
        const token = tokenJson.body;
        dispatcher(memberActions.setToken(token));

        const myInfoJson = await getLoginUserInfo();
        dispatcher(memberActions.setMyInfo(myInfoJson.body));
      } else if (status === 401) {
        return "회원 심사중이므로 로그인이 불가능합니다.";
      } else {
        const errorMessage =
          (tokenJson.errors || []).join("\n") || "로그인에 실패했습니다.";
        return errorMessage;
      }
    } catch (e) {
      //console.log(e);
    } finally {
      signinAlarmSender(email);
    }
  };
};
