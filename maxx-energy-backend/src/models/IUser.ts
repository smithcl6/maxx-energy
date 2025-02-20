/**
 * Defines properties of a user.
 * password should not be sent back to client at any time.
 */
export interface IUser {
  email: string;
  name: string;
  password?: string;
}
