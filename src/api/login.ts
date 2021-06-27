import { CognitoUser } from "amazon-cognito-identity-js";
import Amplify from "aws-amplify";
import * as Rx from "rxjs";
import * as RD from "../utils/remoteData";
import { getApiResponse } from "../utils/api.utils";

const login = async (
  username: string,
  password: string,
): Promise<CognitoUser | any> => {
  const loginRes = await Amplify.Auth.signIn({
    username,
    password,
  });
  return loginRes;
};

export const login$ = (
  username: string,
  password: string,
): Rx.Observable<RD.RemoteData<CognitoUser | any>> =>
  getApiResponse(login(username, password));
