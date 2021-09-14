const ACCESS_TOKEN_KEY = 'access_token'
const BASE_URL = '//site202118.tw.cs.unibo.it/api/login'
const MANAGER_LOGIN = BASE_URL + '/staff'
const MANAGER_AUTH = MANAGER_LOGIN + '/authenticated'

export async function login(username, password){
            let res = await fetch(MANAGER_LOGIN, {
                method: 'POST',
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ username: username, password: password })
            })
            let status = res.status
            res = await res.json()
            if(status === 200){
                setToken(res.accessToken)
            }
            return status
        }

function setToken(token){
    localStorage[ACCESS_TOKEN_KEY] = token
}

function getToken(){
    return localStorage[ACCESS_TOKEN_KEY]
}
/*
function clearToken()  {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
}*/

export async function isLogged(){
    let res = await fetch(MANAGER_AUTH, {
        method: 'GET',
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + getToken()
        }
    })
    console.log(res.status)
    if(res.status === 401)
        return false
    else
        return true
}