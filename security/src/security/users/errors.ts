import ErrorMessage from '../../common/models/ErrorMessage';
import {USER_NOT_FOUND } from './constants';

export const ERROR_USER_NOT_FOUND = (id: string):ErrorMessage  => {
    return {
        code: 404,
        message: `${USER_NOT_FOUND} for ${id}`,
    }
}