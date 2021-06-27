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
import { UserProfile, UserProfileProps } from "../components/user-profile";
import {
  getUserProfile$,
  UserProfile as RawUserProfile,
} from "../../../api/getUserProfile";
import { UserProfileData } from "../components/types";
import { saveUserProfile$ } from "../../../api/saveUserProfile";

const DEFAULT_NAME = "";
const DEFAULT_DATE_OF_BIRTH = "";
const DEFAULT_CARE_FACILITY = "";
const DEFAULT_PRIMARY_CARETAKER = "";
const DEFAULT_TIME_ZONE = 0;
const DEFAULT_IMG_URL = "";
const DEFAULT_IMG_FILE = undefined;

const parse = (rawData: Partial<RawUserProfile>): UserProfileData => ({
  name: rawData.name || "",
  dateOfBirth: rawData.dateOfBirth || "",
  careFacility: rawData.careFacility || "",
  primaryCaretaker: rawData.primaryCaretaker || "",
  timeZone: rawData.timeZone || 0,
  imgUrl: rawData.imgUrl || "",
});

type keys =
  | "name"
  | "dateOfBirth"
  | "careFacility"
  | "primaryCaretaker"
  | "timeZone"
  | "imgUrl"
  | "onNameChange"
  | "onDateOfBirthChange"
  | "onCareFacilityChange"
  | "onPrimaryCaretakerChange"
  | "onTimeZoneChange"
  | "onImgUrlChange"
  | "isFetching"
  | "savingRes"
  | "saveUserProfile";

