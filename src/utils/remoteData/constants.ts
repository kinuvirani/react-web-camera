import { Initial, Pending, Success, Failure, RemoteDataType } from "./types";

export const initial: Initial = {
  type: RemoteDataType.Initial,
};

export const pending: Pending = {
  type: RemoteDataType.Pending,
};

export const success = <T>(value: T): Success<T> => ({
  type: RemoteDataType.Success,
  value,
});

export const failure = <E>(value: E): Failure<E> => ({
  type: RemoteDataType.Failure,
  value,
});
