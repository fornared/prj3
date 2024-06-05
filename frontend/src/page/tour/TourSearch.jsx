import { Box, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export function TourSearch() {
  const [tourData, setTourData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setIsProcessing(true);
    axios
      .get(`https://apis.data.go.kr/B551011/KorService1/detailIntro1`, {
        params: {
          serviceKey:
            "F0uhB6YYFqwLP5opwCOQRQMjIVKKlvzMN3z6ErIG79tEzKQmfRh7puVZPP5NrrWqGvL8GDvo%2FfRsACDQO5xPxw%3D%3D",
          MobileOS: "ETC",
          MobileApp: "AppTest",
          _type: "json",
          contentId: 2674675,
          contentTypeId: 15,
          numOfRows: 10,
          pageNo: 1,
          //pageNo=1
        },
      })
      .then((res) => {
        setTourData(res.data.response.body.items.item);
      })
      .catch(() => console.log("error"))
      .finally(() => {
        setIsProcessing(false);
      });
  }, []);

  if (isProcessing) {
    return <Spinner />;
  }

  return (
    <Box>
      {/*{tourData.length === 0 && <Box>none</Box>}*/}
      {tourData.length > 0 && (
        <Box>
          {tourData.map((item) => (
            <Box key={item.contentid}>
              <h2>{item.sponsor1}</h2>
              <p>{item.playtime}</p>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
