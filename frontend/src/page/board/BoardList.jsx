import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const [searchType, setSearchType] = useState("title");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchBoardList();
  }, []);

  const fetchBoardList = async () => {
    const response = await axios.get("/api/board/list");
    setBoardList(response.data);
  };

  const handleSearch = async () => {
    const response = await axios.get(
      `/api/board/list?type=${searchType}&text=${searchText}`,
    );
    setBoardList(response.data);
  };

  return (
    <Box fontSize={20} fontWeight={700}>
      <Box>리뷰</Box>
      <Box>
        <Table>
          <Thead>
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
      <Box>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((pageNumber) => (
          <Button key={pageNumber} onClick={() => fetchBoardList(pageNumber)}>
            {pageNumber}
          </Button>
        ))}
      </Box>
      <Box>
        <Flex>
          <Box>
            <Select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="title">제목</option>
              <option value="writer">작성자</option>
            </Select>
          </Box>
          <Box>
            <Input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Box>
          <Box>
            <Button onClick={handleSearch}>검색</Button>
          </Box>
          <Box>
            <Link to="/write">
              <Button>글쓰기</Button>
            </Link>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
