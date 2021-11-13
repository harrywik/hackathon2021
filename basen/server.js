const express = require('express');
const app = express();
const port = 3000;
const db = require('./db');
const cron = require('node-cron');

app.use((_, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

cron.schedule("*/5 * * * *", () => {
    const { exec } = require('child_process');
    
    const date = new Date();
    
    exec("arp -a | wc -l", async (err, stdout, _) => {
        if (err) {
            console.log(err);
        } else {
            const unique_ips = Number(stdout.replace("\n", ""));
            try {
                const result = await db.pool.query("INSERT INTO unique_ips (n_unique, date) VALUES (?, ?)", [unique_ips, date]);
                console.log(result);
            } catch (err) {
                console.log(err);
            };
        };
    });
});

app.get("/all", async (_, res) => {
    try {
        const result = await db.pool.query("SELECT * FROM unique_ips ORDER BY id DESC LIMIT 9000;");
        console.log(result);
        res.send(JSON.stringify(result));
    } catch (err) {
        console.log(err);
    };

});

app.get("/", async (req, res) => {

    try {
        const result = await db.pool.query("SELECT * FROM unique_ips ORDER BY id DESC LIMIT 1");
        console.log(result);
        res.send(JSON.stringify(result[0]));
    } catch (err) {
        console.log(err);
    };
});

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
});
