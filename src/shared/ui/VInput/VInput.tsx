import { ComponentProps, forwardRef } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './VInput.module.scss';
import { FieldError } from '@/shared/ui/VForm';

import { useFormContext } from 'react-hook-form';
import { Icon } from '../Icon';
import AllertIcon from '@/shared/assets/icons/alert.svg';

interface InputProps extends ComponentProps<'input'> {
    className?: string;
    readonly?: boolean;
}

export const VInput = forwardRef<HTMLInputElement, InputProps>(function Input({ 
        type = 'text', 
        className,
        readonly,
        ...props 
    },
    ref
) {

    let isError = false;

    const {formState: { errors }} = useFormContext();
    if (props.name) {
        isError = Boolean(errors[props.name]);
    }


    const mods: Mods = {
        [cls.readonly]: readonly,
        [cls.error]: Boolean(isError),
    };
    
    return (
        <div className={classNames(cls.VInputWrapper, mods, [className])}>
            <input
                className={classNames(cls.input, mods, [])}
                type={type}
                ref={ref}
                {...props}
            />
            <FieldError name={props.name}/>
            {isError && (<Icon className={cls.icon} Svg={AllertIcon} width={16} height={16} />)}
        </div>
    );
});
