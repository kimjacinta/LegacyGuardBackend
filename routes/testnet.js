const express = require("express");
const router = express.Router();
const dfd = require("danfojs-node");
const dayjs = require("dayjs");
router.use(express.json());

/* Networth route */

router.post('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const unformatedBirthDate = req.birthDateInput;
    const birthDate = dayjs(unformatedBirthDate);
  
    const totalInvested = req.totalInvestedInput;
    const monthlyContribution = req.monthlyContributionInput;
    const annualReturn = req.annualReturnInput;
    const safeWithDrawalRate = req.safeWithDrawalRateInput;
    const inflation = req.inflationInput;

    // Calculate the age in years with one decimal place
    const calculateAge = (birthDate, currentDate) => {
      const ageInYears = currentDate.diff(birthDate, 'year', true); // Considering decimal places
      return ageInYears.toFixed(1);
    };

    // Generate the table for the next 40 years, including "Today"
    const tableData = [];
    const currentDate = new Date();
    let networth = totalInvested; 
    for (let i = 0; i <= 12 * 40; i++) {
    const monthText = currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });

    const age = calculateAge(currentDate, birthDate);

    // Calculate networth (careful that first row will just be the initial investment)
    if (i !== 0) {
      networth = networth * Math.pow((1 + annualReturn / 100), 1 / 12) + monthlyContribution;
      console.log(networth);
    }

    const row = {
      'Months Elapsed': i === 0 ? 'Today' : i,
      'Month (Text)': monthText,
      'Networth': networth.toFixed(2),
      'Age': parseFloat(age),
    };

    tableData.push(row);

    currentDate.add(1, 'month'); // Move to the next month
    }


    // Create a DataFrame
    const table = new dfd.DataFrame(tableData);

    console.log(table.toString());
    res.json(table);
    });



module.exports = router;
