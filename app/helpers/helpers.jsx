export const currPrice = (arr,arg)=>{
    return arr.find(el=>el.symbol==arg)
}

export const calculateProfit = (type,amount,currency,buyPrice,sellPrice,leverage)=>{
    const positionSize = amount*(leverage ? leverage : 1)
    const quantity = positionSize / buyPrice

    const pnlShort = (buyPrice-sellPrice) * quantity
    const pnlLong = (sellPrice-buyPrice) * quantity
    const roeShort = (pnlShort/amount )*100
    const roeLong = (pnlLong/amount )*100

    if (type=='Short'){
        return {"pnl":pnlShort,'roe':roeShort}
    }
    if (type=='Long'){
        return {"pnl":pnlLong,'roe':roeLong}
    }
}


// calculateProfit(trade.type,trade.amount,trade.currency,trade.price,currPrice(prices,trade.currency).quote.USD.price,trade.leverage).pnl

export const pivotDashboard = (data,prices)=>{

    const summary = {}

    for (const trade of data){
        const currency = trade.currency
        const amount = parseFloat(trade.amount)
        const price = parseFloat(trade.price)
        const revenue = parseFloat(calculateProfit(trade.type,trade.amount,trade.currency,trade.price,currPrice(prices,trade.currency).quote.USD.price,trade.leverage).pnl)
        const performance = parseFloat(calculateProfit(trade.type,trade.amount,trade.currency,trade.price,currPrice(prices,trade.currency).quote.USD.price,trade.leverage).roe)


        if (!summary[currency]){
            summary[currency] = {
                currency,
                totalAmount:0,
                totalPrice: 0,
                tradeCount: 0,
                revenue:0,
                performance:0
            }
        }

        summary[currency].totalAmount+=amount
        summary[currency].totalPrice+=price
        summary[currency].tradeCount+=1
        summary[currency].revenue+=revenue
        summary[currency].performance+=performance
        
    }


    const results = Object.values(summary).map((item) => ({
    currency: item.currency,
    totalAmount: parseFloat(item.totalAmount.toFixed(2)),
    averagePrice: parseFloat((item.totalPrice / item.tradeCount).toFixed(2)),
    averageAmount: parseFloat((item.totalAmount / item.tradeCount).toFixed(2)),
    averageRevenue: parseFloat((item.revenue / item.tradeCount).toFixed(2)),
    tradeCount: item.tradeCount,
    revenue: parseFloat(item.revenue.toFixed(2)),
    performance: parseFloat((item.performance / item.tradeCount).toFixed(2)),
    }))

    
    return results
}

export const colorGenerator = (list)=>{
    const colors = []

}