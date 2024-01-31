const express = require("express");
const router = express.Router();
const dfd = require("danfojs-node");
const dayjs = require("dayjs");
router.use(express.json());

/* Networth route */
router.post('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const birthDate = req.body.birthDateInput; // Format YYYY-MM-DD
    const totalInvested = Number(req.body.totalinvestedInput);
    const monthlyContribution = Number(req.body.monthlyContributionInput);
    const annualReturn = Number(req.body.annualReturnInput);
    const safeWithdrawalRate = Number(req.body.safeWithdrawalRateInput);
    const inflation = Number(req.body.inflationInput);

    // Start from current month
    const startDate = dayjs().startOf('month');
    const birthDateObj = dayjs(birthDate);
    const ageAtStart = startDate.diff(birthDateObj, 'year', true);

    // Create an array to store data for each month
    const data = [];

    // Initial net worth for the first row
    let networth = totalInvested;

    for (let i = 0; i < 12 * 40; i++) {
        const currentMonth = startDate.add(i, 'months');

        // Calculate age for each month
        const age = ageAtStart + i / 12;

        // Calculate net worth
        if (i !== 0) {
          networth = networth * Math.pow((1 + annualReturn / 100), 1 / 12) + monthlyContribution;
        }

        // Push raw data to the array
        data.push({
            'Month': currentMonth.format('YYYY-MM'), // Send formatted string with month and year
            'Net Worth': networth,
            'Age': age
        });
    }

    // Create a danfo DataFrame with multiple columns
    const table = new dfd.DataFrame(data.map(entry => ({
        'Month': entry['Month'],
        'Net Worth': parseFloat(entry['Net Worth'].toFixed(2)),
        'Age': Math.round(parseFloat(entry['Age'])).toFixed(1),
    })));

    console.log(table.toString());
    res.json(table);
});

module.exports = router;
