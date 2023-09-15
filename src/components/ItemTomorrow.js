import illu from '../rain-4.png';
export default function ItemTomorrow(props) {
	const ville = props.ville;
	const villeSplit = ville.split(',');
	return (
		<div className='tomorrow-card px-4 py-4 d-flex flex-column justify-content-between rounded-5 position-relative'>
			<img
				className='position-absolute'
				src={illu}
				alt=''
			/>
			<div>
				<p className='text-start mb-0'>Demain</p>
				<h4 className='h2 text-start'>{villeSplit[0]}</h4>
			</div>
			<div>
				<h4 className='h1 text-start'>{props.degreesJ2}°C</h4>
				<p className='p text-start'>{props.meteoJ2}</p>
			</div>
		</div>
	);
}
/*AIzaSyCPZR9qmY-UIY4X7zZPS3t6mhpKGJNeTv8*/
