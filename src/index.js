import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ItemTemps from './components/ItemTemps.js';
import Form from './components/Form.js';
import { Canvas } from '@react-three/fiber';
import Cylinder3d from './components/ItemGlobe';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<div className='page-content'>
		{/* <Canvas camera={{ position: [0, 0, 2] }}>
			<pointLight position={[10, 10, 10]} />
			<ambientLight intensity={1} />
			<Cylinder3d
				position={[2, 0, 0]}
				wireframe={true}
			/>
		</Canvas> */}
		{/* <div className='nav-bar-left'></div> */}
		<div className='content-right'>
			<App />
		</div>
	</div>
);
