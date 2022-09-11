import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useUser } from '../session';
import { CreateProductBody } from 'shared/api/product';

  const validationSchema = yup.object().shape({
  author: yup.string().required()
  ,title: yup.string()
    .required()
  ,category: yup.string()
    .required()
  ,location: yup.object()
    .required()
  ,description: yup.string()
    .max(2048)
  ,price: yup.number()
    .typeError('price is a required field')
    .required()
    .min(1)
  ,images: yup.array()
    .min(1, 'Please upload at least one image')
  ,length: yup.number()
    .typeError('length is a required field')
    .required()
    .min(0.1)
  ,beam: yup.number()
    .typeError('beam is a required field')
    .required()
    .min(0.1)
  ,built: yup.number()
    .typeError('built is a required field')
    .required()
    .min(1)
    .integer(),
});

export const useProductForm = () => {
  const user = useUser();

  const form = useForm<CreateProductBody>({
    resolver: yupResolver(validationSchema),
  })

  if (user) {
    form.setValue('author', user?._id)
  }

  return form;
}