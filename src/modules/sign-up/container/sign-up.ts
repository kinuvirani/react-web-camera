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
import { SignUp, SignUpProps } from "../components/sign-up";
import { signUp$ } from "../../../api/signUp";
import { login$ } from "../../../api/login";

const DEFAULT_USERNAME = "";
const DEFAULT_PASSWORD = "";
const DEFAULT_CONFIRM_PASSWORD = "";
const DEFAULT_CHECKED = false;

type keys =
  | "username"
  | "checked"
  | "password"
  | "confirmPassword"
  | "onUsernameChange"
  | "onPasswordChange"
  | "onConfirmPasswordChange"
  | "onCheckedChange"
  | "onRightClick"
  | "isFetching"
  | "error";

const selector: RD.WithStreamSelector<SignUpProps, keys> = (props$) => {
  const changeUsernameSubject$ = new Rx.BehaviorSubject<string>(
    DEFAULT_USERNAME,
  );
  const changePasswordSubject$ = new Rx.BehaviorSubject<string>(
    DEFAULT_PASSWORD,
  );
  const changeConfirmPasswordSubject$ = new Rx.BehaviorSubject<string>(
    DEFAULT_CONFIRM_PASSWORD,
  );
  const changeCheckedSubject$ = new Rx.BehaviorSubject<boolean>(
    DEFAULT_CHECKED,
  );
  const signUpSubject$ = new Rx.Subject<void>();

  const username$ = changeUsernameSubject$.pipe(
    distinctUntilChanged(),
    shareReplay(1),
  );
  const password$ = changePasswordSubject$.pipe(
    distinctUntilChanged(),
    shareReplay(1),
  );
  const confirmPassword$ = changeConfirmPasswordSubject$.pipe(
    distinctUntilChanged(),
    shareReplay(1),
  );
  const checked$ = changeCheckedSubject$.pipe(
    distinctUntilChanged(),
    shareReplay(1),
  );
  const signUpRes$ = signUpSubject$.pipe(
    withLatestFrom(username$, password$, confirmPassword$),
    switchMap(([_, username, password, confirmPassword]) => {
      if (password === confirmPassword) {
        return signUp$(username, password);
      }
      return Rx.empty();
    }),
    withLatestFrom(username$, password$),
    switchMap(([dataRD, username, password]) => {
      if (RD.isSuccess(dataRD)) {
        return login$(username, password);
      }
      return Rx.of(dataRD);
    }),
    distinctUntilChanged(),
    shareReplay(1),
  );
  const isFetching$ = signUpRes$.pipe(
    map((dataRD) => RD.isPending(dataRD)),
    distinctUntilChanged(),
    shareReplay(1),
  );

  const error$ = Rx.merge(
    signUpSubject$.pipe(
      withLatestFrom(password$, confirmPassword$),
      map(([_, password, confirmPassword]) => {
        if (password !== confirmPassword) {
          return { message: "Password and confirm password are not equal" };
        }
        return null;
      }),
    ),
    signUpRes$.pipe(
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

  const signUpEffect$ = signUpRes$.pipe(
    withLatestFrom(props$, checked$),
    tap(([dataRD, props, checked]) => {
      if (RD.isSuccess(dataRD)) {
        props.onSuccessSignIn("", "", checked);
      }
    }),
    distinctUntilChanged(),
    shareReplay(1),
  );
  const effects$ = Rx.merge(signUpEffect$);

  const onUsernameChange = (value: string): void =>
    changeUsernameSubject$.next(value);
  const onPasswordChange = (value: string): void =>
    changePasswordSubject$.next(value);
  const onConfirmPasswordChange = (value: string): void =>
    changeConfirmPasswordSubject$.next(value);
  const onCheckedChange = (value: boolean): void =>
    changeCheckedSubject$.next(value);
  const onRightClick = (): void => signUpSubject$.next();

  return {
    props: {
      username: username$,
      password: password$,
      confirmPassword: confirmPassword$,
      checked: checked$,
      isFetching: isFetching$,
      error: error$,
      onUsernameChange: Rx.of(onUsernameChange),
      onPasswordChange: Rx.of(onPasswordChange),
      onConfirmPasswordChange: Rx.of(onConfirmPasswordChange),
      onCheckedChange: Rx.of(onCheckedChange),
      onRightClick: Rx.of(onRightClick),
    },
    defaultProps: {
      username: DEFAULT_USERNAME,
      password: DEFAULT_PASSWORD,
      confirmPassword: DEFAULT_CONFIRM_PASSWORD,
      checked: DEFAULT_CHECKED,
      isFetching: false,
      error: null,
      onUsernameChange,
      onCheckedChange,
      onPasswordChange,
      onConfirmPasswordChange,
      onRightClick,
    },
    effects$,
  };
};

export const SignUpContainer = RD.withStream<SignUpProps, keys>(SignUp)(
  selector,
  [],
);
