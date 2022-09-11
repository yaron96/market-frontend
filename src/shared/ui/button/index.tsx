import React from "react"
import styles from "./styles.module.scss"

interface Props {
  children: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'submit' | 'reset' | 'button'
  form?: string
  disabled? : boolean
}

export const Button: React.FC<Props> = React.forwardRef((props, ref) => {
  return <button
    className={styles.button}
    {...props}
  >{props.children}</button>
})