import { memo, useEffect, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink';
import { getRouteMain } from '@/shared/const/router';
import { Navigation } from '@/widgets/Navigation';
import { Icon } from '@/shared/ui/Icon';
import MenuIcon from '@/pages/MainPage/assets/icon-close-menu.svg';
import CloseIcon from '@/pages/MainPage/assets/icon-menu.svg';

import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const onToggle = () => {
        setIsOpen((prev) => !prev);
    }

    const toggleBodyClass = (className: string, shouldAdd: boolean) => {
        document.body.classList.toggle(className, shouldAdd);
    };
      
    useEffect(() => {
        toggleBodyClass('isHidden', isOpen);
        
        return () => {
            toggleBodyClass('isHidden', false);
        };
    }, [isOpen]);

    return (
        <header className={classNames(cls.header, {}, [className])}>
            <div className={classNames(cls.navbar, {[cls.isOpen]: isOpen})}>
                <AppLink
                    className={cls.navbar__logo}
                    theme={AppLinkTheme.SECONDARY}
                    to={getRouteMain()}
                >
                    snap
                </AppLink>
                <Icon 
                    className={cls.navbar__toggler} 
                    Svg={isOpen ? MenuIcon : CloseIcon} 
                    width={26} height={26}
                    onClick={onToggle}
                />
                <Navigation className={classNames(cls.navbar__navigation, {[cls.isOpen]: isOpen}, [])} />
            </div>
        </header>
    );
});