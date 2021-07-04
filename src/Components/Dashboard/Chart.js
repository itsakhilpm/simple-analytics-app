import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { PropTypes } from 'prop-types';
import { getRandomColor } from '../../helpers/utils';

const Chart = (props) => {
	const { label, type, xValues, yValues } = props;
	const colorArray = xValues.map(() => getRandomColor());
	const data = {
		labels: xValues,
		datasets: [
			{
				label: label,
				data: yValues,
				backgroundColor: [...colorArray],
				borderColor: [...colorArray],
				borderWidth: 1,
			},
		],
	};

	const options = {
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true,
					},
				},
			],
		},
	};

	return (
		<>
			{type === 'Bar' ? (
				<Bar data={data} options={options} />
			) : (
				<Doughnut data={data} />
			)}
		</>
	);
};
Chart.defaultProps = {
	xValues: [],
	yValues: [],
	label: '',
};

Chart.propTypes = {
	xValues: PropTypes.array,
	yValues: PropTypes.array,
	label: PropTypes.string,
};
export default Chart;
