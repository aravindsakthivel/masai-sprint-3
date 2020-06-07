var searchHolder = []
var acquiredData
var curOpt


function inputOperation(){
    var inputData = document.getElementById('coin_name').value.toLowerCase()
    searchHolder.push(inputData)
    getCryptoData(inputData)
    comparisonMoreinfo(inputData.toUpperCase())

}

function comparisonMoreinfo(data){
    var comparePage = document.getElementById('comparison')
    comparePage.innerHTML = ""
    var comBtn = document.createElement('button')
    comBtn.textContent = 'Do you want to compare'
    comBtn.setAttribute('onclick', 'compareCoinPre()')

    var infoBtn = document.createElement('button')
    infoBtn.textContent = 'More info about ' + data
    infoBtn.setAttribute('onclick', 'moreInfo()')
    comparePage.append(infoBtn, comBtn)
}


function getCryptoData(data){
    var displayBlock = document.getElementById('more_info')
    displayBlock.innerHTML = ""
    var xhrcrypto = new XMLHttpRequest()
    var cryptoApi = 'https://api.coingecko.com/api/v3/coins/'
    // console.log(cryptoApi + data + "?market_data=true")
    xhrcrypto.open("GET", cryptoApi + data + "?market_data=true")
    xhrcrypto.send()
    xhrcrypto.onload = function(){
        if(this.status === 200){
            acquiredData = JSON.parse(this.response)
            // console.log(acquiredData)
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
    // console.log(this.market_data.current_price[curncy])
    var preference = 'USD'
    if (curncy === undefined){
        preference = 'USD'
    }
    else{
        preference = curncy.toUpperCase()
    }
    coinPrice.innerText = '1 ' + this.id + ' in '+ preference + ": " + otherValue
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
    curOpt = document.getElementById('currency_option').value
    processData.call(acquiredData, curOpt)
}


function compareCoinPre(){
    var comparePage = document.getElementById('comparison')
    comparePage.innerHTML = ""
    var otherInput = document.createElement('input')
    otherInput.setAttribute('id', 'compVal')
    var otherBtn = document.createElement('button')
    otherBtn.setAttribute('onclick', 'getCompareDataPre()')
    otherBtn.textContent = 'Find'
    comparePage.append(otherInput, otherBtn)
}


function moreInfo(){
    var displayBlock = document.getElementById('more_info')
    displayBlock.innerHTML = ""
    var infoChange = document.createElement('div')
    var lowValue = document.createElement('p')
    var chooseCurrency = curOpt || 'usd'
    lowValue.innerText = "Lowest drop in last 24 hours " + chooseCurrency.toUpperCase() + ": " + acquiredData.market_data.low_24h[chooseCurrency]

    var highValue = document.createElement('p')
    highValue.textContent = "Highest growth in last 24 hours " + chooseCurrency.toUpperCase() + ": " + acquiredData.market_data.high_24h[chooseCurrency]

    var maxCap = document.createElement('p')
    maxCap.innerText = "Total supply in nos: " + acquiredData.market_data.total_supply

    var circulation = document.createElement('p')
    circulation.textContent = "circulating supply in nos: " + acquiredData.market_data.circulating_supply

    infoChange.append(lowValue, highValue, maxCap, circulation)
    infoChange.setAttribute('class', 'info_change')

    var desc = acquiredData.description.en
    var box = document.createElement('div')
    box.setAttribute('class', 'description')
    box.innerText = desc
    displayBlock.append(infoChange, box)

}


function getCompareDataPre(){
    var data = document.getElementById('compVal').value
    console.log(data)
    var xhrCryptoCom = new XMLHttpRequest()
    var cryptoApi = 'https://api.coingecko.com/api/v3/coins/'
    // console.log(cryptoApi + data + "?market_data=true")
    xhrCryptoCom.open("GET", cryptoApi + data + "?market_data=true")
    xhrCryptoCom.send()
    xhrCryptoCom.onload = function(){
        if(this.status === 200){
            var compareData = JSON.parse(this.response)
            console.log(compareData)
            compareCoin.call(compareData)
        }
        else if(this.status === 404){
            comparePage.innerHTML = 'Sorry it is not a Cryptocurrency'
            comparePage.setAttribute('style', 'color:white')
        }
    }
}


function compareCoin(){
    var result = document.getElementById('result')
    result.innerText = ""
    var comparePage = document.getElementById('comparison')
    comparePage.innerText = ""
    var compBlock = document.createElement('div')
    compBlock.setAttribute('id', 'compare_op')
    var firstCoinValue = document.createElement('p')
    firstCoinValue.textContent = "The value of one " + acquiredData.id.toUpperCase() + " in USD : "+ acquiredData.market_data.current_price.usd
    var secondCoinValue = document.createElement('p')
    secondCoinValue.textContent = "The value of one " + this.id.toUpperCase() + " in USD : "+ this.market_data.current_price.usd
    compBlock.append(firstCoinValue, secondCoinValue)
    result.append(compBlock)
}


function totalCoins(){
    var xhrCoins = new XMLHttpRequest()
    var url = 'https://api.coingecko.com/api/v3/coins/list'
    xhrCoins.open('GET', url)
    xhrCoins.send()
    xhrCoins.onload = function(){
        var coinData = JSON.parse(this.response)
        // console.log(Object.keys(coinData).length)
        var result = document.getElementById('result')
        result.innerText = 'There is a total of ' + Object.keys(coinData).length + ' Cryptocurrency (approx)'
        result.setAttribute('style' , "color:white")
    }
}



window.addEventListener('load', function(){
    var searchBtn = this.document.getElementById('get_data')
    searchBtn.addEventListener('click', inputOperation)
    totalCoins()
})