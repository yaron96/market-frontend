import { useEffect } from "react";
import { useSignIn } from "./hooks";
import { AuthError } from "widgets"; //TODO
import styles from "./styles.module.scss";

export const SignInForm = () => {
  const {
    form: {
      register,
      formState: { errors },
    },
    handleSubmit,
    error,
    clearError,
  } = useSignIn();

  useEffect(() => {
    return () => {
      clearError();
    };
  }, []);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <AuthError message={error} />}
      <h1 className={styles.form__title}>Sign in</h1>
      <div className={styles.form__group}>
        <input
          className={styles.form__input}
          placeholder=" "
          {...register("email")}
        />
        <label className={styles.form__label}>
          {errors.email?.message || "Email"}
        </label>
      </div>
      <div className={styles.form__group}>
        <input
          className={styles.form__input}
          type="password"
          placeholder=" "
          {...register("password")}
        />
        <label className={styles.form__label}>
          {errors.password?.message || "Password"}
        </label>
      </div>
      <button className={styles.form__button} type="submit">
        Login
      </button>
    </form>
  );
};
