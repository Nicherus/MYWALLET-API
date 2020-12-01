
class User {
	email: string;
	password?: string;
	username: string;
	token?: string;

	constructor(
		email: string, 
		username: string, 
		password: string,
	){
		this.email = email;
		this.username = username;
		this.password = password;
	}
}

export default User;