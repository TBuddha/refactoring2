function statement(invoice, plays) {
    // 总金额
    let totalAmount = 0
    // 信用积分
    let volumeCredits = 0
    // 顾客应付金额
    let result = `Statement for ${invoice.customer}\n`
    const format = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 2}).format
    for (const perf of invoice.performances) {
        // 剧目详情
        const play = plays[perf.playID]
        let thisAmount = 0
        switch (play.type) {
            case 'tragedy':
                thisAmount = 40000
                if (perf.audience > 30) {
                    thisAmount += 1000 * (perf.audience - 30)
                }
                break
            case 'comedy':
                thisAmount = 30000
                if (perf.audience > 20) {
                    thisAmount += 10000 + 500 * (perf.audience - 20)
                }
                thisAmount += 300 * perf.audience
                break
            default:
                throw new Error(`unknown type: ${play.type}`)
        }
        // add volume credits
        volumeCredits += Math.max(perf.audience - 30, 0)
        // add extra credit for every ten comedy attendees
        if (play.type === 'comedy') volumeCredits += Math.floor(perf.audience / 5)
        // print line for this order
        result += ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`
        totalAmount += thisAmount
    }
    result += `Amount owed is ${format(totalAmount / 100)}\n`
    result += `You earned ${volumeCredits} credits\n`
    return result
}

