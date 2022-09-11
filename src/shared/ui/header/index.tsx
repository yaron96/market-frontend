import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { logoutThunk } from "entities/session";
import { useAppDispatch } from "shared/lib/store";
import { useIsAuthorized, useUser } from "shared/lib/hooks/session";
import { paths } from "shared/lib/paths";
import { LogoutOutlined, SearchOutlined } from "@ant-design/icons";
import { footerLinks, headerLinks } from "shared/lib/links";
import logo from "app/logo.png";
import styles from "./styles.module.scss";

export const Header = () => {
  const [isBurgerActive, setIsBurgerActive] = useState(false);

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchActive) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } else {
      setSearchValue("");
    }
  }, [isSearchActive]);

  const isAuthorized = useIsAuthorized();

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
        <div
          className={
            isSearchActive
              ? [
                  styles["header__search"],
                  styles["header__search_active"],
                ].join(" ")
              : styles["header__search"]
          }
        >
          <input
            className={styles["search__input"]}
            ref={inputRef}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onBlur={(e) => {
              console.log(e);
              if (!e.relatedTarget?.className.includes("search__icon")) {
                setIsSearchActive(false);
              }
            }}
          />
          <SearchOutlined
            className={styles["search__icon"]}
            onClick={() => {
              console.log("click");
              if (isSearchActive) {
                //TODO search func
                console.log("search func");
                setIsSearchActive(false);
              } else {
                setIsSearchActive(true);
              }
            }}
          />
        </div>
        <div className={styles["header__auth"]}>
          {isAuthorized ? <UserMenu /> : <AuthMenu />}
        </div>
        <div
          className={
            isBurgerActive
              ? [
                  styles["header__sidemenu-toggle"],
                  styles["header__sidemenu-toggle_active"],
                ].join(" ")
              : styles["header__sidemenu-toggle"]
          }
          onClick={() => setIsBurgerActive((val) => !val)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div
        className={
          isBurgerActive
            ? [styles["sidemenu"], styles["sidemenu_active"]].join(" ")
            : styles["sidemenu"]
        }
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
          <h4>{user?.nickname}</h4>
        </div>
        <button onClick={handleLogout}>
          <LogoutOutlined />
          {` Logout`}
        </button>
      </div>
    </div>
  );
};
