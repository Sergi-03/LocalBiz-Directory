"use client"

import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabaseClient"
import { toast } from "sonner"
import Navbar from "@/components/ui/navbar"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export default function SignupPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data) => {
    const { email, password } = data
    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      toast.error("Signup failed")
    } else {
      toast.success("Account created successfully!")
      setTimeout(() => router.push("/login"), 2000)
    }
  }

  return (
    <>
      <Navbar showSearchbar={false} />
      <div className="flex justify-center mt-20">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Create account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full">Sign up</Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-sm">
              Already have an account?{" "}
              <a href="/login" className="underline underline-offset-4">Log in</a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
