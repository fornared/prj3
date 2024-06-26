import React, { useEffect, useState } from "react";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Heading,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

export function Home() {
  const [contents1, setContents1] = useState([]);
  const [contents2, setContents2] = useState([]);

  const navigate = useNavigate();
  //
  const EventCard = ({ event, onClick }) => (
    <Box
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      _hover={{ shadow: "lg" }}
      onClick={() => onClick(event.id)}
      cursor="pointer"
    >
      //
      <AspectRatio ratio={16 / 9}>
        <Image src={event.imageUrl} alt={event.title} />
      </AspectRatio>
      <Box p={4}>
        <Heading as="h3" size="md">
          {event.title}
        </Heading>
        <Text mt={2}>{event.description}</Text>
      </Box>
    </Box>
  );

  const TravelCard = ({ imageSrc, title, description, id }) => (
    <Box
      cursor="pointer"
      onClick={() => navigate(`/tour/${id}`)}
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      _hover={{ shadow: "lg" }}
      mx={5}
    >
      <AspectRatio ratio={16 / 9}>
        <Image src={imageSrc} alt={title} />
      </AspectRatio>
      <Box p={4}>
        <Heading as="h3" size="md">
          {title}
        </Heading>
        <Text mt={2}>{description}</Text>
      </Box>
    </Box>
  );

  const ReviewCard = ({ title, description }) => (
    <Box borderWidth="1px" borderRadius="md" overflow="hidden" _hover={{ shadow: "lg" }} mx={5}>
      <Box p={4}>
        <Heading as="h3" size="md">
          {title}
        </Heading>
        <Text mt={2}>{description}</Text>
      </Box>
    </Box>
  );
  //
  useEffect(() => {
    axios.get("/api/home/contents").then((res) => {
      setContents1(res.data);
    });
    axios.get("/api/home/contents").then((res) => {
      setContents2(res.data);
    });
  }, []);

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
    <Box mt={10}>
      <Box p={4} mb={8}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading as="h2" size="xl" mb={4} ml={5}>
              가볼만한곳
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              {contents1.map((item, index) => (
                <TravelCard
                  key={index}
                  id={item.id}
                  imageSrc={item.firstImage1}
                  title={item.title}
                  description={item.overview ? item.overview : "설명(추가예정)"}
                />
              ))}
            </SimpleGrid>
          </Box>

          <Box>
            <Heading as="h2" size="xl" mb={4} ml={5}>
              추천 여행지
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              {contents2.map((item, index) => (
                <TravelCard
                  key={index}
                  id={item.id}
                  imageSrc={item.firstImage1}
                  title={item.title}
                  description={item.areaName}
                />
              ))}
            </SimpleGrid>
          </Box>

          <Box>
            <Heading as="h2" size="xl" mb={4} ml={5}>
              최근 리뷰
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              <ReviewCard title="리뷰 1" description="리뷰 내용 1" />
              <ReviewCard title="리뷰 2" description="리뷰 내용 2" />
              <ReviewCard title="리뷰 3" description="리뷰 내용 3" />
            </SimpleGrid>
          </Box>

          <Box>
            <Heading as="h2" size="xl" mb={4} ml={5}>
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
            <Heading as="h2" size="xl" mb={4} ml={5}>
              이벤트
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={handleEventClick}
                />
              ))}
            </SimpleGrid>

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
