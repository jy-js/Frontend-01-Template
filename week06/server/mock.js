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
    </style>
</head>
<body>
    <div id="test">
        <img id="myid"/>
        <img />
    </div>
</body>
</html>
`;

module.exports = {
    RESPONSE_HTML,
}