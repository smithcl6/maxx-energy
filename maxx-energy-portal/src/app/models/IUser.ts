/**
 * Defines properties of a User.
 * password is only defined during logging in.
 * Otherwise, it should remain undefined.
 */
export interface IUser {
  email: string,
  name: string
  password?: string,
}
