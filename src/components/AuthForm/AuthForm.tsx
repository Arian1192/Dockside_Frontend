import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { login, register as registerUser } from '../../_utils/authApi';

export interface Inputs {
	name: string;
	email: string;
	password: string;
	passwordCheck?: string;
}

export interface RegisterData {
	name: string;
	email: string;
	password: string;
}

export interface LoginData {
	email: string;
	password: string;
}

export function AuthForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
	} = useForm<Inputs>();

	const authMutation = useMutation({
		mutationFn: registerUser,
		onError: (error) => handleAuthError(error),
		onSuccess: () =>
			handleAuthSuccess(
				'You have been registered successfully',
				'You can now login to your account'
			),
	});

	const authLoginMutation = useMutation({
		mutationFn: login,
		onError: (error) => handleAuthError(error),
		onSuccess: () =>
			handleAuthSuccess(
				'You have been logged in successfully',
				'You can now use Dockside'
			),
	});

	const handleAuthError = (error: any) => {
		toast('An error occurred, please try again 😢', {
			description: error.message,
		});
	};

	const handleAuthSuccess = (successMessage: string, description: string) => {
		toast(successMessage, { description });
		reset();
	};

	const onSubmitRegister: SubmitHandler<any> = (data) => {
		const { name, email, password } = data;
		authMutation.mutate({ name, email, password });
	};

	const onSubmitLogin: SubmitHandler<any> = (data) => {
		const { email, password } = data;
		authLoginMutation.mutate({ email, password });
	};

	const password = watch('password');

	const [activeTab, setActiveTab] = useState('signin');

	return (
		<Tabs
			value={activeTab}
			onValueChange={(value) => setActiveTab(value)}
			className="w-[400px]"
		>
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="signin">Sign in</TabsTrigger>
				<TabsTrigger value="register">Register</TabsTrigger>
			</TabsList>
			<TabsContent value="signin">
				<Card>
					<CardHeader>
						<CardTitle>Sign in</CardTitle>
						<CardDescription>Sign in to your account 🚪</CardDescription>
					</CardHeader>
					<form onSubmit={handleSubmit(onSubmitLogin)}>
						<CardContent className="space-y-2">
							<div className="space-y-1">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									placeholder="Jhondoe@dockside.com"
									{...register('email', { required: true })}
									autoComplete="email"
								/>
							</div>
							<div className="space-y-1">
								<Label htmlFor="password">Password</Label>
								<Input
									type="password"
									id="password"
									placeholder="********"
									{...register('password', { required: true })}
									autoComplete="password"
								/>
							</div>
						</CardContent>
						<CardFooter>
							<Button className="w-full" type="submit">
								Sign in
							</Button>
						</CardFooter>
					</form>
				</Card>
			</TabsContent>
			<TabsContent value="register">
				<Card>
					<CardHeader>
						<CardTitle>Register</CardTitle>
						<CardDescription>
							Here you can register to your account to use Dockside 🚀
						</CardDescription>
					</CardHeader>
					<form onSubmit={handleSubmit(onSubmitRegister)}>
						<CardContent className="space-y-2">
							<div className="space-y-1">
								<Label htmlFor="name">Name</Label>
								<Input
									id="name"
									type="text"
									{...register('name', { required: true })}
									autoComplete="name"
								/>
							</div>
							<div className="space-y-1">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									{...register('email', { required: true })}
									autoComplete="new-email"
								/>
							</div>
							<div className="space-y-1">
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									type="password"
									autoComplete="new-password"
									{...register('password', { required: true })}
								/>
							</div>
							<div className="space-y-1">
								<Label htmlFor="password-repeat">Repeat password</Label>
								<Input
									id="password-repeat"
									type="password"
									autoComplete="new-password"
									{...register('passwordCheck', {
										required: 'Please confirm your password',
										validate: (value) =>
											value === password || 'Passwords do not match',
									})}
								/>
								{errors.passwordCheck && (
									<span className="text-sm text-red-500">
										{errors.passwordCheck.message}
									</span>
								)}
							</div>
						</CardContent>
						<CardFooter>
							<Button className="w-full" type="submit">
								Register
							</Button>
						</CardFooter>
					</form>
				</Card>
			</TabsContent>
		</Tabs>
	);
}


//TODO: Conservar la estructura del Formulario pero cambiar de Card a Form en shadcn.
