import React, { useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import HeaderNav from "../../admin/ui/HeaderNav";
import AfterLoginHeader from "../main/AfterLoginHeader";
import BeforeLoginHeader from "../main/BeforeLoginHeader";
import { useSelector } from "react-redux";
import ScrollToTop from "../main/ScrollToTop";

export default function AdminLayout() {
  const loginState = useSelector((state) => ({ ...state.member }));
  const navigate = useNavigate();
  const isAdmin = loginState?.info?.mbrCtgry === 2;
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (!isAdmin && !hasRedirected.current) {
      hasRedirected.current = true;
      alert("관리자만 접근할 수 있는 페이지입니다.");
      navigate("/", { replace: true });
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <div>
        <ScrollToTop />
        {loginState.info && loginState.info.emilAddr ? (
          <AfterLoginHeader />
        ) : (
          <BeforeLoginHeader />
        )}
        <div>
          <HeaderNav />
          <Outlet />
        </div>
      </div>
    </>
  );
}
