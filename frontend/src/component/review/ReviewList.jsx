import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Flex, Text } from "@chakra-ui/react";
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
    return <Box>리뷰가 없습니다.</Box>;
  }

  const StarIcon = ({ index, rating }) => {
    if (index < rating) {
      if (rating - index < 1) {
        return <FontAwesomeIcon icon={hStar} color="Orange" />;
      } else {
        return <FontAwesomeIcon icon={sStar} color="Orange" />;
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
    <Box mt={2}>
      <Flex alignItems="center" mb={4}>
        {[0, 1, 2, 3, 4].map((index) => (
          <StarIcon key={index} index={index} rating={avgRating(reviewList)} />
        ))}
        <Text ml={2} fontWeight="bold">
          {avgRating(reviewList)}
        </Text>
      </Flex>
      {reviewList.map((review) => (
        <Box
          key={review.id}
          p={4}
          mb={4}
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
    </Box>
  );
}
