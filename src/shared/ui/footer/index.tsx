import { Link } from "react-router-dom";
import { footerLinks } from "shared/lib/links";
import styles from "./styles.module.scss";

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__wrap}>
        {footerLinks.map((link) => (
          <Link to={link.path} key={link.title}>
            <div>{link.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};
