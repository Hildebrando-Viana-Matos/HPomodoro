import { useEffect, useState } from "react";

// Hooks
import { useAuth } from "./useAuth";

// Firebase
import { database } from "../services/firebase";

type Task = {
  id: string;
  title: string;
  isComplete: boolean;
};

type FirebaseTask = Record<
  string,
  {
    id: string;
    title: string;
    isComplete: boolean;
  }
>;

export function useTasks(taskTitle: boolean) {
  const { user } = useAuth();
  const [task, setTask] = useState<Task[]>();

  useEffect(() => {
    const taskRef = database.ref(`users/${user?.id}/tasks`);

    taskRef.on("value", (tasks) => {
      const databaseTasks = tasks.val();
      const firebaseTask: FirebaseTask = databaseTasks ?? {};

      const parsedTask = Object.entries(firebaseTask).map(([key, value]) => {
        return {
          id: key,
          title: value.title,
          isComplete: value.isComplete,
        };
      });
      setTask(parsedTask as Task[]);
    });

    return () => {
      taskRef.off("value");
    };
  }, [taskTitle, user?.id]);

  return { task };
}
