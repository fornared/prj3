import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Spacer,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Map, MapMarker } from "react-kakao-maps-sdk";

export function ItineraryDetail() {
  const [places, setPlaces] = useState([]);
  // 리스트
  const [tourList, setTourList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [contentType, setContentType] = useState("");
  const [category, setCategory] = useState("");
  const [cat1, setCat1] = useState([]);
  const [selectedCat1, setSelectedCat1] = useState("");
  const [cat2, setCat2] = useState([]);
  const [selectedCat2, setSelectedCat2] = useState("");
  const [cat3, setCat3] = useState([]);
  const [selectedCat3, setSelectedCat3] = useState("");
  const [area, setArea] = useState("");
  const [areas, setAreas] = useState([]);
  const [sigungu, setSigungu] = useState("");
  const [sigungus, setSigungus] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  // 상세보기
  const [id, setId] = useState(null);
  const [info, setInfo] = useState([]);
  const [introInfo, setIntroInfo] = useState(null);
  const [info2, setInfo2] = useState(null);
  // const [visit, setVisit] = useState({
  //   contentId: null,
  //   description: "메모",
  //   visitTime: "00:00:00",
  // });
  const [visitList, setVisitList] = useState([]);
  const [visitIndex, setVisitIndex] = useState(0);
  const [isAdd, setIsAdd] = useState(false);

  const {
    isOpen: isOpenList,
    onClose: onCloseList,
    onOpen: onOpenList,
  } = useDisclosure();
  const {
    isOpen: isOpenDetail,
    onClose: onCloseDetail,
    onOpen: onOpenDetail,
  } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    if (isOpenList) {
      axios.get("/api/tour/get/areaName").then((res) => {
        setAreas(res.data);
      });
    }
  }, [isOpenList]);

  useEffect(() => {
    if (isOpenList) {
      axios.get(`/api/tour/list?${searchParam}`).then((res) => {
        setTourList(res.data.tourList);
        setPageInfo(res.data.pageInfo);
      });
    }
  }, [isOpenList, isSearch]);

  useEffect(() => {
    if (isOpenList) {
      axios
        .post(`/api/tour/get/searchOption`, {
          contentType: contentType,
          cat1: selectedCat1,
          cat2: selectedCat2,
          area: area,
        })
        .then((res) => {
          setCat1(res.data.nextCat1 || []);
          setCat2(res.data.nextCat2 || []);
          setCat3(res.data.nextCat3 || []);
          setSigungus(res.data.nextSigungu || []);
        });
    }
  }, [contentType, selectedCat1, selectedCat2, area]);

  useEffect(() => {
    if (isOpenDetail) {
      axios
        .get(`/api/tour/${id}`)
        .then((res) => {
          setInfo(res.data.info1);
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
    }
  }, [isOpenDetail]);

  useEffect(() => {
    if (isAdd === true) {
      // console.log(visit);
      console.log(visitList);
      setIsAdd(false);
    }
  }, [isAdd]);

  const pageNums = [];
  for (let i = pageInfo.leftPageNum; i <= pageInfo.rightPageNum; i++) {
    pageNums.push(i);
  }

  const params = new URLSearchParams();
  function handleClickPage(pageNum) {
    if (contentType) {
      params.append("type", contentType);
    }
    if (category) {
      params.append("category", category);
    }
    if (area) {
      params.append("area", area);
    }
    if (sigungu) {
      params.append("sigungu", sigungu);
    }
    if (keyword) {
      params.append("keyword", keyword);
    }
    if (pageNum) {
      params.append("page", pageNum);
    }

    setSearchParam(params);

    setIsSearch(!isSearch);
  }

  function handleClickSearch() {
    if (contentType) {
      params.append("type", contentType);
    }
    if (category) {
      params.append("category", category);
    }
    if (area) {
      params.append("area", area);
    }
    if (sigungu) {
      params.append("sigungu", sigungu);
    }
    if (keyword) {
      params.append("keyword", keyword);
    }

    setSearchParam(params);

    setIsSearch(!isSearch);
  }

  function handleClickReset() {
    setContentType("");
    setSelectedCat1("");
    setSelectedCat2("");
    setCategory("");
    setArea("");
    setSigungu("");
    setKeyword("");
    toast({
      title: "검색 조건이 초기화되었습니다.",
      status: "info",
      position: "top",
      duration: 2000,
    });
  }

  function handleAddContent() {
    const visit = {
      index: visitIndex,
      contentId: id,
      description: "메모",
      visitTime: "00:00:00",
    };

    setVisitList([...visitList, visit]);
    setSearchParam("");
    setContentType("");
    setSelectedCat1("");
    setSelectedCat2("");
    setCategory("");
    setArea("");
    setSigungu("");
    setKeyword("");
    onCloseDetail();
    onCloseList();
    setVisitIndex(visitIndex + 1);

    setIsAdd(true);
  }

  return (
    <Box
      maxW="1200px"
      mx="auto"
      mt={8}
      p={4}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
    >
      <Box mt={8} p={4} borderWidth={1} borderRadius="md" boxShadow="md">
        <Box>
          {/* 장소 목록 */}
          <Stack spacing={2} mb={4}>
            <Heading size="md">day1</Heading>
            {/* 장소 목록을 보여주는 부분 */}
            {places.map((place, index) => (
              <Flex key={index} alignItems="center">
                <Text>{place.name}</Text>
                <Spacer />
                <Button
                  size="sm"
                  colorScheme="red"
                  // onClick={() => handleDeletePlace(index)}
                >
                  삭제
                </Button>
              </Flex>
            ))}
          </Stack>
          <Button onClick={onOpenList}>장소추가</Button>
        </Box>
      </Box>
      <Box mt={8} p={4} borderWidth={1} borderRadius="md" boxShadow="md">
        day2
      </Box>
      <Box mt={8} p={4} borderWidth={1} borderRadius="md" boxShadow="md">
        day3
      </Box>
      {/* 리스트 모달 */}
      <Modal
        isOpen={isOpenList}
        onClose={onCloseList}
        scrollBehavior="inside"
        size="6xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>장소추가</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table
              mb={10}
              border={"2px solid"}
              borderColor="gray.200"
              borderRadius="md"
              boxShadow="sm"
            >
              <Tbody>
                <Tr>
                  <Th width={"15%"}>관광타입</Th>
                  <Td width={"85%"}>
                    <Flex gap={3}>
                      <Select
                        value={contentType}
                        onChange={(e) => {
                          setContentType(e.target.value);
                          setSelectedCat1("");
                          setSelectedCat2("");
                          setCategory("");
                        }}
                      >
                        <option value="">전체</option>
                        <option>관광지</option>
                        <option>문화시설</option>
                        <option>축제/공연/행사</option>
                        <option>여행코스</option>
                        <option>레포츠</option>
                        <option>숙박</option>
                        <option>쇼핑</option>
                        <option>음식</option>
                      </Select>
                      {contentType && (
                        <Select
                          value={selectedCat1}
                          onChange={(e) => {
                            setSelectedCat1(e.target.value);
                            setCategory(e.target.value);
                            setSelectedCat2("");
                          }}
                        >
                          <option value="">대분류</option>
                          {cat1.map((item, index) => (
                            <option key={index}>{item}</option>
                          ))}
                        </Select>
                      )}
                      {selectedCat1 && (
                        <Select
                          value={selectedCat2}
                          onChange={(e) => {
                            const opt = e.target.value;
                            setSelectedCat2(opt);
                            setCategory(opt || selectedCat1);
                            setSelectedCat3("");
                          }}
                        >
                          <option value="">중분류</option>
                          {cat2.map((item, index) => (
                            <option key={index}>{item}</option>
                          ))}
                        </Select>
                      )}
                      {selectedCat2 && (
                        <Select
                          value={selectedCat3}
                          onChange={(e) => {
                            const opt = e.target.value;
                            setSelectedCat3(opt);
                            setCategory(opt || selectedCat2);
                          }}
                        >
                          <option value="">소분류</option>
                          {cat3.map((item, index) => (
                            <option key={index}>{item}</option>
                          ))}
                        </Select>
                      )}
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Th width={"15%"}>지역</Th>
                  <Td width={"85%"}>
                    <Flex gap={3}>
                      <Select
                        value={area}
                        onChange={(e) => {
                          setArea(e.target.value);
                          setSigungu("");
                        }}
                      >
                        <option value="">전체</option>
                        {areas.map((item, index) => (
                          <option key={index}>{item}</option>
                        ))}
                      </Select>
                      {area && (
                        <Select
                          value={sigungu}
                          onChange={(e) => setSigungu(e.target.value)}
                        >
                          <option value="">전체</option>
                          {sigungus.map((item, index) => (
                            <option key={index}>{item}</option>
                          ))}
                        </Select>
                      )}
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Th width={"15%"}>검색어</Th>
                  <Td width={"85%"}>
                    <Flex gap={3}>
                      <Input
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") handleClickSearch();
                        }}
                        placeholder="검색어를 입력하세요"
                      />
                      <Button colorScheme="blue" onClick={handleClickSearch}>
                        검색
                      </Button>
                      <Button colorScheme="gray" onClick={handleClickReset}>
                        초기화
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              </Tbody>
            </Table>

            <Box mb={10}>
              {tourList.length === 0 ? (
                <Center>검색 결과가 없습니다.</Center>
              ) : (
                <SimpleGrid
                  minChildWidth={"280px"}
                  spacing={5}
                  justifyItems={"center"}
                >
                  {tourList.map((item) => (
                    <Box
                      key={item.id}
                      border={"1px solid"}
                      borderColor="gray.200"
                      borderRadius="md"
                      width={"300px"}
                      height={"240px"}
                      cursor={"pointer"}
                      onClick={() => {
                        setId(item.id);
                        onOpenDetail();
                      }}
                      transition="transform 0.2s"
                      _hover={{
                        borderColor: "blue.300",
                        transform: "scale(1.05)",
                      }}
                      overflow="hidden"
                    >
                      <Box
                        height={"190px"}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {item.firstImage1 ? (
                          <Image objectFit={"cover"} src={item.firstImage1} />
                        ) : (
                          <Text>이미지 없음</Text>
                        )}
                      </Box>
                      <Box
                        borderTop={"1px solid"}
                        borderColor="gray.200"
                        height={"40px"}
                        mt={"5px"}
                        fontWeight={"semibold"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        p={2}
                        textAlign="center"
                      >
                        {item.title}
                      </Box>
                    </Box>
                  ))}
                </SimpleGrid>
              )}
            </Box>

            <Center mb={10}>
              <Flex gap={2}>
                {pageInfo.prevPageNum > 0 && (
                  <>
                    <Button onClick={() => handleClickPage(1)}>처음</Button>
                    <Button
                      onClick={() => handleClickPage(pageInfo.prevPageNum)}
                    >
                      이전
                    </Button>
                  </>
                )}
                {pageNums.map((pageNum) => (
                  <Button
                    key={pageNum}
                    onClick={() => handleClickPage(pageNum)}
                    colorScheme={
                      pageNum === pageInfo.currPageNum ? "blue" : "gray"
                    }
                  >
                    {pageNum}
                  </Button>
                ))}
                {pageInfo.nextPageNum < pageInfo.lastPageNum && (
                  <>
                    <Button
                      onClick={() => handleClickPage(pageInfo.nextPageNum)}
                    >
                      다음
                    </Button>
                    <Button
                      onClick={() => handleClickPage(pageInfo.lastPageNum)}
                    >
                      끝
                    </Button>
                  </>
                )}
              </Flex>
            </Center>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      {/* 상세보기 모달 */}
      <Modal
        isOpen={isOpenDetail}
        onClose={onCloseDetail}
        scrollBehavior="inside"
        size="5xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              mt={4}
              border="1px solid black"
              mx={{
                base: 0,
                lg: 10,
              }}
            >
              <Heading>{info.title}</Heading>
              <Box p={4} mt={"10px"} border="1px solid black">
                (사진..)
                <Image src={info.firstImage1} />
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
                      <Td
                        dangerouslySetInnerHTML={{ __html: info.homepage }}
                      ></Td>
                    </Tr>
                    <Tr>
                      <Th>위치</Th>
                      <Td>
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
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
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
                            <Text
                              dangerouslySetInnerHTML={{
                                __html: item.infoText,
                              }}
                            />
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
                                dangerouslySetInnerHTML={{
                                  __html: item.infoText,
                                }}
                              />
                            )}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              )}
            </Box>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button
              onClick={() => {
                handleAddContent();
              }}
              colorScheme="blue"
            >
              추가
            </Button>
            <Button onClick={onCloseDetail}>닫기</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
