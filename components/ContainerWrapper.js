import React from "react";
import styled from "styled-components";

const ContainerWrapper = ({ children }) => {
  return <Container>{children}</Container>;
};

export default ContainerWrapper;

const Container = styled.View`
  padding: 20px;
  border-bottom-color: #ededed;
  border-bottom-width: 1px;
  margin-bottom: 20px;
  background-color: #fff;
`;
