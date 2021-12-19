import { getToken } from '../utility/auth'

export const apiMixin = {
    data: function() {
        return {
            url: '//site202118.tw.cs.unibo.it/api/',
            customersUrl: 'customers',
            rentsUrl: 'rentals',
            staffUrl: 'staff',
            invoicesUrl: 'invoices',
            productsUrl: 'products',
            itemsUrl: 'items'
        }
    },
    methods:{
        getCustomers: async function (){
            let res = await fetch(this.url + this.customersUrl, {
                method: 'GET',
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
            })
            if(res.status == 200){
                res = await res.json()
                return res
            }
            else{
                return []
            }
        },
        getStaff: async function(id){
            let url = this.url + this.staffUrl
            if(id) {
                url = url + '/' + id
            }
            try {
                let res = await fetch(url, {
                    method: 'GET',
                    mode: 'cors', // no-cors, *cors, same-origin
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Authorization': 'Bearer ' + getToken()
                    },
                })
                if (res.status == 200) {
                    res = await res.json()
                    return res
                }
                else {
                    return []
                }
            }
            catch (e) {
                console.log(e)
            }
        },
        getProducts: async function(){
            try{
                let res = await fetch(this.url + this.productsUrl, {
                    method: 'GET',
                    mode: 'cors', // no-cors, *cors, same-origin
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Authorization': 'Bearer ' + getToken()
                    },
                })
                if(res.status == 200){
                    res = await res.json()
                    return res
                }
                else{
                    return []
                }
            }
            catch(e){
                console.log(e)
            }
        },
        getProduct: async function(id){
            try{
                let res = await fetch(this.url + this.productsUrl + '/' + id, {
                    method: 'GET',
                    mode: 'cors', // no-cors, *cors, same-origin
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Authorization': 'Bearer ' + getToken()
                    },
                })
                if(res.status == 200){
                    res = await res.json()
                    return res
                }
                else{
                    return []
                }
            }
            catch(e){
                console.log(e)
            }
        },
        getRentals: async function(query){
            if(typeof query != 'undefined'){
                query = '?' + new URLSearchParams(query).toString()
            }
            else{
                query = ''
            }
            try{
                let res = await fetch(this.url + this.rentsUrl + query, {
                    method: 'GET',
                    mode: 'cors', // no-cors, *cors, same-origin
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Authorization': 'Bearer ' + getToken()
                    },
                })
                if(res.status == 200){
                    res = await res.json()
                    return res
                }
                else{
                    return []
                }
            }
            catch(e){
                console.log(e)
            }
        },
        getInvoices: async function(query) {
            if (typeof query != 'undefined') {
                query = '?' + new URLSearchParams(query).toString()
            }
            else {
                query = ''
            }
            try {
                let res = await fetch(this.url + this.invoicesUrl + query, {
                    method: 'GET',
                    mode: 'cors', // no-cors, *cors, same-origin
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Authorization': 'Bearer ' + getToken()
                    },
                })
                if (res.status == 200) {
                    res = await res.json()
                    return res
                }
                else {
                    return []
                }
            }
            catch (e) {
                console.log(e)
            }
        },
        getItems: async function(query) {
            if (typeof query != 'undefined') {
                query = '?' + new URLSearchParams(query).toString()
            }
            else {
                query = ''
            }
            try {
                let res = await fetch(this.url + this.itemsUrl + query, {
                    method: 'GET',
                    mode: 'cors', // no-cors, *cors, same-origin
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Authorization': 'Bearer ' + getToken()
                    },
                })
                if (res.status == 200) {
                    res = await res.json()
                    return res
                }
                else {
                    return []
                }
            }
            catch (e) {
                console.log(e)
            }
        },

        createStaff: async function (data) {
            try {
                let res = await fetch(this.url + this.staffUrl, {
                    method: 'POST',
                    mode: 'cors', // no-cors, *cors, same-origin
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Authorization': 'Bearer ' + getToken()
                    },
                    body: JSON.stringify(data)
                })
                return { status: res.status, body: await res.json()}
            }
            catch (e) {
                console.log(e)
                return {status: 500, body: {} }
            }
        },
        async deleteStaff (id) {
            try {
                let res = await fetch(this.url + this.staffUrl + '/' + id, {
                    method: 'DELETE',
                    mode: 'cors', // no-cors, *cors, same-origin
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Authorization': 'Bearer ' + getToken()
                    }
                })
                return { status: res.status, body: await res.json() }
            }
            catch (e) {
                console.log(e)
                return { status: 500, body: {} }
            }
        },
        modifyStaff: async function (id, data) {
            try {
                let res = await fetch(this.url + this.staffUrl + '/' + id, {
                    method: 'POST',
                    mode: 'cors', // no-cors, *cors, same-origin
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Authorization': 'Bearer ' + getToken()
                    },
                    body: JSON.stringify(data)
                })
                return { status: res.status, body: await res.json() }
            }
            catch (e) {
                console.log(e)
                return { status: 500, body: {} }
            }
        }
    }
}