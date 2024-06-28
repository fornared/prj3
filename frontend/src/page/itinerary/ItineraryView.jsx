import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Heading } from "@chakra-ui/react";

export function ItineraryView() {
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/api/itinerary/${id}`)
      .then((res) => {})
      .catch()
      .finally();
  }, []);

  return (
    <Box>
      <Heading>일정</Heading>
    </Box>
  );
}
