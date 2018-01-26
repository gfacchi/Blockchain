const SHA256 = require("crypto-js/sha256");
class Block {
    constructor(index, timestamp, data, previousHash = ""){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.CalculateHash();
        this.nonce = 8;
    }

    CalculateHash() {
        return SHA256(this.id + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor(){
        this.chain = [this.CreateGenesisBlock()];
    }

    CreateGenesisBlock() {
        return new Block(0, "25/01/2018", "Genesis block", "0");
    }

    GetLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    AddBlock(newBlock){
        newBlock.previousHash = this.GetLatestBlock().hash;
        newBlock.hash = newBlock.CalculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.CalculateHash()) {
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
    }
}

let blockChain = new Blockchain();

blockChain.AddBlock(new Block(1, "25/01/2018", {amount: 10}));
blockChain.AddBlock(new Block(2, "25/01/2018", {amount: 40}));

console.log("Is blockchain valid? " + blockChain.isChainValid());

console.log(JSON.stringify(blockChain, null, 4));