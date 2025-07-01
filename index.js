/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

// Creates a single employee record from an array
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Creates multiple employee records from an array of arrays
function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
}

// Adds a timeIn event to an employee record
function createTimeInEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(' ');
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return employee;
}

// Adds a timeOut event to an employee record
function createTimeOutEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(' ');
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    return employee;
}

// Calculates hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(e => e.date === date);
    const timeOut = employee.timeOutEvents.find(e => e.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

// Calculates wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

// Calculates all wages for an employee
function allWagesFor(employee) {
    return employee.timeInEvents.reduce((total, e) => {
        return total + wagesEarnedOnDate(employee, e.date);
    }, 0);
}

// Finds an employee by first name
function findEmployeeByFirstName(collection, firstNameString) {
    return collection.find(e => e.firstName === firstNameString);
}

// Calculates total payroll for all employees
function calculatePayroll(employees) {
    return employees.reduce((total, emp) => total + allWagesFor(emp), 0);
}

