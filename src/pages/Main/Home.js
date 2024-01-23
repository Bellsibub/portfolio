import { ResumeButton, SocialLinks } from "components";

import layout from "./Layouts/Home.module.css";

const Home = () => {
  return (
    <>
      <div className={layout.wrapper}>
        <h1>Isabella Billgren</h1>
        <h4>frontend developer</h4>
        <p>
          I am a passionate frontend developer whos quest for improving the web
          has only just begun. Gaining knowledge and experience throughout my +5
          years in the IT industry as a QA Engineer has led me to take on this
          new challenge.
        </p>
        <p>The journey has only just begun…</p>
        <ResumeButton />
        <SocialLinks />
      </div>
    </>
  );
};

export default Home;
