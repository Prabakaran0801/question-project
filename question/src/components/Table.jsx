import { React, useState, useEffect } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/Firebase";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";

const QuestionTable = () => {
  // READ the data
  const [questionList, setquestionList] = useState([]);

  const questionCollectionRef = collection(db, "questions");

  const navigate = useNavigate();

  useEffect(() => {
    const getquestionList = async () => {
      try {
        const data = await getDocs(questionCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setquestionList(filteredData);
      } catch (err) {
        console.log(err);
      }
    };
    getquestionList();
  }, [questionCollectionRef]);

  // Delete the document
  const handleDelete = async (id) => {
    const questionDelete = doc(db, "questions", id);
    await deleteDoc(questionDelete);
  };

  return (
    <div>
      <TableContainer m={20}>
        <Button
          m="5"
          colorScheme="blue"
          onClick={() => {
            navigate("/create");
          }}
        >
          Create
        </Button>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>S.NO</Th>
              <Th>Type</Th>
              <Th>Question</Th>
              <Th>Answere</Th>
              <Th>Category</Th>
              <Th>Tags</Th>
            </Tr>
          </Thead>
          <Tbody>
            {questionList.map((question, index) => (
              <Tr key={question.id}>
                <Td>{index + 1}</Td>
                <Td>{question.type}</Td>
                <Td> {question.question}</Td>
                <Td>{question.answer}</Td>
                <Td>{question.category}</Td>
                {question.tags.map((tags) => (
                  <Td>
                    <Badge colorScheme="green">{tags}</Badge>
                  </Td>
                ))}
                <Td>
                  <Link to={`/edit/${question.id}`}>
                    <IconButton icon={<DeleteIcon />} colorScheme="blue">
                      Edit
                    </IconButton>
                  </Link>
                </Td>
                <Td>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDelete(question.id)}
                  >
                    Delete Document
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Button
          m="5"
          float="left"
          onClick={() => {
            navigate("/form");
          }}
        >
          Back
        </Button>
      </TableContainer>
    </div>
  );
};

export default QuestionTable;
