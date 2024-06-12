import React, { useState } from "react";
import { Box, Button, Collapse, Text, VStack } from "@chakra-ui/react";

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

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>
        공지사항
      </Text>
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
      </VStack>
    </Box>
  );
}

export default Announcement;
