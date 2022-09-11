import { useEffect } from "react";
import { useSignUp } from "./hooks";
import { AuthError } from "widgets";
import styles from "./styles.module.scss";

export const SignUpForm = () => {
  const {
    form: {
      register,
      formState: { errors },
    },
    handleSubmit,
    error,
    clearError,
  } = useSignUp();

  useEffect(() => {
    return () => {
      clearError();
    };
  }, []);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <AuthError message={error} />}
      <h1 className={styles.form__title}>Sign up</h1>
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
      <div className={styles.form__group}>
        <input
          className={styles.form__input}
          type="password"
          placeholder=" "
          {...register("passwordConfirmation")}
        />
        <label className={styles.form__label}>
          {errors.passwordConfirmation?.message || "Password"}
        </label>
      </div>
      <button className={styles.form__button} type="submit">
        Registation
      </button>
    </form>
  );
};
