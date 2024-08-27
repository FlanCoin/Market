export default class ApiMethods{
    constructor(){
        this.url = "https://bckflancoin.netlify.app/.netlify/functions/server/";
    }

    static myInstance = null;
    static getInstance() {
        if(this.myInstance == null){
            this.myInstance = new ApiMethods();
        }

        return this.myInstance;
    }

    async getNFTList(){
        let result = {};
        await fetch(this.url+'getNFTList')
            .then(response => response.json())
            .then(data => { 
                result = data;
            })
            .catch(error => console.error(error));
        return result;
    }

    async getNFTById(id){
        let result = {};
        await fetch(this.url+'getNFTById/'+id)
            .then(response => response.json())
            .then(data => { 
                result = data;
            })
            .catch(error => console.error(error));
        return result;
    }

    async updateAvailability(id){
        let result = {};
        await fetch(this.url+'updateAvailability/'+id, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(data => { 
                result = data;
            })
            .catch(error => console.error(error));
        return result;
    }


    async registerBuy(username, wallet, nftid){
        let result = {};
        await fetch(this.url+'registerBuy', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                username: username,
                wallet: wallet,
                nftid: nftid
            })
        })
            .then(response => response.json())
            .then(data => { 
                result = data;
            })
            .catch(error => console.error(error));
        return result;
    }
}