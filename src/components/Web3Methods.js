import * as web3 from '@solana/web3.js';
export default class Web3Methods{
    constructor(){
        this.connection = new web3.Connection('https://fragrant-dark-pond.solana-mainnet.quiknode.pro/120452b76e26264d0e2c3f5a2fdbc5e54e046d4c/');
    }
    

    static myInstance = null;
    static CAFlan = 'Fn5TpxS4H3jwV5jwD9HYoEDvxnNxDyEknwKaq2Mn3fbf';
    static getInstance() {
        if(this.myInstance == null){
            this.myInstance = new Web3Methods();
        }

        return this.myInstance;
    }

    async getTokenAccountsByOwner(publicKey){
        const url = "https://fragrant-dark-pond.solana-mainnet.quiknode.pro/120452b76e26264d0e2c3f5a2fdbc5e54e046d4c/";
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'jsonrpc': '2.0',
                'id': 1,
                'method': 'getTokenAccountsByOwner',
                'params' : [publicKey,{
                    'mint': 'Fn5TpxS4H3jwV5jwD9HYoEDvxnNxDyEknwKaq2Mn3fbf'
                },{
                    'encoding': 'jsonParsed'
                }]
            })
        }
        
        
        let result = 0;
        await fetch(url, options)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if(data.result.value.length > 0){
                    result = data.result.value[0].account.data.parsed.info.tokenAmount.uiAmount;
                }
        })
        return result;
    };

    getTokenAccountBalance(publicKey){
        this.connection.getTokenAccountBalance(new web3.PublicKey(publicKey))
        .then((response) => {
            console.log(response);
          });
    }

    getTokenSupply(publicKey){
        this.connection.getTokenSupply(new web3.PublicKey(publicKey))
        .then((response) => {
            console.log(response);
          });
    }

    async getBalance(publicKey) {
        console.log(await this.connection.getBalance(new web3.PublicKey(publicKey)))
    }
} 