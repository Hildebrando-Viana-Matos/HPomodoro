// Components
import { CardUser } from "../CardUser";

//Styles
import "./styles.scss";

// Hooks
import { useUsers } from "../../hooks/useUsers";

export function Table() {
  const { usersData } = useUsers();
  let positionNumber = 0;

  return (
    <div className="ranking">
      <table>
        <thead>
          <tr>
            <th className="position">Position</th>
            <th className="user">Users</th>
            <th className="challenge">Challenges</th>
            <th className="xp">Experience</th>
          </tr>
        </thead>
        <tbody>
          {usersData
            ?.sort(function (x, y) {
              return y.currentExperienceUser - x.currentExperienceUser;
            })
            .map((users) => {
              positionNumber = positionNumber + 1;
              return (
                <CardUser
                  key={users.id}
                  position={positionNumber}
                  user={{
                    avatar: users.avatar,
                    name: users.name,
                    level: users.levelUser,
                    challengesCompleted: users.challengesCompletedUser,
                    xp: users.currentExperienceUser,
                  }}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
