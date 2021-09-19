import { getToken } from '../utility/auth'

export const apiMixin = {
    data: function() {
        return {
            url: '//site202118.tw.cs.unibo.it/api/',
            customersUrl: 'customers',
            rentsUrl: 'rentals',
            staffUrl: 'staff',
            invoicesUrl: 'invoices',
            productsUrl: 'products'
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
        getStaff: async function(){
            try {
                let res = await fetch(this.url + this.staffUrl, {
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
        getRentals: async function(query){
            if(typeof query != 'undefined'){
                query = '?' + new URLSearchParams(query).toString()
            }
            else{
                query = ''
            }
            console.log(query)
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
        getInvoices: async function() {
            try {
                let res = await fetch(this.url + this.invoicesUrl, {
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
        }

    }
}