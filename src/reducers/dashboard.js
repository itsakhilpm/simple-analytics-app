const dashboard = (state={graphData:[]}, action) =>{
    switch (action.type) {
		case 'CHART_DATA_FETCHED':
            const {
                payload:{ 
                    dataForGraphs,
                }
            } = action;
			return {
				...state,
                graphData:dataForGraphs,
			};
        case 'DATE_RANGE_FETCHED':
            const {
                payload:{
                    startDate,
                    endDate,
                }
            } = action;
            return {
                ...state,
                dateRange:{
                    startDate,
                    endDate,
                }
            }
		default:
			return state;
	}
}
export default dashboard;