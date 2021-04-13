import XLSX from 'xlsx'
import { date } from './functions'
export function csv(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    console.log(arrData)
    var CSV = 'sep=,' + '\r\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        
        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {
            
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);
        
        //append Label row with line break
        CSV += row + '\r\n';
    }
    
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);
        
        //add a line break after each row
        CSV += row + '\r\n';
        console.log(CSV)
    }

    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    
    //Generate a file name
    var fileName = "";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    
    
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function xls(name, data, mode){

    console.log(data)
    if(mode === 'single'){
        let h = data.body?.data?.Height
        let d, f = 0
        if(h){
            d = Math.trunc(h / 12)
            f = h - (d * 12)
        }

        let clientInfo = [
            ['Client ID:', data.user.username, ''],
            ['Client Name:', data.user.firstName + ', ' + data.user.lastName, ''],
            ['Gender:', data.user.client.gender, ''],
            ['Date Of Birth:', data.user.client.dateOfBirth, ''],
            ['Height (ft-in):', d || 0, f || 0],
            ['Weight (lbs):', data?.compose?.data?.Weight || 0, ''],
            ['BMI:', data?.compose?.data?.BMI || 0, ''],
            ['Contact Phone:', data.user.phone || ''],
            ['Contact Email:', data.user.email, ''],
            ['Contact Address:', data.user.address || '', ''],
            ['Health Notes:', data.user.client.heathNotes || '', ''],
        ]
        let results = [
            ['Test Date:', date(data.testedDate || data.createdAt, 'xd')],
            ['Test Time:', date(data.testedDate || data.createdAt, 'xt')],
            ['BP SYS:', data.pressure?.data?.Sys || 0],
            ['BP DIA:', data.pressure?.data?.Dia || 0],
            ['Blood Glucose:', data?.glucose?.data['Blood glucose'] || 0],
            ['Autonomic Balance:', data.data.AutonomicBalance || 0],
            ['Resting HR:', data?.data.HeartRate || 0],
            ['Stress Index:', data.data.SI || 0],
            ['HRV Index:', data.data.SDNN || 0],
            ['Vagal Index:', data.data.RMSSD || 0],
            ['Adaptation Strain:', data.data.SL || 0],
            ['Adaptation Resource:', data.data.FR || 0],
            ['Adaptation Index:', data.data.HSI || 0],
            ['SpO2:', data.data.SpO2 || 0],
            ['Test Comments:', data.procedureComment || ''],
            ['=====', ''],
            ['Total Heartbeats:', data.data.BeatCount || 0],
            ['Abnormal Heartbeats:', data.data.ArrhythmiaCount || 0],
            ['Arrhythmia Rate:', data.data.Arrhythmias || 0],
            ['Mean Heart Rate:', data.data.HeartRate || 0],
            ['Mean Heartbeat Interval:', data.data.RR || 0],
            ['SDNN:', data.data.SDNN || 0],
            ['RMSSD:', data.data.RMSSD|| 0],
            ['pNN50:', data.data.pNN50 || 0],
            ['Coefficient of Variation:', data.data.CV || 0],
            ['Range:', data.data.MxDMn || 0],
            ['Mode:', data.data.Mo || 0],
            ['Amplitude of Mode:', data.data.Amo || 0],
            ['Tension Index:', data.data.SI || 0],
            ['Total Power:', data.data.TP || 0],
            ['High Frequency:', data.data.HF || 0],
            ['Low Frequency:', data.data.LF || 0],
            ['Very Low Frequency:', data.data.VLF || 0],
            ['Ultra Low Frequency:', data.data.ULF || 0],
            ['% of High Frequency:', data.data.PowerHF || 0],
            ['% of Low Frequency:', data.data.PowerLF || 0],
            ['% of Very Low Frequency:', data.data.PowerVLF || 0],
            ['LF/HF Ratio:', data.data['LF/HF'] || 0],
        ]
        let rrTemp = JSON.parse(JSON.parse(data.rawData1))
        let rr = []
        rrTemp.forEach(item => {
            rr.push([item])
        })

        var wb = XLSX.utils.book_new()
        let ws1 = XLSX.utils.aoa_to_sheet(clientInfo);
        let ws2 = XLSX.utils.aoa_to_sheet(results);
        let ws3 = XLSX.utils.aoa_to_sheet(rr);

        XLSX.utils.book_append_sheet(wb, ws1, 'Client Info');
        XLSX.utils.book_append_sheet(wb, ws2, 'Test Results');
        XLSX.utils.book_append_sheet(wb, ws3, 'RR Data');
        XLSX.writeFile(wb, name + '.xls');
        return
    } else if (mode === 'cardiac' || mode === 'breatwork'){
        let h = data.body?.data?.Height
        let d, f = 0
        if(h){
            d = Math.trunc(h / 12)
            f = h - (d * 12)
        }

        let clientInfo = [
            ['Client ID:', data.user.username, ''],
            ['Client Name:', data.user.firstName + ', ' + data.user.lastName, ''],
            ['Gender:', data.user.client.gender, ''],
            ['Date Of Birth:', data.user.client.dateOfBirth, ''],
            ['Height (ft-in):', d || 0, f || 0],
            ['Weight (lbs):', data?.compose?.data?.Weight || 0, ''],
            ['BMI:', data?.compose?.data?.BMI || 0, ''],
            ['Contact Phone:', data.user.phone || ''],
            ['Contact Email:', data.user.email, ''],
            ['Contact Address:', data.user.address || '', ''],
            ['Health Notes:', data.user.client.heathNotes || '', ''],
        ]
        let results = [
            ['Session Date:', date(data.testedDate || data.createdAt, 'xd')],
            ['Session Time:', date(data.testedDate || data.createdAt, 'xt')],
            ['BP SYS:', data.pressure?.data?.Sys || 0],
            ['BP DIA:', data.pressure?.data?.Dia || 0],
            ['Blood Glucose:', data?.glucose?.data['Blood glucose'] || 0],
            ['Resonance:', data.data.MeanScore || 0],
            ['Congruence:', data?.data.Consistency || 0],
            ['Resting HR:', data.data.HeartRate || 0],
            ['HR Variation:', data.data.HrVariation || 0],
            ['Good Resonance:', data.resonance.good || 0],
            ['Fait Resonance:', data.resonance.fair || 0],
            ['Poor Resonance:', data.resonance.poor || 0],
            ['Highest Resonance:', data.data.HighestScore || 0],
            ['Lowest Resonance:', data.data.LowestScore || 0],
            ['Breath Rate:', data.data.Rate || 0],
            ['Aging Speed:', data.data.AgingSpeed || 0],
            ['Biological Age:', data.data.BioAge || 0],
            ['Calendar Age:', data.data.CalAge || 0],
            ['Session Comments:', data.procedureComment || ''],
        ]
        let rrTemp = JSON.parse(JSON.parse(data.rawData1))
        let rr = []
        rrTemp.forEach(item => {
            rr.push([item])
        })
        let rrTemp2 = JSON.parse(JSON.parse(data.rawData2))
        let rr2 = []
        rrTemp2.forEach(item => {
            rr2.push([item])
        })

        var wb = XLSX.utils.book_new()
        let ws1 = XLSX.utils.aoa_to_sheet(clientInfo);
        let ws2 = XLSX.utils.aoa_to_sheet(results);
        let ws3 = XLSX.utils.aoa_to_sheet(rr);
        let ws4 = XLSX.utils.aoa_to_sheet(rr2);

        XLSX.utils.book_append_sheet(wb, ws1, 'Client Info');
        XLSX.utils.book_append_sheet(wb, ws2, 'Session Results');
        XLSX.utils.book_append_sheet(wb, ws3, 'RR Data');
        XLSX.utils.book_append_sheet(wb, ws4, 'Resonance');
        XLSX.writeFile(wb, name + '.xls');
        return
    } else if (mode === 'prepost'){
        let h = data.pre.body?.data?.Height
        let d, f = 0
        if(h){
            d = Math.trunc(h / 12)
            f = h - (d * 12)
        }

        let clientInfo = [
            ['Client ID:', data.pre.user.username, ''],
            ['Client Name:', data.pre.user.firstName + ', ' + data.pre.user.lastName, ''],
            ['Gender:', data.pre.user.client.gender, ''],
            ['Date Of Birth:', data.pre.user.client.dateOfBirth, ''],
            ['Height (ft-in):', d || 0, f || 0],
            ['Weight (lbs):', data?.pre.compose?.data?.Weight || 0, ''],
            ['BMI:', data?.pre.compose?.data?.BMI || 0, ''],
            ['Contact Phone:', data.pre.user.phone || ''],
            ['Contact Email:', data.pre.user.email, ''],
            ['Contact Address:', data.pre.user.address || '', ''],
            ['Health Notes:', data.pre.user.client.heathNotes || '', ''],
        ]
        let results = [
            ['Test Date:', date(data.pre.testedDate || data.pre.createdAt, 'xd'), date(data.post.testedDate || data.post.createdAt, 'xd')],
            ['Test Time:', date(data.pre.testedDate || data.pre.createdAt, 'xt'), date(data.post.testedDate || data.post.createdAt, 'xt')],
            ['BP SYS:', data.pre.pressure?.data?.Sys || 0, data.post.pressure?.data?.Sys || 0],
            ['BP DIA:', data.pre.pressure?.data?.Dia || 0, data.post.pressure?.data?.Dia || 0],
            ['Blood Glucose:', data?.pre.glucose?.data['Blood glucose'] || 0, data?.post.glucose?.data['Blood glucose'] || 0],
            ['Autonomic Balance:', data.pre.data.AutonomicBalance || 0, data.post.data.AutonomicBalance || 0],
            ['Resting HR:', data?.pre.data.HeartRate || 0, data?.post.data.HeartRate || 0],
            ['Stress Index:', data.pre.data.SI || 0, data.post.data.SI || 0],
            ['HRV Index:', data.pre.data.SDNN || 0, data.post.data.SDNN || 0],
            ['Vagal Index:', data.pre.data.RMSSD || 0, data.post.data.RMSSD || 0],
            ['Adaptation Strain:', data.pre.data.SL || 0, data.post.data.SL || 0],
            ['Adaptation Resource:', data.pre.data.FR || 0, data.post.data.FR || 0],
            ['Adaptation Index:', data.pre.data.HSI || 0, data.post.data.HSI || 0],
            ['SpO2:', data.pre.data.SpO2 || 0, data.post.data.SpO2 || 0],
            ['Test Comments:', data.pre.procedureComment || '', data.post.procedureComment || ''],
            ['=====', ''],
            ['Total Heartbeats:', data.pre.data.BeatCount || 0, data.post.data.BeatCount || 0],
            ['Abnormal Heartbeats:', data.pre.data.ArrhythmiaCount || 0, data.post.data.ArrhythmiaCount || 0],
            ['Arrhythmia Rate:', data.pre.data.Arrhythmias || 0, data.post.data.Arrhythmias || 0],
            ['Mean Heart Rate:', data.pre.data.HeartRate || 0, data.post.data.HeartRate || 0],
            ['Mean Heartbeat Interval:', data.pre.data.RR || 0, data.post.data.RR || 0],
            ['SDNN:', data.pre.data.SDNN || 0, data.post.data.SDNN || 0],
            ['RMSSD:', data.pre.data.RMSSD|| 0, data.post.data.RMSSD|| 0],
            ['pNN50:', data.pre.data.pNN50 || 0, data.post.data.pNN50 || 0],
            ['Coefficient of Variation:', data.pre.data.CV || 0, data.post.data.CV || 0],
            ['Range:', data.pre.data.MxDMn || 0, data.post.data.MxDMn || 0],
            ['Mode:', data.pre.data.Mo || 0, data.pre.data.Mo || 0],
            ['Amplitude of Mode:', data.pre.data.Amo || 0, data.post.data.Amo || 0],
            ['Tension Index:', data.pre.data.SI || 0, data.post.data.SI || 0],
            ['Total Power:', data.pre.data.TP || 0, data.post.data.TP || 0],
            ['High Frequency:', data.pre.data.HF || 0, data.post.data.HF || 0],
            ['Low Frequency:', data.pre.data.LF || 0, data.post.data.LF || 0],
            ['Very Low Frequency:', data.pre.data.VLF || 0, data.post.data.VLF || 0],
            ['Ultra Low Frequency:', data.pre.data.ULF || 0, data.post.data.ULF || 0],
            ['% of High Frequency:', data.pre.data.PowerHF || 0, data.post.data.PowerHF || 0],
            ['% of Low Frequency:', data.pre.data.PowerLF || 0, data.post.data.PowerLF || 0],
            ['% of Very Low Frequency:', data.pre.data.PowerVLF || 0, data.post.data.PowerVLF || 0],
            ['LF/HF Ratio:', data.pre.data['LF/HF'] || 0, data.post.data['LF/HF'] || 0],
        ]
        let rrTemp = JSON.parse(JSON.parse(data.pre.rawData1))
        let rrTemp2 = JSON.parse(JSON.parse(data.post.rawData1))
        let rr = []
        rrTemp.forEach((item, index) => {
            rr.push([item, rrTemp2[index]])
        })

        var wb = XLSX.utils.book_new()
        let ws1 = XLSX.utils.aoa_to_sheet(clientInfo);
        let ws2 = XLSX.utils.aoa_to_sheet(results);
        let ws3 = XLSX.utils.aoa_to_sheet(rr);

        XLSX.utils.book_append_sheet(wb, ws1, 'Client Info');
        XLSX.utils.book_append_sheet(wb, ws2, 'Test Results');
        XLSX.utils.book_append_sheet(wb, ws3, 'RR Data');
        XLSX.writeFile(wb, name + '.xls');
        return
    }











    // var createXLSLFormatObj = [];
    // var xlsHeader = ["Name", "Value"];

    // createXLSLFormatObj.push(xlsHeader)
    // let body = document.createElement('tbody')
    // data.forEach(row => {
    //     var innerRowData = [];
    //     // body.append('<tr><td>' + row.Name + '</td><td>' + row.Value + '</td></tr>');
    //     for (const val in row) {
    //         innerRowData.push(row[val].toString())
    //     }
    //     createXLSLFormatObj.push(innerRowData);
    // })

    // console.log(createXLSLFormatObj)
    // var wb = XLSX.utils.book_new()
    // let ws = XLSX.utils.aoa_to_sheet(createXLSLFormatObj);

    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet');
    // XLSX.writeFile(wb, name + '.xls');
}