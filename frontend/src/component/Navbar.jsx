import { useNavigate } from "react-router-dom";
import { Box, Center, Flex, Hide, Show, Spacer } from "@chakra-ui/react";
import React, { useContext } from "react";
import { LoginContext } from "./LoginProvider.jsx";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faPencil,
  faRightFromBracket,
  faRightToBracket,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export function Navbar() {
  const navigate = useNavigate();
  const account = useContext(LoginContext);

  return (
    <Flex
      width="100%"
      px={{
        lg: 200,
        base: 4,
      }}
      gap={3}
      height={300}
      bgImage="url('/image/sea.jpg')" // 배경 이미지 경로
      bgSize="cover" // 배경 이미지 크기 조절
      bgPosition="center" // 배경 이미지 위치
      bgRepeat="no-repeat" // 배경 이미지 반복 설정
      align="center"
    >
      <Center
        onClick={() => navigate("/")}
        cursor={"pointer"}
        _hover={{
          bgColor: "rgba(255, 255, 255, 0.5)", // 호버 시 배경색을 반투명으로 설정
        }}
        p={6}
        fontSize={20}
        fontWeight={600}
      >
        <Show below={"lg"}>
          <FontAwesomeIcon icon={faHouse} />
        </Show>
        <Hide below={"lg"}>Travel Place</Hide>
      </Center>
      {account.isLoggedIn() && (
        <Center
          onClick={() => navigate("/write")}
          cursor={"pointer"}
          _hover={{
            bgColor: "rgba(255, 255, 255, 0.5)", // 호버 시 배경색을 반투명으로 설정
          }}
          p={6}
          fontSize={20}
          fontWeight={600}
        >
          <Show below={"lg"}>
            <FontAwesomeIcon icon={faPencil} />
          </Show>
          <Hide below={"lg"}>글쓰기</Hide>
        </Center>
      )}
      <Spacer />
      {account.isLoggedIn() && (
        <Center
          onClick={() => navigate(`/member/${account.id}`)}
          cursor={"pointer"}
          _hover={{
            bgColor: "rgba(255, 255, 255, 0.5)", // 호버 시 배경색을 반투명으로 설정
          }}
          p={6}
          fontSize={20}
          fontWeight={600}
        >
          <Flex gap={2}>
            <Box>
              <FontAwesomeIcon icon={faUser} />
            </Box>
            <Box>
              <Hide below={"lg"}>{account.nickName}</Hide>
            </Box>
          </Flex>
        </Center>
      )}
      {account.isAdmin() && (
        <Center
          onClick={() => navigate("/member/list")}
          cursor={"pointer"}
          _hover={{
            bgColor: "rgba(255, 255, 255, 0.5)", // 호버 시 배경색을 반투명으로 설정
          }}
          p={6}
          fontSize={20}
          fontWeight={600}
        >
          <FontAwesomeIcon icon={faUsers} />
        </Center>
      )}
      {!account.isLoggedIn() && (
        <Center
          onClick={() => navigate("/signup")}
          cursor={"pointer"}
          _hover={{
            bgColor: "rgba(255, 255, 255, 0.5)", // 호버 시 배경색을 반투명으로 설정
          }}
          p={6}
          fontSize={20}
          fontWeight={600}
        >
          <FontAwesomeIcon icon={faUserPlus} />
        </Center>
      )}
      {!account.isLoggedIn() && (
        <Center
          onClick={() => navigate("/login")}
          cursor={"pointer"}
          _hover={{
            bgColor: "rgba(255, 255, 255, 0.5)", // 호버 시 배경색을 반투명으로 설정
          }}
          p={6}
          fontSize={20}
          fontWeight={600}
        >
          <FontAwesomeIcon icon={faRightToBracket} />
        </Center>
      )}
      {account.isLoggedIn() && (
        <Center
          onClick={() => {
            account.logout();
            navigate("/login");
          }}
          cursor={"pointer"}
          _hover={{
            bgColor: "rgba(255, 255, 255, 0.5)", // 호버 시 배경색을 반투명으로 설정
          }}
          p={6}
          fontSize={20}
          fontWeight={600}
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
        </Center>
      )}
    </Flex>
  );
}
