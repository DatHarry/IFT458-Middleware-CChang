const httpServer = require('http')
const url = require('url')
const fs  = require('fs')

///Read data from file
const tempLoan = require('./data/loan.json')
// Load replace module
const replaceTemplate = require('./modules/replaceTemplateLoan')
// read HTML template
const templateHTMLLoan = fs.readFileSync(
    `${__dirname}/template/templateLoan.html`,
    `utf-8`
)

// Add PV to tempLoan
function loanCalculate(amount, interest, years){
    const num = (amount/(interest/12)) * (1- (1/((1+  (interest/12)) ** (years*12) )))
    const PV = Math.round(num *100) /100
    return PV
}
tempLoan.forEach(function(item){
    item.PV = loanCalculate(item.loanAmount, item.interest, item.loanTermYears)
})
// console.log(tempLoan)

const dataObj = tempLoan// convert string to json
const server = httpServer.createServer( (req,res) => { //request, response

    const {query, pathname} = url.parse(req.url, true) // object destructors
    if (query.id){// if there is query parameter named id, it will be read as string
        // Courses page
        if (pathname === '/' || pathname.toLocaleLowerCase() === '/loan') {
            res.writeHead(200, {  //Everything run successfully
                'Content-type': 'text/html'
            })

            const loan = dataObj[Number(query.id)] // convert string to numeric value
            const loanHTML = replaceTemplate(templateHTMLLoan, loan) // function that will replace the value in the HTML
            res.end(loanHTML)
        }
        else {
            res.writeHead(404, {  //Server didn't find what you are looking for
                'Content-type': 'text/html'
            })
            res.end(`Resource not found`)
        }
    }    
})

//Start listening to requests 
server.listen(8000, 'localhost', () => {
    console.log('Listening to requests on port 8000')
})