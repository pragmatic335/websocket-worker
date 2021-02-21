<?php
require __DIR__ . '/../vendor/autoload.php';

$worker = new \Workerman\Worker('websocket://0.0.0.0:8001');
$worker->count = 1;

$users = [];

$worker->onClose = function ($connection) use($worker, &$users) {

    $response = ['message' => ' корабль покинули ' . $users[$connection->id] . ' :( '];
    unset($users[$connection->id]);
//    var_dump($connection);
    $response = json_encode($response);

    foreach($worker->connections as $clientConnection) {
        $clientConnection->send($response);
    }

};

$worker->onConnect = function ($connection) {
//  $connection->send('message');
// \Workerman\Lib\Timer::add(1, function() use($connection) {
//     $connection->send(' Hello from server ');
// });
    echo 'New connection' . PHP_EOL;
};

$worker->onMessage = function ($connection, $data) use ($worker, &$users) {

    $request = json_decode($data, true);
    $response = ['message' => 'something useless'];

    if(! $users[$connection->id]) {
        $users[$connection->id] = $request['name'];
    }

//    var_dump($request);

    if($request['status'] == 4) {
        $response['message'] =  $users[$connection->id] . ' печатает...';
        $response['status'] = 4;
    }

//    var_dump($users);

    if($request['status'] == 1) {
        $response['message'] = 'Пользователь ' . $request['name'] . ' прибыл на станцию :) ';
        $response['status'] = 1;
    }



    $response = json_encode($response);
//    echo(count($worker->connections));
    foreach($worker->connections as $clientConnection) {
        $clientConnection->send($response);

    }
};

//$worker->onClose = function ($connection, $data) use($worker) {
//    echo 'Connection closed' . PHP_EOL;
//};

//$worker->onMessage = function($connection, $data) {
//   $connection->send($data);
//};



\Workerman\Worker::runAll();


