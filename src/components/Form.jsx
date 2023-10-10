// import React, { useEffect, useReducer } from "react";
// import { Switch, useColorMode, useColorModeValue } from "@chakra-ui/react";
// import {
//   Box,
//   FormControl,
//   FormLabel,
//   RadioGroup,
//   HStack,
//   Radio,
//   Button,
// } from "@chakra-ui/react";
// import { signOut } from "firebase/auth";
// import { auth } from "../config/Firebase";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import Select from "react-select";
// import { db } from "../config/Firebase";
// import { collection, addDoc, getDocs } from "firebase/firestore";
// import { EditorState } from "draft-js";
// import { useNavigate } from "react-router-dom";
// import { languageOptions } from "./OptionsGroup";

// // Define the initial state
// // const initialState = {
// //   newType: "",
// //   newQuestion: "",
// //   newAnswer: "",
// //   newCategory: "",
// //   newTags: [],
// //   questionEditorState: EditorState.createEmpty(),
// //   answerEditorState: EditorState.createEmpty(),
// //   fetchData: [],
// // };

// // Define the reducer function
// const reducer = (state, action) => {
//   switch (action.type) {
//     case "SET_NEW_TYPE":
//       return { ...state, newType: action.payload };
//     case "SET_NEW_QUESTION":
//       return { ...state, newQuestion: action.payload };
//     case "SET_NEW_ANSWER":
//       return { ...state, newAnswer: action.payload };
//     case "SET_NEW_CATEGORY":
//       return { ...state, newCategory: action.payload };
//     case "SET_NEW_TAGS":
//       return { ...state, newTags: action.payload };
//     case "SET_QUESTION_EDITOR_STATE":
//       return { ...state, questionEditorState: action.payload };
//     case "SET_ANSWER_EDITOR_STATE":
//       return { ...state, answerEditorState: action.payload };
//     case "SET_FETCH_DATA":
//       return { ...state, fetchData: action.payload };
//     default:
//       return state;
//   }
// };

// const Form = ({ initialState }) => {
//   // Use useReducer with initial state
//   const [state, dispatch] = useReducer(reducer, initialState);

//   // Destructure state for easier access
//   const {
//     newType,
//     newQuestion,
//     newAnswer,
//     newCategory,
//     newTags,
//     questionEditorState,
//     answerEditorState,
//     fetchData,
//   } = state;

//   // ... The rest of your component ...

//   const categoryHandleChange = (event) => {
//     dispatch({ type: "SET_NEW_CATEGORY", payload: event.value });
//   };

//   function handleSelect(data) {
//     const objTOArr = data.map((item) => {
//       return item["value"];
//     });
//     dispatch({ type: "SET_NEW_TAGS", payload: objTOArr });
//   }

//   const onQuestionChange = function (questionEditorState) {
//     dispatch({
//       type: "SET_QUESTION_EDITOR_STATE",
//       payload: questionEditorState,
//     });
//     let newQuestion = questionEditorState
//       .getCurrentContent()
//       .getPlainText("\u0001");
//     dispatch({ type: "SET_NEW_QUESTION", payload: newQuestion });
//   };

//   const onAnswerChange = function (answerEditorState) {
//     dispatch({ type: "SET_ANSWER_EDITOR_STATE", payload: answerEditorState });
//     let newAnswer = answerEditorState
//       .getCurrentContent()
//       .getPlainText("\u0001");
//     dispatch({ type: "SET_NEW_ANSWER", payload: newAnswer });
//   };

//   // Add document
//   const questionCollectionRef = collection(db, "questions");

//   const onSubmitQuestion = async () => {
//     try {
//       await addDoc(questionCollectionRef, {
//         type: newType,
//         category: newCategory,
//         tags: newTags,
//         question: newQuestion,
//         answer: newAnswer,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // FETCH DATA
//   const fetch = async () => {
//     const snapshot = await getDocs(questionCollectionRef);
//     const fetchedData = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     dispatch({ type: "SET_FETCH_DATA", payload: fetchedData });
//   };

//   useEffect(() => {
//     fetch();
//   }, []);

//   //  UPDATE

//   const passData = async (id) => {
//     const matchId = fetchData.find((data) => data.id === id);
//     // console.log(matchId);
//     dispatch({ type: "SET_NEW_TYPE", payload: matchId.type });
//     dispatch({ type: "SET_NEW_QUESTION", payload: matchId.question });
//     dispatch({ type: "SET_NEW_ANSWER", payload: matchId.answer });
//     dispatch({ type: "SET_NEW_CATEGORY", payload: matchId.category });
//     dispatch({ type: "SET_NEW_TAGS", payload: matchId.tags });
//   };

//   // Navigate Route
//   const navigate = useNavigate();

//   // Logout

//   const logOut = async () => {
//     try {
//       await signOut(auth);
//       navigate("/login");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Dark mode
//   const { toggleColorMode } = useColorMode();
//   const formBackground = useColorModeValue("gray.100", "gray.700");

