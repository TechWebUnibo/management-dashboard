function nRentalChart(user, rents){
    let chardata = []
    let count = {}
    let labels = []
    rents.forEach(rent => {
        let employee = rent.employee
        if (typeof count[user] == 'undefined') {
            count[user] = {
                not_started: 0,
                in_progress: 0,
                cancelled: 0,
                terminated: 0,
                delayed: 0,
                total: 0
            }
        }
        count[employee][rent.state] = count[employee][rent.state] + 1
        count[employee].total = count[employee].total + 1
    });
    staff.forEach(employee => {
        labels.push(employee.username)
        if (typeof count[employee._id] == 'undefined') {
            chardata.push(0)
            employee.rentInfo = {
                not_started: 0,
                in_progress: 0,
                cancelled: 0,
                terminated: 0,
                delayed: 0,
                total: 0
            }
        }
        else {
            chardata.push(count[employee._id].total)
            employee.rentInfo = count[employee._id]
        }
    })
    return { chardata: chardata, labels: labels, title: 'Number of rentals for employee' }
}

function turnoverChart(staff, invoices){
    let chardata = []
    let count = {}
    let labels = []
    invoices.forEach(invoice => {
        let employee = invoice.employee
        if (typeof count[employee] == 'undefined') {
            count[employee] = invoice.price
        }
        else {
            count[employee] = count[employee] + invoice.price
        }
    });
    staff.forEach(employee => {
        labels.push(employee.username)
        if (typeof count[employee._id] == 'undefined') {
            chardata.push(0)
            employee.turnover = 0
        }
        else {
            chardata.push(count[employee._id])
            employee.turnover = count[employee._id]
        }
    })
    return { chardata: chardata, labels: labels, title: 'Turnover for employee' }
}

module.exports.nRentalChart = nRentalChart
module.exports.turnoverChart = nRenturnoverCharttalChart