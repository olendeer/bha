export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).trim().toLowerCase());
}

export function date(data, flag){
    if (data === null){
		return null
	}
	let tempDateY;
	let tempDateM;
	let tempDateD;
	let tempDate
    if (flag === 'b'){
		tempDate = new Date(data)
        return new Date().getFullYear() - tempDate.getFullYear()
		// return tempDate.getDate() + '' + (tempDate.getMonth() !== null && month[tempDate.getMonth()]?.name ? month[tempDate.getMonth()].name : '')+ ' ' + tempDate.getFullYear()
    }
}