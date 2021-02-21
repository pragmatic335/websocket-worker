const ws = new WebSocket('ws://0.0.0.0:8001');

ws.onmessage = response => {
    let data = JSON.parse(response.data);
    // console.log(JSON.parse(response.name));
    // console.log(positionData.top);
    // console.log(positionData.left);
    // unit.style.top = positionData.top;
    // unit.style.left = positionData.left;

    if(data.status === 4) {
        // let p = document.createElement('p');
        // p.innerText = data.message;
        let q = document.getElementById('typing');
         q.style.opacity = '1';
         q.style.opacity = '0';
        // p.style.color = 'red';
    }
    else {
        let p = document.createElement('p');
        p.innerText = data.message;
        document.getElementById('messages').append(p);
    }
}

// ws.onclose = function(event) {
//     let request = {
//         status: 3,
//         name: document.getElementById('username').value,
//         message: 'bye'
//     };
//     ws.send(JSON.stringify(request));
// };


document.addEventListener("keyup", function(event) {
    if( document.getElementById('register-block').style.display !== "none") {
        if (event.key === 'Enter') {
            if( document.getElementById('username').value) {
                let request = {
                    status: 1,
                    name: document.getElementById('username').value,
                    message: 'hi'
                };
                ws.send(JSON.stringify(request));
                document.getElementById('register-block').style.display = 'none';
                document.getElementsByClassName('container')[0].style.display = '';
            }
        }
    }
    else {
        if(event.key !== 'Enter') {
            let request = {
                status: 4,
                name: document.getElementById('username').value,
                message: 'typing'
            };
            ws.send(JSON.stringify(request));
        }

    }

    // if( document.getElementById('register-block').style.display === "none") {
    //
    //     let request = {
    //         status: 1,
    //         name: document.getElementById('username').value,
    //         message: 'hi'
    //     };
    //     ws.send(JSON.stringify(request));
    //     document.getElementById('register-block').style.display = 'none';
    //     document.getElementsByClassName('container')[0].style.display = '';
    //
    // }






});

// addEventListener("click", function() {
//     let request = {
//         status: 1,
//         name: document.getElementById('username').value,
//         message: 'hello'
//     };
//     ws.send(JSON.stringify(request))
// });