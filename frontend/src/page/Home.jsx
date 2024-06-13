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

export function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // 이벤트 데이터
  const events = [
    {
      id: 1,
      title: "이벤트 제목 1",
      description: "이벤트 내용 1",
      imageUrl: "/image/event1.jpg", // 이미지 파일 경로
    },
    {
      id: 2,
      title: "이벤트 제목 2",
      description: "이벤트 내용 2",
      imageUrl: "/image/event2.jpg", // 이미지 파일 경로
    },
  ];

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (eventId) => {
    const event = events.find((e) => e.id === eventId);
    setSelectedEvent(event);
  };

  return (
    <Box>
      {/* 메인 컨텐츠 */}
      <Box p={4} mb={8}>
        <VStack spacing={8} align="stretch">
          {/* 인기 여행지 섹션 */}
          <Box>
            <Heading as="h2" size="xl" mb={4}>
              가볼만한곳
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              {/* 예시 여행지 카드 */}
              <Box borderWidth="1px" borderRadius="md" overflow="hidden">
                <Image src="/image/image1.jpg" alt="여행지 1" />
                <Box p={4}>
                  <Heading as="h3" size="md">
                    동대문 디자인 플라자(DDP)
                  </Heading>
                  <Text mt={2}>
                    서울특별시 중구의 전시장 및 쇼핑몰. 영국의 건축가 자하
                    하디드가 설계했다. 세계 최대 규모의 3차원 비정형 건축물이다.
                  </Text>
                </Box>
              </Box>
              <Box borderWidth="1px" borderRadius="md" overflow="hidden">
                <Image src="/image/image2.jpg" alt="여행지 2" />
                <Box p={4}>
                  <Heading as="h3" size="md">
                    별마당 도서관
                  </Heading>
                  <Text mt={2}>
                    별마당에 가면 책 읽는 사람들 외에도 사진 찍는 사람의 모습을
                    많이 볼 수 있다. 코엑스몰에서 에어컨이 가장 빵빵한 곳이라
                    여름에 특히 인기.
                  </Text>
                </Box>
              </Box>
              <Box borderWidth="1px" borderRadius="md" overflow="hidden">
                <Image src="/image/image3.jpg" alt="여행지 3" />
                <Box p={4}>
                  <Heading as="h3" size="md">
                    남산타워
                  </Heading>
                  <Text mt={2}>
                    서울특별시 용산구 남산에 있는 송신탑이자 서울을 대표하는
                    랜드마크이다. 세계타워연맹(WFGT)에 가입되어 있다.
                  </Text>
                </Box>
              </Box>
            </SimpleGrid>
          </Box>

          {/* 추천 여행지 섹션 */}
          <Box>
            <Heading as="h2" size="xl" mb={4}>
              추천 여행지
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              {/* 예시 추천 여행지 카드 */}
              <Box borderWidth="1px" borderRadius="md" overflow="hidden">
                <Image src="/image/image4.jpg" alt="여행지 4" />
                <Box p={4}>
                  <Heading as="h3" size="md">
                    여행지 4
                  </Heading>
                  <Text mt={2}>여행지 4 설명</Text>
                </Box>
              </Box>
              <Box borderWidth="1px" borderRadius="md" overflow="hidden">
                <Image src="/image/image5.jpg" alt="여행지 5" />
                <Box p={4}>
                  <Heading as="h3" size="md">
                    여행지 5
                  </Heading>
                  <Text mt={2}>여행지 5 설명</Text>
                </Box>
              </Box>
              <Box borderWidth="1px" borderRadius="md" overflow="hidden">
                <Image src="/image/image6.jpg" alt="여행지 6" />
                <Box p={4}>
                  <Heading as="h3" size="md">
                    여행지 6
                  </Heading>
                  <Text mt={2}>여행지 6 설명</Text>
                </Box>
              </Box>
            </SimpleGrid>
          </Box>

          {/* 최근 리뷰 섹션 */}
          <Box>
            <Heading as="h2" size="xl" mb={4}>
              최근 리뷰
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              {/* 예시 리뷰 카드 */}
              <Box borderWidth="1px" borderRadius="md" overflow="hidden">
                <Box p={4}>
                  <Heading as="h3" size="md">
                    리뷰 1
                  </Heading>
                  <Text mt={2}>리뷰 내용 1</Text>
                </Box>
              </Box>
              <Box borderWidth="1px" borderRadius="md" overflow="hidden">
                <Box p={4}>
                  <Heading as="h3" size="md">
                    리뷰 2
                  </Heading>
                  <Text mt={2}>리뷰 내용 2</Text>
                </Box>
              </Box>
              <Box borderWidth="1px" borderRadius="md" overflow="hidden">
                <Box p={4}>
                  <Heading as="h3" size="md">
                    리뷰 3
                  </Heading>
                  <Text mt={2}>리뷰 내용 3</Text>
                </Box>
              </Box>
            </SimpleGrid>
          </Box>

          {/* 캐러셀 슬라이더 섹션 */}
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

          {/* 이벤트 섹션 */}
          <Box>
            <Heading as="h2" size="xl" mb={4}>
              이벤트
            </Heading>
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

            {/* 선택된 이벤트의 세부 정보 표시 */}
            {selectedEvent && (
              <Box mt={8} p={4} borderWidth="1px" borderRadius="md">
                <Center mb={4}>
                  <Image
                    src={selectedEvent.imageUrl}
                    alt={selectedEvent.title}
                  />
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
