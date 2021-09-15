
const jwt = require('jsonwebtoken')
const ACCESS_TOKEN_KEY = 'access_token'
const PUBLICKEY_KEY = 'publicKey'
const BASE_URL = '//site202118.tw.cs.unibo.it/api/auth'
const MANAGER_LOGIN = BASE_URL + '/login/staff'
const PUBLICKEY_URL = BASE_URL + '/publicKey'
//const MANAGER_AUTH = MANAGER_LOGIN + '/authenticated'

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


export async function refreshPublicKey() {
    let res = await fetch(PUBLICKEY_URL, {
        method: 'GET',
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
    })
    let status = res.status
    res = await res.json()
    if (status === 200) {
        localStorage[PUBLICKEY_KEY] = res.publicKey
    }
}

async function getPublicKey() {
    if (!localStorage[PUBLICKEY_KEY] || localStorage[PUBLICKEY_KEY] === 'undefined'){
        await refreshPublicKey()
    }
    return localStorage[PUBLICKEY_KEY]
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
    /*
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
        */
    try{
        console.log(jwt.verify(getToken(), await getPublicKey(), { algorithm: 'RS256' }))
        return true
    }
    catch(err){
        return false
    }
}