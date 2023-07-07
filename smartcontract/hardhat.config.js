require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.18",
    networks: {
      sepolia: {
        url: "https://eth-sepolia.g.alchemy.com/v2/kVGEHionz8VI3EAJfTEUhpDgkbtAqrDK",
        accounts: ["0x0c4867cdc8d9bf2064701fb5288f1dc119ad42b4ea74bcfd0b4ec910afa839d3"]
      }
  },
};
