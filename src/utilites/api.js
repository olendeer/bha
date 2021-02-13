const axios = require('axios').default

export default function getUser(){
    
}


export async function test () {
    // axios({
    //     method : 'post',
    //     url : 'https://api.cloud.bodyhealthanalyzer.com/query',
    //     data: `{"operationName":null,"query":"mutation register($input:NewUser!) { register(input: $input){id userType firstName lastName namePrefix nameSuffix phone email username roles address status language measuringSystem lastAccessed lastResetPassword isPasswordExpired createdAt caregiver {id businessName shareCode }client{id caregiverRegistrationNumber gender dateOfBirth heathNotes difficulty guide{id caregiver{id businessName shareCode }name inhaleTime holdTime exhaleTime pauseTime isPredefined createdAt }preferredBreathRate audioGuide audioType audioFile disclaimerAccepted lastTested }enabledProcedures{id procedureId name isEnabled createdAt }}}","variables":{"input":{"account":{"userType":"Caregiver","firstName":"Oleg","lastName":"Tkachenko","namePrefix":"Dr.","nameSuffix":"MD","phone":"888-555-0000","email":"olendeer666@gmail.com","username":"olendeer","password":"12345678","address":"123 Main Street","language":"enUS","measuringSystem":"Standard"},"client":null,"caregiver":{"businessName":"WatsonWellness Clinic"}}}}`,
    //     headers: {
    //         'Content-Type' : 'application/json'
    //     }
    // })
    // .then(res => {
    //     console.log(res)
    // })
}

export async function Auth ( login, password ) {
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
    