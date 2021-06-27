export enum RemoteDataType {
  Initial = "initial",
  Pending = "pending",
  Success = "success",
  Failure = "failure",
}

export interface Initial {
  type: RemoteDataType.Initial;
}

export interface Pending {
  type: RemoteDataType.Pending;
}

export interface Success<T> {
  type: RemoteDataType.Success;
  value: T;
}

export interface Failure<E> {
  type: RemoteDataType.Failure;
  value: E;
}

export type RemoteData<T, E = Error> =
  | Initial
  | Pending
  | Success<T>
  | Failure<E>;
