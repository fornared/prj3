import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Flex, Spacer, Text } from "@chakra-ui/react"; // import { faSStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as sStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as rStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function ReviewList({ contentId, isSending }) {
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
    return <Box>리뷰가 없습니다..</Box>;
  }

  const StarIcon = ({ index, rating }) => {
    if (index < rating) {
      return <FontAwesomeIcon icon={sStar} color="Orange" />;
    } else {
      return <FontAwesomeIcon icon={rStar} color="gray" />;
    }
  };

  return (
    <Box mt={2}>
      {reviewList.map((review) => (
        <Box key={review.id} border={"1px solid black"} my={3}>
          <Flex>
            <Box>{review.nickName}</Box>
            <Spacer />
            <Box>{review.inserted}</Box>
          </Flex>
          <Flex alignItems="center">
            {[0, 1, 2, 3, 4].map((index) => (
              <StarIcon key={index} index={index} rating={review.rating} />
            ))}
            <Text ml={1}>{review.rating}</Text>
          </Flex>
          <Box>{review.review}</Box>
        </Box>
      ))}
    </Box>
  );
}
