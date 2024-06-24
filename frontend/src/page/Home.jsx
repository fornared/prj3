import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const EventCard = ({ event, onClick }) => (
  <Box
    borderWidth="1px"
    borderRadius="md"
    overflow="hidden"
    _hover={{ shadow: "md" }}
    onClick={() => onClick(event.id)}
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
);

const TravelCard = ({ imageSrc, title, description }) => (
  <Box borderWidth="1px" borderRadius="md" overflow="hidden">
    <Image src={imageSrc} alt={title} />
    <Box p={4}>
      <Heading as="h3" size="md">
        {title}
      </Heading>
      <Text mt={2}>{description}</Text>
    </Box>
  </Box>
);

const ReviewCard = ({ title, description }) => (
  <Box borderWidth="1px" borderRadius="md" overflow="hidden">
    <Box p={4}>
      <Heading as="h3" size="md">
        {title}
      </Heading>
      <Text mt={2}>{description}</Text>
    </Box>
  </Box>
);

export function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const events = [
    {
      id: 1,
      title: "이벤트 제목 1",
      description: "이벤트 내용 1",
      imageUrl: "/image/event1.jpg",
    },
    {
      id: 2,
      title: "이벤트 제목 2",
      description: "이벤트 내용 2",
      imageUrl: "/image/event2.jpg",
    },
  ];

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (eventId) => {
    const event = events.find((e) => e.id === eventId);
    setSelectedEvent(event);
  };

  return (
    <Box>
      <Box p={4} mb={8}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading as="h2" size="xl" mb={4}>
              가볼만한곳
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              <TravelCard
                imageSrc="/image/image1.jpg"
                title="동대문 디자인 플라자(DDP)"
                description="서울특별시 중구의 전시장 및 쇼핑몰. 영국의 건축가 자하 하디드가 설계했다. 세계 최대 규모의 3차원 비정형 건축물이다."
              />
              <TravelCard
                imageSrc="/image/image2.jpg"
                title="별마당 도서관"
                description="별마당에 가면 책 읽는 사람들 외에도 사진 찍는 사람의 모습을 많이 볼 수 있다. 코엑스몰에서 에어컨이 가장 빵빵한 곳이라 여름에 특히 인기."
              />
              <TravelCard
                imageSrc="/image/image3.jpg"
                title="남산타워"
                description="서울특별시 용산구 남산에 있는 송신탑이자 서울을 대표하는 랜드마크이다. 세계타워연맹(WFGT)에 가입되어 있다."
              />
            </SimpleGrid>
          </Box>

          <Box>
            <Heading as="h2" size="xl" mb={4}>
              추천 여행지
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              <TravelCard
                imageSrc="/image/image4.jpg"
                title="경주"
                description="여행지 4 설명"
              />
              <TravelCard
                imageSrc="/image/image5.jpg"
                title="부산"
                description="여행지 5 설명"
              />
              <TravelCard
                imageSrc="/image/image6.jpg"
                title="제주도"
                description="여행지 6 설명"
              />
            </SimpleGrid>
          </Box>

          <Box>
            <Heading as="h2" size="xl" mb={4}>
              최근 리뷰
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              <ReviewCard title="리뷰 1" description="리뷰 내용 1" />
              <ReviewCard title="리뷰 2" description="리뷰 내용 2" />
              <ReviewCard title="리뷰 3" description="리뷰 내용 3" />
            </SimpleGrid>
          </Box>

          <Box>
            <Heading as="h2" size="xl" mb={4}>
              스토리
            </Heading>
            <Slider {...settings}>
              <Box p={4}>
                <Image src="/image/slider-image1.jpg" alt="슬라이더 이미지 1" />
                <Text mt={2}>북촌한옥마을</Text>
              </Box>
              <Box p={4}>
                <Image src="/image/slider-image2.jpg" alt="슬라이더 이미지 2" />
                <Text mt={2}>슬라이더 이미지 2 설명</Text>
              </Box>
              <Box p={4}>
                <Image src="/image/slider-image3.jpg" alt="슬라이더 이미지 3" />
                <Text mt={2}>슬라이더 이미지 3 설명</Text>
              </Box>
            </Slider>
          </Box>

          <Box>
            <Heading as="h2" size="xl" mb={4}>
              이벤트
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {events.map((event) => (
                <EventCard key={event.id} event={event} onClick={handleEventClick} />
              ))}
            </SimpleGrid>

            {selectedEvent && (
              <Box mt={8} p={4} borderWidth="1px" borderRadius="md">
                <Center mb={4}>
                  <Image src={selectedEvent.imageUrl} alt={selectedEvent.title} />
                </Center>
                <Heading as="h3" size="lg" mb={2}>
                  {selectedEvent.title}
                </Heading>
                <Text mb={4}>{selectedEvent.description}</Text>
                <Button onClick={() => setSelectedEvent(null)}>뒤로가기</Button>
              </Box>
            )}
          </Box>
        </VStack>

        <Box mt={8}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
