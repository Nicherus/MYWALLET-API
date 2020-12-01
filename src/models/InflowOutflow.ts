
class User {
	value: number;
	description: string;
	date: Date;

	constructor(
		value: number,
		description: string,
		date: Date,
	){
		this.value = value;
		this.description = description;
		this.date = date;
	}
}

export default User;