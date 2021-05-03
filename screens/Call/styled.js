import styled from "styled-components";

export const UserProfile = styled.View`
  padding: 20px;
  border-bottom-color: #ededed;
  border-bottom-width: 1px;
  margin-bottom: 20px;
  background-color: #fff;
`;

export const ButtonContainer = styled.View`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonOutline = styled.TouchableOpacity`
  flex-direction: row;
  border: 1px solid #adadad;
  border-radius: 10px;
  padding: 10px 15px;
  width: 45%;
  justify-content: center;
  align-items: center;
`;

export const ButtonBackground = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 20px 0;
  margin-bottom: 20px;
  background-color: ${({ bgColor }) => bgColor};
`;

export const Divider = styled.View`
  border-bottom-color: #cdcdcd;
  border-bottom-width: 1px;
  margin: 30px 5px;
`;

export const RestaurantView = styled.View`
  padding: 20px;
  background-color: #fff;
  margin-bottom: 20px;
  border-bottom-color: #ededed;
  border-bottom-width: 1px;
  margin-bottom: 20px;
`;

export const OrderContainer = styled.View`
  padding: 20px;
  background-color: #fff;
  margin-bottom: 20px;
  border-bottom-color: #ededed;
  border-bottom-width: 1px;
  margin-bottom: 20px;
`;

export const MenuContainer = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

export const InputContainer = styled.View`
  display: flex;
  margin-bottom: 30px;
`;

export const TextInputBox = styled.TextInput`
  height: 40px;
  border-color: #ededed;
  border-bottom-width: 1px;
  padding: 10px;
`;

export const OrderProcess = styled.View`
  padding: 20px;
  background-color: #fff;
  margin-bottom: 20px;
  border-bottom-color: #ededed;
  border-bottom-width: 1px;
  margin-bottom: 20px;
`;

export const TextTitle = styled.Text`
  font-weight: bold;
  margin-bottom: 15px;
`;
