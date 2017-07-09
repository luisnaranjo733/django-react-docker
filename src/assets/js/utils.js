import * as Cookies from "js-cookie";

export function postRequest(url, data) {
    let csrf_token = Cookies.get('csrftoken');
    fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "X-CSRFToken": csrf_token,
        },
        body: data
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data); 
    }).catch(function(ex) {
        console.log("parsing failed", ex);
    });
}