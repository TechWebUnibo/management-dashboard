import { getToken } from '../utility/auth'

export const apiMixin = {
    data: function() {
        return {
            url: '//site202118.tw.cs.unibo.it/api/',
            customersUrl: 'customers',
            rentsUrl: 'rentals',
            invoicesUrl: 'invoices'
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
        getRentals: async function(){
            try{
                let res = await fetch(this.url + this.rentsUrl, {
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