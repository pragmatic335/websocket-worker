<?php
require __DIR__ . '/../vendor/autoload.php';

$worker = new \Workerman\Worker('websocket://0.0.0.0:8001');
$worker->count = 1;

$users = [];
$color = ['#85144b', '#ab81a3', '#883526', '#0277BD', '#015d06', '#f5bf1e'];

$worker->onClose = function ($connection) use($worker, &$users) {

    $response['message'] = ' корабль покинули ' . $users[$connection->id]['name'] . ' :( ';
    $response['color'] = $users[$connection->id]['color'];
    $response['name'] = $users[$connection->id]['name'];
    $response['status'] = 2;
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

$worker->onMessage = function ($connection, $data) use ($worker, &$users, $color) {

    $request = json_decode($data, true);
    $response = ['message' => 'something useless'];

    if(! $users[$connection->id]) {
        $users[$connection->id]['name'] = $request['name'];
        $numberColor = rand(0,5);
        $users[$connection->id]['color'] = $color[$numberColor];
    }

    if($request['status'] == 100) {
        $response['message'] = $request['message'];
        $response['status'] = 100;
        $response['color'] = $users[$connection->id]['color'];
        $response['name'] = $users[$connection->id]['name'];
    }

//    var_dump($request);

    if($request['status'] == 4) {
//        var_dump($users);
//        echo $users[$connection->id];
        $response['color'] = $users[$connection->id]['color'];
        $response['message'] =  $users[$connection->id]['name'] . ' пытается что то написать....';
        $response['status'] = 4;
        $response['name'] = $users[$connection->id]['name'];
    }



    if($request['status'] == 1) {
        $response['message'] = 'Пользователь ' . $users[$connection->id]['name'] . ' прибыл на станцию :) ';
        $response['status'] = 1;
        $response['name'] = $users[$connection->id]['name'];
        $response['color'] = $users[$connection->id]['color'];
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


