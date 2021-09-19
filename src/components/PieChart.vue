
<script>
import { Pie } from 'vue-chartjs'

export default {
    extends: Pie,
    props: {
        title:{
            type: String
        },
        labels:{
            type: Array
        },
        chartdata: {
            type: Array,
        default: null
    },
    options: {
        type: Object,
        default: null
    }
  },
  mounted () {
      this.renderChart({
            labels: this.labels,
            datasets: [{
                label: this.title,
                data: this.chartdata,
                backgroundColor: [
                    '#F8F9FA',
                    '#28A745',
                    '#17A2B8',
                    '#DC3545',
                    '#FFC107',
                ],
                borderWidth: 1
        }]
      }, this.options)
  }
}

</script>
