import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Flex,
  Hide,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
  Spacer,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { LoginContext } from "./LoginProvider.jsx";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChevronDownIcon } from "@chakra-ui/icons";
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

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      // 엔터 키를 누르면 검색을 수행합니다.
      const query = event.target.value;
      navigate(`/search?query=${query}`);
    }
  };

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

      {/* 검색창 추가 */}
      <Center ml={4}>
        <Input
          placeholder="검색어를 입력하세요..."
          onKeyPress={handleSearch}
          width="300px"
          bg="rgba(255, 255, 255, 0.8)" // 검색창 배경색을 반투명하게 설정
          _hover={{
            bg: "rgba(255, 255, 255, 1)", // 호버 시 배경색 변경
          }}
        />
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

      {/* 메뉴 추가 */}
      <Center ml={700}>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            고객센터
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => navigate("/question")}>
              자주 묻는 질문
            </MenuItem>
            <MenuItem onClick={() => navigate("/inquiry")}>
              1:1 문의 하기
            </MenuItem>
            <MenuItem onClick={() => navigate("/Cooperation")}>
              협업 문의하기
            </MenuItem>
            <MenuItem onClick={() => navigate("/announcement")}>
              공지사항
            </MenuItem>
            <MenuItem onClick={() => navigate("/event")}>이벤트</MenuItem>
          </MenuList>
        </Menu>
      </Center>

      <Spacer />

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
