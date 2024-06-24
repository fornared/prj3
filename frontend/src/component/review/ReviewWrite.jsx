import { useState } from "react";
import { Button, Flex, Textarea, useToast } from "@chakra-ui/react";
import axios from "axios";

export function ReviewWrite({ contentId, isSending, setIsSending }) {
  const [review, setReview] = useState("");
  const toast = useToast();

  function handleClickReviewSubmit() {
    setIsSending(true);
    axios
      .post("/api/tour/add/review", {
        contentId,
        review,
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
      <Textarea
        onChange={(e) => setReview(e.target.value)}
        placeholder={"리뷰를 작성해주세요"}
        value={review}
        mb={2}
      />
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
