<?php
require __DIR__ . '/../vendor/autoload.php';

$worker = new \Workerman\Worker('websocket://0.0.0.0:8001');
$worker->count = 1;

$worker->onConnect = function ($connection) {
//  $connection->send('message');
// \Workerman\Lib\Timer::add(1, function() use($connection) {
//     $connection->send(' Hello from server ');
// });
    echo 'New connection' . PHP_EOL;
};

$worker->onMessage = function ($connection, $data) use ($worker) {
    echo(count($worker->connections));

    foreach($worker->connections as $clientConnection) {
        var_dump($data);
        $clientConnection->send($data);

    }
};

//$worker->onClose = function ($connection, $data) use($worker) {
//    echo 'Connection closed' . PHP_EOL;
//};

//$worker->onMessage = function($connection, $data) {
//   $connection->send($data);
//};



\Workerman\Worker::runAll();


