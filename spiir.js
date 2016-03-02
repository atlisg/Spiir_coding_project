var serviceRoot = 'https://spiirmobileapi-test.azurewebsites.net/';
var Ids = ["122","124","127","128","129","130","131","132","133","134","135","138","139","140","141","147","151","153","154","155","156","157","158","159","160","161","162","163","164","165","167","168","169","170","171","172","174","175","176","177","181","185","186","187","188","189","192","193","194","195"];
var resource = "Postings/Get";
var query = "?$filter=";

for (i = 0; i < 20; i++) {
    query += "SubcategoryId eq '" + Ids[i] + "'";
    if (i !== 19) {
        query += " or ";
    }
}

query += "&$select=Amount,Description,Date&$orderby=Date";
var reqUri = serviceRoot + resource + query;

var headers = { 
    'Content-Type': 'application/json', 
    Accept: 'application/json', 
    'X-session': '2519453854868365131|21523270457249389040859012672941289997',
    'X-NativeAppVersion': 'browser',
    'X-Platform': 'ios',
    'X-PlatformVersion': '9.1'
};

var request = {
    requestUri: reqUri,
    method: 'GET',
    headers: headers,
    data: null
};

odatajs.oData.request(
    request,
    function (data, response) {
        var res1 = response;

        query = "?$filter=";
        for (i = 20; i < 40; i++) {
            query += "SubcategoryId eq '" + Ids[i] + "'";
            if (i !== 39) {
                query += " or ";
            }
        }
        query += "&$select=Amount,Description,Date&$orderby=Date";
        var reqUri = serviceRoot + resource + query;
        request.requestUri = reqUri;

        odatajs.oData.request(
            request,
            function (data, response) {
                var res2 = response;

                query = "?$filter=";
                for (i = 40; i < Ids.length; i++) {
                    query += "SubcategoryId eq '" + Ids[i] + "'";
                    if (i !== Ids.length - 1) {
                        query += " or ";
                    }
                }
                query += "&$select=Amount,Description,Date&$orderby=Date";
                var reqUri = serviceRoot + resource + query;
                request.requestUri = reqUri;

                odatajs.oData.request(
                    request,
                    function (data, response) {
                        var res3 = response;
                        var res = res1.data.concat(res2.data, res3.data);
                        var dict = {};
                        var s = "";
                        for (i = 1; i < 32; i++) {
                            s = i.toString();
                            if (i < 10) {
                                s = "0" + s;
                            }
                            dict[s] = 0;
                        }
                        
                        // Sum by days
                        for (i = 0; i < res.length; i++) {
                            dict[res[i].date.substring(8,10)] += res[i].amount;
                        }

                        // Sort by values
                        keysSorted = Object.keys(dict).sort(function (a,b) {
                            return dict[a]-dict[b]
                        })

                        console.log("Highest variable spending days of the month:");
                        for (i = 0; i < keysSorted.length; i++) {
                            console.log(keysSorted[i] + ": " + Math.abs(dict[keysSorted[i]].toFixed(2)));
                        }

                        // Sum by 4 day periods
                        daysOf4 = { "1-4":0, "5-8":0, "9-12":0, "13-16":0, "17-20":0, "21-24":0, "25-28":0, "29-31":0 };
                        for (i = 0; i < res.length; i++) {
                            num = parseInt(res[i].date.substring(8,10), 10);
                            if      (num < 5)  daysOf4["1-4"]   += res[i].amount;
                            else if (num < 9)  daysOf4["5-8"]   += res[i].amount;
                            else if (num < 13) daysOf4["9-12"]  += res[i].amount;
                            else if (num < 17) daysOf4["13-16"] += res[i].amount;
                            else if (num < 21) daysOf4["17-20"] += res[i].amount;
                            else if (num < 25) daysOf4["21-24"] += res[i].amount;
                            else if (num < 29) daysOf4["25-28"] += res[i].amount;
                            else               daysOf4["29-31"] += res[i].amount;
                        }
                        keysSorted = Object.keys(daysOf4).sort(function (a,b) {
                            return daysOf4[a]-daysOf4[b]
                        })

                        console.log("Highest variable spending periods in 4 day periods:");
                        for (i = 0; i < keysSorted.length; i++) {
                            console.log(keysSorted[i] + ": " + Math.abs(daysOf4[keysSorted[i]].toFixed(2)));
                        }

                        // Sum by 10 day periods
                        daysOf10 = { "1-10":0, "11-20":0, "21-31":0 };
                        for (i = 0; i < res.length; i++) {
                            num = parseInt(res[i].date.substring(8,10), 10);
                            if      (num < 11) daysOf10["1-10"]  += res[i].amount;
                            else if (num < 21) daysOf10["11-20"] += res[i].amount;
                            else               daysOf10["21-31"] += res[i].amount;
                        }
                        keysSorted = Object.keys(daysOf10).sort(function (a,b) {
                            return daysOf10[a]-daysOf10[b]
                        })

                        console.log("Highest variable spending periods in 10 day periods:");
                        for (i = 0; i < keysSorted.length; i++) {
                            console.log(keysSorted[i] + ": " + Math.abs(daysOf10[keysSorted[i]].toFixed(2)));
                        }

                    },
                    function (err) {
                        alert('Fail: ' + err.Message);
                    }
                );
            },
            function (err) {
                alert('Fail: ' + err.Message);
            }
        );
    },
    function (err) {
        alert('Fail: ' + err.Message);
    }
);