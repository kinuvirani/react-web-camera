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

const saveUserProfile = async (
  data: Omit<UserProfile, "imgUrl">,
  imgFile: Blob | undefined,
): Promise<void> => {
  await Storage.put("user-profile", data, {
    level: "private",
  });
  await Storage.put("user-picture", imgFile, {
    level: "private",
  });
};

export const saveUserProfile$ = (
  data: Omit<UserProfile, "imgUrl">,
  imgFile: Blob | undefined,
): Rx.Observable<RD.RemoteData<void>> =>
  getApiResponse(saveUserProfile(data, imgFile));
