import ItemDetailsRightSun from './ItemDetailsRightSun.js';
import ItemDetailsRightWind from './ItemDetailsRightWind.js';
import { BsSmartwatch } from 'react-icons/bs';

export default function ItemDetailsRight(props) {
	const tempsJ1 = props.tempsJ1;
	console.log(props);
	const tempsJ1Split = tempsJ1.toString().split('.');
	return (
		<div className='details-right h-100 w-100 p-5'>
			<div className='details-right-head d-flex justify-content-between align-items-center mb-5 pb-5'>
				<div>
					<h4 className='h2 text-start'>{props.ville}</h4>
					<h5 className='text-start mb-0 fw-normal'>{props.meteoJ1}</h5>
				</div>
				<div>
					<h4 className='h1 text-start'>{tempsJ1Split[0] + '°C'}</h4>
				</div>
			</div>
			<div className='row'>
				<div className='col-12 col-xl-12 col-sm-4 order-xl-0 order-1 flex-fill'>
					<ItemDetailsRightSun
						heurelocale={props.heure}
						heureMin={props.hourMin}
						heureMax={props.hourMax}
					/>
				</div>
				<div className='col-12 col-xl-12 col-sm-4 mb-5 order-xl-1 order-0'>
					<div className='card-pill px-0'>
						<div className='card-pill-content px-4 py-3 text-start rounded-4 d-flex align-items-center mb-5'>
							<BsSmartwatch
								fill='#fa7e29'
								size='2.2em'
								className='me-3'
							/>

							<div className=''>
								<h2 className='text-white mb-0'>{props.heure}</h2>
								<h4 className='fs-5 text-white'>Heure locale </h4>
							</div>
						</div>
						{props ? <ItemDetailsRightWind wind={props.wind} /> : <></>}
					</div>
				</div>
			</div>
		</div>
	);
}
