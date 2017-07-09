export function postRequest(url, data) {
    fetch(url, {
        method: "POST",
        credentials: "same-origin",
        body: data
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data); 
    }).catch(function(ex) {
        console.log("parsing failed", ex);
    });
}