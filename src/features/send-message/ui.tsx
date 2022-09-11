import { Button, TextArea } from "shared/ui"
import styles from "./styles.module.scss"

export const Message = () => {
  return (
    <div className={styles.send_message}>
      <TextArea
        rows={6}
        placeholder="Message to seller"
      />
      <div className={styles.send_button}>
        <Button>
          send
        </Button>
      </div>
    </div>
  )
}