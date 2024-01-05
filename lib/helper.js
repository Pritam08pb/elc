const BASE_URL = 'http://localhost:3000';

export async function newUser(formData) {
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(formData),
    };

    const response = await fetch(`${BASE_URL}/api/signUp`, options);
    const json = await response.json();
    console.log(json);
    return json;
}
export async function newAdmin(formData) {
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(formData),
    };

    const response = await fetch(`${BASE_URL}/api/adminSignUp`, options);
    const json = await response.json();
    console.log(json);
    return json;
}

export async function sendOtp(formData) {
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(formData),
    };

    const response = await fetch(`${BASE_URL}/api/sendOtp`, options);
    const json = await response.json();
    // console.log(json);
    return json;
}

export async function verifyOtp(formData) {
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(formData),
    };

    const response = await fetch(`${BASE_URL}/api/verifyOtp`, options);
    const json = await response.json();
    // console.log(json);
    return json;
}