export const CONSTANTS: any = {
  SALT_OR_ROUNDS: 12,
};

export const MIN_YEAR = '1970';
export const MIN_CHARACTER = 8;
export const CID_MAX_LENGTH = 4;
export const INVOICE_CODE_MAX_LENGTH = 2;
export const DEFAULT_INVOICE_NUMBER_CODE = 18;
export const DEFAULT_LIMIT_PAGINATE = 25;

export const TABLE_EMPTY_STATUS = 0;
export const FOMAT_DATE_TIME = 'YYYY-MM-DD HH:mm:ss.SSSSSS';

export const LOGS_FOLDER = 'files/logs';

export const regexPhoneNumber = /(?:[-+() ]*\d){10,13}/gm;

export const NEW_PASSWORD = 'hapo';
export const FORGOT_PASSWORD_TEMPLATES = './forgot-password';

export const extractEmails = (text: string) =>
  text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);

