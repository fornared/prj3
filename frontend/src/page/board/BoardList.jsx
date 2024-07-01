import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const [searchType, setSearchType] = useState("title");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchBoardList();
  }, []);

  const fetchBoardList = async (pageNumber = 1) => {
    const response = await axios.get(`/api/board/list?page=${pageNumber}`);
    setBoardList(response.data);
  };

  const handleSearch = async () => {
    const response = await axios.get(
      `/api/board/list?type=${searchType}&text=${searchText}`
    );
    setBoardList(response.data);
  };

  const bgColor = useColorModeValue("white", "gray.800");
  const headingColor = useColorModeValue("teal.700", "teal.300");
  const searchBgColor = useColorModeValue("gray.50", "gray.700");
  const tableHeaderBg = useColorModeValue("gray.100", "gray.700");
  const buttonBgColor = useColorModeValue("teal.50", "teal.700");

  return (
    <Box p={8} bg={bgColor} minH="100vh">
      <Heading mb={8} textAlign="center" fontSize="2xl" fontWeight="bold" color={headingColor}>
        게시판
      </Heading>
      <Box mb={8} bg={searchBgColor} p={4} borderRadius="md" boxShadow="sm">
        <Flex justifyContent="space-between" alignItems="center" flexWrap="wrap">
          <Stack direction={{ base: "column", md: "row" }} spacing={2} align="center">
            <Select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              width="150px"
            >
              <option value="title">제목</option>
              <option value="writer">작성자</option>
            </Select>
            <Input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="검색어 입력"
              width={{ base: "100%", md: "auto" }}
            />
            <Button onClick={handleSearch} colorScheme="blue">
              검색
            </Button>
          </Stack>
          <Link to="/write">
            <Button colorScheme="green">글쓰기</Button>
          </Link>
        </Flex>
      </Box>
      <Box bg="white" p={6} boxShadow="lg" borderRadius="md">
        <Table variant="simple">
          <Thead bg={tableHeaderBg}>
            <Tr>
              <Th>#</Th>
              <Th>제목</Th>
              <Th>작성자</Th>
              <Th>작성일</Th>
            </Tr>
          </Thead>
          <Tbody>
            {boardList.map((board) => (
              <Tr key={board.id}>
                <Td>{board.id}</Td>
                <Td>
                  <Link to={`/board/${board.id}`}>{board.title}</Link>
                </Td>
                <Td>{board.writer}</Td>
                <Td>{board.inserted}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Center mt={8}>
        <Flex wrap="wrap" justifyContent="center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((pageNumber) => (
            <Button
              key={pageNumber}
              onClick={() => fetchBoardList(pageNumber)}
              m={1}
              colorScheme="teal"
              variant="outline"
              bg={buttonBgColor}
            >
              {pageNumber}
            </Button>
          ))}
        </Flex>
      </Center>
    </Box>
  );
}

export default BoardList;
