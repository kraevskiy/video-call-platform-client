'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useInterval } from 'usehooks-ts';
import dayjs from 'dayjs';

export default function Time({className}: {
	className?: string;
}) {
	const [time, setTime] = useState("");

	useInterval(() => {
		setTime(dayjs().format("HH:mm | ddd, MMM D"))
	}, 1000)

	return (
		<span className={cn("text-md sm:text-lg", className)}>
			{time}
		</span>
	)
}
