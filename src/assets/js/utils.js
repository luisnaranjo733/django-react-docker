import * as Cookies from "js-cookie";

let default_success = data => console.log(data);
let default_failure = ex => console.log('exception:', ex);

export function postRequest(url, data, success=default_success, failure=default_failure) {
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
    }).then(success)
    .catch(failure);
}