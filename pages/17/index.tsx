/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable no-undef */
import Head from "next/head";
import { SetStateAction, useEffect, useState } from "react";
import styled from "@emotion/styled";

const MapWrap = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
`;
const Mapz = styled.div``;
const HAddr = styled.div`
  position: absolute;
  left: 10px;
  top: 10px;
  border-radius: 2px;
  background: #fff;
  background: rgba(255, 255, 255, 0.8);
  z-index: 1;
  padding: 5px;
`;
const Title = styled.span`
  font-weight: bold;
  display: block;
`;
const CenterAddr = styled.span`
  display: block;
  margin-top: 2px;
  font-weight: normal;
`;
export default function Page17() {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  const onChange = (event: { target: { value: SetStateAction<string> } }) => {
    setInputText(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setPlace(inputText);
  };
  useEffect(() => {
    const script = document.createElement("script"); // <script></script>
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=9bbd257bacbf7b1e0519291e4f771ef5";
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(function () {
        const container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
        const options = {
          // 지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(37.518006, 126.957734), // 지도의 중심좌표.
          level: 3, // 지도의 레벨(확대, 축소 정도)
        };

        const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
        console.log(map);

        // 주소-좌표 변환 객체를 생성합니다
        const geocoder = new window.kakao.maps.services.Geocoder();

        const marker = new window.kakao.maps.Marker(); // 클릭한 위치를 표시할 마커입니다
        const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 }); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

        // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
        window.kakao.maps.event.addListener(
          map,
          "click",
          function (mouseEvent: {
            latLng: kakao.maps.LatLng | kakao.maps.Viewpoint;
          }) {
            searchDetailAddrFromCoords(
              mouseEvent.latLng,
              function (result, status) {
                if (status === window.kakao.maps.services.Status.OK) {
                  let detailAddr = result[0].road_address
                    ? "<div>도로명주소: " +
                      result[0].road_address.address_name +
                      "</div>"
                    : "";
                  detailAddr +=
                    "<div>지번주소: " +
                    result[0].address.address_name +
                    "</div>";

                  const content =
                    '<div class="bAddr" style="width:300px;height:100px; font-size:12px;">' +
                    '<span class="title">주소정보</span>' +
                    detailAddr +
                    "</div>";

                  // 마커를 클릭한 위치에 표시합니다
                  marker.setPosition(mouseEvent.latLng);
                  marker.setMap(map);

                  // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
                  infowindow.setContent(content);
                  infowindow.open(map, marker);
                }
              }
            );
          }
        );

        // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
        window.kakao.maps.event.addListener(map, "idle", function () {
          searchAddrFromCoords(map.getCenter());
        });

        function searchAddrFromCoords(
          coords: kakao.maps.LatLng,
          callback: {
            (result: string | any[], status: kakao.maps.services.Status): void;
            (result: string | any[], status: kakao.maps.services.Status): void;
            (
              result: kakao.maps.services.RegionCode[],
              status: kakao.maps.services.Status
            ): void;
          }
        ) {
          // 좌표로 행정동 주소 정보를 요청합니다
          geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
        }

        function searchDetailAddrFromCoords(
          coords: { getLng: () => number; getLat: () => number },
          callback: {
            (result: any, status: any): void;
            (
              // eslint-disable-next-line @typescript-eslint/array-type
              result: {
                address: kakao.maps.services.Address;
                road_address: kakao.maps.services.RoadAaddress | null;
              }[],
              status: kakao.maps.services.Status
            ): void;
          }
        ) {
          // 좌표로 법정동 상세 주소 정보를 요청합니다
          geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
        }

        const ps = new kakao.maps.services.Places();

        ps.keywordSearch(placesSearchCB);
        function placesSearchCB(data, status, pagination) {
          const bounds = new kakao.maps.LatLngBounds();
          if (status === kakao.maps.services.Status.OK) {
            for (let i = 0; i < data.length; i++) {
              displayMarker(data[i]);
              bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }

            map.setBounds(bounds);
          }
        }
        function displayMarker(place) {
          const marker = new kakao.maps.Marker({
            map,
            position: new kakao.maps.LatLng(place.y, place.x),
          });

          // 마커에 클릭이벤트를 등록합니다
          kakao.maps.event.addListener(marker, "click", function (mouseEvent) {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent(
              '<div style="padding:5px;font-size:10px">' +
                place.place_name +
                "<br />" +
                '<span style="color:red">' +
                "위도:  " +
                place.x +
                "</span>" +
                "<br />" +
                '<span style="color:red">' +
                "경도:  " +
                place.y +
                "</span>" +
                "</div>"
            );

            infowindow.open(map, marker);
          });
        }
      });
    };
  });
  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=9bbd257bacbf7b1e0519291e4f771ef5&libraries=services"
        ></script>
      </Head>
      <form className="inputForm" onSubmit={handleSubmit}>
        <input
          placeholder="검색어를 입력하세요"
          onChange={onChange}
          value={inputText}
        />
        <button type="submit">검색</button>
      </form>
      <MapWrap className="map_wrap">
        <Mapz
          id="map"
          style={{
            width: 500,
            height: 400,
            overflow: "hidden",
            position: "relative",
          }}
        ></Mapz>
        <HAddr className="hAddr">
          <Title className="title">주소정보</Title>
          <CenterAddr id="centerAddr"></CenterAddr>
        </HAddr>
        <p>
          <em>지도를 클릭해주세요!</em>
        </p>
      </MapWrap>
    </>
  );
}
