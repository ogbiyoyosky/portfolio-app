let currentPage = historicalData.length - 1;

let dataSets = (data, currentPage) => [
  {
    label: "Solidfuels",
    backgroundColor: "#1E1F26",
    data: data[currentPage].solidFuelData,
  },
  {
    label: "Gas",
    backgroundColor: "#283655",
    data: data[currentPage].gasData,
  },
  {
    label: "Electricity",
    backgroundColor: "#4D648D",
    data: data[currentPage].electricityData,
  },
  {
    label: "Liquidfuels",
    backgroundColor: "#D0E1F9",
    data: data[currentPage].liquidFuelData,
  },
];

var options = {
  title: {
    display: true,
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: function (context) {
          let label = context.dataset.label || "";

          if (label) {
            label += ": ";
          }
          if (context.parsed.y !== null) {
            label += new Intl.NumberFormat("en-UK", {
              style: "currency",
              currency: "GBP",
            }).format(context.parsed.y);
          }
          return label;
        },
      },
    },
  },
};
Chart.defaults.font.family = "'Lexend', sans-serif";
var historicalChart = new Chart(document.getElementById("historicalChart"), {
  type: "bar",
  data: {
    labels: historicalData[currentPage].labels,
    datasets: dataSets(historicalData, currentPage),
  },
  options,
});

function updateYearRange(currentPage) {
  return (document.getElementById("yearRange").innerHTML = historicalData.find(
    (_, index) => index === currentPage
  ).yearRange);
}

function updateDataSets(currentPage) {
  return historicalChart.data.datasets.map((dataset) => ({
    label: dataset.label,
    backgroundColor: dataset.backgroundColor,
    data:
      dataset.label === "Solidfuels"
        ? historicalData[currentPage].solidFuelData
        : dataset.label === "Gas"
        ? historicalData[currentPage].gasData
        : dataset.label === "Electricity"
        ? historicalData[currentPage].electricityData
        : historicalData[currentPage].liquidFuelData,
  }));
}

function handlePrevious() {
  if (currentPage === 0) {
    alert("Chart Unavailable");
    document.getElementById("prevBtn").disabled = true;
  } else {
    currentPage = currentPage - 1;
    document.getElementById("nextBtn").removeAttribute("disabled");
    updateYearRange(currentPage);

    historicalChart.data.labels = historicalData[currentPage].labels;
    historicalChart.data.datasets = updateDataSets(currentPage);

    historicalChart.update();
  }
}

function handleNext() {
  if (currentPage === historicalData.length - 1) {
    alert("End of Chart");
    document.getElementById("nextBtn").disabled = true;
  } else {
    currentPage = currentPage + 1;
    document.getElementById("prevBtn").removeAttribute("disabled");
    updateYearRange(currentPage);

    historicalChart.data.labels = historicalData[currentPage].labels;
    historicalChart.data.datasets = updateDataSets(currentPage);

    historicalChart.update();
  }
}

function toggleFunction(mode) {
  var historicalMode = document.getElementById("historical");
  var forecastMode = document.getElementById("forecast");
  if (mode === "historical") {
    if (historicalMode.style.display === "none") {
      historicalMode.style.display = "block";
    } else {
      historicalMode.style.display = "none";
      forecastMode.style.display = "block";
    }
  } else if (mode === "forecast") {
    if (forecastMode.style.display === "block") {
      forecastMode.style.display = "none";
      historicalMode.style.display = "block";
    } else {
      forecastMode.style.display = "block";
    }
  }
}

var forecastChart = new Chart(document.getElementById("forecastChart"), {
  type: "bar",
  data: {
    labels: forecastData[0].labels,
    datasets: dataSets(forecastData, 0),
  },
  options: options,
});
