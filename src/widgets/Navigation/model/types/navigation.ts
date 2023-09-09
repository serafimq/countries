// import React from 'react';

import { AppLinkTheme } from "@/shared/ui/AppLink";

export interface NavigationItemType {
    path: string;
    text: string;
    // Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
    addClass?: string;
    Icon?: string;
    theme?: AppLinkTheme;
    authOnly?: boolean;
}