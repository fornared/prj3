import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Collapse,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Announcement(props) {
  // 공지사항 목록 데이터
  const announcements = [
    { id: 1, title: "공지사항 제목 1", content: "공지사항 내용 1" },
    { id: 2, title: "공지사항 제목 2", content: "공지사항 내용 2" },
    { id: 3, title: "공지사항 제목 3", content: "공지사항 내용 3" },
    // 다른 공지사항 데이터 추가 가능
  ];

  // 클릭된 공지사항의 ID를 상태로 관리
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState(null);
  const navigate = useNavigate();

  // 공지사항을 클릭할 때 해당 공지사항의 세부 내용을 표시하기 위한 함수
  const handleAnnouncementClick = (id) => {
    if (selectedAnnouncementId === id) {
      // 이미 클릭된 공지사항을 다시 클릭하면 내용을 숨김
      setSelectedAnnouncementId(null);
    } else {
      // 클릭된 공지사항 ID를 설정
      setSelectedAnnouncementId(id);
    }
  };

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      // 엔터 키를 누르면 검색을 수행
      const query = event.target.value;
      navigate(`/search?query=${query}`);
    }
  };

  const handleButtonClick = () => {
    // 버튼을 클릭하면 검색을 수행
    const query = document.getElementById("search-input").value;
    navigate(`/search?query=${query}`);
  };

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>
        공지사항
      </Text>

      {/* 검색창 추가 */}
      <Center ml={4} mb={5}>
        <InputGroup width="300px">
          <Input
            id="search-input"
            placeholder="검색어를 입력하세요!"
            onKeyPress={handleSearch}
            bg="rgba(255, 255, 255, 0.8)" // 검색창 배경색을 반투명하게 설정
            _hover={{
              bg: "rgba(255, 255, 255, 1)", // 호버 시 배경색 변경
            }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleButtonClick}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
          </InputRightElement>
        </InputGroup>
      </Center>

      <VStack spacing={4} align="stretch">
        {announcements.map((announcement) => (
          <Box key={announcement.id} borderWidth="1px" borderRadius="md" p={4}>
            <Button
              onClick={() => handleAnnouncementClick(announcement.id)}
              width="100%"
              textAlign="left"
              variant="ghost"
              _hover={{ bg: "gray.100" }}
            >
              {announcement.title}
            </Button>
            <Collapse in={selectedAnnouncementId === announcement.id}>
              <Box mt={2} p={2} bg="gray.50" borderRadius="md">
                <Text>{announcement.content}</Text>
              </Box>
            </Collapse>
          </Box>
        ))}
        <Center>
          <Box>
            {[1, 2, 3, 4].map((pageNumber) => (
              <Button key={pageNumber}>{pageNumber}</Button>
            ))}
          </Box>
        </Center>
      </VStack>
    </Box>
  );
}

export default Announcement;
