import { SignInForm } from "features/auth/sing-in";
import { MainTemplate } from "shared/ui";
import styles from "./styles.module.scss";

export const SignInPage = () => {
  return (
    <MainTemplate>
      <div className={styles.sign_in__page}>
        <SignInForm />
      </div>
    </MainTemplate>
  );
};
