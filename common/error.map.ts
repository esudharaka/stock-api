
export const ErrorMap = new Map<number, string>();

export const ERROR_CODES = {
    INVALID_FILE_TYPE: 10000,
    DUPLICATE_ENTRIES: 10001,
    GENERIC_DB_ERROR: 10002,
    GENERIC_API_ERROR: 1003,
    FOREIGN_KEY_CONSTRAINTS : 10004,
    REQUIRED_DATA_MISSING : 10004,

};
ErrorMap.set(ERROR_CODES.INVALID_FILE_TYPE, 'File Validation Error');
ErrorMap.set(ERROR_CODES.DUPLICATE_ENTRIES, 'Error due to duplicate entries');
ErrorMap.set(ERROR_CODES.GENERIC_DB_ERROR, 'Error while saving to the DB');
ErrorMap.set(ERROR_CODES.GENERIC_API_ERROR, 'Internal Server error');
ErrorMap.set(ERROR_CODES.FOREIGN_KEY_CONSTRAINTS, 'Violate the data integrity. Foreign key violations');
ErrorMap.set(ERROR_CODES.REQUIRED_DATA_MISSING, 'Required Data missing in CSV');