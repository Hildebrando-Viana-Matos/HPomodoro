import { useContext, useEffect, useState } from "react";

// Hooks
import { useAuth } from "./useAuth";

// Firebase
import { database } from "../services/firebase";

type UserData = {
  id: string;
  name: string;
  avatar: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
};

type FirebaseUserData = Record<
  string,
  {
    id: string;
    name: string;
    avatar: string;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
  }
>;

export function useLevel(level: number) {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserData[]>();

  useEffect(() => {
    const userRef = database.ref(`users/${user?.id}`);

    userRef.on(
      "value",
      (user) => {
        const databaseUser = user.val();
        const firebaseUsers: FirebaseUserData = databaseUser.userData ?? {};

        const parsedUsers = Object.entries(firebaseUsers).map(
          ([key, value]) => {
            return {
              id: key,
              name: value.name,
              avatar: value.avatar,
              levelUser: level,
              currentExperienceUser: value.currentExperience,
              challengesCompletedUser: value.challengesCompleted,
            };
          }
        );

        setUserData(parsedUsers as any);

        return () => {
          userRef.off("value");
        };
      },
      [level, user?.id]
    );
  });
  return { userData };
}
