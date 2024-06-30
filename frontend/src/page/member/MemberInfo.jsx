import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../component/LoginProvider.jsx";

export function MemberInfo() {
  const [member, setMember] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const account = useContext(LoginContext);
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    axios
      .get(`/api/member/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setMember(res.data))
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "warning",
            description: "존재하지 않는 회원입니다.",
            position: "top",
          });
          navigate("/");
        } else if (err.response.status === 403) {
          toast({
            status: "error",
            description: "권한이 없습니다.",
            position: "top",
          });
          navigate(-1);
        }
      });
  }, [id, navigate, toast]);

  const handleClickReMove = () => {
    setIsLoading(true);

    axios
      .delete(`/api/member/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: { id, password },
      })
      .then(() => {
        toast({
          status: "success",
          description: "회원 탈퇴하였습니다.",
          position: "top",
        });
        account.logout();
        navigate("/");
      })
      .catch(() => {
        toast({
          status: "warning",
          description: "회원 탈퇴 중 문제가 발생하였습니다.",
          position: "top",
        });
      })
      .finally(() => {
        setIsLoading(false);
        setPassword("");
        onClose();
      });
  };

  if (member === null) {
    return (
      <Center mt={10}>
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box
      py={8}
      px={4}
      minH="100vh"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Center>
        <Box
          w={{ base: "100%", md: 500 }}
          p={8}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow="2xl"
          borderRadius="lg"
        >
          <Heading mb={6} textAlign="center" fontSize="2xl" fontWeight="bold">
            마이페이지
          </Heading>
          <Divider mb={6} />
          <VStack spacing={6} align="stretch">
            <FormControl>
              <FormLabel fontWeight="bold">이메일</FormLabel>
              <Input
                isReadOnly
                value={member.email}
                bg={useColorModeValue("gray.100", "gray.600")}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="bold">별명</FormLabel>
              <Input
                isReadOnly
                value={member.nickName}
                bg={useColorModeValue("gray.100", "gray.600")}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="bold">가입일시</FormLabel>
              <Input
                isReadOnly
                value={member.inserted}
                type="datetime-local"
                bg={useColorModeValue("gray.100", "gray.600")}
              />
            </FormControl>
            {account.hasAccess(member.id) && (
              <Center>
                <Button
                  mr={4}
                  onClick={() => navigate(`/member/edit/${member.id}`)}
                  colorScheme="blue"
                >
                  수정
                </Button>
                <Button colorScheme="red" onClick={onOpen}>
                  탈퇴
                </Button>
              </Center>
            )}
          </VStack>
        </Box>
      </Center>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>탈퇴 확인</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>암호</FormLabel>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr={2} onClick={onClose}>
              취소
            </Button>
            <Button
              isLoading={isLoading}
              colorScheme="red"
              onClick={handleClickReMove}
            >
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
