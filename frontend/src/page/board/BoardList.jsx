import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    axios.get("/api/board/list").then((res) => setBoardList(res.data));
  }, []);

  return (
    <Box>
      <Box>게시판</Box>
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
                <Td>{board.title}</Td>
                <Td>{board.writer}</Td>
                <Td>123</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Box>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((pageNumber) => (
          <Button key={pageNumber}>{pageNumber}</Button>
        ))}
      </Box>
      <Box>
        <Flex>
          <Box>
            <Select>
              <option value="title">제목</option>
              <option value="writer">작성자</option>
            </Select>
          </Box>
          <Box>
            <Input />
          </Box>
          <Box>
            <Button>검색</Button>
          </Box>
          <Box>
            <Button>글쓰기</Button>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
