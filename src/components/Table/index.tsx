// Components
import { CardUser } from "../CardUser";

//Styles
import "./styles.scss";

export function Table() {
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
          <CardUser
            position={1}
            user={{
              avatar: "https://github.com/Hildebrando-Viana-Matos.png",
              name: "Hildebrando Viana Matos",
              level: 1,
              challengesCompleted: 3,
              xp: 200,
            }}
          />
          <CardUser
            position={2}
            user={{
              avatar: "https://github.com/Hildebrando-Viana-Matos.png",
              name: "Hildebrando Viana Matos",
              level: 1,
              challengesCompleted: 3,
              xp: 200,
            }}
          />
          <CardUser
            position={3}
            user={{
              avatar: "https://github.com/Hildebrando-Viana-Matos.png",
              name: "Hildebrando Viana Matos",
              level: 1,
              challengesCompleted: 3,
              xp: 200,
            }}
          />
          <CardUser
            position={4}
            user={{
              avatar: "https://github.com/Hildebrando-Viana-Matos.png",
              name: "Hildebrando Viana Matos",
              level: 1,
              challengesCompleted: 3,
              xp: 200,
            }}
          />
          <CardUser
            position={5}
            user={{
              avatar: "https://github.com/Hildebrando-Viana-Matos.png",
              name: "Hildebrando Viana Matos",
              level: 1,
              challengesCompleted: 3,
              xp: 200,
            }}
          />
        </tbody>
      </table>
    </div>
  );
}
