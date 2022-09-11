import { MAX_PASSWORD_LENGTH } from "shared/lib/contants";
import { MIN_PASSWORD_LENGTH } from "shared/lib/contants";
import { LoginCredentials } from "shared/api/auth/index";
import { useForm } from "react-hook-form";
import { authApi } from "shared/api";
import { useMutation } from "react-query";
import { useState } from "react";
import { TokenStorage } from "shared/lib/token";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "shared/lib/store";
import { setIsAuthorized } from "entities/session";

const validationSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .min(MIN_PASSWORD_LENGTH)
    .max(MAX_PASSWORD_LENGTH),
});

export const useSignIn = () => {
  const dispatch = useAppDispatch();

  const [error, setError] = useState("");

  const mutation = useMutation(authApi.loginByCredentials, {
    onSuccess: (data) => {
      TokenStorage.storeToken(data);
      dispatch(setIsAuthorized(true));
    },
    onError: (error: any) => {
      setError(error.message);
    },
  });

  const form = useForm<LoginCredentials>({
    resolver: yupResolver(validationSchema),
  });

  const handleSubmit = form.handleSubmit((values: LoginCredentials) => {
    mutation.mutate(values);
  });
  const clearError = () => {
    setError("");
  };

  return {
    form,
    handleSubmit,
    error,
    clearError,
  };
};
