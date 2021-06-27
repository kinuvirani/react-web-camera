import { failure, initial, pending, success } from "./constants";
import {
  Failure,
  Initial,
  Pending,
  RemoteData,
  RemoteDataType,
  Success,
} from "./types";

export const isInitial = <T>(data: RemoteData<T>): data is Initial =>
  data.type === RemoteDataType.Initial;
export const isPending = <T>(data: RemoteData<T>): data is Pending =>
  data.type === RemoteDataType.Pending;
export const isSuccess = <T>(data: RemoteData<T>): data is Success<T> =>
  data.type === RemoteDataType.Success;
export const isFailure = <T, E>(data: RemoteData<T, E>): data is Failure<E> =>
  data.type === RemoteDataType.Failure;

function combineRD2<T1, T2>(
  data1: RemoteData<T1>,
  data2: RemoteData<T2[]>,
): RemoteData<[T1, ...T2[]]> {
  if (isFailure(data1)) {
    return failure(data1.value);
  }
  if (isFailure(data2)) {
    return failure(data2.value);
  }
  if (isInitial(data1) || isInitial(data2)) {
    return initial;
  }
  if (isPending(data1) || isPending(data2)) {
    return pending;
  }
  if (isSuccess(data1) && isSuccess(data2)) {
    return success([data1.value, ...data2.value]);
  }
  return initial;
}
export function combineRemoteData<T>(...data: RemoteData<T>[]): RemoteData<T[]>;
export function combineRemoteData<T1, T2>(
  data1: RemoteData<T1>,
  data2: RemoteData<T2>,
): RemoteData<[T1, T2]>;
export function combineRemoteData<T1, T2, T3>(
  data1: RemoteData<T1>,
  data2: RemoteData<T2>,
  data3: RemoteData<T3>,
): RemoteData<[T1, T2, T3]>;
export function combineRemoteData<T1, T2, T3, T4>(
  data1: RemoteData<T1>,
  data2: RemoteData<T2>,
  data3: RemoteData<T3>,
  data4: RemoteData<T4>,
): RemoteData<[T1, T2, T3, T4]>;
export function combineRemoteData<T1, T2, T3, T4, T5>(
  data1: RemoteData<T1>,
  data2: RemoteData<T2>,
  data3: RemoteData<T3>,
  data4: RemoteData<T4>,
  data5: RemoteData<T5>,
): RemoteData<[T1, T2, T3, T4, T5]>;
export function combineRemoteData<T1, T2, T3, T4, T5, T6>(
  data1: RemoteData<T1>,
  data2: RemoteData<T2>,
  data3: RemoteData<T3>,
  data4: RemoteData<T4>,
  data5: RemoteData<T5>,
  data6: RemoteData<T6>,
): RemoteData<[T1, T2, T3, T4, T5, T6]>;
export function combineRemoteData<T>(
  ...data: RemoteData<T>[]
): RemoteData<T[]> {
  return data.reduceRight(
    (acc: RemoteData<T[]>, curr: RemoteData<T>) =>
      combineRD2(curr, acc) as RemoteData<T[]>,
    success([]),
  );
}

export function foldRemoteData<T, E, R>(
  data: RemoteData<T, E>,
  renderInitial: () => R,
  renderPending: () => R,
  renderSuccess: (data: T) => R,
  renderFailure: (error: E) => R,
): R {
  switch (data.type) {
    case RemoteDataType.Initial: {
      return renderInitial();
    }
    case RemoteDataType.Pending: {
      return renderPending();
    }
    case RemoteDataType.Success: {
      return renderSuccess(data.value);
    }
    case RemoteDataType.Failure: {
      return renderFailure(data.value);
    }
  }
}

export function mapRemoteData<A, B, E>(
  data: RemoteData<A, E>,
  parseToB: (a: A) => B,
): RemoteData<B, E> {
  return foldRemoteData<A, E, RemoteData<B, E>>(
    data,
    () => initial,
    () => pending,
    (value) => success(parseToB(value)),
    (error) => failure(error),
  );
}

export function getOrElseValue<A, E>(data: RemoteData<A, E>, elseValue: A): A {
  return foldRemoteData<A, E, A>(
    data,
    () => elseValue,
    () => elseValue,
    (value) => value,
    () => elseValue,
  );
}
