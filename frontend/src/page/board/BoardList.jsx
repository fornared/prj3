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

  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <Heading mb={8} textAlign="center" fontSize="2xl" fontWeight="bold">
        리뷰
      </Heading>
      <Box mb={8}>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex>
            <Select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              mr={2}
              width="150px"
            >
              <option value="title">제목</option>
              <option value="writer">작성자</option>
            </Select>
            <Input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="검색어 입력"
              mr={2}
            />
            <Button onClick={handleSearch} colorScheme="blue">
              검색
            </Button>
          </Flex>
          <Link to="/write">
            <Button colorScheme="green">글쓰기</Button>
          </Link>
        </Flex>
      </Box>
      <Box bg="white" p={6} boxShadow="lg" borderRadius="md">
        <Table variant="simple">
          <Thead bg="gray.100">
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
                <Td>{board.createdAt}</Td>
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
            >
              {pageNumber}
            </Button>
          ))}
        </Flex>
      </Center>
    </Box>
  );
}
