import { useContext, useEffect, useState } from "react";

// Hooks
import { useAuth } from "./useAuth";

// Firebase
import { database } from "../services/firebase";
import { ChallengesContext } from "../contexts/ChallengesContext";

type UserData = {
  id: string;
  name: string;
  avatar: string;
  levelUser: number;
  currentExperienceUser: number;
  challengesCompletedUser: number;
};

export function useUser() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserData>();
  const { currentExperience } = useContext(ChallengesContext);

  useEffect(() => {
    if (user) {
      const dbRef = database.ref(`users/${user?.id}`);
      dbRef
        .get()
        .then((userFromFirebase) => {
          if (userFromFirebase.exists()) {
            const data = userFromFirebase.val();
            const parsedUsers = {
              id: data.id,
              name: data.name,
              avatar: data.avatar,
              levelUser: data.levelUser,
              currentExperienceUser: data.currentExperienceUser,
              challengesCompletedUser: data.challengesCompletedUser,
            };
            setUserData(parsedUsers as UserData);
          } else {
            return;
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user, currentExperience]);
  return { userData, setUserData };
}
