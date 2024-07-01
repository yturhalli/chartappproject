
<script lang="ts" setup>

import { isNullBlank } from '@/composable/useCommonFunctions';
import { useFetchDailySales, useFetchDailySalesSkuList, useFetchSkuRefundRate } from '@/stores/daily-sales-api';
import { useUserSession } from '@/stores/userSession';
import { computed, ref, watch } from 'vue';
import { format, Options } from 'highcharts';
import { DailySale, SkuListItem } from '@/utils/daily-sales-api';

const userSession = useUserSession()
const isLoading = ref(false)

interface StoreUser  {
  firstName: string
  lastName: string
  email: string
  userId: string
  marketPlace: string
  sellerId: string
}
const user: StoreUser = JSON.parse(userSession.user)
const selectedDays = ref(7)
//console.log(user)

const chartOptions = ref<Options>({
  chart: {
    type: 'column'
  },
  title: {
    text: 'Daily Sales',
    align: 'left'
  },
  xAxis: {
    categories: [],
    labels: {
      formatter: function() {
        const date = new Date(this.value);
        const formattedDate = format(date, 'EEEE M/dd/yyyy'); // Format as "Day M/dd/yyyy"
        return formattedDate;
      }
    }
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Amount ($)'
    },
    stackLabels: {
      enabled: true
    }
  },
 
  tooltip: {
    headerFormat: '<b>{point.x}</b><br/>',
    pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
  },
  plotOptions: {
    column: {
      stacking: 'normal',
      dataLabels: {
        enabled: true,
        inside: true,
        rotation: -90
      }
    }
  },
  series: []
});

const populateChartData = (data: DailySale[]) => {
if(!chartOptions.value && !chartOptions.value.xAxis && !chartOptions.value.xAxis.categories && !chartOptions.value.series) return

chartOptions.value.xAxis.categories = data.map(item => item.date);

chartOptions.value.series = []

chartOptions.value.series.push({
      name: 'Profit',
      cursor: 'pointer',
      point: {
          events: {
              click: function () {
                  getParamsForSkuList(this.category)
              }
          }
      },
      data: data.map(item => ({
        y: item.profit,
      }))
    });

chartOptions.value.series.push({
      name: 'FBA Sales',
      cursor: 'pointer',
      point: {
          events: {
              click: function () {
                  getParamsForSkuList(this.category)
              }
          }
      },
      data: data.map(item => ({
        y: item.fbaAmount,
        totalSales: item.fbaAmount + item.fbmAmount,
        fbaShippingAmount: item.fbaShippingAmount,
        profit: item.profit,
        fbaAmount: item.fbaAmount,
        fbmAmount: item.fbmAmount
      }))
    });

    chartOptions.value.series.push({
      name: 'FBM Sales',
      cursor: 'pointer',
      point: {
          events: {
              click: function () {
                  getParamsForSkuList(this.category)
              }
          }
      },
      data: data.map(item => ({
        y: item.fbmAmount,
        totalSales: item.fbaAmount + item.fbmAmount,
        fbaShippingAmount: item.fbaShippingAmount,
        profit: item.profit,
        fbaAmount: item.fbaAmount,
        fbmAmount: item.fbmAmount
      }))
    });

    //console.log(JSON.stringify(chartOptions.value.series))

// data.forEach(day => {
//   console.log(JSON.stringify(day.date))
//   chartOptions.value.xAxis.categories.push(day.date)
// })
}

const fetchDailySalesData = async () => {
if(isLoading.value) return
if(isNullBlank(user)) return
isLoading.value = true

const service = useFetchDailySales()
try {
await service.apiFetchDailySales(user.marketPlace, user.sellerId, 0, selectedDays.value, true)
isLoading.value = false
if(service.res) {
  populateChartData(service.res.Data.item)
  }
} catch (err) {
  console.log(err)
  isLoading.value = false
}
}

fetchDailySalesData()

const date1 = ref('')
const date2 = ref('')
const pageSize = ref(7)
const pageNumber = ref(1)
const isCompare = computed(() => {
  const compare = !isNullBlank(date1.value) && !isNullBlank(date2.value)
  return compare ? 1 : 0
})

const getParamsForSkuList = (date: string) => {
    if(isNullBlank(date1.value)) date1.value = date
    else if(date1.value === date) {
      date1.value = date2.value
      date2.value = ''
      }
    else if(date2.value === date) date2.value = ''
    else date2.value =date
}

const fetchSkuList = async () => {
    if(isLoading.value) return
    isLoading.value = true
    const service = useFetchDailySalesSkuList()
    try {
      await service.apiFetchDailySalesSkuList(user.marketPlace, user.sellerId, String(date1.value), String(date2.value), pageSize.value, pageNumber.value, isCompare.value)
      isLoading.value = false
      if(service.res) {
        await fetchSkuRefundRate(service.res?.Data.item.skuList)
      }
    } catch (err) {
      console.log(err)
      isLoading.value = false
    }
}

const fetchSkuRefundRate = async (skuList: SkuListItem[]) => {
  if(isLoading.value) return
  isLoading.value = true
  const service = useFetchSkuRefundRate()
  try {
    await service.apiFetchSkuRefundRate(user.marketPlace, user.sellerId, [String(skuList)], 0)
    console.log(JSON.stringify(service.res))

  }catch (err) {
      console.log(err)
      isLoading.value = false
    }
}

watch(date1, async (newVal, oldVal) => {
  if(newVal) await fetchSkuList();
});

watch(date2, async (newVal, oldVal) => {
 if(newVal) await fetchSkuList();
});


</script>
<template>
  <div class="home">
    <div class="select-container">
      <div class="select-box">
        <label for="daySelect">Select Days</label>
        <select id="daySelect" v-model="selectedDays" @change="fetchDailySalesData">
          <option value="60">60</option>
          <option value="30">30</option>
          <option value="14">14</option>
          <option value="7">7</option>
        </select>
      </div>
    </div>
    <highcharts :options="chartOptions" class="chart"></highcharts>
  </div>
</template>

<style lang="scss">
.home {
  padding: 2rem 10rem;
  background: #eee;
    padding: 1rem 3rem;
    margin: 1rem 3rem;
    border: 1px solid #eee;
    border-radius: 6px;
  .select-container {
    display: flex;
    justify-content: end;
    padding: 1rem 3rem;
    .select-box {
      display: flex;
      flex-direction: column;
      label {
        font-size: .75rem;
        font-weight: bold;
        align-self: flex-start;
      }
      select {
            width: 8rem;
            height: 1.2rem;
            cursor: pointer;
      }
    }
  }
  .chart {
    padding: 1rem 3rem;
    height: 60rem;
  }
}
</style>
