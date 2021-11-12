const express = require('express');
const app = express();
const port = 3000;

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