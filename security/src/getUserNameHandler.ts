import { buildResponse, buildErrorResponse } from './common/lib';
import { getSessionData } from './dbTools/dynamoDb/lib';
import { validateBody, validateToken } from './security/validateToken';

export function getUserNameHandler(event: any, context: any, callback: (err: any, res: any) => any, ) {
        try {

                let token: string;
                if (event.token !== undefined) { // When invoked internally, token must come as parameter
                        token = event.token;
                } else if (event.requestContext !== undefined) { // When invoked through API Gateway
                        token = validateBody(event.body);
                }

                if (!token) {
                        const response = buildErrorResponse("No token defined");
                        callback(null, response);
                } else {

                        validateToken(token)
                                .then((sessionData) => {
                                        context.callbackWaitsForEmptyEventLoop = false;
                                        const response = buildResponse(200, { 'username': sessionData.username });
                                        callback(null, response);
                                })
                                .catch((error) => {
                                        context.callbackWaitsForEmptyEventLoop = false;
                                        const response = buildErrorResponse(error);
                                        callback(null, response);
                                });
                }
        }
        catch (error) {
                console.log({ error });
                context.callbackWaitsForEmptyEventLoop = false;
                const response = buildErrorResponse(error);
                callback(null, response);
        }
}
