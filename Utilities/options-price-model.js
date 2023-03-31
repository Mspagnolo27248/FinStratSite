

function ncdf(x, mean, std) {
    var x = (x - mean) / std
    var t = 1 / (1 + .2315419 * Math.abs(x))
    var d =.3989423 * Math.exp( -x * x / 2)
    var prob = d * t * (.3193815 + t * ( -.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))
    if( x > 0 ) prob = 1 - prob
    return prob
  }
  //https://www.math.ucla.edu/~tom/distributions/normal.html?


function dateDiff(a, b) {
    var _milSecPerDay = (1000 * 60 * 60 * 24)
    return Math.floor((a - b) / _milSecPerDay)
}

class BlackScholes {
    static callPrice(stockPrice, impliedVol, exPrice, exDate, rfRate = .0060, ) {
        const today = new Date()
        const exerciseDate = new Date(exDate+"T16:00:00")
        const yearsToExpiration = dateDiff(exerciseDate, today) / 365
        const pvExPrice = exPrice * Math.exp(((-1 * rfRate )*yearsToExpiration))
        const d0 = impliedVol * (yearsToExpiration ** .5)
        const d1 = (Math.log((stockPrice / exPrice)) + ((rfRate + (impliedVol ** 2 / 2))*yearsToExpiration)) / (impliedVol * yearsToExpiration ** .5)
        const d2 = d1 - d0
       // const delta = ss.cumulativeStdNormalProbability(d1)
       const delta = ncdf(d1,0,1) 
       //const loan = ss.cumulativeStdNormalProbability(d2) * pvExPrice
       const loan = ncdf(d2,0,1)*pvExPrice
        const callPrice = (delta * stockPrice) - loan
        return callPrice
    }
}





module.exports = BlackScholes;




module.exports = BlackScholes;