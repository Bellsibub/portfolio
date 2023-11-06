import { ResumeButton, SocialLinks, CharacterInfo } from "components";
import layout from "./Layouts/Character.module.css";

const Character = () => {
  return (
    <div className={layout.wrapper}>
      <div className={layout.infoPanel}>
        <CharacterInfo />
      </div>
      <div className={layout.contactWrapper}>
        <ResumeButton />
        <div className={layout.section}>
          <h4>email</h4>
          <a className={layout.link} href="mailto:isabella.billgren@gmail.com">
            isabella.billgren@gmail.com
          </a>
        </div>
        <div className={layout.section}>
          <h4>socials</h4>
          <SocialLinks />
        </div>
      </div>
    </div>
  );
};

export default Character;
