import { useMemo, useState } from "react";
import styles from "./styles.module.scss";

export const useSidemenu = () => {
  const [isBurgerActive, setIsBurgerActive] = useState(false);

  const burgerToggle = () => {
    setIsBurgerActive((value) => !value);
  };

  const burgerButtonClassName = useMemo(() => {
    return isBurgerActive
      ? [
          styles["header__sidemenu-toggle"],
          styles["header__sidemenu-toggle_active"],
        ].join(" ")
      : styles["header__sidemenu-toggle"];
  }, [isBurgerActive]);

  const sidemenuClassName = useMemo(() => {
    return isBurgerActive
      ? [styles["sidemenu"], styles["sidemenu_active"]].join(" ")
      : styles["sidemenu"];
  }, []);

  return {
    setIsBurgerActive,
    burgerToggle,
    burgerButtonClassName,
    sidemenuClassName,
  };
};
