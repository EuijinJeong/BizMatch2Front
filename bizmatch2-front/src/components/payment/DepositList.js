import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getPaymentDetails } from "../../stores/thunks/paymentThunk";
import moment from "moment";

const Container = styled.div`
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 20px auto;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  background: #fff;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h1 {
    font-size: 24px;
    font-weight: bold;
  }
`;

const Tabs = styled.div`
  display: flex;

  button {
    padding: 10px 20px;
    margin-left: 10px;
    border: 1px solid #ddd;
    background: #f9f9f9;
    cursor: pointer;
    border-radius: 5px;

    &.active {
      background: #0070f3;
      color: #fff;
      border-color: #0070f3;
    }
  }
`;

const Filters = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  select,
  button {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background: #f9f9f9;
    cursor: pointer;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th,
  td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    font-weight: bold;
    background: #f9f9f9;
  }

  .type-icon,
  .where-icon {
    margin-right: 10px;
  }

  .amount {
    font-weight: bold;

    &.negative {
      color: red;
    }
  }
`;

// eslint-disable-next-line no-unused-vars
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  button {
    padding: 8px 12px;
    border: 1px solid #ddd;
    background: #fff;
    cursor: pointer;
    border-radius: 5px;

    &.active {
      background: #0070f3;
      color: #fff;
      border-color: #0070f3;
    }
  }
`;

export default function DepositList() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(
    moment().subtract(1, "months").format("YYYY-MM-DD")
  );
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 추가

  const moveDownpaymentPage = () => {
    navigate("/payment/downpayment");
  };

  const moveDepositPage = () => {
    navigate("/payment/deposit");
  };

  const handleDateChange = (event) => {
    const selectedOption = event.target.value;
    let newStartDate;

    switch (selectedOption) {
      case "1달":
        newStartDate = moment().subtract(1, "months").format("YYYY-MM-DD");
        break;
      case "3달":
        newStartDate = moment().subtract(3, "months").format("YYYY-MM-DD");
        break;
      case "6달":
        newStartDate = moment().subtract(6, "months").format("YYYY-MM-DD");
        break;
      case "1년":
        newStartDate = moment().subtract(1, "years").format("YYYY-MM-DD");
        break;
      default:
        newStartDate = moment().subtract(1, "months").format("YYYY-MM-DD");
        break;
    }

    setStartDate(newStartDate);
  };

  const emilAddr = JSON.parse(sessionStorage.getItem("info") || "null")?.emilAddr;
  const dispatch = useDispatch();
  const paymentInfo = useSelector((state) => state.payment.data);

  useEffect(() => {
    dispatch(
      getPaymentDetails({
        emilAddr,
        startDate,
        paymentType: 0,
      })
    );
  }, [emilAddr, startDate, dispatch]);

  // 검색어에 맞게 필터링된 데이터
  const filteredPayments = paymentInfo.filter(
    (payment) => payment.pjTtl.toLowerCase().includes(searchQuery.toLowerCase()) // 제목 검색
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // 검색어 상태 업데이트
  };

  return (
    <>
      <Container>
        <Header>
          <h1>보증금 결제내역</h1>
          <Tabs>
            <button className="active" onClick={moveDepositPage}>
              보증금
            </button>
            <button onClick={moveDownpaymentPage}>계약금</button>
          </Tabs>
        </Header>
        <Filters>
          <select onChange={handleDateChange}>
            <option value="1달">1달</option>
            <option value="3달">3달</option>
            <option value="6달">6달</option>
            <option value="1년">1년</option>
          </select>
          {/* 검색 입력 필드 */}
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Filters>
        <Table>
          <thead>
            <tr>
              <th>프로젝트</th>
              <th>수주자</th>
              <th>금액</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments && filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <tr key={payment?.pymntId}>
                  <td>{payment?.pjTtl}</td>
                  <td>{payment?.obtnId ? payment?.obtnId : "없음"}</td>
                  <td className="amount negative">{payment?.grntAmt}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">검색 결과가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
