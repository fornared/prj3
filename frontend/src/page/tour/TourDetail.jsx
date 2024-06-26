import {
  Box,
  Button,
  Collapse,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ReviewComponent } from "../../component/review/ReviewComponent.jsx";
import { Map, MapMarker } from "react-kakao-maps-sdk";

export function TourDetail() {
  const { id } = useParams();
  const [info, setInfo] = useState([]);
  const [introInfo, setIntroInfo] = useState(null);
  const [info2, setInfo2] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [showBtnMore, setShowBtnMore] = useState(false);
  const { onClose, onOpen, isOpen } = useDisclosure();

  const overviewRef = useRef(null);

  useEffect(() => {
    axios
      .get(`/api/tour/${id}`)
      .then((res) => {
        setInfo(res.data.info1);
        function handleResize() {
          if (overviewRef.current) {
            const overviewHeight = overviewRef.current.clientHeight;
            setShowBtnMore(overviewHeight > 96);
          }
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      })
      .catch(() => {});

    axios
      .get(`/api/tour/${id}/info2`)
      .then((res) => {
        setInfo2(res.data);
      })
      .catch();

    axios
      .get(`/api/tour/${id}/intro`)
      .then((res) => {
        setIntroInfo(res.data);
      })
      .catch();
  }, [info.overview]);

  useEffect(() => {}, []);

  if (info && info.length === 0) {
    return <Spinner />;
  }

  function handleToggleShow() {
    setShowAll(!showAll);
  }

  return (
    <Box
      mt="30px"
      border="1px solid black"
      mx={{
        base: 0,
        lg: 100,
      }}
    >
      <Box>
        <Heading>detail</Heading>
      </Box>
      <Box p={4} mt={"10px"} border="1px solid black">
        (사진..)
        <Image src={info.firstImage1} />
      </Box>
      <Box p={4} mt={"10px"} border="1px solid black">
        (설명..)
        <Box whiteSpace="pre-wrap">
          <Collapse startingHeight={"6em"} in={showAll}>
            <div ref={overviewRef}>{info.overview}</div>
          </Collapse>
        </Box>
        {showBtnMore && (
          <Flex justifyContent="flex-end">
            <Button variant="unstyled" size={"sm"} onClick={handleToggleShow}>
              {showAll ? "접기" : "..더보기"}
            </Button>
          </Flex>
        )}
      </Box>
      <Box p={4} mt={"10px"} border="1px solid black">
        (정보..)
        <Table>
          <Tbody>
            <Tr>
              <Th>우편번호</Th>
              <Td>{info.zipcode}</Td>
            </Tr>
            <Tr>
              <Th>주소</Th>
              <Td>{info.address}</Td>
            </Tr>
            <Tr>
              <Th>전화번호</Th>
              <Td>{info.tel}</Td>
            </Tr>
            <Tr>
              <Th>홈페이지</Th>
              <Td dangerouslySetInnerHTML={{ __html: info.homepage }}></Td>
            </Tr>
            <Tr>
              <Th>위치</Th>
              <Td>
                <Button onClick={onOpen} size={"sm"} colorScheme={"blue"}>
                  지도열기
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>지도</ModalHeader>
            <ModalBody align={"center"}>
              <Map
                center={{ lat: info.mapy, lng: info.mapx }}
                style={{
                  width: "400px",
                  height: "350px",
                  border: "1px solid black",
                  borderRadius: "10px",
                }}
                level={6}
              >
                <MapMarker
                  style={{ border: "tranparent" }}
                  position={{ lat: info.mapy, lng: info.mapx }}
                ></MapMarker>
              </Map>
            </ModalBody>
            <ModalFooter>
              <Button mr={1} colorScheme={"red"} onClick={onClose}>
                닫기
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
      {introInfo !== null && (
        <Box p={4} mt={"10px"} border="1px solid black">
          (소개정보..)
          <Table>
            <Tbody>
              {introInfo.map((item) => (
                <Tr key={item.number}>
                  <Th>{item.infoName}</Th>
                  <Td>
                    <Text dangerouslySetInnerHTML={{ __html: item.infoText }} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
      {info2 !== null && (
        <Box p={4} mt={"10px"} border="1px solid black">
          (상세정보..)
          <Table>
            <Tbody>
              {info2.map((item) => (
                <Tr key={item.number}>
                  <Th>{item.infoName}</Th>
                  <Td>
                    {item.infoName === "객실사진" &&
                    item.infoText.trim().length > 0 ? (
                      item.infoText
                        .split(",")
                        .map((imgUrl, index) => (
                          <Image key={index} src={imgUrl.trim()} />
                        ))
                    ) : (
                      <Text
                        dangerouslySetInnerHTML={{ __html: item.infoText }}
                      />
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
      <Box p={4} mt={"10px"} border="1px solid black">
        (리뷰..)
        <ReviewComponent contentId={info.id} />
      </Box>
    </Box>
  );
}
