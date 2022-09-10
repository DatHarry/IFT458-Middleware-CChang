module.exports = (htmlStr, loan)=>{ // fat arrow function or lambda
    let output = htmlStr.replace(/{%NAME%}/g, loan.customerName);
    output = output.replace(/{%PHONENUMBER%}/g, loan.phoneNumber);
    output = output.replace(/{%ADDRESS%}/g, loan.address);
    output = output.replace(/{%MONTHLYLOANAMOUNT%}/g, loan.loanAmount);
    output = output.replace(/{%INTEREST%}/g, loan.interest);
    output = output.replace(/{%LOANTERMYEARS%}/g, loan.loanTermYears);
    output = output.replace(/{%LOANCALCULATE%}/g, loan.PV);
    output = output.replace(/{%LOANTYPE%}/g, loan.loanType);
    output = output.replace(/{%DESCRIPTION%}/g, loan.description);
    output = output.replace(/{%ID%}/g, loan.id);
    return output;
}