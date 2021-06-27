import { Storage } from "aws-amplify";
import * as Rx from "rxjs";
import * as RD from "../utils/remoteData";
import { getApiResponse } from "../utils/api.utils";

export interface UserProfile {
  name: string;
  dateOfBirth: string;
  careFacility: string;
  primaryCaretaker: string;
  timeZone: number;
  imgUrl: string;
}

const getUserProfile = async (): Promise<Partial<UserProfile>> => {
  const data = await Storage.get("user-profile", { level: "private" })
    .then((data) => fetch(data.toString()))
    .then((data) => data.json());
  const imgUrl = await Storage.get("user-picture", {
    level: "private",
    contentType: "image/*",
  })
    .then((data) => fetch(data.toString()))
    .then((data) => data.url);
  return {
    ...data,
    imgUrl,
  };
};

export const getUserProfile$ = (): Rx.Observable<
  RD.RemoteData<Partial<UserProfile>>
> => getApiResponse(getUserProfile());
