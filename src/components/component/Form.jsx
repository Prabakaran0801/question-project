import { React, useState } from "react";
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
import { auth } from "../../config/Firebase";
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { Select } from "@chakra-ui/react";
import Select from "react-select";
import { db } from "../../config/Firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { languageOptions } from "../component/OptionsGroup";
import MyEditor from "./Editor";

const Form = ({ initialState }) => {
  //debugger;
  // New question state
  const [newType, setNewType] = useState();
  const [newQuestion, setNewQuestion] = useState();
  const [newAnswer, setNewAnswer] = useState();
  const [newCategory, setNewCategory] = useState();
  const [newTags, setNewTags] = useState();

  // console.log(languageOptions);

  // Select Category function
  const categoryHandleChange = (event) => {
    setNewCategory(event.value);
  };

  // Select Tags Function

  function handleSelect(data) {
    const objTOArr = data.map((item) => {
      return item["value"];
    });
    setNewTags(objTOArr);
  }

  // Add document
  const questionCollectionRef = collection(db, "questions");

  const onSubmitQuestion = async () => {
    try {
      await addDoc(questionCollectionRef, {
        type: newType,
        category: newCategory,
        tags: newTags,
        question: newQuestion,
        answer: newAnswer,
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
    <Box m="14" bg={formBackground}>
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
      {/* {fetchData.map((data) => ( */}
      <FormControl as="fieldset">
        <FormLabel as="legend">1. Question Type</FormLabel>
        <RadioGroup defaultValue={newType} onChange={setNewType}>
          <HStack spacing="24px">
            <Radio value="mcq">MCQ</Radio>
            <Radio value="qa">QA</Radio>
          </HStack>
        </RadioGroup>
        <FormLabel as="legend">2. Question Title</FormLabel>

        <MyEditor defaultValue={newQuestion} onChange={setNewQuestion} />

        <FormLabel as="legend">3. Question Answer</FormLabel>

        <MyEditor defaultValue={newAnswer} onChange={setNewAnswer} />

        <FormLabel as="legend">4. Category</FormLabel>
        {/* <Select
          placeholder="Select option"
          onChange={(e) => setNewCategory(e.target.value)}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="c++">C++</option>
          <option value="java">Java</option>
        </Select> */}
        <Select
          defaultValue={newCategory}
          name="language"
          options={languageOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={categoryHandleChange}
          value={languageOptions.find((obj) => obj.value === newCategory)} // set selected value
        />

        <FormLabel as="legend">5. Tags</FormLabel>
        {/* <Select
          placeholder="Select option"
          onChange={(e) => setNewTags(e.target.value)}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="c++">C++</option>
          <option value="java">Java</option>
        </Select> */}

        <Select
          mb="auto"
          options={languageOptions}
          placeholder="Select language"
          // value={tag}
          onChange={handleSelect}
          isSearchable={true}
          isMulti
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

        {/* <Button colorScheme="red" onClick={() => passData(data.id)}>
          update
        </Button> */}
      </FormControl>
      {/* ))} */}
    </Box>
  );
};

export default Form;