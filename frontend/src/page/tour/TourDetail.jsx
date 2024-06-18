import {
  Box,
  Button,
  Collapse,
  Flex,
  Heading,
  Image,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export function TourDetail() {
  const { id } = useParams();
  const [info, setInfo] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/tour/list/${id}`)
      .then((res) => {
        setInfo(res.data.info1);
      })
      .catch(() => {});
  }, []);

  if (info === null) {
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
        lg: 200,
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
            {info.overview}
          </Collapse>
        </Box>
        <Flex justifyContent="flex-end">
          <Button variant="unstyled" size={"sm"} onClick={handleToggleShow}>
            {showAll ? "접기" : "..더보기"}
          </Button>
        </Flex>
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
          </Tbody>
        </Table>
      </Box>
      <Box p={4} mt={"10px"} border="1px solid black">
        (리뷰..)
      </Box>
    </Box>
  );
}
