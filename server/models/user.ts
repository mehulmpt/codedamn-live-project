import mongoose from 'mongoose'

const UserModel = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true }
	},
	{ collection: 'users' }
)

const model = mongoose.model('UserModel', UserModel)

export default model
