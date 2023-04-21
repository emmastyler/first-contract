const HdWalletProvider = require('truffle-hdwallet-provider')
const dotenv =  require('dotenv')
const Web3 = require('web3')
const {interface, bytecode} = require('./compile')

dotenv.config()
console.log(dotenv);

const provider = new HdWalletProvider(
    process.env.MNEMONIC,
    process.env.INFURA_URI
)

const web3 = new Web3(provider)
console.log(bytecode);
/* web3.eth.getAccounts().then(fetchedAccounts => {
    console.log(fetchedAccounts); 
}); */

const deploy = async () => {
    const accounts = await web3.eth.accounts._provider.addresses;

    console.log('Attempting to deploy from accounts', accounts[0]);

    const result = await new web3.eth.Contract(interface)
                        .deploy({data: '0x' + bytecode, arguments: ['Hello there']})
                        .send({from: accounts[0], gas: '1000000'})

    console.log('Contract deployed to', result.options.address);
}

deploy()