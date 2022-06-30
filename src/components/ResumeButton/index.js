import styles from './ResumeButton.module.css';
const ResumeButton = () => {
  const onClick = () => {
    console.log('Initiate download of resume');
  };

  return (
    <>
      <button onClick={onClick} className={styles.button}>Resume</button>
    </>
  );
};
export default ResumeButton;
