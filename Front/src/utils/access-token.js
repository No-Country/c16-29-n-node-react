export const getAccessToken = () =>{
    const local = localStorage.getItem("persist:auth")
    const parse = JSON.parse(local)
    return parse.accessToken;
}