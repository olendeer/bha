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
    } else if (flag === 'td'){
		tempDate = new Date(data)
		let d = 'AM'
		let hours;
		if(tempDate.getHours() > 12){
			d = 'PM'
			hours = tempDate.getHours() - 12
		} else {
			hours = tempDate.getHours()
		}
		return (tempDate.getMonth() + 1) + '/' + tempDate.getDate() + '/' + tempDate.getFullYear() + '&nbsp;&nbsp;&nbsp;' + hours + ':' + tempDate.getMinutes() + ' ' + d
	}
}