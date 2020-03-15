//PUERTO
process.env.PORT = process.env.PORT || 3000;

//entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//conexion a la db 
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/sample_airbnb';
} else {
   
  //  urlDB = 'mongodb+srv://clases:M0ngusRul3s20@cluster0-wkwwm.mongodb.net/sample_airbnb'
    urlDB = 'mongodb+srv://user:nC5MXl6V4mLxklhf@cluster0-fh2p2.mongodb.net/sample_airbnb';

}

process.env.URLDB = urlDB;

//firma de JWT
process.env.SEED = process.env.SEED || 'firma-super-secreta';

//EXPIRE TIME JWT
process.env.CAD_TOKEN = process.env.CAD_TOKEN || '3h';