import { Navigate, Outlet } from "react-router";
import { useIsAuthorized } from "shared/lib/hooks/session";
import { paths } from "shared/lib/paths";
import styles from "./styles.module.scss";

export const AuthPage: React.FC = () => {
  const isAuthorized = useIsAuthorized();

  if (isAuthorized) {
    return <Navigate to={paths.home()} />;
  }

  return (
    <div className={styles.auth}>
      <Outlet />
    </div>
  );
};
