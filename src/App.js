import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Form from "./pages/Form";
import Table from "./pages/Table";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Create from "./pages/Create";
import Edit from "./pages/Edit";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/table" element={<Table />} />
          <Route path="/edit/:id" element={<Edit />} />
          {/* <Route path="/form" element={<Form />} /> */}
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
