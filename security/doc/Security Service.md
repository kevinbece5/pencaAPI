# Security Service
## General Information
### Stages
So far, the API is deployed in 3 different stages: 

1. dev
2. qa
3. staging

The URL for the micro-services varies for each stage.

### URLs
Stage | URL
-----|-------
Dev| https://ar4oxb3qs3.execute-api.us-east-1.amazonaws.com/dev/security
QA| https://390ml247rh.execute-api.us-east-1.amazonaws.com/qa/security
Staging| https://ffttryj2qk.execute-api.us-east-1.amazonaws.com/staging/security

### Authorization
All services require an Authorization Header. The format should be the following:

	{ "token": <Authorization-token> }
	
So, for example, if two headers were to be included (Content-Type and Authorization), the headers in JSON format would be the following:

	{
		"Content-Type": "application/json", 
		"Authorization": { "token": <Authorization-token> }
	}	
	
### Error Messages	
Error messages returned by the API have the following format:

	{
		error: {
			code: number,
			message: string,
			detail: any 	// optional
		}
	}
## Log In

### Description
The log in service authenticates a user in the API. It recieves a username and a password, and returns a token if they are valid. This token allows the user to use the rest of the service, by introducing it in the Authorization header. The token created will be valid for a day.

HTTP Method | POST 
-------|-----------
Authorization Required | No
URL | *securyty-service-url***/login**

### Request Body

	{
		"username": string,
		"password": string
	}
### Response
The service will return a message with status code 401 if the credentials are invalid. Otherwise, it will return a status code 200 with the following body:

	{
		"username": string,
		"token": string,
		"expirationDate": number (timestamp)
	}
	
### Errors
Status Code | Cause
-------|-----------
400 (Bad Request) | Invalid JSON Body
401 (Unauthroized) | Missing username/ password, Invalid username/ password
500 (Server Error) | 

## Token Validation
### Description
The token validation service recieves a token and determines whether it's valid or not.

HTTP Method | POST 
-------|-----------
Authorization Required | No
URL | *securyty-service-url***/validateToken**

### Request Body

	{
		"token": string
	}
### Response
The service returns a status code 401 if the token is invalid, and a status code 200 with an empty body if the token is valid.
### Errors
Status Code | Cause
-------|-----------
400 (Bad Request) | Invalid JSON Body
401 (Unauthroized) | Missing token in body/ invalid token
500 (Server Error) | 

## Log Out
### Description
The Log Out service recieves a token invalidates it, so that it can no longer be used as authorization.

HTTP Method | DELETE 
-------|-----------
Authorization Required | No
URL | *securyty-service-url***/logout**

### Request Body

	{
		"token": string
	}
### Response
The service returns a status code 400 if the request is invalid, and a status code 204 if request is valid (it returns a 204 regardeless of whether the token is valid or not), with an empty body.

### Errors
Status Code | Cause
-------|-----------
400 (Bad Request) | Invalid JSON Body, Missing Token
204 (Content Deleted) | Missing token in body/ invalid token
500 (Server Error) | 

## Create User
### Description
The service can be used to create a user. This credentials can be used later to log in.

HTTP Method | POST
-------|-----------
Authorization Required | Yes
URL | *securyty-service-url***/users**

### Request Body

	{
		"username": string,
		"password": string
	}
### Response
The service returns a status code 400 if the request is invalid, and a status code 201 if the request is valid. The response body contains the Id of the user created:

	{
		"id": number
	}

### Errors
Status Code | Cause
-------|-----------
400 (Bad Request) | Invalid JSON Body, Missing username/ password, non-unique username
401 | Unauthorized
500 (Server Error) |
