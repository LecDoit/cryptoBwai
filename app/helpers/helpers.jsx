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