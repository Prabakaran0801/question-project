import React, { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Switch,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { auth, googleProvider } from "../config/Firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/form");
    } catch (err) {
      console.log(err);
    }
  };

  const loginGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/table");
    } catch (err) {
      console.log(err);
    }
  };

  // Navigate Route
  const navigate = useNavigate();

  // // Logout

  // const logOut = async () => {
  //   try {
  //     await signOut(auth);
  //     navigate("/");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");

  return (
    <>
      <Sidebar />
      <Flex h="100vh" alignItems="center" justifyContent="center">
        <Flex
          flexDirection="column"
          bg={formBackground}
          p={12}
          borderRadius={8}
          boxShadow="lg"
        >
          <Heading mb={6} ml={10}>
            Log In
          </Heading>
          <Input
            placeholder="your@gmail.com"
            type="email"
            variant="filled"
            mb={3}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="**********"
            type="password"
            variant="filled"
            mb={6}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button colorScheme="teal" mb={4} onClick={loginEmail}>
            Login
          </Button>

          <Button mb={4} colorScheme="red" onClick={loginGoogle}>
            SignUpwithgoogle
          </Button>

          <Button
            mx={8}
            colorScheme="blue"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </Button>

          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="dark_mode" mt="4" mb="0">
              Enable Dark Mode?
            </FormLabel>
            <Switch
              mt="4"
              id="dark_mode"
              colorScheme="teal"
              size="lg"
              onChange={toggleColorMode}
            />
          </FormControl>
        </Flex>
      </Flex>
    </>
  );
};

export default Login;
