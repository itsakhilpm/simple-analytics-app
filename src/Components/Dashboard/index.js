import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Segment } from 'semantic-ui-react';

import { getDateRange } from '../../actions/dashboard';
import { dateRangeRequest } from '../../helpers/constants';
import { convertUnderScoreToSpace } from '../../helpers/utils';
import Chart from './Chart';
import DateSelector from './DateSelector';

function Dashboard() {
	const dispatch = useDispatch();
	const graphData = useSelector((state) => state.dashboard.graphData);
	const dateRange = useSelector((state) => state.dashboard.dateRange);

	const [dataforFirst, dataforSecond, dataForThird] = graphData;

	useEffect(() => {
		dispatch(getDateRange(dateRangeRequest));
	}, []);

	return (
		<Fragment>
			<Grid>
				<Grid.Row>
					<Grid.Column width={3}>
						<div className="side-bar"></div>
					</Grid.Column>
					<Grid.Column width={13}>
						<div className="dashboard-content">
							<Segment className="top-bar">
								<DateSelector
									dateRange={dateRange}
								/>
							</Segment>
							<Grid>
								<Grid.Row>
									{dataforFirst && dataforFirst.length && (
										<Grid.Column width={16}>
											<Segment className="mb-3">
												<h3>
													{' '}
													Publishers vs Impressions
												</h3>
												<Chart
													xValues={dataforFirst.map(
														(i) =>
															convertUnderScoreToSpace(
																i.publisherId
															)
													)}
													yValues={dataforFirst.map(
														(i) =>
															i.impressions_offered
													)}
													label={
														'Publishers x Impressions'
													}
													type={'Bar'}
												/>
											</Segment>
										</Grid.Column>
									)}
									{dataforSecond && dataforSecond.length && (
										<Grid.Column width={16}>
											<Segment className="mb-3">
												<h3>
													{' '}
													App sites vs Impressions
												</h3>

												<Chart
													xValues={dataforSecond.map(
														(i) =>
															convertUnderScoreToSpace(
																i.appSiteId
															)
													)}
													yValues={dataforSecond.map(
														(i) =>
															i.impressions_offered
													)}
													label={
														'App Sites x Impressions'
													}
													type={'Bar'}
												/>
											</Segment>
										</Grid.Column>
									)}
									{dataForThird && dataForThird.length && (
										<Grid.Column width={8}>
											<Segment className="mb-3">
												<h3>
													{' '}
													Advertisers vs CM001
													percentage
												</h3>

												<Chart
													xValues={dataForThird.map(
														(i) =>
															convertUnderScoreToSpace(
																i.advertiserId
															)
													)}
													yValues={dataForThird.map(
														(i) => i.CM001_percent
													)}
													label={
														'Advertisers x Impressions'
													}
													type={'doughnut'}
												/>
											</Segment>
										</Grid.Column>
									)}
								</Grid.Row>
							</Grid>
						</div>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Fragment>
	);
}
export default Dashboard;
