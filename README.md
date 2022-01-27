# Descripción del Challenge

Se desea tener una aplicación (dApp) donde se integre el smart contract ProductFactory y que a través de ella se puedan realizar transacciones con metamask:

La dapp debe permitir:

1. Ver todos los productos del contrato con el detalle completo de cada uno.
2. Crear un producto utilizando la integración con metamask.
3. Delegar un producto utilizando la integración con metamask.
4. Aceptar una delegación de un producto utilizando la integración con metamask.
5. Tener un apartado donde se pueda ver, de la wallet conectada, los productos que le fueron delegados para poder aceptarlos desde dicha pantalla.

El smart contract **ProductFactory** se encuentra en la testnet mumbai de polygon y su address es:

**0xd9E0b2C0724F3a01AaECe3C44F8023371f845196**

La dapp debe desarrollarse con **ReactJS** y la librería **web3.js**

No es necesario realizar todos los puntos, si los realiza es mejor y si tiene que optar por priorizar asuma que a menor valor numérico en el listado mayor prioridad

Se valorará todo el background que considere colocar como tests, readmes, documentación, etc.

## Instrucciones

1. Clonar el repositorio
2. Instalar dependencias usando 'yarn'
3. Crear archivo .env siguiendo el ejemplo del archivo .env.example
4. Colocar '0x13881' como valor de chain_id y el address del contrato en contract_address
5. Correr el proyecto usando 'yarn start'

## Notas

- Se utilizó una version más vieja de react-scripts para compilar debido a un problema de incompatibilidad con la última version de webpack que pedía polyfills para varios modulos que no son exclusivamente de uso web. Una solución consistía en eyectar la aplicación para modificar webpack, lo cual no está recomendado. La solución elegida (el downgrade) fue la elección mayoritaria de los usuarios del repositorio: https://github.com/facebook/create-react-app/issues/11756.

- La librería 'foundry' utilizada para facilitar las configuraciones del proyecto configuró por defecto que el final de línea de los archivos sea LF en lugar de CRLF. Al compilar en Windows esto daba error y la compilación se detenía. Para solucionarlo ejecuté los siguientes comandos:

  1. git config core.autocrlf false
  2. git rm --cached -r .
  3. git reset --hard