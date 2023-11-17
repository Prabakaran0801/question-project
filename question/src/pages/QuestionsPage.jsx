import { React, useState, useEffect } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/Firebase";
import { Card, CardBody, Heading } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
// import "../styles/from.css";

const Questions = () => {
  const [questionList, setquestionList] = useState([]);

  const questionCollectionRef = collection(db, "questions");

  //   const navigate = useNavigate();

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

  return (
    <>
      <div className="question-main">
        {/* <div className="question-card">
        {questionList.map((question, index) => (
          <Card key={question.id} align="center" variant="elevated" size="sm">
            <Heading> Question</Heading>
            <CardBody> {question.question}</CardBody>
          </Card>
        ))}
      </div> */}
        <div className="card">
          <Card>
            <Heading> Questions</Heading>
            <CardBody> What is javascript?</CardBody>
          </Card>
        </div>
        <div className="card">
          <Card>
            <Heading> Questions</Heading>
            <CardBody> What is javascript?</CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Questions;
