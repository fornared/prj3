import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Flex,
  Hide,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
  Spacer,
} from "@chakra-ui/react";
import { LoginContext } from "./LoginProvider.jsx";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  faHouse,
  faMagnifyingGlass,
  faPencil,
  faRightFromBracket,
  faRightToBracket,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function Navbar() {
  const navigate = useNavigate();
  const account = useContext(LoginContext);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const handleButtonClick = () => {
    navigate(`/search?query=${searchQuery}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
  };

  const images = [
    "/image/slider-image1.jpg",
    "/image/sea.jpg",
    "/image/travel.jpg",
  ];

  return (
    <Box position="relative">
      <Slider {...settings} style={{ height: "500px" }}>
        {images.map((src, index) => (
          <Box
            key={index}
            height="500px"
            bgImage={`url(${src})`}
            bgSize="cover"
            bgPosition="center"
          />
        ))}
      </Slider>

      <Flex
        width="100%"
        px={{
          lg: 200,
          base: 4,
        }}
        gap={3}
        height={500}
        position="absolute"
        top={0}
        left={0}
        right={0}
        align="center"
      >
        <Center
          onClick={() => navigate("/")}
          cursor={"pointer"}
          _hover={{
            bgColor: "rgba(255, 255, 255, 0.5)",
          }}
          p={6}
          fontSize={25}
          fontWeight={700}
          color={"white"}
        >
          <Show below={"lg"}>
            <FontAwesomeIcon icon={faHouse} />
          </Show>
          <Hide below={"lg"}>Travel Place</Hide>
        </Center>

        {/* 검색창 추가 */}
        <Center ml={4} mb={5}>
          <InputGroup width="300px">
            <Input
              placeholder="검색어를 입력하세요!"
              onKeyPress={handleSearch}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              bg="rgba(255, 255, 255, 0.8)"
              _hover={{
                bg: "rgba(255, 255, 255, 1)",
              }}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleButtonClick}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Button>
            </InputRightElement>
          </InputGroup>
        </Center>

        {account.isLoggedIn() && (
          <Center
            onClick={() => navigate("/write")}
            cursor={"pointer"}
            _hover={{
              bgColor: "rgba(255, 255, 255, 0.5)",
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
              bgColor: "rgba(255, 255, 255, 0.5)",
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
              bgColor: "rgba(255, 255, 255, 0.5)",
            }}
            p={6}
            fontSize={20}
            fontWeight={600}
          >
            <FontAwesomeIcon icon={faUsers} />
          </Center>
        )}

        {/* 메뉴 추가 */}
        <Center ml={1}>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              고객센터
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => navigate("/question")}>
                질문 게시판
              </MenuItem>
              <MenuItem onClick={() => navigate("/inquiry")}>
                1:1 문의 하기
              </MenuItem>
              <MenuItem onClick={() => navigate("/announcement")}>
                공지사항
              </MenuItem>
              <MenuItem onClick={() => navigate("/event")}>이벤트</MenuItem>
            </MenuList>
          </Menu>
        </Center>

        {/* 게시판 및 일정관리 버튼 추가 */}
        <Center
          ml={4}
          cursor={"pointer"}
          onClick={() => navigate("/board/list")}
          _hover={{
            bgColor: "rgba(255, 255, 255, 0.5)",
          }}
          p={6}
          fontSize={20}
          fontWeight={600}
          color={"white"}
        >
          게시판
        </Center>

        <Center
          ml={4}
          cursor={"pointer"}
          onClick={() => navigate("/schedule")}
          _hover={{
            bgColor: "rgba(255, 255, 255, 0.5)",
          }}
          p={6}
          fontSize={20}
          fontWeight={600}
          color={"white"}
        >
          일정관리
        </Center>

        <Spacer />
        {!account.isLoggedIn() && (
          <Center
            onClick={() => navigate("/signup")}
            cursor={"pointer"}
            _hover={{
              bgColor: "rgba(255, 255, 255, 0.5)",
            }}
            p={6}
            fontSize={20}
            fontWeight={600}
            color={"deepskyblue"}
          >
            <FontAwesomeIcon icon={faUserPlus} />
          </Center>
        )}

        {!account.isLoggedIn() && (
          <Center
            onClick={() => navigate("/login")}
            cursor={"pointer"}
            _hover={{
              bgColor: "rgba(255, 255, 255, 0.5)",
            }}
            p={6}
            fontSize={20}
            fontWeight={600}
            color={"deepskyblue"}
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
              bgColor: "rgba(255, 255, 255, 0.5)",
            }}
            p={6}
            fontSize={20}
            fontWeight={600}
            color={"deepskyblue"}
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
          </Center>
        )}
      </Flex>
    </Box>
  );
}
