import mongoose from 'mongoose'

const MessageModel = new mongoose.Schema(
	{
		email: { type: String, required: true },
		message: { type: String, required: true },
		date: { type: Number, required: true }
	},
	{ collection: 'messages' }
)

const model = mongoose.model('MessageModel', MessageModel)

export default model
