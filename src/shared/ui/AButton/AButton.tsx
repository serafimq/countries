import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './AButton.module.scss';

export enum ButtonTheme {
    PRIMARY = 'primary',
    ACCENT = 'accent',
    MAIN = 'main',
}

interface AButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    disabled?: boolean;
    children?: ReactNode;
    theme?: ButtonTheme;
    fullWidth?: boolean;
    isUppercase?: boolean;
}

export const AButton = memo((props: AButtonProps) => {
    const {
        className,
        theme = ButtonTheme.PRIMARY,
        children,
        disabled,
        fullWidth,
        isUppercase = false,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls.disabled]: disabled,
        [cls.fullWidth]: fullWidth,
        [cls.isUppercase]: isUppercase,
    };
    return (
        <button
            type="button"
            className={classNames(cls.Button, mods, [className, cls[theme]])}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
});