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
            const parsedUsers = {
              id: userFromFirebase.val().id,
              name: userFromFirebase.val().name,
              avatar: userFromFirebase.val().avatar,
              levelUser: userFromFirebase.val().levelUser,
              currentExperienceUser:
                userFromFirebase.val().currentExperienceUser,
              challengesCompletedUser:
                userFromFirebase.val().challengesCompletedUser,
            };
            setUserData(parsedUsers as any);
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
