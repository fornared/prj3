import {Box, Button, FormControl, FormLabel, Input, Spinner, useToast} from "@chakra-ui/react";
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

  useEffect(() => {
    axios.get(`/api/member/${id}`)
      .then(res => setMember(res.data))
      .catch(err => {
        if (err.response && err.response.status === 404) {
          toast({
            status: "warning",
            description: "존재하지 않는 회원입니다.",
            position: "top",
          });
          navigate("/");
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
      });
  };

  if (member === null) {
    return <Spinner/>;
  }

  return (
    <Box>
      <Box>회원정보</Box>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <Input isReadOnly value={member.email}/>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>별명</FormLabel>
            <Input isReadOnly value={member.nickName}/>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>가입일시</FormLabel>
            <Input isReadOnly value={member.inserted} type={"datetime-local"}/>
          </FormControl>
        </Box>
        <Box>
          <Button colorScheme={"blue"}>수정</Button>
          <Button
            isLoading={isLoading}
            colorScheme={"red"}
            onClick={handleClickReMove}>
            탈퇴
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
