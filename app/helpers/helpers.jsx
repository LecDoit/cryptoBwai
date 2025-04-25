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


export const pivotDashboard = (data)=>{

    const summary = {}

    for (const trade of data){
        const currency = trade.currency
        const amount = parseFloat(trade.amount)
        const price = parseFloat(trade.price)

        if (!summary[currency]){
            summary[currency] = {
                currency,
                totalAmount:0,
                totalPrice: 0,
                tradeCount: 0 
            }
        }

        summary[currency].totalAmount+=amount
        summary[currency].totalPrice+=price
        summary[currency].tradeCount+=1
    }

    const results = Object.values(summary).map((item)=>({
        currency:item.currency,
        totalAmount:item.totalAmount,
        averagePrice:item.totalPrice/item.tradeCount,
        tradeCount:item.tradeCount

    }))
    
    return results
}