const selector: RD.WithStreamSelector<UserProfileProps, keys> = (props$) => {
  const changeNameSubject$ = new Rx.BehaviorSubject<string>(DEFAULT_NAME);
  const changeDateOfBirthSubject$ = new Rx.BehaviorSubject<string>(
    DEFAULT_DATE_OF_BIRTH,
  );
  const changeCareFacilitySubject$ = new Rx.BehaviorSubject<string>(
    DEFAULT_CARE_FACILITY,
  );
  const changePrimaryCaretakerSubject$ = new Rx.BehaviorSubject<string>(
    DEFAULT_PRIMARY_CARETAKER,
  );
  const changeTimeZoneSubject$ = new Rx.BehaviorSubject<number>(
    DEFAULT_TIME_ZONE,
  );
  const changeImgUrlSubject$ = new Rx.BehaviorSubject<Blob | undefined>(
    DEFAULT_IMG_FILE,
  );
  const saveSubject$ = new Rx.Subject<void>();

  const userProfile$ = props$.pipe(
    switchMap(() => getUserProfile$()),
    map((dataRD) => RD.mapRemoteData(dataRD, (data) => parse(data))),
    distinctUntilChanged(),
    shareReplay(1),
  );

  const defaultName$ = userProfile$.pipe(
    map((dataRD) => RD.mapRemoteData(dataRD, (data) => data.name)),
    map((dataRD) => RD.getOrElseValue(dataRD, "")),
    distinctUntilChanged(),
    shareReplay(1),
  );
  const defaultDateOfBirth$ = userProfile$.pipe(
    map((dataRD) => RD.mapRemoteData(dataRD, (data) => data.dateOfBirth)),
    map((dataRD) => RD.getOrElseValue(dataRD, "")),
    distinctUntilChanged(),
    shareReplay(1),
  );
  const defaultCareFacility$ = userProfile$.pipe(
    map((dataRD) => RD.mapRemoteData(dataRD, (data) => data.careFacility)),
    map((dataRD) => RD.getOrElseValue(dataRD, "")),
    distinctUntilChanged(),
    shareReplay(1),
  );
  const defaultPrimaryCaretaker$ = userProfile$.pipe(
    map((dataRD) => RD.mapRemoteData(dataRD, (data) => data.primaryCaretaker)),
    map((dataRD) => RD.getOrElseValue(dataRD, "")),
    distinctUntilChanged(),
    shareReplay(1),
  );
  const defaultTimeZone$ = userProfile$.pipe(
    map((dataRD) => RD.mapRemoteData(dataRD, (data) => data.timeZone)),
    map((dataRD) => RD.getOrElseValue(dataRD, 0)),
    distinctUntilChanged(),
    shareReplay(1),
  );
  const defaultImgUrl$ = userProfile$.pipe(
    map((dataRD) => RD.mapRemoteData(dataRD, (data) => data.imgUrl)),
    map((dataRD) => RD.getOrElseValue(dataRD, "")),
    distinctUntilChanged(),
    shareReplay(1),
  );

  const name$ = Rx.merge(changeNameSubject$, defaultName$).pipe(
    distinctUntilChanged(),
    shareReplay(1),
  );
  const dateOfBirth$ = Rx.merge(
    changeDateOfBirthSubject$,
    defaultDateOfBirth$,
  ).pipe(distinctUntilChanged(), shareReplay(1));
  const careFacility$ = Rx.merge(
    changeCareFacilitySubject$,
    defaultCareFacility$,
  ).pipe(distinctUntilChanged(), shareReplay(1));
  const primaryCaretaker$ = Rx.merge(
    changePrimaryCaretakerSubject$,
    defaultPrimaryCaretaker$,
  ).pipe(distinctUntilChanged(), shareReplay(1));
  const timeZone$ = Rx.merge(changeTimeZoneSubject$, defaultTimeZone$).pipe(
    distinctUntilChanged(),
    shareReplay(1),
  );
  const imgFile$ = changeImgUrlSubject$.pipe(
    distinctUntilChanged(),
    shareReplay(1),
  );
  const imgUrl$ = Rx.merge(
    imgFile$.pipe(map((file) => (file ? URL.createObjectURL(file) : ""))),
    defaultImgUrl$,
  ).pipe(distinctUntilChanged(), shareReplay(1));

  const isFetching$ = userProfile$.pipe(
    map((dataRD) => RD.isPending(dataRD)),
    distinctUntilChanged(),
    shareReplay(1),
  );

  const data$ = Rx.combineLatest(
    name$,
    dateOfBirth$,
    careFacility$,
    primaryCaretaker$,
    timeZone$,
  ).pipe(
    map(([name, dateOfBirth, careFacility, primaryCaretaker, timeZone]) => ({
      name,
      dateOfBirth,
      careFacility,
      primaryCaretaker,
      timeZone,
    })),
  );

  const savingRes$ = saveSubject$.pipe(
    withLatestFrom(data$, imgFile$),
    switchMap(([_, data, imgFile]) => saveUserProfile$(data, imgFile)),
    distinctUntilChanged(),
    shareReplay(1),
  );

  const savingEffect$ = savingRes$.pipe(
    withLatestFrom(props$),
    tap(([dataRD, props]) => {
      if (RD.isSuccess(dataRD)) {
        props.goToMain();
      }
    }),
    distinctUntilChanged(),
    shareReplay(1),
  );

  const onNameChange = (value: string): void => changeNameSubject$.next(value);
  const onDateOfBirthChange = (value: string): void =>
    changeDateOfBirthSubject$.next(value);
  const onCareFacilityChange = (value: string): void =>
    changeCareFacilitySubject$.next(value);
  const onPrimaryCaretakerChange = (value: string): void =>
    changePrimaryCaretakerSubject$.next(value);
  const onTimeZoneChange = (value: number): void =>
    changeTimeZoneSubject$.next(value);
  const onImgUrlChange = (value: Blob | undefined): void =>
    changeImgUrlSubject$.next(value);
  const saveUserProfile = (): void => saveSubject$.next();

  return {
    props: {
      name: name$,
      dateOfBirth: dateOfBirth$,
      careFacility: careFacility$,
      primaryCaretaker: primaryCaretaker$,
      timeZone: timeZone$,
      imgUrl: imgUrl$,
      onNameChange: Rx.of(onNameChange),
      onDateOfBirthChange: Rx.of(onNameChange),
      onCareFacilityChange: Rx.of(onNameChange),
      onPrimaryCaretakerChange: Rx.of(onPrimaryCaretakerChange),
      onTimeZoneChange: Rx.of(onTimeZoneChange),
      onImgUrlChange: Rx.of(onImgUrlChange),
      saveUserProfile: Rx.of(saveUserProfile),
      isFetching: isFetching$,
      savingRes: savingRes$,
    },
    defaultProps: {
      name: DEFAULT_NAME,
      dateOfBirth: DEFAULT_DATE_OF_BIRTH,
      careFacility: DEFAULT_CARE_FACILITY,
      primaryCaretaker: DEFAULT_PRIMARY_CARETAKER,
      timeZone: DEFAULT_TIME_ZONE,
      imgUrl: DEFAULT_IMG_URL,
      onNameChange,
      onDateOfBirthChange,
      onCareFacilityChange,
      onPrimaryCaretakerChange,
      onTimeZoneChange,
      onImgUrlChange,
      saveUserProfile,
      isFetching: false,
      savingRes: RD.initial,
    },
    effects$: savingEffect$,
  };
};

export const UserProfileContainer = RD.withStream<UserProfileProps, keys>(
  UserProfile,
)(selector, []);
