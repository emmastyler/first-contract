const assert = require('assert');
const ganache = require('ganache-cli')
const Web3 = require('web3')
const {interface, bytecode} = require('../compile')

const web3 = new Web3(ganache.provider())

let accounts
let inbox
const initial_string = 'Hello world'
beforeEach(async ()=> {
    // Get a list of all accounts
   accounts =  await web3.eth.getAccounts()
    //Use one of those account to deploy the contracts

    inbox = await new web3.eth.Contract(interface)
    .deploy({data: bytecode, arguments:['Hello world']})
    .send({from: accounts[0], gas:'1000000'})
})

describe('Inbox', ()=>{
    it('deploys a contract', ()=>{
       assert.ok(inbox.options.address)
    })

    it('has a default message', async()=>{
        const message = await inbox.methods.message().call()
        assert.equal(message, initial_string)
    })

    it('can change the message', async()=>{
      await inbox.methods.setMessage('New World').send({from: accounts[0]})
      const message = await inbox.methods.message().call()
      assert.equal(message, 'New World')
    })
})









//---learn test with mocha---//
/* class Car {
    park(){
        return 'stopped'
    }

    driver() {
        return 'vroom'
    }
}
let car
beforeEach(()=>{
    car = new Car()
})
describe('Car', ()=>{
    it('can park', ()=>{
        assert.equal(car.park(), 'stopped')
    })

    it('can drive', ()=>{
        assert.equal(car.driver(), 'vroom')
    })
}) */