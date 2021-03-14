<script>
import { Line } from 'vue-chartjs'
import { mapActions, mapState } from 'vuex'

export default {
	extends: Line,

	props: {
		clientId: { type: Number },
		styles: { type: Object, default: () => { return {
			height: '60vh'
			}
		}},
	},

	mounted()
	{
		this.storeConsultList(this.clientId);
		this.refresh();
	},

	watch: {
		consults() { this.refresh(); }
	},
	methods: {
		refresh()
		{
			if (this.consults == null || this.consults.length == 0) return;

			const chartdata = {
				labels: [ ],
				datasets: [
					{
						label: 'Etat courant',
						borderColor: '#8500a5',
						fill: false,
						data: []
					},
					{
						label: 'Senti immédiat',
						borderColor: '#2082ff',
						fill: false,
						data: []
					},
					{
						label: 'Senti post-seance',
						borderColor: '#00a561',
						fill: false,
						data: []
					}
				]
			};

			for (let i in this.consults)
			{
				const consult = this.consults[i];
				chartdata.labels.push(this.$d(new Date(consult.date), 'short') );

				let levels = [consult.currentClientLevel, consult.reportClientLevel, consult.reportClientPostConsultLevel];
				for(let j in levels)
				{
					let val = levels[j];
					if (val == null) chartdata.datasets[j].data.push(null);
					else chartdata.datasets[j].data.push(4 - val);
				}
			}

			const options = {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					yAxes: [{
						gridLines: {
							drawBorder: false,
							drawOnChartArea: true,
							lineWidth: 30,
							zeroLineWidth: 30,
							zeroLineColor: '#03c31450',
							color: [ '' ,'#4ec55850', '#3569ff50','#ef6f0050']

						},
						ticks: {
							max: 4,
							min: 0,
							stepSize: 1,
							fontSize: 25
						},
						type: 'category',
						labels: [':D', ':)', ':|', ':(', '?'],
					}]
				},
				legend: {
					position: 'bottom'
				}
			};

		
			this.renderChart(chartdata, options);
		},
		...mapActions({
			storeConsultList: 'consult/list',
		}),
	},

	computed: {
		...mapState({
			consults: state => state.consult.consults,
		})
	}
}
</script>