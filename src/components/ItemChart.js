import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import {
	BsFillCloudRainFill,
	BsFillSunFill,
	BsFillCloudFill,
	BsFillCloudRainHeavyFill,
	BsCloudLightningRainFill,
	BsFillCloudSnowFill,
	BsFillCloudHazeFill,
} from 'react-icons/bs';
import { CgThermostat } from 'react-icons/cg';
const CustomizedDot = (props) => {
	const { cx, cy, stroke, payload, value, amt } = props;

	if (props.payload.amt == '01d' || props.payload.amt == '01n') {
		// clear sky
		return (
			<>
				<BsFillSunFill
					x={cx - 8}
					y={cy - 10}
					size='2.2em'
					fill='#fa7e29'
				/>

				<svg
					x={cx - 10}
					y={cy - 10}
					width={50}
					height={50}
					fill='#e9eeee'
					strokeWidth='0'
					viewBox='0 0 16 16'>
					<circle
						r='2'
						cy='3.1'
						cx='3.1'
						fill='white'
						stroke='#fa7e29'
						strokeWidth='1px'
					/>
				</svg>
			</>
		);
	} else if (props.payload.amt == '02d' || props.payload.amt == '02n') {
		// few clouds
		return (
			<>
				<svg
					viewBox='0 0 16 16'
					x={cx - 5}
					y={cy - 10}
					height='2.2em'
					width='2.2em'>
					<path
						fill='#909090'
						d='M11.473 11a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5h-.027z'></path>
					<path
						fill='#fa7e29'
						d='M10.5 1.5a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0v-1zm3.743 1.964a.5.5 0 1 0-.707-.707l-.708.707a.5.5 0 0 0 .708.708l.707-.708zm-7.779-.707a.5.5 0 0 0-.707.707l.707.708a.5.5 0 1 0 .708-.708l-.708-.707zm1.734 3.374a2 2 0 1 1 3.296 2.198c.199.281.372.582.516.898a3 3 0 1 0-4.84-3.225c.352.011.696.055 1.028.129zm4.484 4.074c.6.215 1.125.59 1.522 1.072a.5.5 0 0 0 .039-.742l-.707-.707a.5.5 0 0 0-.854.377zM14.5 6.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z'></path>
				</svg>
				<svg
					x={cx - 10}
					y={cy - 10}
					width={50}
					height={50}
					fill='#e9eeee'
					strokeWidth='0'
					viewBox='0 0 16 16'>
					<circle
						r='2'
						cy='3.1'
						cx='3.1'
						fill='white'
						stroke='#fa7e29'
						strokeWidth='1px'
					/>
				</svg>
			</>
		);
	} else if (props.payload.amt == '03d' || props.payload.amt == '03n') {
		//scattered clouds
		return (
			<>
				<BsFillCloudFill
					x={cx - 8}
					y={cy - 10}
					size='2.2em'
					fill='#909090'
				/>
				<svg
					x={cx - 10}
					y={cy - 10}
					width={50}
					height={50}
					fill='#e9eeee'
					strokeWidth='0'
					viewBox='0 0 16 16'>
					<circle
						r='2'
						cy='3.1'
						cx='3.1'
						fill='white'
						stroke='#fa7e29'
						strokeWidth='1px'
					/>
				</svg>
			</>
		);
	} else if (props.payload.amt == '04d' || props.payload.amt == '04n') {
		// broken clouds
		return (
			<>
				<svg
					viewBox='0 0 16 16'
					x={cx - 5}
					y={cy - 10}
					height='2.2em'
					width='2.2em'>
					<path
						fill='#909090'
						d='M11.473 9a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 14h8.5a2.5 2.5 0 1 0-.027-5z'></path>
					<path
						fill='#5c5c5c'
						d='M14.544 9.772a3.506 3.506 0 0 0-2.225-1.676 5.502 5.502 0 0 0-6.337-4.002 4.002 4.002 0 0 1 7.392.91 2.5 2.5 0 0 1 1.17 4.769z'></path>
				</svg>
				<svg
					x={cx - 10}
					y={cy - 10}
					width={50}
					height={50}
					fill='#e9eeee'
					strokeWidth='0'
					viewBox='0 0 16 16'>
					<circle
						r='2'
						cy='3.1'
						cx='3.1'
						fill='white'
						stroke='#fa7e29'
						strokeWidth='1px'
					/>
				</svg>
				<svg
					x={cx - 10}
					y={cy - 10}
					width={50}
					height={50}
					fill='#e9eeee'
					strokeWidth='0'
					viewBox='0 0 16 16'>
					<circle
						r='2'
						cy='3.1'
						cx='3.1'
						fill='white'
						stroke='#fa7e29'
						strokeWidth='1px'
					/>
				</svg>
			</>
		);
	} else if (props.payload.amt == '09d' || props.payload.amt == '09n') {
		// shower rain
		return (
			<>
				<BsFillCloudRainFill
					x={cx - 8}
					y={cy - 10}
					size='2.2em'
					fill='#909090'
				/>

				<svg
					x={cx - 10}
					y={cy - 10}
					width={50}
					height={50}
					fill='#e9eeee'
					strokeWidth='0'
					viewBox='0 0 16 16'>
					<circle
						r='2'
						cy='3.1'
						cx='3.1'
						fill='white'
						stroke='#fa7e29'
						strokeWidth='1px'
					/>
				</svg>
			</>
		);
	} else if (props.payload.amt == '10d' || props.payload.amt == '10n') {
		//	rain
		return (
			<>
				<BsFillCloudRainHeavyFill
					x={cx - 8}
					y={cy - 10}
					size='2.2em'
					fill='#909090'
				/>
				<svg
					x={cx - 10}
					y={cy - 10}
					width={50}
					height={50}
					fill='#e9eeee'
					strokeWidth='0'
					viewBox='0 0 16 16'>
					<circle
						r='2'
						cy='3.1'
						cx='3.1'
						fill='white'
						stroke='#fa7e29'
						strokeWidth='1px'
					/>
				</svg>
			</>
		);
	} else if (props.payload.amt == '11d' || props.payload.amt == '11n') {
		//	thunderstorm
		return (
			<>
				<BsCloudLightningRainFill
					x={cx - 8}
					y={cy - 10}
					size='2.2em'
					fill='#5c5c5c'
				/>
				<svg
					x={cx - 10}
					y={cy - 10}
					width={50}
					height={50}
					fill='#e9eeee'
					strokeWidth='0'
					viewBox='0 0 16 16'>
					<circle
						r='2'
						cy='3.1'
						cx='3.1'
						fill='white'
						stroke='#fa7e29'
						strokeWidth='1px'
					/>
				</svg>
			</>
		);
	} else if (props.payload.amt == '13d' || props.payload.amt == '13n') {
		//	Snow
		return (
			<>
				<BsFillCloudSnowFill
					x={cx - 8}
					y={cy - 10}
					size='2.2em'
					fill='#c3c3c3'
				/>
				<svg
					x={cx - 10}
					y={cy - 10}
					width={50}
					height={50}
					fill='#e9eeee'
					strokeWidth='0'
					viewBox='0 0 16 16'>
					<circle
						r='2'
						cy='3.1'
						cx='3.1'
						fill='white'
						stroke='#fa7e29'
						strokeWidth='1px'
					/>
				</svg>
			</>
		);
	} else if (props.payload.amt == '50d' || props.payload.amt == '50n') {
		//	Mist
		return (
			<>
				<BsFillCloudHazeFill
					x={cx - 8}
					y={cy - 10}
					size='2.2em'
					fill='#c3c3c3'
				/>
				<svg
					x={cx - 10}
					y={cy - 10}
					width={50}
					height={50}
					fill='#e9eeee'
					strokeWidth='0'
					viewBox='0 0 16 16'>
					<circle
						r='2'
						cy='3.1'
						cx='3.1'
						fill='white'
						stroke='#fa7e29'
						strokeWidth='1px'
					/>
				</svg>
			</>
		);
	} else {
		return (
			<>
				<BsFillSunFill
					x={cx - 8}
					y={cy - 10}
					size='2.2em'
					fill='#fa7e29'
				/>

				<svg
					x={cx - 10}
					y={cy - 10}
					width={50}
					height={50}
					fill='#e9eeee'
					strokeWidth='0'
					viewBox='0 0 16 16'>
					<circle
						r='2'
						cy='3.1'
						cx='3.1'
						fill='white'
						stroke='#fa7e29'
						strokeWidth='1px'
					/>
				</svg>
			</>
		);
	}
};
let tempsJ1 = '';
let meteoJ1 = '';
let tempsJ2 = '';
let meteoJ2 = '';
let tempsJ3 = '';
let meteoJ3 = '';
let semaine = [];
let classIndicatorJ1 = '';
let classIndicatorJ2 = '';
let classIndicatorJ3 = '';
export default function ItemChart(props) {
	if (props.objQuery?.list) {
		tempsJ1 = props.objQuery.list[0].main.temp;
		meteoJ1 = props.objQuery.list[0].weather[0].description;
		tempsJ2 = props.objQuery.list[1].main.temp;
		meteoJ2 = props.objQuery.list[1].weather[0].description;
		tempsJ3 = props.objQuery.list[2].main.temp;
		meteoJ3 = props.objQuery.list[2].weather[0].description;
		semaine = props.semaine;
		classIndicatorJ1 = props.objQuery.list[0].weather[0].icon;
		classIndicatorJ2 = props.objQuery.list[1].weather[0].icon;
		classIndicatorJ3 = props.objQuery.list[2].weather[0].icon;
	}
	const data = [
		{
			name: '',
			degres: tempsJ1,
		},
		{
			name: semaine[0],
			degres: tempsJ1,
			amt: classIndicatorJ1,
		},
		{
			name: semaine[1],
			degres: tempsJ2,
			amt: classIndicatorJ2,
		},
		{
			name: semaine[2],
			degres: tempsJ3,
			amt: classIndicatorJ3,
		},
		{
			name: '',
			degres: tempsJ3,
		},
	];

	return (
		<div className='card rounded-5 p-3 h-100 chart-card'>
			<div className='py-4 ps-4 pe-0'>
				<div className='card-head mb-5'>
					<div className='card-icon rounded-circle'>
						<CgThermostat />
					</div>
					<div className='ms-3 text-start'>
						<h4 className='card-title'>Nos prédictions météo </h4>
						<h6 className='card-subtitle mb-2 text-muted'>Sur 3 jours</h6>
					</div>
				</div>

				<ResponsiveContainer
					className='chart'
					width='100%'
					height='100%'>
					<LineChart
						width={500}
						height={300}
						data={data}
						margin={{
							top: 5,
							right: 30,
							left: 20,
							bottom: 5,
						}}>
						<XAxis
							dataKey='name'
							axisLine={false}
						/>
						<YAxis
							type='number'
							domain={[20, 10]}
							tick={false}
							hide
						/>
						<Line
							unit='°C'
							type='monotone'
							dataKey='degres'
							stroke='#fa7e29'
							fill='#fa7e29'
							strokeWidth={3}
							dot={<CustomizedDot />}
						/>
						<Tooltip wrapperStyle={{ zIndex: 1000 }} />
					</LineChart>
				</ResponsiveContainer>
				<div className='row chart-labels-group'></div>
			</div>
		</div>
	);
}
/*AIzaSyCPZR9qmY-UIY4X7zZPS3t6mhpKGJNeTv8*/
