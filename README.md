# Descripción del Challenge

Se desea tener una aplicación (dApp) donde se integre el smart contract ProductFactory y que a través de ella se puedan realizar transacciones con metamask:

La dapp debe permitir:

1 - Ver todos los productos del contrato con el detalle completo de cada uno.
2 - Crear un producto utilizando la integración con metamask.
3 - Delegar un producto utilizando la integración con metamask.
4 - Aceptar una delegación de un producto utilizando la integración con metamask.
5 - Tener un apartado donde se pueda ver, de la wallet conectada, los productos que le fueron delegados para poder aceptarlos desde dicha pantalla.

El smart contract ProductFactory se encuentra en la testnet mumbai de polygon y su address es: 0xd9E0b2C0724F3a01AaECe3C44F8023371f845196
La dapp debe desarrollarse con reactjs y la lib web3

No es necesario realizar todos los puntos, si los realiza es mejor y si tiene que optar por priorizar asuma que a menor valor numérico en el listado mayor prioridad

Se valorará todo el background que considere colocar como tests, readmes, documentación, etc.

# Notas

- Se utilizó una version más vieja de react-scripts para compilar debido a un problema de incompatibilidad con la última version de webpack que pedía polyfills para varios modulos que no son exclusivamente de uso web. Una solución consistía en eyectar la aplicación para modificar webpack, lo cual no está recomendado. La solución elegida (el downgrade) fue la elección mayoritaria de los usuarios del repositorio: https://github.com/facebook/create-react-app/issues/11756.