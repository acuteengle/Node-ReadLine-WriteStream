
const https = require("https");
const fs = require('fs');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
  
readline.question('Please enter a gitHub username: ', username => {
    readline.close();

    const options = {
        host: 'api.github.com',
        path: '/users/' + username ,
        method: 'GET',
        headers: {'user-agent': 'node.js'}
    };

    const request = https.request(options, function(response){
        let body = '';
        response.on("data", function(chunk){
            body += chunk.toString('utf8');
        });
        
        response.on("end", function(){
            let user = JSON.parse(body)

            const writeStream = fs.createWriteStream('githubUser.txt');
            writeStream.write("username: " + user.login + "\n");
            writeStream.write("user id: " + user.id + "\n");
            writeStream.write("name: " + user.name + "\n");
            writeStream.write("email: " + user.email + "\n");
            writeStream.write("profile picture: " + user.avatar_url + "\n");

            writeStream.on('finish', () => {
                console.log('wrote all data to file');
            });

            writeStream.end();
        });
    });
        
    request.end();
});

