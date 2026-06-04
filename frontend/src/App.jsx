import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import StudyLoginPage from "./StudyLoginPage";
import StudyNavbar from "./StudyNavbar";
import TaskCard from "./TaskCard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("https://task-npud.onrender.com/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async () => {
    if (!title || !description || !dueDate) {
      alert("Please fill all fields");
      return;
    }

    try {
      const newTask = {
        subject: title,
        taskDetails: description,
        deadline: dueDate,
      };

      const res = await axios.post(
        "https://task-npud.onrender.com/tasks",
        newTask
      );

      setTasks([...tasks, res.data]);

      setTitle("");
      setDescription("");
      setDueDate("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`https://task-npud.onrender.com/tasks/${id}`);

      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  if (!isLoggedIn) {
    return <StudyLoginPage setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <div
      className={
        isDarkMode
          ? "bg-dark text-light min-vh-100"
          : "bg-light min-vh-100"
      }
    >
      <StudyNavbar
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        setIsLoggedIn={setIsLoggedIn}
      />

      <div className="container py-4">
        <div className="card shadow p-4 mb-4">
          <h3 className="mb-3">Add New Task</h3>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="form-control mb-3"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="date"
            className="form-control mb-3"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <button
            className="btn btn-primary"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>

        <div className="row">
          {tasks.map((task) => (
            <div className="col-md-4 mb-3" key={task._id}>
              <TaskCard
                task={{
                  title: task.subject,
                  description: task.taskDetails,
                  dueDate: task.deadline,
                }}
                isDarkMode={isDarkMode}
                deleteTask={() => deleteTask(task._id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;