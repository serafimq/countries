import { memo, useCallback } from 'react';
import { z } from 'zod';
import cls from '../RegistarionForm/RegistrationForm.module.scss';
import clsAuth from '../styles/Auth.module.scss';
import { AButton, ButtonTheme } from '@/shared/ui/AButton';
import { VForm, useForm } from '@/shared/ui/VForm';
import { VInput } from '@/shared/ui/VInput';
import { RegistrationUserProps } from '../../model/types/registrationSchema';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { createUser } from '../../model/services/createUser/createUser';

export interface RegistrationFormProps {
    className?: string;
}

const registrationFormSchema = z.object({
  username:  z.string().min(1, 'User Name cannot be empty'),
  email: z.string().email('Looks like this is not an email'),
  password: z
    .string()
    .min(6, 'Please choose a longer password')
    .max(256, 'Consider using a short password'),
});

const RegistrationForm = memo(({}: RegistrationFormProps) => {
    const dispatch = useAppDispatch();
    const form = useForm({
        schema: registrationFormSchema,
    });

    const onSubmit = useCallback(async (data: RegistrationUserProps) => {
        console.log('onSubmit', data);
        await dispatch(createUser(data));
    }, [dispatch]);
    
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
                onSubmit={(values) => onSubmit(values)}
                className={clsAuth.form}
            >
                <VInput
                    placeholder="User Name"
                    {...form.register('username')}
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