//   return (
//     <Box m="14" bg={formBackground}>
//       <FormControl
//         m="auto"
//         display="flex"
//         alignItems="center"
//         justifyContent="flex-end"
//       >
//         <Button mt="5" mx={8} colorScheme="red" onClick={logOut}>
//           Logout
//         </Button>
//         <FormLabel htmlFor="dark_mode" mt="4" mb="0">
//           Enable Dark Mode?
//         </FormLabel>
//         <Switch
//           mt="4"
//           id="dark_mode"
//           colorScheme="teal"
//           size="lg"
//           onChange={toggleColorMode}
//         />
//       </FormControl>

//       <FormControl as="fieldset">
//         {/* {fetchData.map((data) => (
//           <div key={data.id}> */}
//         <FormLabel as="legend">1. Question Type</FormLabel>
//         <RadioGroup>
//           <HStack
//             spacing="24px"
//             onChange={(e) =>
//               dispatch({ type: "SET_NEW_TYPE", payload: e.target.value })
//             }
//           >
//             <Radio value="mcq">MCQ</Radio>
//             <Radio value="qa">QA</Radio>
//           </HStack>
//         </RadioGroup>
//         <FormLabel as="legend">2. Question Title</FormLabel>
//         <Editor
//           editorState={questionEditorState}
//           toolbarClassName="toolbarClassName"
//           wrapperClassName="wrapperClassName"
//           editorClassName="editorClassName"
//           onEditorStateChange={onQuestionChange}
//         />
//         <FormLabel as="legend">3. Question Answer</FormLabel>
//         <Editor
//           editorState={answerEditorState}
//           toolbarClassName="toolbarClassName"
//           wrapperClassName="wrapperClassName"
//           editorClassName="editorClassName"
//           onEditorStateChange={onAnswerChange}
//         />
//         <FormLabel as="legend">4. Category</FormLabel>

//         <Select
//           name="language"
//           options={languageOptions}
//           className="basic-multi-select"
//           classNamePrefix="select"
//           onChange={categoryHandleChange}
//           value={languageOptions.find((obj) => obj.value === newCategory)} // set selected value
//         />

//         <FormLabel as="legend">5. Tags</FormLabel>

//         <Select
//           mb="auto"
//           options={languageOptions}
//           placeholder="Select language"
//           onChange={handleSelect}
//           isSearchable={true}
//           isMulti
//         />

//         <Button mt="5" colorScheme="blue" onClick={onSubmitQuestion}>
//           Submit
//         </Button>
//         <Button
//           mt="5"
//           ml="5"
//           colorScheme="blue"
//           onClick={() => {
//             navigate("/table");
//           }}
//         >
//           Go to Table
//         </Button>

//         {/* <Button colorScheme="red" onClick={() => passData(data.id)}>
//           update
//         </Button> */}
//         {/* </div>
//         ))} */}
//       </FormControl>
//     </Box>
//   );
// };

// export default Form;

import { React, useEffect, useState } from "react";
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
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { Select } from "@chakra-ui/react";
import Select from "react-select";
import { db } from "../config/Firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { languageOptions } from "./OptionsGroup";
import { EditorState, ContentState } from "draft-js";

const Form = ({ initialState }) => {
  // debugger;
  // New question state
  const [newType, setNewType] = useState(initialState.type);
  const [newQuestion, setNewQuestion] = useState(initialState.question);
  const [newAnswer, setNewAnswer] = useState(initialState.answer);
  const [newCategory, setNewCategory] = useState(initialState.catagory);
  const [newTags, setNewTags] = useState(initialState.tags);

  // console.log(languageOptions);

  // Editor state for question and answer
  const [questionEditorState, setQuestionEditorState] = useState(
    EditorState.createEmpty()
  );
  const [answerEditorState, setAnswerEditorState] = useState(
    EditorState.createEmpty()
  );

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

  const onQuestionChange = function (questionEditorState) {
    setQuestionEditorState(questionEditorState);
    let newQuestion = questionEditorState
      .getCurrentContent()
      .getPlainText("\u0001");
    setNewQuestion(newQuestion);
  };

  const onAnswereChange = function (answerEditorState) {
    setAnswerEditorState(answerEditorState);
    let newAnswer = answerEditorState
      .getCurrentContent()
      .getPlainText("\u0001");
    setNewAnswer(newAnswer);
  };
  // const editorValue = (editorState) => {
  //   setNewQuestion(editorState);
  // };

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

  // FETCH DATA
  const [fetchData, setfetchData] = useState([]);

  const fetch = async () => {
    const snapshot = await getDocs(questionCollectionRef);
    const fetchData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setfetchData(fetchData);
    // console.log(fetchData);
  };

  useEffect(() => {
    fetch();
  }, []);

  //  UPDATE

  const passData = async (id) => {
    const matchId = fetchData.find((data) => data.id === id);
    console.log(matchId);
    setNewType(matchId.type);
    setNewQuestion(matchId.question);
    setNewAnswer(matchId.answer);
    setNewCategory(matchId.category);
    setNewCategory(matchId.tags);
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
        <Editor
          editorState={questionEditorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onQuestionChange}
        />
        <FormLabel as="legend">3. Question Answer</FormLabel>
        <Editor
          editorState={answerEditorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onAnswereChange}
        />
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
