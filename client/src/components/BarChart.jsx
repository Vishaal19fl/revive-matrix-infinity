import React from "react";
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";

const BarChart = ({ isDashboard = false, ocrData }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Process data to count disasters by severity
  const processData = (data) => {
    const counts = {
      High: 0,
      Medium: 0,
      Low: 0,
    };

    data.forEach((item) => {
      if (item.severity === "high") {
        counts.High++;
      } else if (item.severity === "medium") {
        counts.Medium++;
      } else if (item.severity === "low") {
        counts.Low++;
      }
    });

    return [
      { severity: "High", count: counts.High },
      { severity: "Medium", count: counts.Medium },
      { severity: "Low", count: counts.Low },
    ];
  };

  const chartData = processData(ocrData);

  return (
    <ResponsiveBar
      data={chartData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      keys={["count"]} // Single key for count
      indexBy="severity" // Severity levels on X-axis
      margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={({ id, data }) => {
        if (data.severity === "High") return "#f44336"; // Red
        if (data.severity === "Medium") return "#ff9800"; // Orange
        if (data.severity === "Low") return "#4caf50"; // Green
        return "#000"; // Default fallback color
      }}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Severity Levels",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Disaster Count",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[]}
      role="application"
      barAriaLabel={(e) =>
        `${e.id}: ${e.formattedValue} in severity level: ${e.indexValue}`
      }
    />
  );
};

export default BarChart;
