var yahooFinance = require('yahoo-finance2').default

class YahooApiAccess {
    constructor() {
        this.yahooFinance = yahooFinance;
    }

// Get Stock Data from Yahoo Finance
    static historical(symbol = 'SPY', from = '2022-01-01', to = '2022-01-10', period = '1d', callback) {
        yahooFinance.chart(symbol,{
          
            period1: from,
            period2: to,
            interval: period // '1d' (daily), '1w' (weekly), '1m' (monthly), 'v' (dividends only)
        }, function (err, data) {
            callback(data)


        });
    }

//Simpe Sum Function
    static sum = (previousValue, currentValue) => previousValue + currentValue;

//Moving Average
    static Average(data, periods) {
        if (periods < 1) {
            return [-1]
        }

        if (periods >= data.length) {
            var total = 0;
            data.forEach((x) => {
                total += x.adjclose
            })
            return [total / data.length]
        } else {
            var total = 0;
            var values = [];
            for (let i = 0; i < data.length; i++) {
                total += data[i].adjclose
                if (i < periods - 1) {
                    continue
                } else {
                    values.push(total / periods)
                    total -= data[i - (periods - 1)].adjclose
                }
            }
            return values
        }
    }

//Momentum Trader Algo
   static Trader = (data,dip_window, max_window, hurdle) => {
    const dips = this.findTheDips(data,dip_window, hurdle)
    for (let i = 0; i < dips.length; i++) {
        var event = dips[i]
        var max_ = this.findActReturn(data, event,max_window)
        dips[i]["max"] = max_[1]
        dips[i]["days_to_max"] = max_[0][1]
    }
    return dips //{date:DATE,psotion:POSITION,value:DIP,max:RECOVERY,days_to_max:DAYS}
    }

//Holding Period Returns:(End Period / Begin Period) - 1
    static returns(data){
        let returns = []
        let prices = data.map(a=>a.adjclose).reverse()
        for(const i in prices){
            if(i>0){
                returns.push((prices[i]/prices[i-1])-1)
            }
            else{
                returns.push(0)
            }    
        }
        
        return returns
    }

    //Find The Dips
   static findTheDips = function (data, window=3, hurdle=-.02) {
        var dates =   data.map(a => a.date).slice().reverse()
        var returns = this.returns(data)
        const dips = []
        var hurdleReturn = hurdle
        //var minIndex = 0
        for (let i = 0; i < returns.length; i++) {
            returnOne = 0;
            returnTwo = 0;
            returnThree = 0;
            var returnOne = returns[i]
            if (i <= (returns.length - window + 1)) {
                var returnTwo = returns[i] + returns[i + 1]
            }
            if (i <= (returns.length - window)) {
                var returnThree = returns[i] + returns[i + 1] + returns[i + 2]
            }
            var returnArray = [returnOne, returnTwo, returnThree]
            var minReturn = Math.min(...returnArray)
            var minReturnIndex = returnArray.indexOf(Math.min(...returnArray));
            var position = i + minReturnIndex
            var event = {
                date: dates[position],
                position: position,
                value: minReturn
            }
            var indicator = (dips.filter(e => e.date === event.date))

            if ((minReturn <= hurdleReturn)) {
                if (indicator.length === 0) {
                    dips.push(event)
                } else {
                    minReturn = Math.min(minReturn, indicator[0].value)
                    event = {
                        date: dates[position],
                        position: position,
                        value: minReturn
                    }
                }

            }

        }

        return dips   // returns {date:'1/1/2022' , postion:47,value:.001}
    }

//Find the Max return post dip.
    static findActReturn = (data, event, window=9) => {
        var returns = this.returns(data)
        var StartPosition = data.slice().reverse().findIndex(x => x.date === event.date)
        var valueSpace = returns.slice(StartPosition + 1, StartPosition + 1 + window)
        var maxReturn = 0
        var maxPosition = []
        // short circut if array is empty 
        for (let i = 0; i < valueSpace.length; i++) {
            var subSpace = valueSpace.slice(0, window - i)
            let currentMax = subSpace.reduce(this.sum, 0)
            let currentPostion = [0, window - i]
            if (currentMax > maxReturn) {
                maxReturn = currentMax
                maxPosition = currentPostion

            }
        }
        return [maxPosition, maxReturn]
    }


//Frequency Table from Dips Data
    static TraderResults(results){
        let freq = {wins:0,loss:0}

        for (const event of results){
            if(event.max>Math.abs(event.value)){
                freq['wins']+=1
            }
            else{
                freq['loss']+=1
            }
        }
        return freq  //{wins:0,loss:0}
        /*
        Input 
        {
        "date": "2022-02-14T05:00:00.000Z",
        "position": 29,
        "value": -0.04095368164851598,
        "max": 0.017247691973698354,
        "days_to_max": 2
}
        */ 
    }    

}


module.exports = StockTrader;