const express = require('express');
const app = express();
const port = 3000;
const db = require('./db');
const cron = require('node-cron');

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

cron.schedule("* 10 * * * * *", () => {
    const {exec} = require('child_process');
    
    exec("arp -a | wc -l", async (err, stdout, _) => {
        if (err) {
            console.log(err);
        } else {
            const unique_ips = Number(stdout.replace("\n", ""));
            try {
                const result = await db.pool.query("INSERT INTO unique_ips (n_unique) VALUES (?)", unique_ips);
                console.log(result);
            } catch (err){
                console.log(err);
            };
        };
    });
});

app.get("/", async (req, res) => {

    try {
        const result = await db.pool.query("SELECT * FROM unique_ips ORDER BY id DESC LIMIT 1");
        console.log(result);
        res.send(JSON.stringify(result[0]));
    } catch (err){
        console.log(err);
    };
});

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
});
