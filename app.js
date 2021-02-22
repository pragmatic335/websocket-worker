const ws = new WebSocket('ws://0.0.0.0:8001');

ws.onmessage = response => {
    let data = JSON.parse(response.data);
    // console.log(JSON.parse(response.name));
    // console.log(positionData.top);
    // console.log(positionData.left);
    // unit.style.top = positionData.top;
    // unit.style.left = positionData.left;

    if(data.status === 4) {

        let q = document.getElementById('typing');
        q.innerHTML = "<span style='font-size: 20px; font-weight: bold; color: "+ data.color +"'>"+ data.name + "</span>" + " печатает сообщение...";
        if(q.style.opacity === '1') {
            // let event = new Event("transitionend");
            // q.dispatchEvent(event);
            q.style.opacity = '0';
        }
        else {
            q.style.opacity = '1';
        }

        // if (q.style.opacity === '0') {
        //     q.style.opacity = '1';
        // }


        // let p = document.createElement('p');
        // p.innerText = data.message;
        // let q = document.getElementById('typing');
        //  q.style.opacity = '0';
         // q.style.opacity = '0';
        // p.style.color = 'red';
    }
    // else {
    //     let p = document.createElement('p');
    //     p.innerText = data.message;
    //     document.getElementById('messages').append(p);
    //     p.style.fontSize = '20px';
    //     if(p.previousElementSibling) {
    //         p.previousElementSibling.removeAttribute('id');
    //     }
    //     p.setAttribute('id', 'main');
    //     window.location.hash = "#main";
    //     document.getElementById('massager').focus();
    //     document.getElementById('massager').select();
    // }

    if(data.status === 1) {
        let p = document.createElement('p');
        p.innerHTML = 'У нас новый незнакомец ' +  "<span style='font-size: 25px; font-weight: bold; color: "+ data.color +"'>"+ data.name + "</span>" + '. Поприветствуем же его!!!';
        document.getElementById('messages').append(p);
        p.style.fontSize = '20px';
        p.style.fontWeight = 'lighter';
        p.style.color = '#71868f';
        if(p.previousElementSibling) {
            p.previousElementSibling.removeAttribute('id');
        }
        p.setAttribute('id', 'main');
    }

    if(data.status === 2) {
        let p = document.createElement('p');
        p.innerHTML = 'Прощай ' +  "<span style='font-size: 25px; font-weight: bold; color: "+ data.color +"'>"+ data.name + "</span>" + ' :( Мы будем по тебе скучать!! ;(';
        document.getElementById('messages').append(p);
        p.style.fontSize = '20px';
        p.style.fontWeight = 'lighter';
        p.style.color = '#71868f';
        if(p.previousElementSibling) {
            p.previousElementSibling.removeAttribute('id');
        }
        p.setAttribute('id', 'main');
    }


    if(data.status === 100) {
        let p = document.createElement('p');
        p.innerHTML =  "<span style='font-size: 25px; font-weight: bold; color: "+ data.color +"'>"+ data.name + "</span>" + '&nbsp &nbsp &nbsp &nbsp' + data.message;
        document.getElementById('messages').append(p);
        p.style.fontSize = '20px';
        p.style.fontWeight = 'lighter';
        p.style.color = '#71868f';
        if(p.previousElementSibling) {
            p.previousElementSibling.removeAttribute('id');
        }
        p.setAttribute('id', 'main');
        window.location.hash = "#main";
        document.getElementById('massager').focus();
        document.getElementById('massager').select();
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
// ...запуск события на элементе!

document.getElementById('typing').addEventListener('transitionend', function() {
    let q = document.getElementById('typing');
    q.style.opacity = '0';
});


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
        else {
            if( document.getElementById('massager').value) {
                let request = {
                    status: 100,
                    name: document.getElementById('massager').value,
                    message: document.getElementById('massager').value
                };
                ws.send(JSON.stringify(request));
                document.getElementById('massager').value = '';
            }
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