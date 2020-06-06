var valueHolder = []


function inputOperation(){
    var inputData = document.getElementById('coin_name').value.toLowerCase()
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

    var coinPrice = document.createElement('p')
    coinPrice.innerText = '1 ' + this.id + ' in USD: ' + this.market_data.current_price.usd

    var marketCap = document.createElement('p')
    marketCap.innerText = 'Market capitalization in USD: ' + this.market_data.market_cap.usd

    var description = document.createElement('p')
    description.innerText = this.description.en
    info_box.append(rank, coinPrice, marketCap, description)

    block.append(name_box, info_box)
    result.append(block)

}


window.addEventListener('load', function(){
    var searchBtn = this.document.getElementById('get_data')
    searchBtn.addEventListener('click', inputOperation)
})