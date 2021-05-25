import React from "react";
import styled from "styled-components";
import { Text } from "react-native";

const RequestDetails = ({
  background,
  requestForStore,
  requestForDelivery,
}) => {
  return (
    <RequestDetail background={background}>
      <RequestTitle>To. Store</RequestTitle>
      <Text>{requestForStore ? requestForStore : "-"}</Text>

      <Text />

      <RequestTitle>To. Delivery</RequestTitle>
      <Text>{requestForDelivery ? requestForDelivery : "-"}</Text>
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
