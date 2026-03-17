import { useState, useEffect } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setError("");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim() }),
      });
      if (!res.ok) throw new Error("Failed to add task");
      const newTask = await res.json();
      setTasks([newTask, ...tasks]);
      setTitle("");
    } catch (err) {
      setError("Failed to add task.");
    }
  };

  const markComplete = async (id) => {
    setError("");
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
      });
      if (!res.ok) throw new Error("Failed to update task");
      const updated = await res.json();
      setTasks(tasks.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      setError("Failed to update task.");
    }
  };

  return (
    <div className="app">
      <h1>Task Manager</h1>

      {/* Task Input */}
      <form className="task-form" onSubmit={addTask}>
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" disabled={!title.trim()}>
          Add Task
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Loading State */}
      {loading && <p className="loading">Loading tasks...</p>}

      {/* Task List */}
      <div className="task-list">
        {!loading && tasks.length === 0 && (
          <p className="empty">No tasks yet. Add one above!</p>
        )}
        {tasks.map((task) => (
          <div
            key={task._id}
            className={`task-item ${task.status === "Completed" ? "completed" : ""}`}
          >
            <div className="task-info">
              <span className="task-title">{task.title}</span>
              <span className={`task-status ${task.status.toLowerCase()}`}>
                {task.status}
              </span>
            </div>
            {task.status === "Pending" && (
              <button
                className="complete-btn"
                onClick={() => markComplete(task._id)}
              >
                Mark Complete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
