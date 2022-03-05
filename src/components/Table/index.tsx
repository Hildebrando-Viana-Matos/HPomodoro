// Components
import { CardUser } from "../CardUser";

//Styles
import "./styles.scss";

// Hooks
import { useUsers } from "../../hooks/useUsers";

// i18n
import { useTranslation } from "react-i18next";

export function Table() {
  const { t } = useTranslation();

  const { usersData } = useUsers();
  let positionNumber = 0;

  return (
    <div className="ranking">
      <table>
        <thead>
          <tr>
            <th className="position">{t("POSITION")}</th>
            <th className="user">{t("USERS")}</th>
            <th className="challenge">{t("CHALLENGES")}</th>
            <th className="xp">{t("EXPERIENCE")}</th>
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
