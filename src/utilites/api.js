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
        data: `{"operationName":null,"query":"mutation register($input:NewUser!) { register(input:$input){id userType firstName lastName namePrefix nameSuffix phone email username roles address status language measuringSystem lastAccessed lastResetPassword isPasswordExpired createdAt caregiver {id businessName shareCode }client{id caregiverRegistrationNumber gender dateOfBirth heathNotes difficulty guide{id caregiver{id businessName shareCode }name inhaleTime holdTime exhaleTime pauseTime isPredefined createdAt }preferredBreathRate audioGuide audioType audioFile disclaimerAccepted lastTested }enabledProcedures{id procedureId name isEnabled createdAt }}}","variables":{"input":{"account":{"userType":"Caregiver","firstName":"${data.first_name}","lastName":"${data.last_name}","namePrefix":"${data.eg1}","nameSuffix":"${data.eg2}","phone":"${data.phone}","email":"${data.email}","username":"${data.username}","password":"${data.password}","address":"${data.address}","language":"en-US","measuringSystem":"Standard"},"client":null,"caregiver":{"businessName":"${data.business}"}}}}`,
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    .then(res => res.data)
}

export async function getClients ( data, token ) {
    return await axios({
        method : 'post',
        url : 'https://api.cloud.bodyhealthanalyzer.com/query',
        data: `{"operationName":null,"query":"query caregiverClients($caregiverId:ID!,$filter:FindFilter) { caregiverClients(caregiverId: $caregiverId,filter: $filter){total nodes {id userType firstName lastName namePrefix nameSuffix phone email username roles address status language measuringSystem lastAccessed lastResetPassword isPasswordExpired createdAt caregiver {id businessName shareCode }client {id caregiverRegistrationNumber gender dateOfBirth heathNotes difficulty guide {id caregiver {id businessName shareCode }name inhaleTime holdTime exhaleTime pauseTime isPredefined createdAt }preferredBreathRate audioGuide audioType audioFile disclaimerAccepted lastTested }enabledProcedures {id procedureId name isEnabled createdAt }}}}","variables":{"caregiverId":${data.id},"filter":{"search":null,"isPredefined":null,"limit":100,"offset":0}}}`,
        headers: {
            'Content-Type' : 'application/json',
            "Authorization" : "Bearer " + token
        }
    })
    .then(res => res.data)
}

export async function createUser ( token, data ) {
    return await axios({
        method : 'post',
        url : 'https://api.cloud.bodyhealthanalyzer.com/query',
        data: `{"operationName":null,"query":"mutation createCaregiverClient($input:NewCaregiverClient!) { createCaregiverClient(input: $input){id userType firstName lastName namePrefix nameSuffix phone email username roles address status language measuringSystem lastAccessed lastResetPassword isPasswordExpired createdAt caregiver {id businessName shareCode }client{id caregiverRegistrationNumber gender dateOfBirth heathNotes difficulty guide{id caregiver {id businessName shareCode }name inhaleTime holdTime exhaleTime pauseTime isPredefined createdAt }preferredBreathRate audioGuide audioType audioFile disclaimerAccepted lastTested }enabledProcedures{id procedureId name isEnabled createdAt }}}","variables":{"input":{"firstName":"${data.first_name}","lastName":"${data.last_name}","namePrefix":"","nameSuffix":"","phone":"${data.phone}","email":"${data.email}","username":"${data.username}","password":"${data.password}","gender":"${data.gender === 'male' ? 'Male' : 'Female'}","address":"${data.address}","language":"en-US","measuringSystem":"Standard","audioGuide":false,"dateOfBirth":"${data.birth}","healthNotes":"${data.notes}","preferredBreathRate":"6","audioType":"AudioMIDI","audioFile":"","difficulty":"Easy"}}}`,
        headers: {
            'Content-Type' : 'application/json',
            "Authorization" : "Bearer " + token
        }
    })
    .then(res => res.data)
}

export async function inviteUser ( token, data ) {
    return await axios({
        method : 'post',
        url : 'https://api.cloud.bodyhealthanalyzer.com/query',
        data: `{"operationName":null,"query":"mutation inviteClient($email:String!) {inviteClient(email: $email)}","variables":{"email":"${data.email}"}}`,
        headers: {
            'Content-Type' : 'application/json',
            "Authorization" : "Bearer " + token
        }
    })
    .then(res => res.data)
}

export async function getUser ( token, data ) {
    return await axios({
        method : 'post',
        url : 'https://api.cloud.bodyhealthanalyzer.com/query',
        data: `{"operationName":null,"query":"query clientData($clientId:ID!,$filter:ClientDataFilter) {clientData(clientId: $clientId,filter: $filter){total nodes {id procedure{id name createdAt }user{id userType firstName lastName namePrefix nameSuffix phone email username roles address status language measuringSystem lastAccessed lastResetPassword isPasswordExpired createdAt caregiver {id businessName shareCode }client{id caregiverRegistrationNumber gender dateOfBirth heathNotes difficulty guide{id caregiver{id businessName shareCode }name inhaleTime holdTime exhaleTime pauseTime isPredefined createdAt }preferredBreathRate audioGuide audioType audioFile disclaimerAccepted lastTested }enabledProcedures {id procedureId name isEnabled createdAt }}procedureComment data rawData1 rawData2 createdAt testedDate }}}","variables":{"clientId":${data.id},"filter":null}}`,
        headers: {
            'Content-Type' : 'application/json',
            "Authorization" : "Bearer " + token
        }
    })
    .then(res => res.data)
}

export async function sendComment ( token, data ) {
    return await axios({
        method : 'post',
        url : 'https://api.cloud.bodyhealthanalyzer.com/query',
        data: `{"operationName":null,"query":"mutation updateProcedureData($input:UpdateData!) {updateProcedureData(input: $input){id procedure {id name createdAt }user{id userType firstName lastName namePrefix nameSuffix phone email username roles address status language measuringSystem lastAccessed lastResetPassword isPasswordExpired createdAt caregiver {id businessName shareCode }client{id caregiverRegistrationNumber gender dateOfBirth heathNotes difficulty guide{id caregiver{id businessName shareCode }name inhaleTime holdTime exhaleTime pauseTime isPredefined createdAt }preferredBreathRate audioGuide audioType audioFile disclaimerAccepted lastTested }enabledProcedures{id procedureId name isEnabled createdAt }}procedureComment data rawData1 rawData2 createdAt testedDate }}","variables":{"input":{"id": ${data.id},"procedureComment":"${data.comment}"}}}`,
        headers: {
            'Content-Type' : 'application/json',
            "Authorization" : "Bearer " + token
        }
    })
    .then(res => res.data)
}

export async function deleteTest ( token, data ) {
    return await axios({
        method : 'post',
        url : 'https://api.cloud.bodyhealthanalyzer.com/query',
        data: `{"operationName":null,"query":"mutation deleteData($id:ID!) { deleteData(id: $id)}","variables":{"id": ${data.id}}}`,
        headers: {
            'Content-Type' : 'application/json',
            "Authorization" : "Bearer " + token
        }
    })
    .then(res => res.data)
}

