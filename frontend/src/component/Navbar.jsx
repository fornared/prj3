import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Hide,
  Show
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
  faCog,
  faTrash
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
        px={{ lg: 200, base: 4 }}
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
          _hover={{ bgColor: "rgba(255, 255, 255, 0.5)" }}
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

        <Center ml={4} mb={5}>
          <InputGroup width="300px">
            <Input
              placeholder="검색어를 입력하세요!"
              onKeyPress={handleSearch}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              bg="rgba(255, 255, 255, 0.8)"
              _hover={{ bg: "rgba(255, 255, 255, 1)" }}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleButtonClick}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Button>
            </InputRightElement>
          </InputGroup>
        </Center>

        {account.user && (
          <Center
            onClick={() => navigate("/write")}
            cursor={"pointer"}
            _hover={{ bgColor: "rgba(255, 255, 255, 0.5)" }}
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

        {account.user && (
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Flex gap={2}>
                <Box>
                  <FontAwesomeIcon icon={faUser} />
                </Box>
                <Box>
                  <Hide below={"lg"}>{account.user.nickName}</Hide>
                </Box>
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => navigate("/mypage")}>
                <FontAwesomeIcon icon={faCog} />
                <Box ml={2}>마이페이지</Box>
              </MenuItem>
              <MenuItem onClick={() => {
                account.logout();
                navigate("/login");
              }}>
                <FontAwesomeIcon icon={faRightFromBracket} />
                <Box ml={2}>로그아웃</Box>
              </MenuItem>
              <MenuItem onClick={() => {
                if (window.confirm("정말로 탈퇴하시겠습니까?")) {
                  account.deleteUser();
                }
              }}>
                <FontAwesomeIcon icon={faTrash} />
                <Box ml={2}>회원 탈퇴</Box>
              </MenuItem>
            </MenuList>
          </Menu>
        )}

        {!account.user && (
          <Center>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                <Show below={"lg"}>
                  <FontAwesomeIcon icon={faRightToBracket} />
                </Show>
                <Hide below={"lg"}>로그인</Hide>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate("/login")}>
                  <FontAwesomeIcon icon={faRightToBracket} />
                  <Box ml={2}>로그인</Box>
                </MenuItem>
                <MenuItem onClick={() => navigate("/signup")}>
                  <FontAwesomeIcon icon={faUserPlus} />
                  <Box ml={2}>회원가입</Box>
                </MenuItem>
              </MenuList>
            </Menu>
          </Center>
        )}

        <Center ml={4}>
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

        <Center
          ml={4}
          cursor={"pointer"}
          onClick={() => navigate("/board/list")}
          _hover={{ bgColor: "rgba(255, 255, 255, 0.5)" }}
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
          onClick={() => navigate("/course/list")}
          _hover={{ bgColor: "rgba(255, 255, 255, 0.5)" }}
          p={6}
          fontSize={20}
          fontWeight={600}
          color={"white"}
        >
          추천코스
        </Center>

        {account.user && account.user.role === 'admin' && (
          <Center
            onClick={() => navigate("/member/list")}
            cursor={"pointer"}
            _hover={{ bgColor: "rgba(255, 255, 255, 0.5)" }}
            p={6}
            fontSize={20}
            fontWeight={600}
          >
            <FontAwesomeIcon icon={faUsers} />
          </Center>
        )}
      </Flex>
    </Box>
  );
}
