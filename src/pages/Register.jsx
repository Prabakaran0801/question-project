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
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  //   signOut,
} from "firebase/auth";

import { useNavigate } from "react-router-dom";

const Register = () => {
  // Create  User :
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Navigate Route
  const navigate = useNavigate();

  // Register With email
  const registerEmail = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  // Register with Google

  const registerGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  // Logout

  //   const logOut = async () => {
  //     try {
  //       await signOut(auth);
  //       navigate("/");
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  // Dark Mode
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Flex
        flexDirection="column"
        bg={formBackground}
        p={12}
        borderRadius={8}
        boxShadow="lg"
      >
        <Heading mb={6} ml={10}>
          Register
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
        <Button colorScheme="teal" mb={4} onClick={registerEmail}>
          Register
        </Button>
        <Button mb={4} onClick={registerGoogle}>
          Registerwithgoogle
        </Button>
        <a href="/login"> Login</a>
        {/* <Button mx={8} colorScheme="red" onClick={logOut}>
          Logout
        </Button> */}

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
  );
};

export default Register;
