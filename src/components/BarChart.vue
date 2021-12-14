
<script>
import { Bar } from 'vue-chartjs'

export default {
    extends: Bar,
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
  data: () => {
      return {
          colors: []
      }
  },
  methods: {
    getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
  },
  mounted () {
      this.colors = this.chartdata.map(() => this.getRandomColor())
      this.renderChart({
            labels: this.labels,
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                    }
                }]
            },
            datasets: [{
                label: this.title,
                data: this.chartdata,
                backgroundColor: [
                    '#F8F9FA',
                    '#28A745',
                    '#17A2B8',
                    '#DC3545',
                    '#FFC107',
                    ...this.colors

                ],
            borderWidth: 1
        }]
      }, { ...this.options, 
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }})
  }
}

</script>
