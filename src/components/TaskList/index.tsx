// React
import { useState } from "react";

// Icons
import { FiCheck, FiTrash } from "react-icons/fi";

// Styles
import "./styles.scss";

// Types
interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask() {
    if (!newTaskTitle) return;
    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false,
    };

    setTasks((oldState) => [...oldState, newTask]);
    setNewTaskTitle("");
  }

  function handleToggleTaskCompletion(id: number) {
    const newTasks = tasks.map((task) =>
      task.id == id
        ? {
            ...task,
            isComplete: !task.isComplete,
          }
        : task
    );

    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    const filteredTasks = tasks.filter((task) => task.id != id);
    setTasks(filteredTasks);
  }

  return (
    <div className="toDoList">
      <h1>To Do List</h1>
      <div className="formTask">
        <input
          type="text"
          placeholder="Digite uma nova Task"
          onChange={(e) => setNewTaskTitle(e.target.value)}
          value={newTaskTitle}
        />
        <button type="submit" onClick={handleCreateNewTask}>
          <span>Adicionar</span>
          <FiCheck size={30} />
        </button>
      </div>

      <ul>
        {tasks.map((task) => {
          <li key={task.id}>
            <div
              className={`completedTask ${task.isComplete ? "completed" : ""}`}
            >
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  readOnly
                  checked={task.isComplete}
                  onClick={() => handleToggleTaskCompletion(task.id)}
                />
                <span className="checkmark"></span>
              </label>
              <p>{task.title}</p>
            </div>

            <button type="button" onClick={() => handleRemoveTask(task.id)}>
              <FiTrash size={30} />
            </button>
          </li>;
        })}
      </ul>
    </div>
  );
}
