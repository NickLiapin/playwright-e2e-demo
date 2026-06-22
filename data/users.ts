/** Test data for the public Swag Labs demo site (https://www.saucedemo.com). */

export const users = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
} as const;

/** Parameterised negative-login cases for data-driven testing. */
export const invalidLogins = [
  { username: '', password: 'secret_sauce', error: 'Username is required' },
  { username: 'standard_user', password: '', error: 'Password is required' },
  {
    username: 'invalid_user',
    password: 'wrong_pass',
    error: 'Username and password do not match any user in this service',
  },
] as const;
