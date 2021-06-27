import * as Rx from "rxjs";
import { distinctUntilChanged, shareReplay, startWith } from "rxjs/operators";
import * as RD from "./remoteData";

export const getApiResponse = <T extends unknown>(
  data: Promise<T>,
): Rx.Observable<RD.RemoteData<T>> =>
  Rx.from(
    data.then((success) => RD.success(success)).catch((err) => RD.failure(err)),
  ).pipe(
    distinctUntilChanged((curr, prev) => curr.type !== prev.type),
    startWith(RD.pending),
    shareReplay(1),
  );
