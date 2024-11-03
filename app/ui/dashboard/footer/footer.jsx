import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>ITupolev </div>
      <div className={styles.text}>INNOGLOBALHACK © All rights reserved.</div>
    </div>
  );
};

export default Footer;
