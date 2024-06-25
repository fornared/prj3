import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
  VStack,
  Textarea
} from "@chakra-ui/react";
import { LoginContext } from "../component/LoginProvider.jsx";

export function MyPage() {
  const { user, updateUser, deleteUser, logout } = useContext(LoginContext);
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [introduction, setIntroduction] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setNickName(user.nickName || "");
      setEmail(user.email || "");
      setIntroduction(user.introduction || "");
    }
  }, [user]);

  const handleUpdate = async () => {
    try {
      await updateUser({ nickName, email, introduction });
      toast({
        status: "success",
        description: "회원 정보가 업데이트되었습니다.",
        position: "top",
      });
    } catch (error) {
      toast({
        status: "error",
        description: "회원 정보 업데이트 중 오류가 발생했습니다.",
        position: "top",
      });
    }
  };

  const handleDelete = async () => {
    if (window.confirm("정말로 탈퇴하시겠습니까?")) {
      try {
        await deleteUser();
        toast({
          status: "success",
          description: "회원 탈퇴가 완료되었습니다.",
          position: "top",
        });
        navigate('/signup'); // 회원 탈퇴 후 회원가입 페이지로 이동
      } catch (error) {
        toast({
          status: "error",
          description: "회원 탈퇴 중 오류가 발생했습니다.",
          position: "top",
        });
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Center py={10}>
      <Box w={{ base: "90%", md: "500px" }} p={8} boxShadow="lg" borderRadius="md" bg="white">
        <Center mb={10}>
          <Heading size="lg">마이페이지</Heading>
        </Center>
        <VStack spacing={5}>
          <FormControl>
            <FormLabel>닉네임</FormLabel>
            <Input
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
              placeholder="닉네임을 입력하세요"
              bg="gray.100"
            />
          </FormControl>
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              bg="gray.100"
            />
          </FormControl>
          <FormControl>
            <FormLabel>자기소개</FormLabel>
            <Textarea
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              placeholder="자기소개를 입력하세요"
              bg="gray.100"
            />
          </FormControl>
          <Button onClick={handleUpdate} colorScheme="blue" w="full">
            정보 수정
          </Button>
          <Button onClick={handleLogout} colorScheme="blue" variant="outline" w="full">
            로그아웃
          </Button>
          <Button onClick={handleDelete} colorScheme="red" w="full">
            회원 탈퇴
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}
