const express = require('express');
const app = express();
const port = 3000;

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get("/", (req, res) => {

    const {exec} = require('child_process');

    exec("arp -a | wc -l", (err, stdout, _) => {
        if (err) {
            console.log(err);
        } else {
            res.send(JSON.stringify({
                    unique_ips: stdout.replace("\n", ""),
            }));
        };
    });
});

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
});