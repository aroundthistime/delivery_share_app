import { useReactiveVar } from "@apollo/client";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import styled from "styled-components";
import {
  MenuListWithName,
  MenuListWithPrice,
} from "../../components/MenuListDetails";
import NavigationButton from "../../components/NavigationButton";
import RequestDetails from "../../components/RequestDetails";
import { useCart } from "../../Contexts/CartContext";
import { currentCallVar } from "../../reactiveVars";
import styles from "../../styles";
import { splitNumberPerThousand } from "../../utils";
import { Divider } from "../Call/styled";

/**
 * TODO *
 * 1. component 단위로 modularization (✔)
 * 2. 주문 내역 map 을 통해 list 형태 리턴 (✔)
 * 3. 배달장소 정보 연동 필요 (✔)
 * 4. 요청사항 메시지 형태 디자인 변경 (✔)
 * 5. 추가로 필요한 부가 정보 있는지 검토 (✔)
 * 6. 결제진행 클릭 시 Kakaopay API 호출 - 디자인만 구현 (✔)
 * 7. 주문 내역에서 A의 결제항목/금액 & B의 결제항목/금액 구분 필요
 */

const Confirm = ({ navigation, route }) => {
  const {
    params: { seq, cart, request, user, restaurantRequest, place },
  } = route;

  // const cart = useCart();
  // const currentCall = useReactiveVar(currentCallVar);
  // const menus = cart.menus.concat(currentCall.cart.menus);

  // 1) 콜을 요청한 사람이 작성한 식당측 요청사항은 currentCall.requestForStore
  // 2) 콜을 요청한 사람 정보는 currentCall.user보면 { id: ~~, name : ~~} 있음
  // 3) 내가 작성한(콜을 받는 사람) 식당측 요청사항은 requestForStore(param으로 전달받은 것)
  // 4) 음식 수령장소는 currentCall.callLocation.place

  const getAmountOfMenus = () => {
    return splitNumberPerThousand(
      // menus.reduce((acc, cur) => acc + cur.price, 0)
      100000
    );
  };

  return (
    <ScrollView
      style={{ flex: 1, padding: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <BillCheck>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <TextTitle>주문내역 확인</TextTitle>
            <MenuListWithName menus={cart[0].selected_menu} />
            <MenuListWithName
              menus={cart.length > 1 && cart[1].selected_menu}
            />
          </View>

          <View>
            <TextTitle>총액: {1}원</TextTitle>
            <MenuListWithPrice menus={cart[0].selected_menu} />
            <MenuListWithPrice
              menus={cart.length > 1 && cart[1].selected_menu}
            />
          </View>
        </View>

        <Divider />

        <View>
          <TextTitle style={{ marginBottom: 10 }}>배달장소</TextTitle>
          <Text>{place}</Text>
        </View>

        <Divider />

        <TextTitle style={{ marginBottom: 10 }}>
          {user.ID}
          <Text style={{ fontSize: 14, fontWeight: "100" }}>님의 요청</Text>
        </TextTitle>
        <View style={{ marginBottom: 30 }}>
          <RequestDetails request={request} />
        </View>

        <TextTitle
          style={{
            marginBottom: 10,
            textAlign: "right",
          }}
        >
          나<Text style={{ fontSize: 14, fontWeight: "100" }}>의 요청</Text>
        </TextTitle>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <RequestDetails request={restaurantRequest} background="#FFB800" />
        </View>

        <Divider />

        <NavigationButton
          background={styles.themeColor}
          navigation={navigation}
          params={[
            "Kakaopay",
            {
              userId: user.ID,
              seq,
            },
          ]}
          text="결 제 진 행"
        />
      </BillCheck>
    </ScrollView>
  );
};

export default Confirm;

const BillCheck = styled.View`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px 25px 5px 25px;
  margin-bottom: 30px;
`;

const TextTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;
