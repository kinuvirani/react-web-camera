import * as React from "react";
import * as Rx from "rxjs";
import { map } from "rxjs/operators";
import { failure, pending, success } from "./constants";
import { foldRemoteData } from "./methods";
import { RemoteData } from "./types";

interface Props<T> {
  children: (data: T) => React.ReactElement;
  data: RemoteData<T>;
  renderPending?: () => React.ReactElement;
  renderFailure?: (error: Error) => React.ReactElement;
  predicateNoData?: (data: T) => boolean;
  renderNoData?: (data: T) => React.ReactElement;
}

const defaultRenderPending = () => <div>Loading...</div>;

export const LoaderWrapper = <T extends unknown>(
  props: Props<T>,
): React.ReactElement => {
  const {
    data,
    renderPending = defaultRenderPending,
    renderFailure = defaultRenderPending,
    predicateNoData,
    renderNoData,
    children,
  } = props;

  return foldRemoteData<T, Error, React.ReactElement>(
    data,
    renderPending,
    renderPending,
    (data) =>
      predicateNoData && renderNoData && predicateNoData(data)
        ? renderNoData(data)
        : children(data),
    renderFailure,
  );
};

type WithPromise<T> = (
  renderPending: () => React.ReactElement,
  renderSuccess: (data: T) => React.ReactElement,
  renderFailure: (err: Error) => React.ReactElement,
) => React.ReactElement;

export const withPromise = <T extends unknown>(
  getData: () => Promise<T>,
  updateElements: (number | string | boolean)[],
): WithPromise<T> => (renderPending, renderSuccess, renderFailure) => {
  const [dataRD, setDataRD] = React.useState<RemoteData<T>>(pending);

  React.useEffect(() => {
    const data = getData();
    data
      .then((successData) => setDataRD(success(successData)))
      .catch((err) => setDataRD(failure(err)));
  }, [...updateElements]);

  return (
    <LoaderWrapper
      data={dataRD}
      renderPending={renderPending}
      renderFailure={renderFailure}
    >
      {(data) => renderSuccess(data)}
    </LoaderWrapper>
  );
};

export type WithPromiseSelector<P extends object, K extends keyof P> = (
  props: Omit<P, K>,
) => { [key in K]: Promise<P[key]> };
export type DefaultProps<P extends object, K extends keyof P> = Pick<P, K>;
type ObservableWrapper<T> = { [P in keyof T]: Rx.Observable<T[P]> };
export type WithStreamSelector<P extends object, K extends keyof P> = (
  props$: Rx.Observable<Omit<P, K>>,
) => {
  props: ObservableWrapper<Pick<P, K>>;
  defaultProps: Pick<P, K>;
  effects$?: Rx.Observable<any>;
};

export const toKeyValue = <T extends unknown, K extends string>(
  obs: Rx.Observable<T>,
  key: K,
): Rx.Observable<{ [key in K]: T }> => {
  return obs.pipe(map((value) => ({ [key]: value }))) as Rx.Observable<
    { [key in K]: T }
  >;
};

export const withStream = <P extends object, K extends keyof P>(
  component: React.FC<P>,
) => (
  selector: WithStreamSelector<P, K>,
  updateElements: (keyof Omit<P, K>)[],
): React.FC<Omit<P, K>> => {
  const UpdatedComponent: React.FC<Omit<P, K>> = (props) => {
    const props$ = Rx.of(props);
    const { defaultProps, props: data$, effects$ } = selector(props$);
    const [data, setData] = React.useState<DefaultProps<P, K>>(defaultProps);

    React.useEffect(() => {
      const keys = Object.keys(data$);
      const subscribes = keys.map((key) => {
        // @ts-ignore
        const value$ = data$[key];
        return value$.subscribe((value: any) =>
          setData((prevData) => ({ ...prevData, [key]: value })),
        );
      });
      const effectsSubscription = effects$?.subscribe();
      return () => {
        subscribes.forEach((subscribe) => subscribe.unsubscribe());
        if (effectsSubscription) {
          effectsSubscription.unsubscribe();
        }
      };
    }, [...updateElements.map((el) => props[el])]);

    const rawAllProps = { ...props, ...data };
    const allProps = Object.keys(rawAllProps).reduce((prev, curr) => {
      return {
        ...prev,
        // @ts-ignore
        [curr]: rawAllProps[curr],
      };
    }, {});

    return React.createElement(component, allProps as any);
  };
  return UpdatedComponent;
};
