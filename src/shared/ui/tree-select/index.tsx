import { TreeSelect as TrSelect } from "antd";
import styles from "./styles.module.scss";

interface Props {
  placeholder?: string;
  treeData?: any;
  treeDefaultExpandAll?: boolean;
  fieldNames?: any;
  onSelect?: any;
  onChange?: (e: string) => void;
  value?: string;
  defaultValue?: string;
}

export const TreeSelect: React.FC<Props> = (props) => {
  return (
    <div className={styles.field}>
      <TrSelect
        className={styles.select}
        {...props}
      />
    </div>
  );
};
