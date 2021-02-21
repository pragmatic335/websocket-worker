<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
    <link href="my.style.css" rel="stylesheet">

    <title>Title</title>
</head>

<body>
<div class="container" style = 'display: none'>

    <div class="d-flex flex-column">
        <div id="messages" class="overflow-auto" >
        <p id="typing" class="test" style="opacity: 0">Печатаешь...</p>

        </div>



        <input id="massager">

    </div>




</div>
<div id="register-block">
    <div class = 'row'>
        <label style="font-size: 5rem" class="text-center">Ты кто?</label>
    </div>

    <div class = 'row'>
        <input id="username"  class="custom-bord">
    </div>
</div>


<script src="app.js"></script>
</body>
</html>