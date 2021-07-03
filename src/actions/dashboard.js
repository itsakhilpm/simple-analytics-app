import http from '../services/http';
import {
	requestPayloadOne,
	requestPayloadTwo,
	requestPayloadThree,
} from '../helpers/constants';

const actionTypes = {
	DATE_RANGE_FETCHED: 'DATE_RANGE_FETCHED',
	CHART_DATA_FETCHED: 'CHART_DATA_FETCHED',
};

const getDateRange = (requestObj) => (dispatch) => {
	return http.post(`/api/v1/getDateRange`, requestObj).then((data) => {
		const { result } = data;
		dispatch({
			payload: {
				startDate: result.startDate,
				endDate: result.endDate,
			},
			type: actionTypes.DATE_RANGE_FETCHED,
		});
		const dateRange = {
			startDate: result.startDate,
			endDate: result.endDate,
		};
		requestPayloadOne.chartObject.requestParam.dateRange = dateRange;
		requestPayloadTwo.chartObject.requestParam.dateRange = dateRange;
		requestPayloadThree.chartObject.requestParam.dateRange = dateRange;
		dispatch(
			fetchChartData(
				requestPayloadOne,
				requestPayloadTwo,
				requestPayloadThree
			)
		);
	});
};
const fetchChartData = (reqOneObj, reqTwoObj, reqThreeObj) => (dispatch) => {
	const url = `/api/v1/getData`;
	const firstChartData = http.post(url, reqOneObj);
	const secondChartData = http.post(url, reqTwoObj);
	const thirdChartData = http.post(url, reqThreeObj);
	Promise.all([firstChartData, secondChartData, thirdChartData])
		.then((result) => {
			const [firstResult, secondResult, thirdResult] = result;
			if (
				firstResult.result &&
				secondResult.result &&
				thirdResult.result
			) {
				dispatch({
					payload: {
						dataForGraphs: [
							firstResult.result.data,
							secondResult.result.data,
							thirdResult.result.data,
						],
					},
					type: actionTypes.CHART_DATA_FETCHED,
				});
			}
		})
		.catch((error) => {});
};

export { getDateRange, fetchChartData };
