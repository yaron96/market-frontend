import { ReactElement, ReactNode } from "react"
import styles from './styles.module.scss'

interface Props {
  title?: ReactNode
  children?: ReactElement | ReactElement[]
}

export const MainTemplate: React.FC<Props> = ({children, title}) => {
  return (
    <div className={styles.title}>
      <h1>{title}</h1>
    <div className={styles.main_template}>
      {children}
    </div>
    </div>
    
  )
}