
import joi from 'joi';

export const validateUser = (
    	email: string, 
    	username: string, 
    	password: string,
    	passwordConfirmation: string,
) : joi.ValidationResult => {

	const schema = joi.object({
		email: joi.string().email().required(),
		username: joi.string().alphanum().min(6).max(30).regex(/^[a-zA-Z0-9.]*$/).required(),
		password: joi.string().min(6).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,30}$/).required(),
		passwordConfirmation: joi.ref('password'),
	});
	
	const user = {
		email,
		username,
		password,
		passwordConfirmation,
	};
	
	return schema.validate(user);
};
