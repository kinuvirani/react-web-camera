import * as RD from "../../../utils/remoteData";
import * as Rx from "rxjs";
import {
  switchMap,
  shareReplay,
  distinctUntilChanged,
  withLatestFrom,
  tap,
  map,
  filter,
} from "rxjs/operators";
import { Login, LoginProps } from "../components/login";
import { login$ } from "../../../api/login";

const DEFAULT_USERNAME = "";
const DEFAULT_PASSWORD = "";
const DEFAULT_CHECKED = false;

type keys =
  | "username"
  | "checked"
  | "password"
  | "onUsernameChange"
  | "onPasswordChange"
  | "onCheckedChange"
  | "onRightClick"
  | "isFetching"
  | "error";

const selector: RD.WithStreamSelector<LoginProps, keys> = (props$) => {
  const changeUsernameSubject$ = new Rx.BehaviorSubject<string>(
    DEFAULT_USERNAME,
  );
  const changePasswordSubject$ = new Rx.BehaviorSubject<string>(
    DEFAULT_PASSWORD,
  );
  const changeCheckedSubject$ = new Rx.BehaviorSubject<boolean>(
    DEFAULT_CHECKED,
  );
  const loginSubject$ = new Rx.Subject<void>();

  const username$ = changeUsernameSubject$.pipe(
    distinctUntilChanged(),
    shareReplay(1),
  );
  const password$ = changePasswordSubject$.pipe(
    distinctUntilChanged(),
    shareReplay(1),
  );
  const checked$ = changeCheckedSubject$.pipe(
    distinctUntilChanged(),
    shareReplay(1),
  );
  const loginRes$ = loginSubject$.pipe(
    withLatestFrom(username$, password$),
    switchMap(([_, username, password]) => login$(username, password)),
    distinctUntilChanged(),
    shareReplay(1),
  );
  const isFetching$ = loginRes$.pipe(
    map((dataRD) => RD.isPending(dataRD)),
    distinctUntilChanged(),
    shareReplay(1),
  );

  const error$ = Rx.merge(
    loginRes$.pipe(
      filter((dataRD) => RD.isFailure(dataRD)),
      map((dataRD) => dataRD as RD.Failure<any>),
      map((dataRD) => {
        const errorMessage = JSON.stringify(dataRD.value);
        if (errorMessage) {
          return { message: errorMessage };
        }
        return null;
      }),
    ),
  ).pipe(distinctUntilChanged(), shareReplay(1));

  const loginEffect$ = loginRes$.pipe(
    withLatestFrom(props$, checked$),
    tap(([dataRD, props, checked]) => {
      if (RD.isSuccess(dataRD)) {
        props.onSuccessSignIn("", "", checked);
      }
    }),
    distinctUntilChanged(),
    shareReplay(1),
  );
  const effects$ = Rx.merge(loginEffect$);

  const onUsernameChange = (value: string): void =>
    changeUsernameSubject$.next(value);
  const onPasswordChange = (value: string): void =>
    changePasswordSubject$.next(value);
  const onCheckedChange = (value: boolean): void =>
    changeCheckedSubject$.next(value);
  const onRightClick = (): void => loginSubject$.next();

  return {
    props: {
      username: username$,
      password: password$,
      checked: checked$,
      isFetching: isFetching$,
      error: error$,
      onUsernameChange: Rx.of(onUsernameChange),
      onPasswordChange: Rx.of(onPasswordChange),
      onCheckedChange: Rx.of(onCheckedChange),
      onRightClick: Rx.of(onRightClick),
    },
    defaultProps: {
      username: DEFAULT_USERNAME,
      password: DEFAULT_PASSWORD,
      checked: DEFAULT_CHECKED,
      isFetching: false,
      error: null,
      onUsernameChange,
      onCheckedChange,
      onPasswordChange,
      onRightClick,
    },
    effects$,
  };
};

export const LoginContainer = RD.withStream<LoginProps, keys>(Login)(
  selector,
  [],
);
