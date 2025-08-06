import DefaultLayout from "@/layouts/default";

import { useEffect } from "react";
import { z } from "zod"
import { useNavigate } from "react-router-dom";

import { CircularProgress } from "@heroui/progress"

import { Preferences } from '@capacitor/preferences';

export default function IndexPage() {
  const navigate = useNavigate()

  useEffect(() => {
    Preferences.get({ key: "userdata" }).then(({ value }) => {
      if (!value) return navigate("/welcome")
    
      var { success } = z.object({
        email: z.email(),
        name: z.string(),
        role: z.string().refine((role) => ["Student", "Teacher/Staff", "Visitor"].includes(role)),
        organization: z.string()
      }).safeParse(JSON.parse(value ?? "{}"))

      if (!success) return navigate("/welcome")

      return navigate("/home")
    })
  }, [])

  return <DefaultLayout>
    <div className="h-full grid place-items-center">
      <CircularProgress />
    </div>
  </DefaultLayout>
}