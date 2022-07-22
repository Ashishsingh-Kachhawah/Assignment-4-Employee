function test(){
    console.log("executing text")
    fetch('https://production.utilizecore.com/oauth/token', { mode: 'no-cors', method: 'POST', headers: {"Content-Type":"application/json",'Accept': "application/json" } ,body: JSON.stringify({ grant_type: "password", scope: "admin",client_id: "Io2GP8CjMJHejQLr4dKh6ZTxld-SzIRtWX6U2uncZQ0",client_secret: "MRcet1zk5iv2mtMn2l969u-Fdv5k3sDTxFjIGRAJfio",username: "mailto:shreyash+1@utilizecore.com",password: "Admin#123" })})    
    .then(response => response.json()).then(data => console.log(data))
    console.log("executed test")
    
}
test()

console.log("completed")