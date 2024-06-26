import {
  Box,
  Button, Center,
  FormControl,
  FormLabel, Heading,
  Input, Modal, ModalBody,
  ModalContent, ModalFooter, ModalHeader,
  ModalOverlay,
  Spinner, useDisclosure,
  useToast, VStack
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../../component/LoginProvider.jsx";

export function MemberInfo() {
  const [member, setMember] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const {id} = useParams();
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
  }, []);

  const handleClickReMove = () => {
    setIsLoading(true);

    axios
      .delete(`/api/member/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {id, password},
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
        onclose();
      });
  }

  if (member === null) {
    return <Spinner/>;
  }

  return (
    <Box py={8} px={4}>
      <Center>
        <Box w={{ base: "100%", md: 500 }} p={8} boxShadow="lg" borderRadius="md" bg="white">
          <Heading mb={6} textAlign="center">
            마이페이지
          </Heading>
          <VStack spacing={6} align="stretch">
            <FormControl>
              <FormLabel>이메일</FormLabel>
              <Input isReadOnly value={member.email} />
            </FormControl>
            <FormControl>
              <FormLabel>별명</FormLabel>
              <Input isReadOnly value={member.nickName} />
            </FormControl>
            <FormControl>
              <FormLabel>가입일시</FormLabel>
              <Input isReadOnly value={member.inserted} type="datetime-local" />
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