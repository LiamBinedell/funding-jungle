export async function login(emailAddr, password){
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: emailAddr,
            pass: password
        })
    };

    const data = await fetch('/api/login/', postOptions);
    const response = await data.text();

    return response;
}