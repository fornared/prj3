import React, { useContext } from "react";
import { LoginContext } from "../component/LoginProvider.jsx";
import { Box, Heading, Text, VStack, Button, Image } from "@chakra-ui/react";

export function MyPage() {
  const account = useContext(LoginContext);

  return (
    <Box p={4} maxW="600px" mx="auto">
      <Heading as="h1" size="xl" mb={4}>
        마이페이지
      </Heading>
      <VStack align="start" spacing={4}>
        {/* 프로필 사진 추가 */}
        {account.profilePicture && (
          <Image
            boxSize="150px"
            objectFit="cover"
            src={account.profilePicture}
            alt="Profile Picture"
            borderRadius="full"
            mb={4}
          />
        )}
        <Text fontSize="lg">
          <strong>닉네임:</strong> {account.nickName}
        </Text>
        <Text fontSize="lg">
          <strong>이메일:</strong> {account.id}
        </Text>
        {/* 가입일 추가 */}
        {account.joinDate && (
          <Text fontSize="lg">
            <strong>가입일:</strong> {account.joinDate}
          </Text>
        )}
        <Button colorScheme="blue" onClick={account.logout}>
          로그아웃
        </Button>
      </VStack>
    </Box>
  );
}
