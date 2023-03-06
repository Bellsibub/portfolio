import { useDownloadFile } from 'hooks/useDownloadFile';
import styles from './ResumeButton.module.css';
const ResumeButton = () => {
  const { document } = useDownloadFile('Test_PDF.pdf');

  return (
    <>
      <a
        href={document}
        target="_blank"
        download
        className={styles.button}
        rel="noreferrer"
      >
        Resume
      </a>
    </>
  );
};
export default ResumeButton;
