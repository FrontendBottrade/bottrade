<script setup lang="ts">
import {defineComponent, ref } from "vue";
import { AgCharts } from "ag-charts-vue3";
import type { AgChartOptions } from "ag-charts-types";
import { getData } from "./ExampleData/Simpledata";

const ChartExample = defineComponent({
  template: `
    <ag-charts
      :options="options"
    />
  `,
  components: {
    "ag-charts": AgCharts,
  },
  setup(props) {
    const options = ref<AgChartOptions>({
      title: {
        text: "Annual Fuel Expenditure",
      },
      data: getData(),
      series: [
        {
          type: "line",
          xKey: "quarter",
          yKey: "petrol",
          yName: "Petrol",
        },
        {
          type: "line",
          xKey: "quarter",
          yKey: "diesel",
          yName: "Diesel",
        },
      ],
    });

    return {
      options,
    };
  },
});
</script>