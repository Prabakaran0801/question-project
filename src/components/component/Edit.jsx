import React, { useState, useEffect } from "react";
import Form from "./Form";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/Firebase";

const Edit = () => {
  const [loading, setLoading] = useState(false);
  const [initialState, setInitialState] = useState({});
  const { id } = useParams();

  const onChange = (field, data) => {
    setInitialState((prev) => ({ ...prev, [field]: data }));
  };

  const fetch = async () => {
    const docRef = doc(db, "questions", id);

    // Get a document, forcing the SDK to fetch from the offline cache.
    try {
      const doc = await getDoc(docRef);

      setInitialState(doc.data());
      setLoading(false);

      // Document was found in the cache. If no cached document exists,
      // an error will be returned to the 'catch' block below.
      console.log("Cached document data:", doc.data());
    } catch (e) {
      console.log("Error getting cached document:", e);
    }
    // console.log(fetchData);
  };

  useEffect(() => {
    fetch();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Form initialState={initialState} onChange={onChange} />
    </div>
  );
};

export default Edit;
