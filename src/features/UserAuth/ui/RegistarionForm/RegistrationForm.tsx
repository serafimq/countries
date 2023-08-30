import { memo } from 'react';
import { z } from 'zod';
import cls from '../RegistarionForm/RegistrationForm.module.scss';
import clsAuth from '../styles/Auth.module.scss';
import { AButton, ButtonTheme } from '@/shared/ui/AButton';
import { VForm, useForm } from '@/shared/ui/VForm';
import { VInput } from '@/shared/ui/VInput';

export interface RegistrationFormProps {
    className?: string;
}

export interface RegistrationFormFields {
    firstName: string;
    lastName: string;
    email: string;
    password: string
}

const registrationFormSchema = z.object({
  firstName: z.string().min(1, 'First Name cannot be empty'),
  lastName:  z.string().min(1, 'Last Name cannot be empty'),
  email: z.string().email('Looks like this is not an email'),
  password: z
    .string()
    .min(6, 'Please choose a longer password')
    .max(256, 'Consider using a short password'),
});

const RegistrationForm = memo(({}: RegistrationFormProps) => {
    const form = useForm({
        schema: registrationFormSchema,
    });
    return (
        <div className={clsAuth.form__wrapper}>
            <AButton
                className={cls.form__actionButton}
                theme={ButtonTheme.ACCENT}
            >
                Try it free 7 days <span>then $20/mo. thereafter</span>
            </AButton>
            <VForm 
                form={form} 
                onSubmit={(values) => console.log(values)}
                className={clsAuth.form}
            >
                <VInput
                    placeholder="First Name"
                    {...form.register('firstName')}
                />
                <VInput
                    placeholder="Last name"
                    {...form.register('lastName')}
                />
                <VInput
                    type="email"
                    placeholder="Email Address"
                    {...form.register('email')}
                />

                <VInput
                    type="password"
                    placeholder="Password"
                    {...form.register('password')}
                />
                <AButton isUppercase type="submit">Claim your free trial</AButton>
                <p className={cls.form__terms}> 
                    By clicking the button, you are agreeing to our <span>Terms and Services</span>
                </p>
            </VForm>
        </div>
    );
});

export default RegistrationForm;