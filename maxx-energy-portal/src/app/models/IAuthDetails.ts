import { IUser } from "./IUser";

/**
 * Used to define what is sent back to the frontend when logging in.
 * user stores details about the user.
 * timer stores the milliseconds remaining before they will be logged out.
 */
export interface IAuthDetails {
  user: IUser,
  timer: number
}
