import { useState } from "react";
import {
  Button,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  useToast,
  Box,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";

export function ReviewWrite({ contentId, isSending, setIsSending }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const toast = useToast();

  function handleClickReviewSubmit() {
    setIsSending(true);
    axios
      .post("/api/tour/add/review", {
        contentId,
        review,
        rating,
      })
      .then((res) => {
        setReview("");
        toast({
          description: "리뷰가 등록되었습니다.",
          status: "success",
          position: "top",
        });
      })
      .catch()
      .finally(() => {
        setReview("");
        setIsSending(false);
      });
  }

  return (
    <Box p={6} bg="white" borderRadius="md" boxShadow="md">
      <Heading as="h3" size="lg" mb={4} textAlign="left" color="teal.500">
        리뷰 작성란
      </Heading>
      <Flex direction="column" mb={4}>
        <RadioGroup defaultValue="5" onChange={setRating}>
          <Stack spacing={4} direction="row" justify="left">
            {[1, 2, 3, 4, 5].map((index) => (
              <Radio key={index} value={index.toString()} size="lg" colorScheme="teal">
                {index}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </Flex>
      <Flex direction="column">
        <Textarea
          onChange={(e) => setReview(e.target.value)}
          placeholder="리뷰를 작성해주세요"
          value={review}
          mb={4}
          bg="gray.50"
          borderColor="teal.500"
          _focus={{ borderColor: "teal.600" }}
          size="lg"
        />
        <Button
          onClick={handleClickReviewSubmit}
          isLoading={isSending}
          isDisabled={review.trim().length === 0}
          // alignSelf="center" <-- 크기 줄임 중앙에 맞게
          colorScheme="teal"
          size="lg"
          px={8}
        >
          등록
        </Button>
      </Flex>
    </Box>
  );
}
