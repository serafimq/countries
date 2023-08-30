import { FC, lazy } from 'react';
import { RegistrationFormProps } from './RegistrationForm';

export const RegistrationAsync = lazy<FC<RegistrationFormProps>>(
    () => import('./RegistrationForm'),
);