import { useState } from "react";
import {
  Button,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  useToast,
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
    <Flex direction="column" mt={3}>
      <RadioGroup defaultValue="5" onChange={setRating}>
        <Stack spacing={5} direction="row">
          {[1, 2, 3, 4, 5].map((index) => (
            <Radio key={index} value={index.toString()}>
              {index}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      <Flex>
        <Textarea
          onChange={(e) => setReview(e.target.value)}
          placeholder={"리뷰를 작성해주세요"}
          value={review}
          mb={2}
        />
      </Flex>
      <Button
        onClick={handleClickReviewSubmit}
        isLoading={isSending}
        isDisabled={review.trim().length === 0}
        alignSelf={"flex-end"}
        colorScheme={"blue"}
      >
        등록
      </Button>
    </Flex>
  );
}
