const invalidMessage = (value: string) => `Invalid ${value} format`;

export const EMAIL_MESSAGE = invalidMessage('email');

export const REQUIRE_MESSAGE = 'This field is required';

export const INCORRECT_SYMBOL_MESSAGE = 'Invalid characters used';

export const WHITE_SPACE = 'This field cannot contain whitespaces';

export const PASSWORD_SHORT_MESSAGE = (length: number) =>
  `Password must be at least ${length} characters`;
export const PASSWORD_LONG_MESSAGE = (length: number) =>
  `Password must not exceed ${length} characters`;
