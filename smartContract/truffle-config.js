module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Ganache'ın network ID'si
    },
  },
  compilers: {
    solc: {
      version: "0.8.0", // Solidity sürümü
    },
  },
};
