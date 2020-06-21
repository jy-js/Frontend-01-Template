const RESPONSE_HTML = `
<html maaa=a>
<head>
    <style>
#container{
    width: 500px;
    height:  400px;
    display: flex;
    align-items: center;
}
#container #myid {
    width: 200px;
    height: 50px;
    background-color: rgb(0,0,255);
}
#container .c1 {
    flex: 1;
    height:100px;
    background-color: rgb(255,0,0);
}
    </style>
</head>
<body>
    <div id="container">
        <div id="myid"></div>
        <div class="c1"></div>
    </div>
</body>
</html>
`;

module.exports = {
    RESPONSE_HTML,
}