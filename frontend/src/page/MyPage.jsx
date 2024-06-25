import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
  VStack,
  Textarea,
  Avatar,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { LoginContext } from "../component/LoginProvider.jsx";

export function MyPage() {
  const { id, nickName, email, introduction, updateUser, deleteUser, logout } = useContext(LoginContext);
  const [nickNameInput, setNickNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [introductionInput, setIntroductionInput] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setNickNameInput(nickName || "");
      setEmailInput(email || "");
      setIntroductionInput(introduction || "");
    }
  }, [id, nickName, email, introduction]);

  const handleUpdate = async () => {
    try {
      await updateUser({ nickName: nickNameInput, email: emailInput, introduction: introductionInput });
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
    <Center py={10} bg="gray.50" minHeight="100vh">
      <Box w={{ base: "90%", md: "600px" }} p={8} boxShadow="xl" borderRadius="md" bg="white">
        <Center mb={10}>
          <Heading size="lg">마이페이지</Heading>
        </Center>
        <VStack spacing={5}>
          <Avatar size="xl" name={nickNameInput} mb={5} />
          <Divider />
          <FormControl>
            <FormLabel>닉네임</FormLabel>
            <Input
              value={nickNameInput}
              onChange={(e) => setNickNameInput(e.target.value)}
              placeholder="닉네임을 입력하세요"
              bg="gray.100"
              borderRadius="md"
              _hover={{ bg: "gray.200" }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <Input
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="이메일을 입력하세요"
              bg="gray.100"
              borderRadius="md"
              _hover={{ bg: "gray.200" }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>자기소개</FormLabel>
            <Textarea
              value={introductionInput}
              onChange={(e) => setIntroductionInput(e.target.value)}
              placeholder="자기소개를 입력하세요"
              bg="gray.100"
              borderRadius="md"
              _hover={{ bg: "gray.200" }}
            />
          </FormControl>
          <HStack w="full" spacing={4}>
            <Button onClick={handleUpdate} colorScheme="blue" flex={1}>
              정보 수정
            </Button>
            <Button onClick={handleLogout} colorScheme="blue" variant="outline" flex={1}>
              로그아웃
            </Button>
          </HStack>
          <Button onClick={handleDelete} colorScheme="red" w="full">
            회원 탈퇴
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}
