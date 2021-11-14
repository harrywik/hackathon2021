const server_url = "https://d333-129-16-39-44.ngrok.io"

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
    
    let description = "";
    let color = "white";

    if (unique_ips < 25){

        description = "lite folk";
        color = "green";

    } else if (unique_ips >= 25 && unique_ips <60){
        
        description = "mellan mycket folk";
        color = "yellow";

    } else {
        
        description = "mycket folk";
        color = "red";
    };

    document.getElementById("description").innerHTML = description;
    document.getElementById("color").style.backgroundColor = color;
});
