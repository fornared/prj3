import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../component/LoginProvider.jsx";

export function MemberLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const account = useContext(LoginContext);

  const handleSignup = () => {
    navigate("/signup");
  };

  function handleLogin() {
    if (!email || !password) {
      toast({
        status: "warning",
        description: "이메일과 패스워드를 입력해주세요.",
        position: "top",
      });
      return;
    }

    axios
      .post("/api/member/token", { email, password })
      .then((res) => {
        account.login(res.data.token);

        toast({
          status: "success",
          description: "로그인 되었습니다.",
          position: "top",
        });
        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          toast({
            status: "warning",
            description: "이메일과 패스워드를 확인해주세요.",
            position: "top",
          });
        } else if (error.request) {
          toast({
            status: "error",
            description: "서버 응답이 없습니다. 나중에 다시 시도해주세요.",
            position: "top",
          });
        } else {
          toast({
            status: "error",
            description: "요청 중 오류가 발생했습니다.",
            position: "top",
          });
        }
        account.logout();
      });
  }

  return (
    <Center>
      <Box w={500}>
        <Box mb={10} mt={30}>
          <Center mb={10}>
            <Heading>로그인</Heading>
          </Center>
          <VStack spacing={7}>
            <FormControl>
              <FormLabel>이메일</FormLabel>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>암호</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button onClick={handleLogin} colorScheme={"blue"}>
              Login
            </Button>

            <Flex alignItems={"center"}>
              <Box mr={2}>아직 계정이 없으신가요?</Box>
              <Button
                onClick={handleSignup}
                colorScheme={"blue"}
                _hover={{ bg: "skyblue" }}
              >
                회원가입
              </Button>
            </Flex>
          </VStack>
        </Box>
      </Box>
    </Center>
  );
}
