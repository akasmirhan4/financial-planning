// Get chart colors
let chartColors = [
    getComputedStyle(document.documentElement).getPropertyValue('--chart-color-1'),
    getComputedStyle(document.documentElement).getPropertyValue('--chart-color-2'),
    getComputedStyle(document.documentElement).getPropertyValue('--chart-color-3'),
    getComputedStyle(document.documentElement).getPropertyValue('--chart-color-4')
];

let dataValues = [
    Number(document.getElementById("total-liabilities").innerText.slice(1)),
    Number(document.getElementById("total-expenses").innerText.slice(1)),
    Number(document.getElementById("total-savings").innerText.slice(1)),
    Number(document.getElementById("total-investments").innerText.slice(1))
];

const data = {
    labels: [
        'Liabilities',
        'Expenses / Needs',
        'Savings / Wants',
        'Investments / Protection'
    ],
    datasets: [{
        label: 'Cashflow Allocations',
        data: dataValues,
        backgroundColor: chartColors,
        hoverOffset: 4
    }]
};

var ctx = document.getElementById('cashflow-chart').getContext('2d');
var cashflowChart = new Chart(ctx, {
    type: 'doughnut', data
});


// Chart styling
Chart.defaults.font.family = "GT EEsti Pro, san-serif";
cashflowChart.options.plugins.legend.display = false;
cashflowChart.options.plugins.title.text = "CASHFLOW ALLOCATIONS";
cashflowChart.options.plugins.title.display = true;
cashflowChart.options.plugins.title.font.size = "16px";
cashflowChart.options.plugins.title.font.weight = 200;
cashflowChart.update();

function updateChart() {
    let dataValues = [
        Number(document.getElementById("total-liabilities").innerText.slice(1)),
        Number(document.getElementById("total-expenses").innerText.slice(1)),
        Number(document.getElementById("total-savings").innerText.slice(1)),
        Number(document.getElementById("total-investments").innerText.slice(1))
    ];
    
    cashflowChart.data.datasets[0].data = dataValues;
    cashflowChart.update();
}