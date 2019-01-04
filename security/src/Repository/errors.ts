import ErrorMessage from '../common/models/ErrorMessage';

export const ERROR_REPO_NOT_FOUND = (key: string): ErrorMessage => {
  return {
      code: 404,
      message: `A repository was not found for the key: ${key}`,
  }
}
