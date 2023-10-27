import React from "react";
import { Switch, useColorMode, useColorModeValue } from "@chakra-ui/react";
import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  HStack,
  Radio,
  Button,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { auth } from "../config/Firebase";
import Select from "react-select";
import { db } from "../config/Firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { languageOptions } from "../components/OptionsGroup";
import MyEditor from "../components/Editor";

const Form = ({ initialState, onChange }) => {
  // Add document
  const questionCollectionRef = collection(db, "questions");

  const onSubmitQuestion = async () => {
    try {
      await addDoc(questionCollectionRef, {
        type: initialState.type,
        category: initialState.category,
        tags: initialState.tags,
        question: initialState.question,
        answer: initialState.answer,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Navigate Route
  const navigate = useNavigate();

  // Logout

  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  // Dark mode
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");

  return (
    <Box m="14" bg={formBackground} px="24" py="5" borderRadius="20">
      <FormControl
        m="auto"
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Button mt="5" mx={8} colorScheme="red" onClick={logOut}>
          Logout
        </Button>
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

      <FormControl as="fieldset">
        <FormLabel as="legend">1. Question Type</FormLabel>
        <RadioGroup
          value={initialState.type}
          onChange={(value) => onChange("type", value)}
        >
          <HStack spacing="24px">
            <Radio value="mcq">MCQ</Radio>
            <Radio value="qa">QA</Radio>
          </HStack>
        </RadioGroup>
        <FormLabel as="legend">2. Question Title</FormLabel>

        <MyEditor
          value={initialState.question}
          onChange={onChange}
          fieldName={"question"}
        />
        <FormLabel as="legend">3. Question Answer</FormLabel>

        <MyEditor
          value={initialState.answer}
          onChange={onChange}
          fieldName={"answer"}
        />
        <FormLabel as="legend">4. Category</FormLabel>
        <Select
          name="language"
          options={languageOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={(selectedOption) => {
            const newValue = selectedOption ? selectedOption.value : null;
            onChange("category", newValue);
          }}
          value={
            initialState.category
              ? languageOptions.find(
                  (obj) => obj.value === initialState.category
                )
              : null
          }
        />
        <FormLabel as="legend">5. Tags</FormLabel>
        <Select
          mb="auto"
          options={languageOptions}
          placeholder="Select language"
          onChange={(selectedOptions) => {
            const newValues = selectedOptions
              ? selectedOptions.map((option) => option.value)
              : [];
            onChange("tags", newValues);
          }}
          isSearchable={true}
          isMulti
          value={
            initialState.tags
              ? languageOptions.filter((obj) =>
                  initialState.tags.includes(obj.value)
                )
              : null
          }
        />

        <Button mt="5" colorScheme="blue" onClick={onSubmitQuestion}>
          Submit
        </Button>
        <Button
          mt="5"
          ml="5"
          colorScheme="blue"
          onClick={() => {
            navigate("/table");
          }}
        >
          Go to Table
        </Button>
      </FormControl>
    </Box>
  );
};

export default Form;
