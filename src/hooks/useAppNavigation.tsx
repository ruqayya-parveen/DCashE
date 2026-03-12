import {
  useNavigation,
  CommonActions,
  StackActions,
  CompositeNavigationProp,
} from '@react-navigation/native';
import type { NavigationProp, ParamListBase } from '@react-navigation/native';

type InferParamList<T> = T extends CompositeNavigationProp<
  any,
  NavigationProp<infer P>
>
  ? P
  : T extends NavigationProp<infer P>
  ? P
  : never;

const useAppNavigation = <
  TNav extends NavigationProp<ParamListBase>,
  TScope extends ParamListBase = InferParamList<TNav>, // ← override scope independently
>() => {
  const navigation = useNavigation<TNav>();

  type ParamList = TScope; // strictly scoped to TScope only

  const navigateTo = <K extends keyof ParamList>(
    ...args: ParamList[K] extends undefined
      ? [screen: K]
      : [screen: K, params: ParamList[K]]
  ) => {
    const [screen, params] = args;
    (navigation as any).navigate(screen, params);
  };

  const replaceTo = <K extends keyof ParamList>(
    ...args: ParamList[K] extends undefined
      ? [screen: K]
      : [screen: K, params: ParamList[K]]
  ) => {
    const [screen, params] = args;
    navigation.dispatch(StackActions.replace(screen as string, params));
  };

  const resetTo = <K extends keyof ParamList>(
    ...args: ParamList[K] extends undefined
      ? [screen: K]
      : [screen: K, params: ParamList[K]]
  ) => {
    const [screen, params] = args;
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: screen as string, params }],
      }),
    );
  };

  const popTo = <K extends keyof ParamList>(
    ...args: ParamList[K] extends undefined
      ? [screen: K]
      : [screen: K, params: ParamList[K]]
  ) => {
    const [screen, params] = args;
    navigation.dispatch(
      CommonActions.navigate({ name: screen as string, params }),
    );
  };

  const popCount = (count: number = 1) => {
    navigation.dispatch(StackActions.pop(count));
  };

  const goBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
  };

  const goBackWithCallback = (callback: () => void, delay: number = 500) => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      setTimeout(callback, delay);
    }
  };

  const goBackWithParams = <K extends keyof ParamList>(
    screen: K,
    params: ParamList[K],
  ) => {
    navigation.dispatch({
      ...CommonActions.setParams(params as object),
      source: navigation.getState().routes.find(r => r.name === screen)?.key,
    });
    goBack();
  };

  const canGoBack = () => navigation.canGoBack();

  return {
    navigateTo,
    replaceTo,
    resetTo,
    popTo,
    popCount,
    goBack,
    goBackWithCallback,
    goBackWithParams,
    canGoBack,
    navigation,
  };
};

export default useAppNavigation;
