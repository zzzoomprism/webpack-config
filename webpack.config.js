const path = require( 'path' );


//обязательно экспортируем обьект. используется Node javascript

module.exports = {

    //точка входа
    entry: './src/index.js',

    //куда складывать результат работы weback
    output: {
        filename: 'bundle.js',

        //можно указывать и в строковом формате. Но корректнее и правильнее использовать path с Node.js
        path: path.resolve( __dirname, 'dist' ),
    }
}