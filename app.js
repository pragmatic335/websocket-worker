const bodyElement = document.getElementById('wrapper')
const unit = document.getElementById('unit')
unit.style.backgroundColor = Math.random() < 0.5? 'red': 'green'

//открываем websocket соединения, поддержка которого есть во всех браузера в наше время
const ws = new WebSocket('ws://0.0.0.0:8001')

// ws.addEventListener('message', (event) => {
//     console.log('Message from server ' + event.data)
// })

bodyElement.addEventListener('keyup', event => {
    let top = unit.style.top ? unit.style.top : 0
    let left = unit.style.left ? unit.style.left : 0
    const step = 5

    if(event.code === 'ArrowUp') {
        unit.style.top = parseInt(top) - step + 'px'
    } else if (event.code === 'ArrowDown') {
        unit.style.top = parseInt(top) + step + 'px'
    } else if (event.code === 'ArrowLeft') {
        unit.style.left = parseInt(left) - step + 'px'
    } else if (event.code === 'ArrowRight') {
        unit.style.left = parseInt(left) + step + 'px'
    }

    let positionData = {
        top: unit.style.top,
        left: unit.style.left,
    }

    ws.send(JSON.stringify(positionData))
})

ws.onmessage = response => {
    let positionData = JSON.parse(response.data)
    console.log(positionData.top)
    console.log(positionData.left)
    unit.style.top = positionData.top
    unit.style.left = positionData.left
}
