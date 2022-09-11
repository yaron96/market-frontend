import { SignUpForm } from "features/auth/sign-up"
import { MainTemplate } from "shared/ui"
import styles from "./styles.module.scss"

export const SignUpPage = () => {
  return (
    <MainTemplate>
      <div className={styles.sign_up__page}>
        <SignUpForm />
      </div>
    </MainTemplate>
  )
}