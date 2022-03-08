import { useEffect, useState } from "react";

// Hooks
import { useAuth } from "./useAuth";

// Firebase
import { database } from "../services/firebase";

type UsersData = {
  id: string;
  name: string;
  avatar: string;
  levelUser: number;
  currentExperienceUser: number;
  challengesCompletedUser: number;
};

type FirebaseUsersData = Record<
  string,
  {
    id: string;
    name: string;
    avatar: string;
    levelUser: number;
    currentExperienceUser: number;
    challengesCompletedUser: number;
  }
>;

export function useUsers() {
  const { user } = useAuth();
  const [usersData, setUsersData] = useState<UsersData[]>();

  useEffect(() => {
    const usersRef = database
      .ref(`users/`)
      .orderByChild(`currentExperienceUser`);

    usersRef.on("value", (user) => {
      const databaseTasks = user.val();
      const firebaseTask: FirebaseUsersData =
        databaseTasks ?? console.log("deu ruim");

      const parsedTask = Object.entries(firebaseTask).map(([key, value]) => {
        return {
          id: key,
          name: value.name,
          avatar: value.avatar,
          levelUser: value.levelUser,
          currentExperienceUser: value.currentExperienceUser,
          challengesCompletedUser: value.challengesCompletedUser,
        };
      });
      setUsersData(parsedTask as UsersData[]);
    });

    return () => {
      usersRef.off("value");
    };
  }, [user?.id]);

  return { usersData };
}
