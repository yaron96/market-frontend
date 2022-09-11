import styles from "./styles.module.scss"

interface Props {
  message: string
}

export const AuthError: React.FC<Props> = ({message}) => {
  return (
    <div className={styles.auth_error}>
      {message}
    </div>
  )
}