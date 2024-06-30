import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import Calendar from "react-calendar";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export function ItineraryDate() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [name, setName] = useState("");

  const start =
    startDate !== null ? moment(startDate).format("YYYY-MM-DD") : "";
  const end = endDate !== null ? moment(endDate).format("YYYY-MM-DD") : "";

  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (endDate) {
      inputRef.current.focus();
    }
  }, [endDate]);

  const handleDateChange = (date) => {
    if (date.length === 2) {
      setStartDate(date[0]);
      setEndDate(date[1]);
    } else {
      setStartDate(date);
    }
  };

  function handlePressEnter(e) {
    if (e.key === "Enter") {
      handleClickNext();
    }
  }

  function handleClickNext() {
    navigate(`/itinerary/detail`, { state: { startDate, endDate, name } });
  }

  return (
    <Box
      maxW="600px"
      mx="auto"
      mt={8}
      p={8}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
    >
      <VStack spacing={8}>
        <Heading as="h1" size="xl" textAlign="center">
          새 일정
        </Heading>
        <Text fontSize="lg" fontWeight="bold" textAlign="center">
          여행 날짜를 설정하세요
        </Text>
        <Center>
          <Calendar
            onChange={handleDateChange}
            value={startDate && endDate ? [startDate, endDate] : startDate}
            selectRange
          />
        </Center>
        {startDate && (
          <Box textAlign="center">
            <Text fontSize="md">시작일: {start}</Text>
            <Text fontSize="md">종료일: {end}</Text>
          </Box>
        )}
        {endDate && (
          <Box textAlign="center">
            <Text fontSize="lg" mb={4}>
              여행 제목을 입력하세요
            </Text>
            <Input
              placeholder="여행 제목"
              onChange={(e) => setName(e.target.value)}
              onKeyPress={handlePressEnter}
              ref={inputRef}
              size="lg"
              maxW="400px"
            />
          </Box>
        )}
        <Button
          isDisabled={endDate === null || name === ""}
          colorScheme="blue"
          size="lg"
          onClick={handleClickNext}
        >
          다음
        </Button>
      </VStack>
    </Box>
  );
}
