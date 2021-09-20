const NFT = artifacts.require('MyNFT');

const { expect } = require('./testSetup');

contract('NFT Test', async (accounts) => {
    const [deployerAccount, recipient] = accounts;
    const tokenId = 1;

    async function setupNFT(deployerAccount, instance) {
        const nftInstance = await instance;
        await nftInstance.awardItem(deployerAccount, process.env.NFT_TOKEN_URI);
        return nftInstance;
    }

    beforeEach(async () => {
        this.myNFT = await NFT.new();
        await web3.eth.getBalance(deployerAccount).then(console.log);
    });

    //eventually property is needed to allow for promises to resolve
    it('should have deployer account owning first nft', async () => {
        const nftInstance = await setupNFT(deployerAccount, this.myNFT);
        const nftOwner = await nftInstance.ownerOf(tokenId);
        expect(nftOwner).to.equal(deployerAccount);
    });

    it('is possible to send nft between accounts', async () => {
        const nftInstance = await setupNFT(deployerAccount, this.myNFT);
        await expect(nftInstance.transferFrom(deployerAccount, recipient, tokenId)).to.eventually.be.fulfilled;
        const newNFTOwner = await nftInstance.ownerOf(1);
        expect(newNFTOwner).to.equal(recipient);
    });

    it("is not possible to send tokens that aren't owned by sender", async () => {
        const nftInstance = await setupNFT(deployerAccount, this.myNFT);
        await expect(nftInstance.transferFrom(deployerAccount, recipient, tokenId, { from: recipient })).to.eventually
            .be.rejected;
    });
});
