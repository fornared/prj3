import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

// 각 이벤트의 세부 정보를 가지고 있는 가짜 데이터
const events = [
  {
    id: 1,
    title: "이벤트 제목 1",
    description: "이벤트 내용 1",
    imageUrl: "/image/event1.jpg", // 나중에 이미지 파일 경로를 추가하세요
  },
  {
    id: 2,
    title: "이벤트 제목 2",
    description: "이벤트 내용 2",
    imageUrl: "/image/event2.jpg", // 나중에 이미지 파일 경로를 추가하세요
  },
  // 필요한 만큼 다른 이벤트 데이터를 추가하세요
];

function Event() {
  // 선택된 이벤트의 상태를 관리합니다.
  const [selectedEvent, setSelectedEvent] = useState(null);

  // 이벤트를 클릭할 때 호출되는 함수
  const handleEventClick = (eventId) => {
    const event = events.find((e) => e.id === eventId);
    setSelectedEvent(event);
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>
        여행 이벤트
      </Heading>
      {!selectedEvent ? (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {events.map((event) => (
            <Box
              key={event.id}
              borderWidth="1px"
              borderRadius="md"
              overflow="hidden"
              _hover={{ shadow: "md" }}
              onClick={() => handleEventClick(event.id)}
              cursor="pointer"
            >
              <Image src={event.imageUrl} alt={event.title} />
              <Box p={4}>
                <Heading as="h3" size="md">
                  {event.title}
                </Heading>
                <Text mt={2}>{event.description}</Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <Box>
          <Image
            src={selectedEvent.imageUrl}
            alt={selectedEvent.title}
            mb={4}
          />
          <Heading as="h2" size="lg" mb={2}>
            {selectedEvent.title}
          </Heading>
          <Text mb={4}>{selectedEvent.description}</Text>
          <Button onClick={() => setSelectedEvent(null)}>뒤로가기</Button>
        </Box>
      )}
    </Box>
  );
}

export default Event;
