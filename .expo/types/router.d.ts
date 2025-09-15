/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/garden`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/components/CustomText`; params?: Router.UnknownInputParams; } | { pathname: `/components/GardenBoard`; params?: Router.UnknownInputParams; } | { pathname: `/hooks/use-theme-color`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/garden`; params?: Router.UnknownOutputParams; } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/components/CustomText`; params?: Router.UnknownOutputParams; } | { pathname: `/components/GardenBoard`; params?: Router.UnknownOutputParams; } | { pathname: `/hooks/use-theme-color`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/garden${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/components/CustomText${`?${string}` | `#${string}` | ''}` | `/components/GardenBoard${`?${string}` | `#${string}` | ''}` | `/hooks/use-theme-color${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/garden`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/components/CustomText`; params?: Router.UnknownInputParams; } | { pathname: `/components/GardenBoard`; params?: Router.UnknownInputParams; } | { pathname: `/hooks/use-theme-color`; params?: Router.UnknownInputParams; };
    }
  }
}
