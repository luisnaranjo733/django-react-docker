import * as Cookies from "js-cookie";

const DEBUG = true;

let default_success = data => console.log(data);
let default_failure = ex => console.log('exception:', ex);

export function postRequest(url, data, success = default_success, failure = default_failure) {
    let csrf_token = Cookies.get('csrftoken');
    fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "X-CSRFToken": csrf_token,
        },
        body: data
    }).then(function (response) {
        return response.json();
    }).then(success)
        .catch(failure);
}

function getServerUrl() {
    return DEBUG ? 'http://localhost' : 'http://ec2-54-218-9-42.us-west-2.compute.amazonaws.com';
}

function getFormatParams() {
    return '?format=json';
}

export function getListingsEndpoint() {
    return getServerUrl() + '/api/opportunities/' + getFormatParams();
}

export function getSurveyEndpoint(opportunity_preference_ids) {
    let url = getServerUrl() + '/api/surveys/' + getFormatParams();
    opportunity_preference_ids.forEach(id => {
        url += `&opportunity_id=${id}`;
    });
    return url;
}

export function getSubmissionEndpoint() {
    return getServerUrl() + '/api/submit/' + getFormatParams();
}

if (DEBUG) {
    console.log(`Listing endpoint: ${getListingsEndpoint()}`);
    console.log(`Survey endpoint: ${getSurveyEndpoint([1, '2'])}`);
    console.log(`Submission endpoint: ${getSubmissionEndpoint()}`);
}