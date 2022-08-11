export interface ICredentials {
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
}

export interface IUser {
  uid: string;
  email: string | null;
  firstName?: string;
  lastName?: string;
  displayName: string | null;
  photoURL: string | null;
  emailVerified?: boolean;
}

export enum ActionMode {
  PASSWORD_RESET = 'resetPassword',
  VERIFY_EMAIL = 'verifyEmail'
}
