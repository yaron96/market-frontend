import { useState, useEffect } from "react";
import styles from "./styles.module.scss";

interface Props {
  onChange: (
    minimum: number | null | undefined,
    maximum: number | null | undefined
  ) => void;
  placeHolders: {
    minimum: string;
    maximum: string;
  };
}

export const NumberRange = ({ onChange, placeHolders }: Props) => {
  const [minimum, setMinimum] = useState<number | null>();
  const [maximum, setMaximum] = useState<number | null>();

  useEffect(() => {
    onChange(minimum, maximum);
  }, [minimum, maximum]);

  return (
    <div className={styles["number-range"]}>
      <InputField
        placeholder={placeHolders.minimum}
        value={minimum || ""}
        onChange={(e) => setMinimum(+e.target.value)}
      />
      <InputField
        placeholder={placeHolders.maximum}
        value={maximum || ""}
        onChange={(e) => setMaximum(+e.target.value)}
      />
    </div>
  );
};

const InputField = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => {
  return (
    <div className={styles["input-field"]}>
      <input {...props} />
    </div>
  );
};
