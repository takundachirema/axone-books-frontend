
export function setEnvironment() {
    console.log("Set UI Env");
    if (process.env.NODE_ENV !== 'production') {
        setDevEnv();
    }
    else {
        setProdEnv();
    }
}

function setDevEnv() {
    //process.env.VUE_APP_BIGCHAINDB = 'http://localhost:9984/api/v1/';
    console.log("Setting UI Development Environment "+process.env.VUE_APP_BIGCHAINDB);
}

function  setProdEnv() {
    process.env.BIGCHAINDB = 'http://localhost:9984/api/v1/';
    console.log("Setting UI Production Environment");
}