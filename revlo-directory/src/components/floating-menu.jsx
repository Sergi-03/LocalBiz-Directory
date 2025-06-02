"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { toast } from "sonner"

export default function FloatingMenu(){
    const [isOpen, setIsOpen] = useState(false)
    const [session, setSession] = useState(null)
    const router = useRouter()

    useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
        setSession(session)
    })

    const {data: listener} = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
    })

    return () => {
        listener?.subscription.unsubscribe()
    }
    }, [])

    const handleLogout = async () => {
    const {error} = await supabase.auth.signOut()
    if(error) {
       toast.error("Error logging out")
    }
    else {
        toast.success("Logged out succesfully!")
        setTimeout(() => router.push("/login"), 1500)
    }
    }

    return(
    <div className="fixed bottom-4 left-4 z-50">
  <button
    aria-label="Toggle Menu"
    onClick={() => setIsOpen(!isOpen)}
    className="p-2 bg-black hover:bg-gray-900 dark:bg-black dark:hover:bg-gray-900 rounded-full transition"
    >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C8.686 2 6 4.686 6 8c0 4.05 5.4 9.61 5.72 9.93a1 1 0 001.56 0C12.6 17.61 18 12.05 18 8c0-3.314-2.686-6-6-6zm0 8.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
        fill="white"
      />
    </svg>
  </button>

  {isOpen && (
    <div className="mt-2 border rounded-md shadow-md p-3 flex flex-col gap-2 w-32 bg-background text-foreground border-border">
      {session ? (
        <>
        <button
          onClick={handleLogout}
          className="text-left hover:underline"
        >
          Logout
        </button>
        <button
          onClick={() => router.push("/update-password")}
          className="text-left hover:underline"
        >
          Update password
        </button>
        </>
      ) : (
        <>
          <button
            onClick={() => router.push("/login")}
            className="text-left hover:underline"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="text-left hover:underline"
          >
            Signup
          </button>
        </>
      )}
    </div>
  )}
</div>
)
}