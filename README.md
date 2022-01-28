# Product Factory Challenge

Se desea tener una aplicación (dApp) donde se integre el smart contract `ProductFactory` y que a través de ella se puedan realizar transacciones con Metamask:

La dApp debe permitir:

1. Ver todos los productos del contrato con el detalle completo de cada uno.
2. Crear un producto utilizando la integración con Metamask.
3. Delegar un producto utilizando la integración con Metamask.
4. Aceptar una delegación de un producto utilizando la integración con Metamask.
5. Tener un apartado donde se pueda ver, de la wallet conectada, los productos que le fueron delegados para poder aceptarlos desde dicha pantalla.

El smart contract `ProductFactory` se encuentra en la Testnet Mumbai de Polygon y su address es:

  - `0xd9E0b2C0724F3a01AaECe3C44F8023371f845196`

La dApp debe desarrollarse con `ReactJS` y la librería `web3.js`

No es necesario realizar todos los puntos, si los realiza es mejor y si tiene que optar por priorizar asuma que a menor valor numérico en el listado mayor prioridad

Se valorará todo el background que considere colocar como tests, readmes, documentación, etc.

## Instrucciones

1. Clonar el repositorio
2. Instalar dependencias usando `yarn`
3. Crear archivo .env siguiendo el ejemplo del archivo .env.example
4. Colocar `0x13881` como valor de `chain_id` y el address del contrato en `contract_address`
5. Asegurarse de tener configurado el siguiente nodo RPC en Metamask para Polygon Mumbai Testnet: `https://matic-mumbai.chainstacklabs.com`
6. Correr el proyecto usando `yarn start`

## Notas

- Es posible ver la última versión del proyecto deployado en Heroku en el siguiente link

  - [Product Factory dApp](https://product-factory.herokuapp.com/)

- Se eligió el nodo RPC de Chainstack Labs para la conexión con Polygon Mumbai Testnet debido a que el nodo público de Matic Vigil posee un rate limit de 40 llamadas por segundo. Asegurarse de tenerlo configurado en el apartado Networks de Metamask antes de correr el proyecto. Para otras opciones de nodos RPC ver el siguiente link:

  - [Nodos RPC](https://docs.superfluid.finance/superfluid/protocol-developers/networks/polygon-network-matic)

- Se utilizó una version más vieja de `react-scripts` para compilar debido a un problema de incompatibilidad con la última version de webpack que pedía polyfills para varios modulos que no son exclusivamente de uso web. Una solución consistía en eyectar la aplicación para modificar webpack, lo cual no está recomendado. La solución elegida (el downgrade) fue la elección mayoritaria de los usuarios del repositorio.

  - [Issue 11756](https://github.com/facebook/create-react-app/issues/11756)

- La librería `foundry` utilizada para facilitar las configuraciones del proyecto configuró por defecto que el final de línea de los archivos sea `LF` en lugar de `CRLF`. Al compilar en Windows esto daba error y la compilación se detenía. Si bien se intentó una solución general configurando el archivo `eslintrc.json`, en caso de tener problemas localmente deberá probar ejecutando la siguiente secuencia de comandos:

  1. `git config core.autocrlf false`
  2. `git rm --cached -r .`
  3. `git reset --hard`