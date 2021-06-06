import React from "react";
import styled from "styled-components";
import { Text } from "react-native";

const RequestDetails = ({ background, request }) => {
  return (
    <RequestDetail background={background}>
      <RequestTitle>전달사항</RequestTitle>
      <Text>{request || "없음"}</Text>
    </RequestDetail>
  );
};

export default RequestDetails;

const RequestDetail = styled.View`
  padding: 15px;
  background-color: ${({ background }) =>
    background ? background : "#ededed"};
  border-radius: 15px;
  width: 80%;
`;

const RequestTitle = styled.Text`
  font-weight: bold;
  margin-bottom: 8px;
`;
