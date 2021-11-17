const server_url = "http://localhost:3000"

const httpGetAsync = (url, callback) => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            callback(xmlHttp.responseText);
        };
    };

    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
};

httpGetAsync(server_url, (res) => {
    const unique_ips = JSON.parse(res).n_unique;
    
    let img = "";

    if (unique_ips < 25){

        img = "gron.png";

    } else if (unique_ips >= 25 && unique_ips <60){
        
        img = "gul.png";

    } else {

        img = "rod.png";
        
    };

    document.getElementById("hacke").src = img;
});
