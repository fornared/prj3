import {
  Box,
  Heading,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export function Home() {
  return (
    <Box>
      {/* 배너 섹션 */}
      <Box
        bgImage="url('/path/to/your/banner-image.jpg')" //나중에 이미지 찾아서 넣을 예정
        bgSize="cover"
        bgPosition="center"
        height="300px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="white"
      >
        <Heading
          as="h1"
          size="2xl"
          bg="rgba(0, 0, 0, 0.5)"
          p={4}
          borderRadius="md"
        >
          Welcome to Travel Place
        </Heading>
      </Box>

      {/* 메인 컨텐츠 */}
      <Box p={4}>
        <VStack spacing={8} align="stretch">
          {/* 인기 여행지 섹션 */}
          <Box>
            <Heading as="h2" size="xl" mb={4}>
              인기 여행지
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              {/* 예시 여행지 카드 */}
              <Box borderWidth="1px" borderRadius="md" overflow="hidden">
                {/*이미지 파일 찾아서 삽입예정*/}
                <Image src="/path/to/image1.jpg" alt="여행지 1" />
                <Box p={4}>
                  <Heading as="h3" size="md">
                    여행지 1
                  </Heading>
                  <Text mt={2}>여행지 1 설명</Text>
                </Box>
              </Box>
              <Box borderWidth="1px" borderRadius="md" overflow="hidden">
                <Image src="/path/to/image2.jpg" alt="여행지 2" />
                <Box p={4}>
                  <Heading as="h3" size="md">
                    여행지 2
                  </Heading>
                  <Text mt={2}>여행지 2 설명</Text>
                </Box>
              </Box>
              <Box borderWidth="1px" borderRadius="md" overflow="hidden">
                <Image src="/path/to/image3.jpg" alt="여행지 3" />
                <Box p={4}>
                  <Heading as="h3" size="md">
                    여행지 3
                  </Heading>
                  <Text mt={2}>여행지 3 설명</Text>
                </Box>
              </Box>
            </SimpleGrid>
          </Box>

          {/* 추천 여행지 섹션 */}
          <Box>
            <Heading as="h2" size="xl" mb={4}>
              추천 여행지
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              {/* 예시 추천 여행지 카드 */}
              <Box borderWidth="1px" borderRadius="md" overflow="hidden">
                <Image src="/path/to/image4.jpg" alt="여행지 4" />
                <Box p={4}>
                  <Heading as="h3" size="md">
                    여행지 4
                  </Heading>
                  <Text mt={2}>여행지 4 설명</Text>
                </Box>
              </Box>
              <Box borderWidth="1px" borderRadius="md" overflow="hidden">
                <Image src="/path/to/image5.jpg" alt="여행지 5" />
                <Box p={4}>
                  <Heading as="h3" size="md">
                    여행지 5
                  </Heading>
                  <Text mt={2}>여행지 5 설명</Text>
                </Box>
              </Box>
              <Box borderWidth="1px" borderRadius="md" overflow="hidden">
                <Image src="/path/to/image6.jpg" alt="여행지 6" />
                <Box p={4}>
                  <Heading as="h3" size="md">
                    여행지 6
                  </Heading>
                  <Text mt={2}>여행지 6 설명</Text>
                </Box>
              </Box>
            </SimpleGrid>
          </Box>

          {/* 최근 리뷰 섹션 */}
          <Box>
            <Heading as="h2" size="xl" mb={4}>
              최근 리뷰
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              {/* 예시 리뷰 카드 */}
              <Box borderWidth="1px" borderRadius="md" overflow="hidden">
                <Box p={4}>
                  <Heading as="h3" size="md">
                    리뷰 1
                  </Heading>
                  <Text mt={2}>리뷰 내용 1</Text>
                </Box>
              </Box>
              <Box borderWidth="1px" borderRadius="md" overflow="hidden">
                <Box p={4}>
                  <Heading as="h3" size="md">
                    리뷰 2
                  </Heading>
                  <Text mt={2}>리뷰 내용 2</Text>
                </Box>
              </Box>
              <Box borderWidth="1px" borderRadius="md" overflow="hidden">
                <Box p={4}>
                  <Heading as="h3" size="md">
                    리뷰 3
                  </Heading>
                  <Text mt={2}>리뷰 내용 3</Text>
                </Box>
              </Box>
            </SimpleGrid>
          </Box>
        </VStack>

        <Box mt={8}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
