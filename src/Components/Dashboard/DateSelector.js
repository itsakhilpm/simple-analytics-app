import React, { useState, useEffect } from 'react';
import { fetchChartData } from '../../actions/dashboard';
import { Icon } from 'semantic-ui-react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useDispatch } from 'react-redux';

import {
	requestPayloadOne,
	requestPayloadTwo,
	requestPayloadThree,
} from '../../helpers/constants';

function DateSelector(props) {
	const { dateRange } = props;
	const dispatch = useDispatch();
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [selectionRange, setSelectionRange] = useState({
		startDate: new Date(),
		endDate: new Date(),
		key: 'selection',
	});
	useEffect(() => {
		if (dateRange && dateRange.startDate && dateRange.endDate) {
			setSelectionRange({
				startDate: new Date(Number(dateRange.startDate)),
				endDate: new Date(Number(dateRange.endDate)),
				key: 'selection',
			});
		}
	}, [dateRange]);
	const handleSelect = (ranges) => {
		const {
			selection: { startDate, endDate },
		} = ranges;
		setSelectionRange({
			startDate: new Date(startDate),
			endDate: new Date(endDate),
			key: 'selection',
		});
		if (startDate.getTime() !== endDate.getTime()) {
			const newDateRange = {
				startDate: startDate.getTime().toString(),
				endDate: endDate.getTime().toString(),
			};
			requestPayloadOne.chartObject.requestParam.dateRange = newDateRange;
			requestPayloadTwo.chartObject.requestParam.dateRange = newDateRange;
			requestPayloadThree.chartObject.requestParam.dateRange =
				newDateRange;
			dispatch(
				fetchChartData(
					requestPayloadOne,
					requestPayloadTwo,
					requestPayloadThree
				)
			);
		}
	};
	return (
		<span>
			Select date range{' '}
			<Icon
				name="calendar alternate"
				onClick={() => {
					setShowDatePicker(!showDatePicker);
				}}
			/>
			{showDatePicker && (
				<DateRangePicker
					ranges={[selectionRange]}
					onChange={handleSelect}
					minDate={new Date(Number(dateRange.startDate))}
					maxDate={new Date(Number(dateRange.endDate))}
				/>
			)}
		</span>
	);
}
export default DateSelector;
