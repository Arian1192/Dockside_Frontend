import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { login, register as registerUser } from '../../_utils/authApi';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { setAccesTokenToLocalStorage } from '@/_utils';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/_context/AuthContext';

const RegisterSchema = z.object({
	name: z.string().min(2),
	email: z.string().email(),
	password: z.string().min(6),
	passwordCheck: z.string().min(6),
});

const LoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

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
	const router = useRouter();
	const [activeTab, setActiveTab] = useState('signin');
	const registerForm = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			passwordCheck: '',
		},
	});

	const loginForm = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});
	const { reset } = loginForm;

	const { setUser } = useAuthContext();

	function onSubmitRegisterForm(values: z.infer<typeof RegisterSchema>) {
		console.log(values);
		if (values.password !== values.passwordCheck) {
			console.log('Passwords do not match');
			handleAuthError('Passwords do not match');
			return;
		} else {
			authMutation.mutate(
				{ name: values.name, email: values.email, password: values.password },
				{
					onSuccess: () => {
						handleAuthSuccess(
							'You have been registered successfully',
							'You can now login to your account'
						);
					},
					onError: (error) => handleAuthError(error.message),
				}
			);
		}
		console.log(values);
	}

	function onSubmitLoginForm(values: z.infer<typeof LoginSchema>) {
		authLoginMutation.mutate(
			{
				email: values.email,
				password: values.password,
			},
			{
				onSuccess: (data) => {
					console.log(data);
					setAccesTokenToLocalStorage(data.data.access_token);
					handleAuthSuccess(
						'You have been logged in successfully',
						'You can now use Dockside'
					);
					router.push('/tickets');
				},
			}
		);
	}

	const authMutation = useMutation({
		mutationFn: registerUser,
		onSuccess: () =>
			handleAuthSuccess(
				'You have been registered successfully',
				'You can now login to your account'
			),
	});

	const authLoginMutation = useMutation({
		mutationFn: login,
		onError: (error) => handleAuthError(error.message, "Couldn't log you in"),
		onSuccess: () => {
			return reset();
		},
	});

	const handleAuthError = (errorMessage: string, description?: string) => {
		console.error(errorMessage);
		toast(errorMessage, {
			description: description || 'An error occurred',
			cancel: true,
			duration: 3000,
		});
		reset();
	};

	const handleAuthSuccess = (successMessage: string, description: string) => {
		toast(successMessage, {
			description,
			cancel: true,
			duration: 3000,
		});
		reset();
	};

	return (
		<div className="h-screen relative w-full overflow-hidden bg-white flex flex-col items-center justify-center rounded-lg">
			<Tabs
				value={activeTab}
				onValueChange={(value) => setActiveTab(value)}
				className={cn('z-20 w-[400px]')}
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
						<CardContent>
							<Form {...loginForm}>
								<form onSubmit={loginForm.handleSubmit(onSubmitLoginForm)}>
									<FormField
										control={loginForm.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														placeholder="Maxine@dockside.com"
														autoComplete="email"
														{...field}
													/>
												</FormControl>
												<FormDescription>
													This is the email you used to register
												</FormDescription>
											</FormItem>
										)}
									/>
									<FormField
										control={loginForm.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Password</FormLabel>
												<FormControl>
													<Input
														placeholder="************"
														autoComplete="password"
														type="password"
														{...field}
													/>
												</FormControl>
												<FormDescription>
													Please enter your password
												</FormDescription>
											</FormItem>
										)}
									/>
									<Button type="submit" className="w-full mt-10">
										Sign in
									</Button>
								</form>
							</Form>
						</CardContent>
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
						<CardContent>
							<Form {...registerForm}>
								<form
									onSubmit={registerForm.handleSubmit(onSubmitRegisterForm)}
								>
									<FormField
										control={registerForm.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Name</FormLabel>
												<FormControl>
													<Input
														placeholder="Maxine"
														autoComplete="name"
														{...field}
													/>
												</FormControl>
												<FormDescription>
													Please enter your name
												</FormDescription>
											</FormItem>
										)}
									/>
									<FormField
										control={registerForm.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														placeholder="Maxine@dockside.com"
														autoComplete="email"
														{...field}
													/>
												</FormControl>
												<FormDescription>
													This is the email you used to register
												</FormDescription>
											</FormItem>
										)}
									/>
									<FormField
										control={registerForm.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Password</FormLabel>
												<FormControl>
													<Input
														placeholder="************"
														type="password"
														autoComplete="password"
														{...field}
													/>
												</FormControl>
												<FormDescription>
													Please enter your password
												</FormDescription>
											</FormItem>
										)}
									/>
									<FormField
										control={registerForm.control}
										name="passwordCheck"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Password</FormLabel>
												<FormControl>
													<Input
														placeholder="************"
														type="password"
														autoComplete="repeat-password"
														{...field}
													/>
												</FormControl>
												<FormDescription>
													Please enter your password again
												</FormDescription>
											</FormItem>
										)}
									/>
									<Button type="submit" className="w-full mt-10">
										Register
									</Button>
								</form>
							</Form>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
function jwtDecode(access_token: any) {
	throw new Error('Function not implemented.');
}
