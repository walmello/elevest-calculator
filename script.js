const prefferedReturn = (totalInvested, prefReturn = 0.06) =>
  totalInvested * prefReturn


const returnPercent = 0.06; // preferred return
const targetEM = 1.8; // target EM
const holdTime = 3;

const year0 = (newInvestments) => ({
  number: 0,
  totalInvested: 0,
  prefferedReturn: 0,
  profitsOnSale: 0,
  endingInvestedBalance: -newInvestments,
  cashFlow: 0
})

const nextYear = (years, newInvestments) => {
  const previousYear = years[years.length - 1]
  const holdenYear = years[years.length - (holdTime - 1)] || year0(newInvestments)
  const totalInvested = previousYear.endingInvestedBalance
  const prefferedReturn = totalInvested * returnPercent

  const profitsOnSale = years.length >= holdTime ? (holdenYear.profitsOnSale - newInvestments) * targetEM + newInvestments * (1 + returnPercent * holdTime) : 0

  const result = {
    number: years.length,
    totalInvested,
    prefferedReturn,
    profitsOnSale,
    endingInvestedBalance: totalInvested - newInvestments + profitsOnSale,
    cashFlow: prefferedReturn / 12
  }

  console.log(result, holdenYear)

  return result
}


function calculator(){
  return {
    newInvestments: 100000, // 100,000.00
    numberOfInvestments: 1,
    years: [],
    init(){
      const newInvestments = -this.newInvestments * this.numberOfInvestments
      this.years.push(year0(newInvestments))
      for (let index = 0; index < 30; index++) {
        console.log()
        this.years.push(nextYear(this.years, newInvestments))      
      }
    }
  }
}