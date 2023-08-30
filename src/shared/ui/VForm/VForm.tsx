import { ReactNode } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { ComponentProps } from 'react';

import {
  useForm as useHookForm,
  UseFormProps as UseHookFormProps,
  FormProvider,
  UseFormReturn,
  FieldValues,
  SubmitHandler,
  useFormContext,
} from 'react-hook-form';

import { ZodSchema, TypeOf } from 'zod';

import cls from './VForm.module.scss';

interface UseFormProps<T extends ZodSchema<any>>
  extends UseHookFormProps<TypeOf<T>> {
  schema: T;
}

export const useForm = <T extends ZodSchema<any>>({
  schema,
  ...formConfig
}: UseFormProps<T>) => {
  return useHookForm({
    ...formConfig,
    resolver: zodResolver(schema),
  });
};


interface FormProps<T extends FieldValues = any>
  extends Omit<ComponentProps<'form'>, 'onSubmit'> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
}

export const VForm = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  ...props
}: FormProps<T>) => {
  
  return (
    <FormProvider {...form}>
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            {...props}
        >
            <fieldset
                className={cls.fieldset}
                disabled={form.formState.isSubmitting}
            >
                {children}
            </fieldset>
        </form>
    </FormProvider>
  );
};

export function FieldError({ name }: { name?: string }) {
  const {
    formState: { errors },
  } = useFormContext();

  if (!name) return null;

  const error = errors[name];

  if (!error) return null;

  const errorMessage = error.message as ReactNode;

  return <span className={cls.errorField}>{errorMessage}</span>;
}
