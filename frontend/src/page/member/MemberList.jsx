import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Center,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MemberList() {
  const [memberList, setMemberList] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    axios.get("/api/member/list")
      .then((res) => {
        setMemberList(res.data);
      })

      .catch((error) => {
        toast({
          title: "회원 목록 로드 오류",
          description: "회원 목록을 가져오는 중에 오류가 발생했습니다.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }, []);

  if (memberList.length === 0) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <Box p={4}>
      <Box mb={10}>
        <Heading>회원 목록</Heading>
      </Box>
      <Box overflowX="auto">
        <Table>
          <Thead>
            <Tr>
              <Th w={20}>#</Th>
              <Th>이메일</Th>
              <Th>이름</Th>
              <Th w={"150px"}>별명</Th>
              <Th>성별</Th>
              <Th>생년월일</Th>
              <Th>전화번호</Th>
              <Th w={96}>가입일시</Th>
            </Tr>
          </Thead>
          <Tbody>
            {memberList.map((member) => (
              <Tr
                cursor={"pointer"}
                _hover={{ bgColor: "gray.200" }}
                onClick={() => navigate(`/member/${member.id}`)}
                key={member.id}
              >
                <Td>{member.id}</Td>
                <Td>{member.email}</Td>
                <Td>{member.name}</Td>
                <Td>{member.nickName}</Td>
                <Td>{member.gender}</Td>
                <Td>{member.birth}</Td>
                <Td>{member.phone}</Td>
                <Td>{member.inserted}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
