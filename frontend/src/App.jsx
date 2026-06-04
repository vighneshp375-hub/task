import { useState } from "react";
import axios from "axios";
import TaskCard from "./TaskCard";
import StudyNavbar from "./StudyNavbar";
import StudyLoginPage from "./StudyLoginPage";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkmode, setIsDarkmode] = useState(false);

  const [subject, setSubject] = useState("");
  const [taskDetails, setTaskDetails] = useState("");
  const [deadline, setDeadline] = useState("");

  const [tasks, setTasks] = useState([]);

  const addTask = async () => {
    if (!subject || !taskDetails || !deadline) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/tasks",
        {
          subject,
          taskDetails,
          deadline,
        }
      );

      setTasks([...tasks, response.data]);

      setSubject("");
      setTaskDetails("");
      setDeadline("");
    } catch (error) {
      console.error(error);
      alert("Failed to save task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`);

      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete task");
    }
  };

  if (!isLoggedIn) {
    return (
      <StudyLoginPage
        setIsLoggedIn={setIsLoggedIn}
      />
    );
  }

  return (
    <div
      className={
        isDarkmode
          ? "bg-dark text-light min-vh-100"
          : "bg-light min-vh-100"
      }
    >
      <StudyNavbar
        isDarkmode={isDarkmode}
        setIsDarkmode={setIsDarkmode}
        setIsLoggedIn={setIsLoggedIn}
      />

      <div className="container py-4">
        <div className="card shadow p-4 mb-4">
          <h3 className="mb-3">Add Study Task</h3>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <textarea
            className="form-control mb-3"
            placeholder="Task Details"
            value={taskDetails}
            onChange={(e) => setTaskDetails(e.target.value)}
          />

          <input
            type="date"
            className="form-control mb-3"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          <button
            className="btn btn-primary"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>

        <div className="row">
          {tasks.length === 0 ? (
            <div className="text-center">
              <h5>No tasks added yet.</h5>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className="col-md-4 mb-3"
              >
                <TaskCard
                  task={task}
                  deadline={task.deadline}
                  taskDetails={task.taskDetails}
                  isDarkmode={isDarkmode}
                  deleteTask={() =>
                    deleteTask(task._id)
                  }
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;