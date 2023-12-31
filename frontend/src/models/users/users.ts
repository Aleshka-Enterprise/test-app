export interface IToken {
  token: string;
}

export interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  id: number;
  img?: string | File;
  isSuperuser?: boolean;
  isStaff?: boolean;
}
