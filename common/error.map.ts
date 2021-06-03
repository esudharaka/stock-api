
export const ErrorMap = new Map<number, string>();

export const ERROR_CODES = {
    INVALID_FILE_TYPE: 10000,
    DUPLICATE_ENTRIES: 10001,
    GENERIC_DB_ERROR: 10002,
    GENERIC_API_ERROR: 1003,

};
ErrorMap.set(ERROR_CODES.INVALID_FILE_TYPE, 'File Validation Error');
ErrorMap.set(ERROR_CODES.DUPLICATE_ENTRIES, 'Error due to duplicate entries');
ErrorMap.set(ERROR_CODES.GENERIC_DB_ERROR, 'Error while saving to the DB');
ErrorMap.set(ERROR_CODES.GENERIC_API_ERROR, 'Internal Server error');