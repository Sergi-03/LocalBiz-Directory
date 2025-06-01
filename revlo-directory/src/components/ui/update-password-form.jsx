"use client"

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
} from "@/components/ui/tabs"
import Navbar from "./navbar"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export default function UpdatePasswordForm() {
const [password, setPassword] = useState("")
const router = useRouter()
 
const handleUpdatePassword = async (e) => {
    e.preventDefault()
    const {error} = await supabase.auth.updateUser({password})

    if(error){
    toast.error(error.message)
    }

    else{
    toast.success("Password updated succesfully!")
    setTimeout(() => router.push("/login"))
    }
}

  return (
    <>
    <Navbar showSearchbar={false}/>
    <div className="flex items-center justify-center min-h-screen">
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="password">
        <TabsList>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be redirected to the login form.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Current password</Label>
                <Input id="tabs-demo-current" type="password" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">New password</Label>
                <Input id="tabs-demo-new" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleUpdatePassword}>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </div>
    </>
  )
}