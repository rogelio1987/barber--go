export const randomNumber = (min, max) => {
	//inc, exclusive
	return Math.floor(Math.random() * (max - min)) + min
}
