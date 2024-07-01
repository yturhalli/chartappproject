import { App } from 'vue';
import Highcharts from 'highcharts';
import HighchartsVue from 'highcharts-vue';

export default {
  install(app: App) {
    app.use(HighchartsVue);
  },
};