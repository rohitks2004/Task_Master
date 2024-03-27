import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Task from "./pages/Task";
import Taskdetail from "./pages/Taskdetail";
import Trash from "./pages/Trash";
import Users from "./pages/Users";
function App() {
  return (
    <>
    <main className="w-full min-h-screen bg-[#f3f4f6]">
      <Routes>
        {/* <Route
          path="/"
          element={
            <>
              <h1 className="text-3xl font-bold underline">App</h1>
              <Link to={"/log-in"}>Go To Login Page</Link>
              <br />
              <br />
              <Link to={"/Dashboard"}>Go To Dashboard</Link>
              <br />
              <br />
              <Link to={"task"}>Go To Task</Link>
            </>
          }
        >hello</Route> */}
        <Route element={<Layout/>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="task" element={<Task />} />
          <Route path="completed/:status" element={<Task />} />
          <Route path="in-progress/:status" element={<Task />} />
          <Route path="todo/:status" element={<Task />} />
          <Route path="team" element={<Users />} />
          <Route path="trashed" element={<Trash />} />
          <Route path="task/:id" element={<Taskdetail />} />
        </Route>
        
        <Route path="/log-in" element={<Login />} />
      </Routes>
    </main>
  </>
  );
}

export default App;
