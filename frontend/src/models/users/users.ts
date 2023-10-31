export interface IToken {
    token: string;
  };
  
  export interface IUser {
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    id: number;
    image?: string | File;
  };
  