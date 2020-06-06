var valueHolder = []


function inputOperation(){
    var inputData = document.getElementById('coin_name').value
    valueHolder.push(inputData)
    getCryptoData(inputData)
}

function getCryptoData(data){
    var xhrcrypto = new XMLHttpRequest()
    var cryptoApi = 'https://api.coingecko.com/api/v3/coins/'
    console.log(cryptoApi + data + "?market_data=true")
    xhrcrypto.open("GET", cryptoApi + data + "?market_data=true")
    xhrcrypto.send()
    xhrcrypto.onload = function(){
        var acquiredData = JSON.parse(this.response)
        processData.call(acquiredData)
    }
}

function processData(){
    console.log(this)
    var dataBox = document.getElementById('result')
    
}


window.addEventListener('load', function(){
    var searchBtn = this.document.getElementById('get_data')
    searchBtn.addEventListener('click', inputOperation)
})