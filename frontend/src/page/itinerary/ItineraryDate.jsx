import { Box, Button, Center } from "@chakra-ui/react";
import Calendar from "react-calendar";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ItineraryDate() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const navigate = useNavigate();

  const handleDateChange = (date) => {
    if (date.length === 2) {
      setStartDate(date[0]);
      setEndDate(date[1]);
    } else {
      setStartDate(date);
    }
  };

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
      <Box>
        <Center mb={10}>
          <Calendar
            onChange={handleDateChange}
            value={startDate && endDate ? [startDate, endDate] : startDate}
            selectRange={true}
          />
        </Center>
      </Box>

      <Center>
        <Button
          colorScheme="blue"
          onClick={() => navigate(`/itinerary/detail`)}
        >
          다음
        </Button>
      </Center>
    </Box>
  );
}
