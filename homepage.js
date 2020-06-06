var searchHolder = []
var acquiredData


function inputOperation(){
    var inputData = document.getElementById('coin_name').value.toLowerCase()
    searchHolder.push(inputData)
    getCryptoData(inputData)
}

function getCryptoData(data){
    var xhrcrypto = new XMLHttpRequest()
    var cryptoApi = 'https://api.coingecko.com/api/v3/coins/'
    // console.log(cryptoApi + data + "?market_data=true")
    xhrcrypto.open("GET", cryptoApi + data + "?market_data=true")
    xhrcrypto.send()
    xhrcrypto.onload = function(){
        if(this.status === 200){
            acquiredData = JSON.parse(this.response)
            processData.call(acquiredData)
        }
        else if(this.status === 404){
            var result = document.getElementById('result')
            result.innerHTML = 'Sorry it is not a Cryptocurrency'
            result.setAttribute('class', 'fail')
        }

    }
}

function processData(curncy){
    // console.log(this)
    // console.log(this.market_data.market_cap.usd)
    var result = document.getElementById('result')
    result.innerText = ""
    var block = document.createElement('div')

    var name_box = document.createElement('div')
    var name = document.createElement('p')
    name.innerText = this.id.toUpperCase()
    var logo = document.createElement('img')
    logo.setAttribute('src', this.image.thumb)
    name_box.append(name, logo)

    var info_box = document.createElement('div')
    var rank = document.createElement('p')
    rank.innerText = "Rank: " + this.market_cap_rank

    var coinValue = document.createElement('div')
    coinValue.setAttribute('id', 'coin_value')
    var coinPrice = document.createElement('p')
    var otherValue = this.market_data.current_price[curncy] || this.market_data.current_price.usd
    console.log(this.market_data.current_price[curncy])
    var preference = 'USD'
    if (curncy === undefined){
        preference = 'USD'
    }
    else{
        preference = curncy.toUpperCase()
    }
    coinPrice.innerText = '1 ' + this.id + ' in '+ preference + " " + otherValue
    var currencySelect = document.createElement('select')
    currencySelect.setAttribute('id', 'currency_option')
    currencySelect.setAttribute('onchange', 'changeCurrency()')
    for (var i = 0; i < Object.keys(this.market_data.current_price).length; i++){
        var currencyOption = document.createElement('option')
        currencyOption.setAttribute('value', Object.keys(this.market_data.current_price)[i])
        currencyOption.innerText = Object.keys(this.market_data.current_price)[i]
        currencySelect.append(currencyOption)
    }

    coinValue.append(coinPrice, currencySelect)
    var marketCap = document.createElement('p')
    marketCap.innerText = 'Market capitalization in USD: ' + this.market_data.market_cap.usd

    var homepage = document.createElement('a')
    homepage.setAttribute('href', this.links.homepage['0'])
    homepage.setAttribute('target', '_blank')
    homepage.innerText = 'Official link'
    info_box.append(rank, coinValue, marketCap, homepage)

    block.append(name_box, info_box)
    result.append(block)

}


function changeCurrency(){
    var curOpt = document.getElementById('currency_option').value
    console.log(acquiredData)
    processData.call(acquiredData, curOpt)
}


function totalCoins(){
    var xhrCoins = new XMLHttpRequest()
    var url = 'https://api.coingecko.com/api/v3/coins/list'
    xhrCoins.open('GET', url)
    xhrCoins.send()
    xhrCoins.onload = function(){
        var coinData = JSON.parse(this.response)
        console.log(Object.keys(coinData).length)
        var result = document.getElementById('result')
        result.innerText = 'There is a total of ' + Object.keys(coinData).length + ' Cryptocurrency (approx)'
        result.setAttribute('class', 'fail')
    }
}




window.addEventListener('load', function(){
    var searchBtn = this.document.getElementById('get_data')
    searchBtn.addEventListener('click', inputOperation)
    totalCoins()
})