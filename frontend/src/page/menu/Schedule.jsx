import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import Calendar from "react-calendar"; // 예시로 사용한 캘린더 라이브러리
import "react-calendar/dist/Calendar.css";

function Schedule() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [places, setPlaces] = useState([]);
  const [placeName, setPlaceName] = useState("");

  // 캘린더에서 날짜 선택 시 호출되는 함수
  const handleDateChange = (date) => {
    if (date.length === 2) {
      setStartDate(date[0]);
      setEndDate(date[1]);
    } else {
      setStartDate(date);
    }
  };

  // 장소 추가 버튼 클릭 시 호출되는 함수
  const handleAddPlace = () => {
    if (placeName.trim() !== "") {
      const newPlace = { name: placeName };
      setPlaces([...places, newPlace]);
      setPlaceName("");
    }
  };

  // 장소 삭제 버튼 클릭 시 호출되는 함수
  const handleDeletePlace = (index) => {
    const updatedPlaces = [...places];
    updatedPlaces.splice(index, 1);
    setPlaces(updatedPlaces);
  };

  // 일정 저장 버튼 클릭 시 호출되는 함수
  const handleSaveSchedule = () => {
    // 여기서는 예시로 콘솔에 저장된 일정을 출력합니다.
    console.log("저장된 여행 일정:", {
      startDate,
      endDate,
      places,
    });
    // 실제로는 서버에 저장하는 로직을 추가할 수 있습니다.
    // fetch를 사용하여 POST 요청을 보내거나, 다른 방식으로 서버에 데이터를 전송할 수 있습니다.
  };

  return (
    <Box
      maxW="1500px"
      mx="auto"
      mt={8}
      p={4}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
    >
      <Heading mb={4}>여행 일정 관리</Heading>

      {/* 캘린더 */}
      <Box>
        <Center mb={10}>
          <Calendar
            onChange={handleDateChange}
            value={startDate && endDate ? [startDate, endDate] : startDate}
            selectRange={true}
          />
        </Center>
      </Box>

      {/* 장소 추가 폼 */}
      <Stack spacing={4} mb={4}>
        <Heading size="md">장소 추가</Heading>
        {/* 장소 입력 폼 */}
        <Flex>
          <Box flex="1">
            <input
              type="text"
              placeholder="장소 이름"
              value={placeName}
              onChange={(e) => setPlaceName(e.target.value)}
            />
          </Box>
          <Spacer />
          <Box ml={2}>
            <Button colorScheme="teal" onClick={handleAddPlace}>
              추가
            </Button>
          </Box>
        </Flex>
      </Stack>

      {/* 장소 목록 */}
      <Stack spacing={2} mb={4}>
        <Heading size="md">등록된 장소</Heading>
        {/* 장소 목록을 보여주는 부분 */}
        {places.map((place, index) => (
          <Flex key={index} alignItems="center">
            <Text>{place.name}</Text>
            <Spacer />
            <Button
              size="sm"
              colorScheme="red"
              onClick={() => handleDeletePlace(index)}
            >
              삭제
            </Button>
          </Flex>
        ))}
      </Stack>

      {/* 저장 버튼 */}
      <Center>
        <Button colorScheme="blue" onClick={handleSaveSchedule}>
          저장
        </Button>
      </Center>
    </Box>
  );
}

export default Schedule;
