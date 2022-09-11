import React from "react"
import styles from './styles.module.scss'

interface Props {
  rows?: number
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  return (
    <div className={styles.field}>
      <textarea className={styles.textarea}
        placeholder={props.placeholder}
        {...props}
        ref={ref}
      />
    </div>
  )
})