import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Select,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export function TourList() {
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
  const [keyword, setKeyword] = useState("");
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/tour/get/areaName").then((res) => {
      setAreas(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`/api/tour/list?${searchParams}`).then((res) => {
      setTourList(res.data.tourList);
      setPageInfo(res.data.pageInfo);

      setContentType("");
      setCategory("");
      setArea("");
      setSigungu("");
      setKeyword("");

      const typeParam = searchParams.get("type");
      const categoryParam = searchParams.get("category");
      const areaParam = searchParams.get("area");
      const sigunguParam = searchParams.get("sigungu");
      const keywordParam = searchParams.get("keyword");

      if (typeParam) {
        setContentType(typeParam);
      }
      if (categoryParam) {
        setCategory(categoryParam);
      }
      if (areaParam) {
        setArea(areaParam);
      }
      if (sigunguParam) {
        setSigungu(sigunguParam);
      }
      if (keywordParam) {
        setKeyword(keywordParam);
      }
    });
  }, [searchParams]);

  useEffect(() => {
    axios
      .post(`/api/tour/get/searchOption`, {
        contentType: contentType,
        cat1: selectedCat1,
        cat2: selectedCat2,
        area: area,
      })
      .then((res) => {
        setCat1(res.data.nextCat1 || []);
        console.log(cat1);
        setCat2(res.data.nextCat2 || []);
        console.log(cat2);
        setCat3(res.data.nextCat3 || []);
      });
  }, [contentType, selectedCat1, selectedCat2, area]);

  const pageNums = [];
  for (let i = pageInfo.leftPageNum; i <= pageInfo.rightPageNum; i++) {
    pageNums.push(i);
  }

  function handleClickPage(pageNum) {
    searchParams.set("page", pageNum);
    navigate(`/tour/list?${searchParams}`);
  }

  function handleClickSearch() {
    navigate(`/tour/list?type=${contentType}&category=${category}`);
  }

  return (
    <Box
      mx={{
        base: 0,
        lg: 200,
      }}
    >
      <Box mb={10}>
        <Heading>list</Heading>
      </Box>
      <Center mb={10} gap={2}>
        <Box>
          <Select
            value={contentType}
            onChange={(e) => {
              setContentType(e.target.value);
              setSelectedCat1("");
            }}
          >
            <option value="">관광타입</option>
            <option>관광지</option>
            <option>문화시설</option>
            <option>축제/공연/행사</option>
            <option>여행코스</option>
            <option>레포츠</option>
            <option>숙박</option>
            <option>쇼핑</option>
            <option>음식</option>
          </Select>
        </Box>
        <Box>
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
        </Box>
        <Box>
          <Select
            value={selectedCat2}
            onChange={(e) => {
              const opt = e.target.value;

              setSelectedCat2(opt);

              if (opt === "") {
                setCategory(selectedCat1);
              } else {
                setCategory(opt);
              }

              setSelectedCat3("");
            }}
          >
            <option value="">중분류</option>
            {cat2.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </Select>
        </Box>
        <Box>
          <Select
            value={selectedCat3}
            onChange={(e) => {
              const opt = e.target.value;

              setSelectedCat3(opt);

              if (opt === "") {
                setCategory(selectedCat2);
              } else {
                setCategory(opt);
              }
            }}
          >
            <option value="">소분류</option>
            {cat3.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </Select>
        </Box>

        <Box>
          <Select
            value={area}
            onChange={(e) => {
              setArea(e.target.value);
              setSigungu("");
            }}
          >
            <option value="">지역</option>
            {areas.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </Select>
        </Box>

        {/*<Box>*/}
        {/*  <Select value={sigungu} onChange={(e) => setSigungu(e.target.value)}>*/}
        {/*    <option value="">전체</option>*/}
        {/*    {sigungu.map((item, index) => (*/}
        {/*      <option key={index}>{item}</option>*/}
        {/*    ))}*/}
        {/*  </Select>*/}
        {/*</Box>*/}

        <Box>
          <Button onClick={handleClickSearch}>검색버튼</Button>
        </Box>
      </Center>
      <Box mb={10}>
        {tourList.length === 0 && <Center>결과없음</Center>}
        {tourList.length > 0 && (
          <SimpleGrid minChildWidth={"280px"} spacing={10}>
            {tourList.map((item) => (
              <Box
                key={item.id}
                bg={"tomato"}
                width={"280px"}
                height={"210px"}
                cursor={"pointer"}
                onClick={() => navigate(`/tour/list/${item.id}`)}
              >
                <Box
                  border={"1px solid black"}
                  height={"180px"}
                  align={"center"}
                  overflow={"hidden"}
                >
                  {item.firstImage1 !== "" && (
                    <Image
                      // maxWidth={"100%"}
                      // maxHeight={"100%"}
                      objectFit={"contain"}
                      src={item.firstImage1}
                    />
                  )}
                  {item.firstImage1 === "" && <Text>없음</Text>}
                </Box>
                <Box
                  border={"1px solid black"}
                  mt={"1"}
                  fontWeight={"semibold"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  {item.title}
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Box>
      <Center mb={10}>
        <Flex gap={1}>
          {pageInfo.prevPageNum > 0 && (
            <>
              <Button onClick={() => handleClickPage(1)}>처음</Button>
              <Button onClick={() => handleClickPage(pageInfo.prevPageNum)}>
                이전
              </Button>
            </>
          )}
          {pageNums.map((pageNum) => (
            <Button
              key={pageNum}
              onClick={() => handleClickPage(pageNum)}
              colorScheme={pageNum === pageInfo.currPageNum ? "blue" : "gray"}
            >
              {pageNum}
            </Button>
          ))}
          {pageInfo.nextPageNum < pageInfo.lastPageNum && (
            <>
              <Button onClick={() => handleClickPage(pageInfo.nextPageNum)}>
                다음
              </Button>
              <Button onClick={() => handleClickPage(pageInfo.lastPageNum)}>
                끝
              </Button>
            </>
          )}
        </Flex>
      </Center>
    </Box>
  );
}
