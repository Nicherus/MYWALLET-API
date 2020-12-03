import bcrypt from 'bcrypt';
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
		this.password = bcrypt.hashSync(password, 10);
	}
}

export default User;