const axios = require('axios').default

export async function auth ( login, password ) {
    return await axios({
        method : 'post',
        url : 'https://api.cloud.bodyhealthanalyzer.com/query',
        data: `{"operationName":null,"query":"mutation login($input:Login!) { login(input:$input){id user{id userType firstName lastName namePrefix nameSuffix phone email username roles address status language measuringSystem lastAccessed lastResetPassword isPasswordExpired createdAt caregiver {id businessName shareCode }client{id caregiverRegistrationNumber gender dateOfBirth heathNotes difficulty guide{id caregiver{id businessName shareCode }name inhaleTime holdTime exhaleTime pauseTime isPredefined createdAt }preferredBreathRate audioGuide audioType audioFile disclaimerAccepted lastTested }enabledProcedures{id procedureId name isEnabled createdAt }}expiredAt }}","variables":{"input":{"username":"${login}","email":null,"password":"${password}"}}}`,
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    .then(res => res.data)
}

export async function logout ( token ) {
    return await axios({
        method : 'post',
        url : 'https://api.cloud.bodyhealthanalyzer.com/query',
        data: `{"operationName":null,"query":"mutation logout{logout}","variables":{}}`,
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' :  `Bearer ${token}`
        }
    })
    .then(res => res.data)
}

export async function reset ( email ) {
    return await axios({
        method : 'post',
        url : 'https://api.cloud.bodyhealthanalyzer.com/query',
        data: `{"operationName":null,"query":"mutation requestResetPassword($input:RequestResetPassword!) { requestResetPassword(input:$input)}","variables":{"input":{"email":"${email}","username":null}}}`,
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    .then(res => res.data)
}

export async function register ( data ) {
    return await axios({
        method : 'post',
        url : 'https://api.cloud.bodyhealthanalyzer.com/query',
        data: `{"operationName":null,"query":"mutation register($input:NewUser!) { register(input:$input){id userType firstName lastName namePrefix nameSuffix phone email username roles address status language measuringSystem lastAccessed lastResetPassword isPasswordExpired createdAt caregiver {id businessName shareCode }client{id caregiverRegistrationNumber gender dateOfBirth heathNotes difficulty guide{id caregiver{id businessName shareCode }name inhaleTime holdTime exhaleTime pauseTime isPredefined createdAt }preferredBreathRate audioGuide audioType audioFile disclaimerAccepted lastTested }enabledProcedures{id procedureId name isEnabled createdAt }}}","variables":{"input":{"account":{"userType":"Caregiver","firstName":"${data.first_name}","lastName":"${data.last_name}","namePrefix":"${data.eg1}","nameSuffix":"${data.eg2}","phone":"${data.phone}","email":"${data.email}","username":"${data.username}","password":"${data.password}","address":"${data.address}","language":"enUS","measuringSystem":"Standard"},"client":null,"caregiver":{"businessName":"${data.business}"}}}}`,
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    .then(res => res.data)
}