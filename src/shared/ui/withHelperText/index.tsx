import { ReactElement } from "react"
import { useWithHelperText } from "shared/lib/hooks/useWithHelperText"
import styles from "./styles.module.scss"

interface Props {
  children: ReactElement;
  helpertext?: string;
}

export const WithHelperText: React.FC<Props> = ({children, helpertext}) => {
  const helperClasses = useWithHelperText(
    helpertext, styles.helper, styles.focusWithText);

  return (
    <div className={styles.withHelperText}>
      {children}
      <div className={helperClasses.join(' ')}>{helpertext || '...'}</div>
    </div>
  )
}