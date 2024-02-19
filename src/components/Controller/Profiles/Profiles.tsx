import { FC } from "react";
import { SubTitle } from "../../SubTitle/SubTitle";
import { ProfilesWrapper } from "./Profiles.styles";
import { useAppContext } from "../../../contexts/AppContext";

export const Profiles: FC = () => {
  const { profiles } = useAppContext();
  return (
    <ProfilesWrapper>
      <SubTitle>Profiles</SubTitle>
      <div>
        <select
          name="profile"
          id="profile"
          title="select profile"
          value={profiles.profileName}
          onChange={(e) => profiles.setProfileName(e.target.value)}
        >
          {Object.keys(profiles.profiles).map((profileKey) => {
            return (
              <option key={profileKey} value={profileKey}>
                {profileKey}
              </option>
            );
          })}
        </select>
        <button
          disabled={profiles.profileName === "default"}
          title="remove profile"
          className="s"
          onClick={profiles.promptRemoveProfile}
        >
          -
        </button>
        <button
          title="new profile"
          className="s"
          onClick={profiles.promptAddProfile}
        >
          +
        </button>
        <button
          title="export profile"
          className="s"
          onClick={profiles.promptExportProfile}
        >
          ↗
        </button>
      </div>
    </ProfilesWrapper>
  );
};
