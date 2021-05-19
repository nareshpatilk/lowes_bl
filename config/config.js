let env = 'DEV';
const props = {
    DEV: {
        app: {
            host: "http://localhost",
            port: 9001
        },
        mongodb: {
            username: 'm220student',
            password: 'm220password',
            host: "mflix.1nptt.mongodb.net",
            dbName: 'sample_mflix'
        },
        swagger: {
            protocol: 'http',
            host: 'localhost',
            port: 80
        },
        baseURL: 'http://localhost:3000/v1'
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