let env = 'LOCAL';
const props = {
    LOCAL: {
        app: {
            host: "http://localhost",
            port: 9001
        },
        mongodb: {
            username: 'username',
            password: 'password',
            host: "localhost",
            port: 51004,
            dbName: 'urDbName'
        },
        postdb: {
            username: 'username',
            password: 'pwd',
            database: 'ur db',
            host: 'localhost',
            port: 51005,
            dialect: 'postgres',
            pool: {
                min: 1,
                max: 5,
                idle: 10000
            },
        },
        swagger: {
            protocol: 'http',
            host: 'localhost',
            port: 80
        },
        mailTransport: {
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'yourEmailId@xx.xx',
                pass: 'emailPwd',
            }
        },
        url: 'http://localhost:3000',
        hashKey: 'ur hash eky'
    }

};

let setEnv = (newEnv) => {
    if (props[newEnv]) {
        env = newEnv;
    }
    console.log("Setting up properties for ", env, " environment");

};
let getprops = () => {
    return props[env];
}

module.exports = {
    props: getprops,
    setEnv: setEnv
};