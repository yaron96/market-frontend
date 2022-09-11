import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { setIsAuthorized } from "entities/session/slice";
import { useAppDispatch } from 'shared/lib/store/index';
import { TokenStorage } from "shared/lib/token";
import { RegisterUserBody, userApi } from "shared/api";
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from "shared/lib/contants";

interface FormValues extends RegisterUserBody {
  passwordConfirmation: string;
}

const validationSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .min(MIN_PASSWORD_LENGTH)
    .max(MAX_PASSWORD_LENGTH),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const useSignUp = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");

  const mutation = useMutation(userApi.registerUser, {
    onSuccess: (data) => {
      TokenStorage.storeToken(data);
      dispatch(setIsAuthorized(true));
    },
    onError: (error: any) => {
      setError(error.message)
    },
  });

  const form = useForm<FormValues>({ resolver: yupResolver(validationSchema) });

  const handleSubmit = form.handleSubmit((values: FormValues) => {
    console.log('asd')
    mutation.mutate(values);
  });
  const clearError = () => {
    setError('');
  };

  return {
    form,
    handleSubmit,
    error,
    clearError,
  };
};
