import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ImageProps } from "react-native";

export type RootParamList = {
  SplashScreen: undefined;
  AuthNavigator:
    | {
        screen: keyof AuthParamList;
        params?: AuthParamList[keyof AuthParamList];
      }
    | undefined;
  AppNavigator: { 
    screen: keyof AppParamList;
    params?: AppParamList[keyof AppParamList]
   } | undefined;
};

export type AuthParamList = {
  Login: undefined;
};

export type AppParamList = {
 
};

export type SplashScreenParamList = StackNavigationProp<
  RootParamList,
  "SplashScreen"
>;

export type AuthScreensParamList<T extends keyof AuthParamList> =
  CompositeNavigationProp<
    StackNavigationProp<RootParamList, "AuthNavigator">,
    StackNavigationProp<AuthParamList, T>
  >;

export type AuthScreensRouteList<T extends keyof AuthParamList> = RouteProp<
  AuthParamList,
  T
>;

export type AppScreensParamList<T extends keyof AppParamList> =
  CompositeNavigationProp<
    StackNavigationProp<RootParamList, "AppNavigator">,
    StackNavigationProp<AppParamList, T>
  >;

export type AppScreensRouteList<T extends keyof AppParamList> = RouteProp<
  AppParamList,
  T
>;


export type SplashScreenParam = StackNavigationProp<
  RootParamList,
  "SplashScreen"
>;

export type RootNavigatorParams<T extends keyof RootParamList> =
  StackNavigationProp<RootParamList, T>;
