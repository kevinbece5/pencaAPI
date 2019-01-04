import { buildErrorResponse, buildResponse} from './common/lib';
import { IRepository } from './Repository/Repository';

export const getUsers = (userRepository: IRepository) => {
    const params = {
        fields: 'username, firstname, lastname, email',
      };

    return new Promise((resolve, reject) => {
        try {
            userRepository.getItems(params.fields)
            .then((result:any) => {
                const response = buildResponse(200, result);
                resolve(response);
            })
            .catch((error) => {
              const response = buildErrorResponse(error);
              reject(response);
            });
        } catch (error) {
            const response = buildErrorResponse(error);
            reject(response);
        }
    });
}
