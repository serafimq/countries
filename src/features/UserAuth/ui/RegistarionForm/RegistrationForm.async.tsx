import { FC, lazy } from 'react';
import { RegistrationForm } from './RegistrationForm';

export const RegistrationAsync = lazy<FC<RegistrationForm>>(
    () => import('./RegistrationForm'),
);