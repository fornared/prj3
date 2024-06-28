import { Box, Button, Center, Heading, Input, Text } from "@chakra-ui/react";
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
    inputRef.current.focus();
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
      maxW="1200px"
      mx="auto"
      mt={8}
      p={4}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
    >
      <Heading>새 일정</Heading>
      <Center fontWeight={"bold"}>(여행 날짜를 설정하세요)</Center>
      <Box mt={10}>
        <Center mb={10}>
          <Calendar
            onChange={handleDateChange}
            value={startDate && endDate ? [startDate, endDate] : startDate}
            selectRange={true}
          />
        </Center>
        <Box mt={5} align="center">
          <Text mb={5}>시작일: {start}</Text>
          <Text mb={10}>종료일: {end} </Text>
          <Box display={endDate !== null ? "block" : "none"}>
            <Text mb={5}>여행 제목을 입력하세요</Text>
            <Input
              onChange={(e) => setName(e.target.value)}
              onKeyPress={handlePressEnter}
              ref={inputRef}
              htmlSize={50}
              width="auto"
            />
          </Box>
        </Box>
      </Box>

      <Center>
        <Button
          isDisabled={endDate === null || name === ""}
          mt={10}
          colorScheme="blue"
          onClick={handleClickNext}
        >
          다음
        </Button>
      </Center>
    </Box>
  );
}
