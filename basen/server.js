const express = require('express');
const app = express();
const port = 3000;
const db = require('./db');

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get("/", (req, res) => {

    const {exec} = require('child_process');

    exec("arp -a | wc -l", async (err, stdout, _) => {
        if (err) {
            console.log(err);
        } else {
            const unique_ips = Number(stdout.replace("\n", ""));
            res.send(JSON.stringify({
                    unique_ips: unique_ips,
            }));

            try {
                const result = await db.pool.query("INSERT INTO unique_ips (n_unique) VALUES (?)", unique_ips);
            } catch (err){
                console.log(err);
            };
        };
    });
});

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
});
