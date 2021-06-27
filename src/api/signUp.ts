import Amplify from "aws-amplify";
import * as Rx from "rxjs";
import * as RD from "../utils/remoteData";
import { getApiResponse } from "../utils/api.utils";

const signUp = async (email: string, password: string): Promise<any> => {
  const res = await Amplify.Auth.signUp({
    username: email,
    password,
    attributes: {
      email,
    },
  });
  return res;
};

export const signUp$ = (
  email: string,
  password: string,
): Rx.Observable<RD.RemoteData<any>> => getApiResponse(signUp(email, password));
