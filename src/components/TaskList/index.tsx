// React
import { FormEvent, useContext, useState } from "react";

// Icons
import { FiCheck, FiTrash } from "react-icons/fi";

// Context
import { ThemeContext } from "../../contexts/ThemeContext";
import { useAuth } from "../../hooks/useAuth";

// Hooks
import { useTasks } from "../../hooks/useTasks";
import { database } from "../../services/firebase";

// i18m
import { useTranslation } from "react-i18next";

// Styles
import styles from "./TaskList.module.scss";

export function TaskList() {
  const { t } = useTranslation();

  const { user } = useAuth();

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTask, setNewTask] = useState(false);
  const { task } = useTasks(newTask as boolean);

  const { globalTheme } = useContext(ThemeContext);

  async function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    setNewTask(true);
    if (newTaskTitle.trim() === "") {
      return;
    }

    if (!user) {
      throw new Error("You must be logged in");
    }

    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false,
    };

    await database.ref(`users/${user?.id}/tasks`).push(newTask);
    setNewTaskTitle("");
    setNewTask(false);
  }

  async function handleToggleTaskCompletion(taskSingle: any) {
    if (!taskSingle.isComplete) {
      await database.ref(`users/${user?.id}/tasks/${taskSingle.id}`).update({
        id: taskSingle.id,
        title: taskSingle.title,
        isComplete: true,
      });
    } else {
      await database.ref(`users/${user?.id}/tasks/${taskSingle.id}`).update({
        id: taskSingle.id,
        title: taskSingle.title,
        isComplete: false,
      });
    }
  }

  async function handleRemoveTask(id: number) {
    await database.ref(`users/${user?.id}/tasks/${id}`).remove();
  }

  return (
    <div className={styles.toDoList}>
      <h1>{t("To Do List")}</h1>
      <form onSubmit={handleCreateNewTask} className={styles.formTask}>
        <input
          type="text"
          placeholder={t("Enter a new Task")}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          value={newTaskTitle}
        />
        <button type="submit" autoFocus className={styles[globalTheme]}>
          <span>{t("Add Task")}</span>
          <FiCheck size={30} />
        </button>
      </form>

      <ul>
        {task?.map((taskSingle) => {
          return (
            <li key={taskSingle.id}>
              <div
                className={`${styles.completedTask} ${
                  taskSingle.isComplete ? styles.completed : ""
                }`}
              >
                <label className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    readOnly
                    checked={taskSingle.isComplete}
                    onClick={() =>
                      handleToggleTaskCompletion(taskSingle as any)
                    }
                  />
                  <span
                    className={`${styles.checkmark} ${styles[globalTheme]}`}
                  ></span>
                </label>
                <p className={styles[globalTheme]}>{taskSingle.title}</p>
              </div>

              <button
                type="button"
                onClick={() => handleRemoveTask(taskSingle.id)}
              >
                <FiTrash size={30} />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
