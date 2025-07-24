import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UseToast from '../../customHook/UseToast';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const toastMsg = UseToast();


  const handleLogin = () => {
    setLoading(true);
    let obj = {
      email: email,
      password: password
    }
    axios.post(`https://reqres.in/api/login`, obj).then((res) => {
      setToken(res.token);
      setLoading(false);
      sessionStorage.setItem('Rtoken', res.data.token);
      toastMsg({
        title: `Admin logged in successfully`,
        status: "success"
      });
      navigate("/inventory");
    }).catch((error) => {
      setLoading(false);
      toastMsg({
        title: `${error.message}`,
        status: "error"
      });
    });
    setEmail("");
    setPassword("");
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={email} placeholder='Your Email' onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} placeholder='Your Password' onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              {loading ? <Button
                isLoading
                loadingText='Submitting'
                colorScheme='teal'
                variant='outline'
              >
                Submit
              </Button> : <Button
                onClick={handleLogin}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
