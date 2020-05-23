const RESPONSE_HTML = `
<html maaa=a>
<head>
    <style>
body div #myid{
    width:100px;
    background-color: #ff5000;
}
body div img{
    width:30px;
    background-color: #ff1111;
}

.circle {
    border-radius: 50%;
}
    </style>
</head>
<body>
    <div id="test">
        <img id="myid"/>
        <img class="circle myclass1 myclass2" />
    </div>
</body>
</html>
`;

module.exports = {
    RESPONSE_HTML,
}