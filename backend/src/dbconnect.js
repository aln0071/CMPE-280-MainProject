const mongoose = require('mongoose');

const connectionString = `mongodb+srv://280.jdc6rdi.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority`;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    sslKey: `${__dirname}/dbconfig/cert.pem`,
    sslCert: `${__dirname}/dbconfig/cert.pem`,
    keepAlive: true,
    keepAliveInitialDelay: 300000,
}

let connection = null;

const getConnection = async () => {
    if(connection === null) {
        try {
            connection = await connect();
        } catch(error) {
            console.log(error);
        }
    }
    return connection;
}

async function connect() {
    console.log('connecting to db...')
    return new Promise((resolve, reject) => {
        mongoose.connect(connectionString, options, (err, res) => {
            if (err) {
                console.log('MongoDB Connection Failed');
                reject(err);
            } else {
                console.log('MongoDB Connected');
                resolve(res);
            }
        })
    })
}

module.exports = {
    getConnection
}
