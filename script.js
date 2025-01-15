const urlParams = new URLSearchParams(window.location.search);
const initial = {
  newInvestments: urlParams.get('newInvestments') ?? 1000000,
  numberOfInvestments: urlParams.get('numberOfInvestments') ?? 1,
}

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
  const holdenYear = years[years.length - (holdTime)] || year0(newInvestments)
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
    newInvestments: initial.newInvestments, 
    numberOfInvestments: initial.numberOfInvestments,
    years(){
      const years = []
      const newInvestments = -this.newInvestments * this.numberOfInvestments
      years.push(year0(newInvestments))
      for (let index = 0; index < 30; index++) {
        years.push(nextYear(years, newInvestments))      
      }
      return years
    },
    getBiggerValue(){
      const years = this.years()
      return parseFloat(years[years.length - 1].totalInvested)
    },
    getSmalledValue(){
      const years = this.years()
      return years[0].totalInvested
    },
    toSpecialNotation(value){
      if(value > 1000000){
        return parseInt(value / 1000000) + 'M'
      }
      else if(value > 1000){
        return parseInt(value / 1000) + 'K'
      }
      else {
        return value
      }
    },
    selectedYears(){
      const years = this.years()
      const result = {
        1: years[1],
        2: years[2],
        3: years[3],
        4: years[4],
        5: years[5],
        10: years[10],
        15: years[15],
        20: years[20],
        25: years[25],
        30: years[30],
      }
      return result
    }
  }
  
}

function accordion(){
  return {
    open: false,
    toggle(){
      this.open = !this.open
    }
  }
}

function multiStepForm(){
  return {
    values: {
      numberOfInvestments: 100000,
      newInvestments: 1
    },
    step: 1,
    submit(){
      if(this.step == 2){
        window.location = `/results.html?newInvestments=${newInvestments}&numberOfInvestments=${numberOfInvestments}`;
      } else {
        this.step += 1
      }
    },
    back(){
      this.step -= 1
    }
  }
}