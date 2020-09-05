export function processMessage(payload: string) {
	try {
		return JSON.parse(payload)
	} catch (error) {
		return null
	}
}
