"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"


const reviewSchema = z.object({
    name: z.string().min(1, "Name is mandatory"),
    email: z.string().email("Invalid email").optional().or(z.literal("")),
    rating: z.coerce.number().min(1).max(5),
    comment: z.string().min(5, "Comment must have at least 5 characters")
})

export default function ReviewForm({ businessId }) {
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({data: {user}}) => {
      setUser(user)
    })
  },[])

  const form = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: "",
      email: "",
      rating: 5,
      comment: "",
    },
  })

  const onSubmit = async (values) => {
    if(!user){
      router.push("/login")
      return
    }

    try {
        const res = await fetch("https://expert-space-journey-wr9w6p6jp7wxhv457-1234.app.github.dev/api/business/reviews",{
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({...values, businessId})
        })
        if(!res.ok) throw new Error("Error sending review")
        
        toast.success("!Review sent succesfully!")
        form.reset()
    } catch (error) {
        toast.error("An error has happened while sending the review")
    }
  }

  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h3 className="text-lg font-semibold">Write a review!</h3>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl><Input placeholder="Your name" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email (optional)</FormLabel>
              <FormControl><Input placeholder="email@example.com" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating (1 to 5)</FormLabel>
              <FormControl><Input type="number" min={1} max={5} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl><Textarea placeholder="¿What was your experience with this business?" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Sending..." : "Send review"}
        </Button>
      </form>
    </Form>
  )
}