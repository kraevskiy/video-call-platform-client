'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { JoinMeetingInputs, JoinMeetingValidationSchema } from '@/types/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

export function JoinMeetingWidget() {
	const {register, handleSubmit, watch} = useForm<JoinMeetingInputs>({
		mode: 'onBlur',
		defaultValues: {
			code: ''
		},
		resolver: zodResolver(JoinMeetingValidationSchema)
	});
	const watchCode = watch('code');

	const onSubmit: SubmitHandler<JoinMeetingInputs> = async (data) => {
		console.log(data);
	}
	const onError: SubmitErrorHandler<JoinMeetingInputs> = async (data) => {
		console.log(data);
		toast.error(data.code?.message || "")
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit, onError)} className="grid gap-3 sm:grid-cols-[3fr,1fr] items-center">
				<Input
					className="text-md h-11 sm:rounded-2xl"
					placeholder="Enter code"
					maxLength={18}
					{...register('code')}
				/>
				<Button className="sm:rounded-2xl" type="submit">Join</Button>
			</form>
			<div className="ml-2 mt-1 text-sm">{watchCode.length}/18</div>
		</>
	);
}
