import * as moment from "moment";
import { encriptPassword } from "../security/logIn";
import { addUser, deleteUser } from "./../dbTools/dynamoDb/lib";
import { usersHandler } from "../usersHandler";
import { HTTP } from "../common/constants";

const USERNAME: string = "test";
const PASSWORD: string = "my_password!";
const EMAIL: string = "user@email.com";
const FIRSTNAME: string = "User";
const LASTNAME: string = "Test";
const STATUS: string = "1";

const USER = {
	username: USERNAME,
	password: encriptPassword(PASSWORD),
	firstname: FIRSTNAME,
	lastname: LASTNAME,
	email: EMAIL,
	isActive: STATUS
};

const beforePromise = () => {
	return new Promise((resolve, reject) => {
		Promise.all([addUser(USER)])
			.then(() => {
				resolve();
			})
			.catch(err => {
				console.log({ err });
				reject(err);
			});
	});
};

const afterPromise = () => {
	return new Promise((resolve, reject) => {
		Promise.all([deleteUser(USER)])
			.then(() => {
				resolve();
			})
			.catch(err => {
				console.log({ err });
				reject(err);
			});
	});
};

describe("Validate Get ALL Users", () => {
	beforeAll(() => {
		console.log("Before All Users handler ...");
		return beforePromise().then(() => {
			console.log("Before All Users handler executed");
		});
	});
	afterAll(() => {
		console.log("After All Users handler ...");
		return afterPromise().catch(error => {
			console.error("Failed After All Users handler: ", error);
		});
	});

	test("Valid Get All Users test", done => {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
		const event: { httpMethod: string } = {
			httpMethod: HTTP.GET
		};

		usersHandler(event, {}, (error, response) => {
			expect(response.statusCode).toBe(200);
			const parsedBody = JSON.parse(response.body);
			expect(parsedBody.length).toBeGreaterThan(0);
			expect(parsedBody[0].username).toEqual("test");
			done();
		});
	});
});
