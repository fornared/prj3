import { Box } from "@chakra-ui/react";
import { ReviewWrite } from "./ReviewWrite.jsx";
import { ReviewList } from "./ReviewList.jsx";
import { useState } from "react";

export function ReviewComponent({ contentId }) {
  const [isSending, setIsSending] = useState(false);

  return (
    <Box>
      <ReviewWrite
        contentId={contentId}
        isSending={isSending}
        setIsSending={setIsSending}
      />
      <ReviewList
        contentId={contentId}
        isSending={isSending}
        setIsSending={setIsSending}
      />
    </Box>
  );
}
