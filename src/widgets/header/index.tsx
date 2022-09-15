import { Link } from "react-router-dom";
import { useHeaderSearch } from "./useHeaderSearch";
import { useSidemenu } from "./useSidemenu";
import { logoutThunk } from "entities/session";
import { useAppDispatch } from "shared/lib/store";
import { useIsAuthorized, useUser } from "shared/lib/hooks/session";
import { footerLinks, headerLinks } from "shared/lib/links";
import { paths } from "shared/lib/paths";
import { LogoutOutlined, SearchOutlined } from "@ant-design/icons";
import logo from "app/logo.png";
import styles from "./styles.module.scss";

export const Header = () => {
  const isAuthorized = useIsAuthorized();
  const {
    searchValue,
    setSearchValue,
    setIsSearchActive,
    inputRef,
    headerSearchClassName,
  } = useHeaderSearch();
  const {
    setIsBurgerActive,
    burgerToggle,
    burgerButtonClassName,
    sidemenuClassName,
  } = useSidemenu();

  return (
    <div className={styles["header"]}>
      <div className={styles["header__wrap"]}>
        <div className={styles["header__logo"]}>
          <Link to={paths.home()}>
            <img src={logo} alt="no img" />
          </Link>
        </div>
        <div className={styles["header__links"]}>
          {headerLinks.map((link) => (
            <Link to={link.path} key={link.title}>
              <div>{link.title}</div>
            </Link>
          ))}
        </div>
        <div className={headerSearchClassName}>
          <input
            className={styles["search__input"]}
            ref={inputRef}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onBlur={(e) => {
              if (!e.relatedTarget?.className.includes("search__icon")) {
                setIsSearchActive(false);
              }
            }}
          />
          <SearchOutlined
            className={styles["search__icon"]}
            onClick={() => {
              setIsSearchActive((curr) => !curr);
            }}
          />
        </div>
        <div className={styles["header__auth"]}>
          {isAuthorized ? <UserMenu /> : <AuthMenu />}
        </div>
        <div className={burgerButtonClassName} onClick={burgerToggle}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div
        className={sidemenuClassName}
        onClick={() => setIsBurgerActive(false)}
      >
        <div className={styles["sidemenu__auth-links"]}>
          {isAuthorized ? <UserMenu /> : <AuthMenu />}
        </div>
        <div className={styles["sidemenu__header-links"]}>
          {headerLinks.map((link) => (
            <Link to={link.path} key={link.title}>
              <div>{link.title}</div>
            </Link>
          ))}
        </div>
        <div className={styles["sidemenu__footer-links"]}>
          {footerLinks.map((link) => (
            <Link to={link.path} key={link.title}>
              <div>{link.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const AuthMenu = () => {
  return (
    <div className={styles["authmenu"]}>
      <Link to={paths.signIn()}>
        <button>Sign In</button>
      </Link>
      <Link to={paths.signUp()}>
        <button>Sign Up</button>
      </Link>
    </div>
  );
};

const UserMenu = () => {
  const dispatch = useAppDispatch();
  const user = useUser();

  const handleLogout = () => {
    dispatch(logoutThunk());
  };

  return (
    <div className={styles["usermenu"]}>
      <div className={styles["usermenu__create"]}>
        <Link to={paths.createProduct()}>
          <button>
            <div>{` Sell a boat`}</div>
          </button>
        </Link>{" "}
      </div>
      <div className={styles["usermenu__aboutlogout"]}>
        <div className={styles["usermenu__about"]}>
          <h4>{user?.email}</h4>
        </div>
        <button onClick={handleLogout}>
          <LogoutOutlined />
          {` Logout`}
        </button>
      </div>
    </div>
  );
};
