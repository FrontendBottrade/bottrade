<script setup lang="ts">
import {ref } from "vue";
import { AgCharts } from "ag-charts-vue3";
import type { AgChartOptions } from "ag-charts-types";
import { getData } from "./ExampleData/Simpledata";
   
    const options = ref<AgChartOptions>({
    title: {
        text: "Annual Fuel Expenditure",
    },
    data: getData(),
    series: [
        {
        xKey: "quarter",
        yKey: "petrol",
        yName: "Petrol",
        strokeWidth: 4,
        marker: {
            enabled: false,
        },
        },
        {
        xKey: "quarter",
        yKey: "diesel",
        yName: "Diesel",
        stroke: "black",
        label: {
            fontWeight: "bold",
            formatter: ({ value }) => value.toFixed(0),
        },
        marker: {
            fill: "orange",
            size: 10,
            stroke: "black",
            strokeWidth: 3,
            shape: "diamond",
        },
        },
    ],
    });
</script>

<template>
      <ag-charts :options="options" />
</template>