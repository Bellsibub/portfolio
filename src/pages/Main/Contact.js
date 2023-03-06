import { ResumeButton, SocialLinks } from 'components';
import layout from './Layouts/Contact.module.css';

const Contact = () => {
  return (
    <>
      <div className={layout.wrapper}>
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
    </>
  );
};

export default Contact;
