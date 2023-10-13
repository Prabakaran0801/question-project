import React, { useEffect, useState } from "react";
import {
  EditorState,
  //   ContentState,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { initializeApp } from "firebase/app";

const MyEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const getContent = () => {
    const content = convertToRaw(editorState.getCurrentContent());
    return JSON.stringify(content, null, 2);
  };

  const setContent = (content) => {
    try {
      const parsedContent = JSON.parse(content);
      const initialContent = convertFromRaw(parsedContent);
      const initialEditorState = EditorState.createWithContent(initialContent);
      setEditorState(initialEditorState);
    } catch (error) {
      console.error("Error parsing content:", error);
    }
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
      <button onClick={() => console.log(getContent())}>Get Content</button>
      <button onClick={() => setContent(getContent())}>Set Content</button>
    </div>
  );
};

export default MyEditor;

//  const { id } = useParams();

//  useEffect(() => {
//    const getquestionList = async () => {
//      try {
//        const data = await getDocs(questionCollectionRef);
//        const filteredData = data.docs.map((doc) => ({
//          ...doc.data(),
//          id: doc.id,
//        }));
//        setquestionList(filteredData);
//      } catch (err) {
//        console.log(err);
//      }
//    };
//    getquestionList();
//  }, [id]);

//  useEffect(() => {
//    if (id) {
//      initialize({ ...data[id] });
//    } else {
//      initialize({ ...initialState });
//    }
//    return () => {
//      initialize({ ...initialState });
//    };
//  }, [id, data]);
