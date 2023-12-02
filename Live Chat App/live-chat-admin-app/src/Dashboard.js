import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

function Dashboard() {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/visitor/getallvisitors?admin_id=" +
            localStorage.getItem("admin_id")
        );
        const data = await response.json();
        setVisitors(data);
        console.log(data);

        const platformsData = data.reduce((platforms, visitor) => {
          const platform = visitor.platform;
          if (!platforms[platform]) {
            platforms[platform] = 1;
          } else {
            platforms[platform]++;
          }
          return platforms;
        }, {});

        const platformCategories = Object.keys(platformsData);
        const platformCounts = Object.values(platformsData);

        setBarChartData({
          options: {
            chart: {
              id: "basic-bar",
            },
            xaxis: {
              categories: platformCategories,
            },
          },
          series: [
            {
              name: "Platform Counts",
              data: platformCounts,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const [donutChartData, setDonutChartData] = useState({
    series: [0, 0],
    options: {
      labels: ["Resolved", "Pending"],
    },
  });

  const [barChartData, setBarChartData] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: "Platform Counts",
        data: [],
      },
    ],
  });

  useEffect(() => {
    const resolvedCount = visitors.filter(
      (item) => item.status === "resolved"
    ).length;
    const notResolvedCount = visitors.filter(
      (item) => item.status === "notresolved"
    ).length;

    setDonutChartData({
      series: [resolvedCount, notResolvedCount],
      options: {
        labels: ["Resolved", "Pending"],
      },
    });
  }, [visitors]);

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          height: "100%",
          width: "calc(100vw / 2)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Chart
          options={donutChartData.options}
          series={donutChartData.series}
          type="donut"
          width="380"
        />
      </div>
      <div
        style={{
          height: "100%",
          width: "calc(100vw / 2)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="app">
          <div className="row">
            <div className="mixed-chart">
              <Chart
                options={barChartData.options}
                series={barChartData.series}
                type="bar"
                width="500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
