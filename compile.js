const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol')
const source = fs.readFileSync(inboxPath, 'utf8')

const input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol': {
            content: source,
        }
    },
    settings: {
        outputSelection:{
            '*' : {
                '*': ['*']
            }
        }
    }
}
//console.log(JSON.parse(solc.compile(JSON.stringify(input))).contracts['Inbox.sol'].Inbox.evm.bytecode.object);
const bytecode = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Inbox.sol'].Inbox.evm.bytecode.object
const interface = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Inbox.sol'].Inbox.abi

module.exports ={
    interface,
    bytecode
}