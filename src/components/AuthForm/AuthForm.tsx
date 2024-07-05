import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {useForm, SubmitHandler} from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import  authApi from '../../_utils/authApi';

export interface Inputs {
  name: string;
  email: string;
  password: string;
  passwordCheck: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData{
  email: string;
  password: string;
}


export function AuthForm() {
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch
  } = useForm<Inputs>();

  const authMutation = useMutation({
    mutationFn: authApi.register
  })

  const authLoginMutation = useMutation({
    mutationFn: authApi.login
  })

  const onSubmit: SubmitHandler<Inputs> = data =>  {
    if(data.passwordCheck){
      console.log(data)
      const { passwordCheck, ...registerData } = data;
      authMutation.mutate(registerData)
    }else{
      // significa que es login por que entra el passwordChek
      authLoginMutation.mutate(data)
    }
    
    
  }
  const password = watch("password")
  return (
    <Tabs defaultValue="signin" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signin">Sign in</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="signin">
        <Card>
          <CardHeader>
            <CardTitle>Sing in</CardTitle>
            <CardDescription>
                Sign in to your account 🚪
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Jhondoe@dockside.com" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" placeholder="********" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Sign in</Button>
          </CardFooter>
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
          <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" {...register("name", { required: true })} autoComplete="" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email", { required: true})} autoComplete="" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register("password", { required: true }) }/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="password-repeat">Repeat password</Label>
              <Input id="password-repeat" type="password"  {...register("passwordCheck", {
              required: "Please confirm your password",
              validate: value => value === password || "Passwords do not match"
              })}/>
              {errors.passwordCheck && <p className="text-red-500">{errors.passwordCheck.message}</p>}  
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">Create new user</Button>
          </CardFooter>
          </form>
        </Card>
        
      </TabsContent>
    </Tabs>
  )
}
