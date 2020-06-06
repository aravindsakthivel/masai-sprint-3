function getData(){
    var page = document.getElementById('box')
    page.innerText = ""
    var xhrTop = new XMLHttpRequest()
    var url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
    xhrTop.open("GET",url)
    xhrTop.send()
    xhrTop.onload = function(){
        var acquiredData = JSON.parse(this.response)
        // console.log(acquiredData)
        processData.call(acquiredData)
    }
}

function processData(){
    var page = document.getElementById('box')
    for (var i = 0; i < this.length; i++){
        var imgOdata = document.createElement('div')
        imgOdata.setAttribute('class', 'total_block')
        var image = document.createElement('img')
        image.setAttribute('src', this[i].image)
        image.setAttribute('alt', this[i].symbol)

        var allData = document.createElement('div')
        var idCurrHig = document.createElement('div')
        idCurrHig.setAttribute('class', 'block')
        var idCoin = document.createElement('p')
        idCoin.textContent = "Name: " + this[i].id.toUpperCase()
        var price = document.createElement('p')
        price.textContent = "Current price in USD: " + this[i].current_price
        var highVal = document.createElement('p')
        highVal.innerText = 'Highest value in 24hrs: ' + this[i].high_24h
        idCurrHig.append(idCoin, price, highVal)


        var curMarLow = document.createElement('div')
        curMarLow.setAttribute('class', 'block')
        var market = document.createElement('p')
        market.textContent = 'Market cap in USD: ' + this[i].market_cap
        var supply = document.createElement('p')
        supply.textContent = "Current supply in market: " + this[i].circulating_supply
        var lowVal = document.createElement('p')
        lowVal.innerText = 'Lowest value in 24hrs: ' + this[i].low_24h
        curMarLow.append(market, supply, lowVal)

        allData.append(idCurrHig, curMarLow)
        imgOdata.append(image, allData)
        page.append(imgOdata)
    }
}


window.addEventListener('load', function(){
    getData()
})