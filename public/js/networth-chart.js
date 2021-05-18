// Get chart colors
let chartColors = [
    getComputedStyle(document.documentElement).getPropertyValue('--chart-color-1'),
    getComputedStyle(document.documentElement).getPropertyValue('--chart-color-2'),
    getComputedStyle(document.documentElement).getPropertyValue('--chart-color-3'),
    getComputedStyle(document.documentElement).getPropertyValue('--chart-color-4')
];

let dataValues = [
    Number(document.getElementById("total-personal-assets").innerText.slice(1)),
    Number(document.getElementById("total-invested-assets").innerText.slice(1)),
    Number(document.getElementById("total-cash-equivalents").innerText.slice(1))
];

const data = {
    labels: [
        'Personal Assets',
        'Invested Assets',
        'Cash Equivalents'
    ],
    datasets: [{
        label: 'Asset Allocations',
        data: dataValues,
        backgroundColor: chartColors,
        hoverOffset: 4
    }]
};

var ctx = document.getElementById('networth-chart').getContext('2d');
var networthChart = new Chart(ctx, {
    type: 'doughnut', data
});

// Chart styling
Chart.defaults.font.family = "GT EEsti Pro, san-serif";
networthChart.options.plugins.legend.display = false;
networthChart.options.plugins.title.text = "ASSET ALLOCATIONS";
networthChart.options.plugins.title.display = true;
networthChart.options.plugins.title.position = "top";
networthChart.options.plugins.title.font.family = "GT EEsti Pro, san-serif";
networthChart.options.plugins.title.font.size = "16px";
networthChart.options.plugins.title.font.weight = 200;
networthChart.update();

function updateChart() {
    let dataValues = [
        Number(document.getElementById("total-personal-assets").innerText.slice(1)),
        Number(document.getElementById("total-invested-assets").innerText.slice(1)),
        Number(document.getElementById("total-cash-equivalents").innerText.slice(1))
    ];
    networthChart.data.datasets[0].data = dataValues;
    networthChart.update();
}