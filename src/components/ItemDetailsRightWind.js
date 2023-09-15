import React from 'react';
import { TbWindsock } from 'react-icons/tb';
var windDir = '';
function degToCompass(num) {
	var val = Math.floor(num / 22.5 + 0.5);
	var arr = [
		'N',
		'NNE',
		'NE',
		'ENE',
		'E',
		'ESE',
		'SE',
		'SSE',
		'S',
		'SSO',
		'SW',
		'OSO',
		'O',
		'ONO',
		'NO',
		'NNO',
	];
	windDir = arr[val % 16];
	return windDir;
}
export default function ItemDetailsRightWind(props) {
	let windAng = props.wind.deg;
	degToCompass(windAng);
	let windMs = props.wind.speed;
	let windKmS = (windMs * 3.6).toFixed(2);
	return (
		<div className='card-pill px-0'>
			<div className='card-pill-content bg-white px-4 py-3 text-start rounded-4 d-flex align-items-center justify-content-between'>
				<div className='d-flex align-items-center'>
					<TbWindsock
						size='2.5em'
						className='me-3'
					/>

					<div className=''>
						<h2 className='mb-0'>
							{windKmS} <span className='fs-5'>km/h</span>
						</h2>
						<h4 className='fs-5'>Vitesse du vent</h4>
					</div>
				</div>

				{windDir ? <h4 className='fs-2'>{windDir} </h4> : <></>}
			</div>
		</div>
	);
}
