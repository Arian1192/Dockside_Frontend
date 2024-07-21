'use client';
import { useSocketContext } from '@/_context/SocketContext';
import React, { useRef, useState } from 'react';
import { VncScreen } from 'react-vnc';



export const VncViewer = () => {
	const [localAddress, setLocalAddress] = useState<string | undefined>(
		undefined
	);
		const { ip } = useSocketContext();
	console.log("ip", ip)

	const [error, setError] = useState<string | null>(null);
	const ref = useRef(null);

	return (
		<div>
			<div style={{ width: '100%', height: '100vh' }}>
				{error && <div className="text-red-500">{error}</div>}
				{localAddress && <>{`Ip : ${localAddress}`}</>}
				<VncScreen
					url={`ws://${ip}:6080`}
					scaleViewport
					background="#000000"
					style={{
						width: '75vw',
						height: '75vh',
					}}
					ref={ref}
				/>
			</div>
		</div>
	);
};
