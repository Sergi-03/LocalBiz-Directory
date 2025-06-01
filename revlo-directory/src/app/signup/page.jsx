"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabaseClient"
import { toast } from "sonner"
import Navbar from "@/components/ui/navbar"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"


export default function SignupPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignup = async (e) => {
        e.preventDefault()
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) {
            toast.error("Signup failed")
        }
        else {
            toast.success("Account created succesfully!")
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
                        <form onSubmit={handleSignup} className="space-y-4">
                            <Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
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