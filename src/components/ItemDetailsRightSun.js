import React from 'react';
import { scaleLinear } from 'd3-scale';
import { BsFillSunriseFill } from 'react-icons/bs';
import { BsFillSunsetFill } from 'react-icons/bs';

export default function ItemDetailsRightSun(props) {
	const orange = '#fa7e29';
	var hourConvert = props.heurelocale.replace(':', '.');
	const Gauge = ({ value = hourConvert, min = 0, max = 24, label, units }) => {
		// const backgroundArc = arc()
		// 	.innerRadius(0.95)
		// 	.outerRadius(1)
		// 	.startAngle(-Math.PI / 2)
		// 	.endAngle(Math.PI / 2)
		// 	.cornerRadius(1)();
		const percentScale = scaleLinear().domain([min, max]).range([0, 1]);
		const percent = percentScale(value);
		const angleScale = scaleLinear()
			.domain([0, 1])
			.range([-Math.PI / 2, Math.PI / 2])
			.clamp(true);
		const angle = angleScale(percent);
		// const filledArc = arc()
		// 	.innerRadius(0.95)
		// 	.outerRadius(1)
		// 	.startAngle(-Math.PI / 2)
		// 	.endAngle(angle)
		// 	.cornerRadius(1)();
		// const colorScale = scaleLinear()
		// 	.domain([0, 1])
		// 	.range(['#ffe372', '#fa7e29']);
		// const gradientSteps = colorScale
		// 	.ticks(10)
		// 	.map((value) => colorScale(value));
		const markerLocation = getCoordsOnArc(angle, 1 - (1 - 0.95) / 2);

		return (
			<svg
				style={{ overflow: 'visible' }}
				viewBox={[-1, -1, 2, 1].join(' ')}>
				{/*
					<defs>
						<linearGradient
							id='Gauge__gradient'
							gradientUnits='userSpaceOnUse'
							x1='-1'
							x2='1'
							y2='0'>
							{gradientSteps.map((color, index) => (
								<stop
									key={color}
									stopColor={color}
									offset={`${index / (gradientSteps.length - 1)}`}
								/>
							))}
						</linearGradient>
					</defs>
					 <path
						d={backgroundArc}
						fill='rgba(21, 39, 82, .5)'
						stroke='white'
						strokeWidth='0.01'
					/>
					<path
						d={filledArc}
						fill='url(#Gauge__gradient)'
					/> */}
				<circle
					cx={markerLocation[0] + 0.0}
					cy={markerLocation[1] - 0.04}
					r='0.1'
					stroke='white'
					strokeWidth='0.01'
					fill={orange}
				/>
			</svg>
		);
	};
	const getCoordsOnArc = (angle, offset = 10) => [
		Math.cos(angle - Math.PI / 2) * offset,
		Math.sin(angle - Math.PI / 2) * offset,
	];
	const calcAngleSunMax = () => {
		let formatHeure = props.heureMax.replace(':', '.');
		let prctHeure = (formatHeure / 24) * 100;
		// let prctHeure = (formatHeure / 25) * 100;
		let angleSunMax = (90 * prctHeure) / 100;
		let formatAngleSunMax = angleSunMax + 'deg';
		document
			.querySelector(':root')
			.style.setProperty('--angleMax', formatAngleSunMax);
		return angleSunMax;
	};

	calcAngleSunMax();

	return (
		<div className='details-right-sun pt-5 px-5'>
			<div className='sun-container mb-5'>
				<div className='dotted-sun'></div>
				<div
					className='bg-sun'
					id='bg-soleil'></div>
				{Gauge({})}
				<div className='gauge-track d-flex justify-content-between'>
					<div className='start'>
						<BsFillSunriseFill
							className='sunrise'
							size='2.3em'
							fill='#ffb700'
						/>
						<h2 className='h6 text-start mb-0'>{props.heureMin}</h2>
					</div>
					<div className='end'>
						<BsFillSunsetFill
							className='sunset'
							size='2.3em'
							fill='#1a2741'
						/>
						<h2 className='h6 text-end'>{props.heureMax}</h2>
					</div>
				</div>
			</div>
		</div>
	);
}
/*AIzaSyCPZR9qmY-UIY4X7zZPS3t6mhpKGJNeTv8*/
