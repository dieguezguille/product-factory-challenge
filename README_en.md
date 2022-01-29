# Product Factory Challenge

A decentralized application (dApp) is wanted. It should make use of the `ProductFactory` smart contract and transactions with it should be possible using Metamask wallet integration.

The dApp must allow the user:

1. To see all the products from the contract including its details.
2. To create a new product using Metamask.
3. To delegate a product using Metamask.
4. To accept a product delegation using Metamask.
5. To have a section where all the products delegated to the connected wallet are visible and the user is able to accept them.

The `ProductFactory` smart contract is deployed on Polygon's Mumbai Testnet and its address is:

  - `0xd9E0b2C0724F3a01AaECe3C44F8023371f845196` (Official Challenge Contract)

The dApp must be developed with `ReactJS` and make use of the `web3.js` library.

It is not mandatory to solve every task but it's better if you do. If you have to prioritize assume a lower order number is of a higher priority.

Will value every piece of documentation and/or tests included in the final solution.

## Instructions (Ver [aquí](https://github.com/dieguezguille/product-factory/blob/main/README.md) la versión en español)

1. Clone the repository
2. Install dependencies using `yarn`
3. Create .env file following the example of the .env.example file
4. Put `0x13881` as the value of `chain_id` and the address of the contract in `contract_address`
5. Make sure you have the following Metamask RPC node configured for Polygon Mumbai Testnet: `https://matic-mumbai.chainstacklabs.com`
6. Run the project using `yarn start`

## Notes

- It is possible to see the latest version of the solution deployed on Heroku at the following link. To avoid spam and exposure of the official challenge contract, the same (verified) challenge code was deployed using Remix IDE at another address: `0x34251Bd869e4A8ef4C2661E7b3bC68dba2E7aC48` (Custom Challenge Contract). That contract  does NOT correspond to the challenge but its code is identical to the original.

  - [Product Factory dApp](https://product-factory.herokuapp.com/)

- The Chainstack Labs RPC node was chosen for the connection with Polygon Mumbai Testnet because the Matic Vigil public node has a rate limit of 40 calls per second. Make sure you have it configured in Metamask's Networks section before running the project. Please see the following link for other RPC node options:

  - [RPC nodes](https://docs.superfluid.finance/superfluid/protocol-developers/networks/polygon-network-matic)

- An older version of `react-scripts` was used to compile the solution due to an incompatibility between the latest version of webpack that required polyfills for various modules that are not exclusively meant for web use. One solution was to eject the application in order to modify webpack, which is not recommended. The chosen solution (downgrading) was the best choice for most of the project users.

  - [Issue 11756](https://github.com/facebook/create-react-app/issues/11756)

- The library used to facilitate project configurations (`foundry`) set the default line ending of files to `LF` instead of `CRLF`. When compiling on Windows this produced an error and the build stopped. A general fix was done by configuring the `eslintrc.json` file but if you experience any problems locally you should try running the following commands:

  1. `git config core.autocrlf false`
  2. `git rm --cached -r .`
  3. `git reset --hard`