import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles";

/**
 * TODO *
 * 1. Thumbnail 기본 이미지 설정 - 추후 db에서 모든 레스토랑에 thumbnail 지정 필요
 */

const CallListBar = ({ distance, callLocation, cart, restaurant }) => {
  const thumbnail =
    restaurant.thumbnail ||
    `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAACvCAMAAACPd2FOAAAAgVBMVEX///8AAAApKSl6enpzc3Pp6enY2NglJSUEBAQKCgpdXV0RERH6+voeHh4tLS0WFhbg4OAZGRk6OjpYWFj09PRoaGjQ0NAzMzNMTEyoqKhEREQhISFhYWG6urqhoaGYmJjGxsaSkpJQUFCxsbF3d3eCgoKKiopGRkZtbW2vr6+lpaVK2c98AAAM2ElEQVR4nO1daXuqOhDWuoFo3XAXQdvanv7/H3jrTDZIZqAlLs9zeT+cowJJXjJ7Am21GjRo8BjEqyTtHg7DKw6HrzRZxaNHj+mXGK2+O8OXqF1EOFi8H7P40cOrhtHqdJ5ZFExMNpenJxNnyzFLQiIaJr1HD5bEaDW0pYlGeM6eUmV6H/ZcBEE0G+8HL4P9eBaFgXV89jV99LCLWA0LFCavw6ImxNnlsJ4V6JyTB43YiWyTI7Ef/mNOTpaD0Dx9/na3cZZgZdIId8cKl2w3pjbNn2JWegdjLnbcVOSRbIx5WfRvOMJqSLXMjz9+ee1poKl0HmvBVms1kldL1Kfb9/P8ZTybTCaz8WC96R6t+57N1X0YP1K+OprGKneg35mPcxotZW+27ubP7M3VweWjJmWqxjDIzN/THe8Xw/nFHHJPzeo+z/Fe2Mr+I9NOHde233PMzMvFuCZRsdnp3iR+0JWdL/Rv041Lngguu8xoTLJf3Fu8RlKsxlocktfKLBD7b3Vt/CJ+G9w3luxJw6mn421AjZfBTEvll5iU8J7hV192qkxm/7ezoWZFNTGVJuJ+Kt8XPY7VLxtqnBUwV61I83Uvj7IS/X3KH47VVdyFQFmwpfileqBTB3I+uvKHOTXCyniRTZ3ED/eYE8lDmvz+b7JCCqGMbxKhfdnNefRE19Jydhz+7z2p4hTzOIj2VuLSW2t8LO6/vIM7e0jBT2j4B1MsxasnmNzYnwi/JbXRNeAp8XsZItGmsO3RTX38AvuUcjVxjCelCJYiFJOQ4dc5MQYfSLELkUD1XFZ33fozkXaQYcNv+PX9ZjyEwRJhSc+p0a0aRJTZ7eS++QdKktRKpxc81yMSiEALI4XgRmqCChKKb273MapHpB2KBjBDWd+Eh9DBqdlTEa/i3Bfn0UpMRAsot1VKS78GipJQdCLYzWoTac+wBaHwN6jaf0HDL+YXCxN5cg0i7R028Wl+8YgptBvgl4wYg0q56xBBTyQlIPNNZG2OlAilAnV2gUgURddLwii6ji6I1P/udlCeEvg8cQ2mBrDVsXOYCloO8mdcL7sq1fVIG23R6ef/C2HC5eDn5r3zBTRSGEN8EDzaGUHkassGeHksvl7b6LRaxPKWcLkw8X6dyTe0jynhiIrRI31+3qh9CiJ9zAKuBuPqu7uk8WtjbRUrTh2fRMCnB65BGlhSRN5JImf+nqDkeZwSNOpD+ExZLOUqbSJHkkjH1c4VqBkn+HyxB/RX7K/tiQkhM1tDsgpE+iSRI9WY6AymJPQ2JVg2wQk5UV2L44hcPQIG5SYyJVs7GL15K6pgPov3ha78mBXCHJGQJkJ5JDUlcHzviUcMLWPCdiJ5mJKVJzJjiND3BacEK12eFuZSozG69pOLinJEXhgirmQZIaYEPndbXgBeC73tP7Lf9pYkMmeI7OkG0X+A2Qi8BMGY4GL4TidMQe6aHJEFQ2TtbAyAsoqxkZek96LH2aO7HeeuyRHpMkS46jeOHrTo0PIAmP0BfFzQvS5y1+SIqAKRg0jX2RgCE10wmWGrPtDUo3dlyrwZTSRjiKQMEZSCzNH8n3CChuDjqqxTN5GYIZIwRESGBbLlwW5BXIcawAh0XkVyRFAsCCIxRwRLGWv9sQ5GIE6oAbTR14s+NpGII0K7dnULMP2pXdNGFYHiO2Oz2oVtKCaRPUuEXV1JdLdZXSIQn6IGXJguC0GESURXg11E2C2QKAjAtXZ6BZuYxtboCiiaR/PUDUuEXQ3GyQQlqV0XgiGhBjBSMChcZa7/LFkijpUiDZQEKKIVrMnvAaPHAj+jl8X7ZQ5PBzcuIoyPbQuJxU0vNcMt1DRQOjrHtZcyTCJHlsjS3aAA+GE00TUXFcEHYkWGzK/bdrHZJJKwRDgLIlcpwCX+q5fwwrSiKlMVD9ft2lnHKCJbd4MC6AehqPZRb48KeCMskDP2JSheZhKJWSKcwMosCMzWMKtFBEQYS/CMX7eCU4OIIEkRocsPumEozG/qlSAMG85sOLEqzQaRiCfCxihCO8GXzX67hzUPcLyLsh6tMsenRZIkwm/IAcUA+Q7qJVeQVYFLI0u+bcdan0FkXEKE38qSXU85XT+FHoh8XT9xIaO1tm8Q2dciAtEqZF/hsNjJ74mUauVn8TKDyLqECGND2qI28+2BCOgIRJ59prsNQ2ReQoR/Agg87fZuRM4MkV0JEX658dsXES1anI4sipcZSfGmhAhT2WoLHTn6IgLKHjNWiyOyKCHCbyTMrqd4U3Y0fH8kIqzmWBO5Ji/v8v7wCQkGaicgUs/8VnOIHJGhviN/IAIOEeLumg4RtBYND2PwrVm3ZyQ7pd8/4eNom56yn6/T9JhOy4lgoAYPoo3rrcBBmomJLGMnOSJlos3qSKS5nus9UwZhzqSsR2uwRu5imeYCWKuF8Q1Y6ENWiwis52IwzWTXy+JlBhHLWRbA+hFDqE/1SnToBqENJim1dh8aRMqKnewDymhFIEBO6qW6mPhDxMMEW1aJ2SBStiuGDeOPuuO664ig4mgoafvLEbHS4Dz4DBHSZPCHtVffwGKgqNJxKidatgLlwBotVE5IEIslwF8D7C+KxyfZoVWYzVVcOKEgtz4AsFgAVY8ym1EKLNeAor1VJ5KzcIxUMEtHVxjJcO0NKRj04toRqSQ8kXZIMemXPNUA1hINZ/2nF8A8YgpI+vYSIu0wczb9XcID/ToIt4eV9oNukqzTlhGRdq/kpCIwJwOP6WHHP26eg0kmF/yskpM9xtm2cEpa/iQQVo0DZw+/R2zcUUq2KhDJPyUed/maAwCNL9o1H9tqIKrD8i+1LbMSkR9Bl9WW10qPLi109142zaJsobIRA6hIRNWIq9CQC7nQpZcNmmiAMVInsiDLyBNEZGm10nOLGMKf4HPmgwhOLt5MIjKybtjQfZ589KTSE39oHcD6e9qObe40cu+vsuIHgoisEfPvFkKgxUdx8LQbewSNYdTmXpex1kcIInLNtMr7hTCYwPjO16N8+MKQKTOGor8jiMi0t8LDDOLe5PjXBs4vOlcizCtoycF9lszt+eoiIDXa8feUKCYNOMHEUmJeTQgiX7n2OAj1Bttbe6+ABk4DTgkVp0zMnJogIueNzmwkVkYzPt8thNOAWkKFjoEhAQQR6W9Kw0URI8KERC2PwCkR/ozyAkaoTRARDx2VbHdQeT663++WT6B64iSTS+Pq+XqKiFxh5rZk6rGj95155SEaFTaRMK6GeSGIZOIw+UwQQgjWLHeNL6BYL8wubCjTRRCRwTi3t1TdLmTr/eFQYaxQ36mlamUo3UqglOibJSLomh36BCY4woQQW2FUqOKWHVWrYzegCNOGIYSn7f054L54kRu51VWN1C076nCFpW7swKvplRCroWJrljMzKSGiJoxZjxQVRREJ3eYVFidsXISirnhJEXGLng6SSSJSyzD14qutfweGSHK6HSGsIuIuSur8qOxRxnGOlXcIiZD1ZDvJUrfcrc16ExGR60oeQm5v914nIbkyP7DmJCqcWID2/O5ikHTiwnjf8g1CJ+xCLkcXw3EVTri3SWjn5vSocqaF7XYVJ/1BRCdSCwthrBJqt8fUdU9X6i+PXoon3wbzPJP8wqJejXES0buhHIZCTsCpcE9uBvG8mJSulRnU64VPJxG9d8Gy3ep1TkKuyJUIfxgJ+VYBojEorQROs6SlvuhOBzK9FC+TCO7xSj35Qic16ou6/brc4SSiKxT5Z4OCbuH3u/D4YSKMp055ZEFC73JwZpG6spozEvu40E5wrxcDjkRxS78UcIvc9FYOp6PQBUMjzA/Vr/K1gOH9XtU4knqhg6HOVZh00O10FNrDvSup0i1ICZ3d9ZWTcv15oItAX6HBy1mQzNRhaZuMjV7y3szv/BJQ+RBGYGwWWOrlNedDvXrZCcL8yPDdJ2kd6m34+wvUg9QD17KYsx6pZSZtB6+pPjtWJjx1tHVr9NVdd2zJchEx3nCSdU2Ht5T2e5LdfNQujFS+G1qptbMo6m7mokz14WF/cSFRYwgL5fg4Hb5OCnGK8xFoTSO4ycu0KiLWRQjXdtb+9rI8b3bzz/NiefnncHNd7TiHD/6jEZkOtYJfvpM/+9SBzP4JXud/NLx4VPlJqOnS8Jlh+hR/9yL+MEPESYV9rcki5/nfn+ZPkfQuuSAxGAy3lAEavS1fcqFx0HmqP90RHwueIwgH82Wa6EH2kvRrN4gKlmxWcxfsLZAsXGlhEARhGP786zjWPm+fQjcsxGn54qDG/PJ8k6HR256r7M8IP4/PzAIRr9Iztxsr2lyy52chEPeT4/Jzn8/cw/HukL6tnv1PWNnI/4m07ilZ9Z5Ttxs0aNCgQYMGDRo0aNCgQYMGDRo0aNCgQYMG/zP8B6zBoPbdkLFhAAAAAElFTkSuQmCC`;

  const selectedMenu = cart[0].selected_menu;
  const menus = selectedMenu.map((menu) => menu.menu.name);

  return (
    <MenuContainer>
      <BrandImage source={{ uri: thumbnail }} />
      <View style={{ marginLeft: 15 }}>
        <Menudetails>
          <FontAwesome5 name="store" size={14} color={styles.themeColor} />
          <MenuDescription>매장 : {restaurant.name}</MenuDescription>
        </Menudetails>

        <Menudetails>
          <Ionicons name="fast-food" size={17} color={styles.themeColor} />
          <MenuDescription>메뉴 : {menus.join(",")}</MenuDescription>
        </Menudetails>

        <Menudetails>
          <Ionicons name="location" size={17} color={styles.themeColor} />
          <MenuDescription>위치: {callLocation.place}</MenuDescription>
        </Menudetails>

        <Menudetails>
          <Ionicons name="walk" size={17} color={styles.themeColor} />
          <MenuDescription>거리: {distance.toFixed(0)}M</MenuDescription>
        </Menudetails>
      </View>
    </MenuContainer>
  );
};

export default CallListBar;

const MenuContainer = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 10px;
  background-color: #fff;
  border-bottom-color: #ededed;
  border-bottom-width: 1px;
  margin-bottom: 5px;
`;

const BrandImage = styled.Image`
  width: 80;
  height: 80;
  border-radius: 80;
`;

const Menudetails = styled.View`
  flex-direction: row;
  margin-bottom: 2.5px;
`;

const MenuDescription = styled.Text`
  margin-left: 10px;
`;
