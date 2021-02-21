const ws = new WebSocket('ws://0.0.0.0:8001');

ws.onmessage = response => {
    let data = JSON.parse(response.data);
    // console.log(JSON.parse(response.name));
    // console.log(positionData.top);
    // console.log(positionData.left);
    // unit.style.top = positionData.top;
    // unit.style.left = positionData.left;
    let p = document.createElement('p');
    p.innerText = data.name;
    document.body.append(p);
}


document.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
        if( document.getElementById('register-block').style.display !== "none") {
            if( document.getElementById('username').value) {
                let request = {
                    status: 1,
                    name: document.getElementById('username').value,
                    message: 'hello'
                };
                ws.send(JSON.stringify(request));
                document.getElementById('register-block').style.display = 'none';
            }
        }
    }
});

addEventListener("click", function() {
    let request = {
        status: 1,
        name: document.getElementById('username').value,
        message: 'hello'
    };
    ws.send(JSON.stringify(request))
});