import {
  createNavigationContainerRef,
  CommonActions,
  StackActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

// Internal safety dispatcher
const dispatch = action => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(action);
  } else {
    console.warn('[Navigation] Navigator not ready');
  }
};

export const navigateTo = (screen, params) => {
  dispatch(CommonActions.navigate({ name: screen, params }));
};

export const replaceTo = (screen, params) => {
  dispatch(StackActions.replace(screen, params));
};

export const resetTo = (screen, params) => {
  dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: screen, params }],
    }),
  );
};

export const popTo = (screen, params) => {
  dispatch(CommonActions.navigate({ name: screen, params }));
};

export const popCount = (count = 1) => {
  dispatch(StackActions.pop(count));
};

export const goBack = () => {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
};

export const goBackWithCallback = (callback, delay = 500) => {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
    setTimeout(callback, delay);
  }
};

export const goBackWithParams = (screen, params) => {
  if (!navigationRef.isReady()) return;
  navigationRef.dispatch({
    ...CommonActions.setParams(params),
    source: navigationRef
      .getState()
      ?.routes.find(r => r.name === screen)?.key,
  });
  goBack();
};

export const canGoBack = () => {
  return navigationRef.isReady() ? navigationRef.canGoBack() : false;
};

export const getCurrentRoute = () => {
  return navigationRef.isReady()
    ? navigationRef.getCurrentRoute()?.name
    : undefined;
};