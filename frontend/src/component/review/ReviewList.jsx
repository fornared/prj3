import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Flex, Text, VStack, HStack } from "@chakra-ui/react";
import { ReviewItem } from "./ReviewItem.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as sStar,
  faStarHalfStroke as hStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as rStar } from "@fortawesome/free-regular-svg-icons";

export function ReviewList({ contentId, isSending, setIsSending }) {
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    if (!isSending) {
      axios
        .get(`/api/tour/${contentId}/review`)
        .then((res) => {
          setReviewList(res.data);
        })
        .catch()
        .finally();
    }
  }, [isSending]);

  if (reviewList.length === 0) {
    return <Box p={4} textAlign="center" color="gray.500">리뷰가 없습니다.</Box>;
  }

  const StarIcon = ({ index, rating }) => {
    if (index < rating) {
      if (rating - index < 1) {
        return <FontAwesomeIcon icon={hStar} color="orange" />;
      } else {
        return <FontAwesomeIcon icon={sStar} color="orange" />;
      }
    } else {
      return <FontAwesomeIcon icon={rStar} color="gray" />;
    }
  };

  function avgRating(review) {
    const sum = reviewList.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviewList.length).toFixed(1);
  }

  return (
    <Box mt={2} p={4} bg="gray.50" borderRadius="lg" boxShadow="md">
      <Flex alignItems="center" mb={6}>
        {[0, 1, 2, 3, 4].map((index) => (
          <StarIcon key={index} index={index} rating={avgRating(reviewList)} />
        ))}
        <Text ml={2} fontWeight="bold" fontSize="xl">
          {avgRating(reviewList)}
        </Text>
        <Text ml={2} fontSize="md" color="gray.600">
          ({reviewList.length} 리뷰)
        </Text>
      </Flex>
      <VStack spacing={4}>
        {reviewList.map((review) => (
          <Box
            key={review.id}
            p={4}
            w="100%"
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="sm"
            bg="white"
          >
            <ReviewItem
              review={review}
              isSending={isSending}
              setIsSending={setIsSending}
              StarIcon={StarIcon}
            />
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
