import DefaultLayout from "@/layouts/default"

import { z } from "zod"
import { useState, useEffect, FormEvent } from "react"
import { Preferences } from '@capacitor/preferences';
import { useNavigate } from "react-router-dom";

import { Input } from "@heroui/input"
import { Select, SelectItem } from "@heroui/select"
import { Button } from "@heroui/button"
import { Form } from "@heroui/form"

export default function InformationPage() {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [organization, setOrganization] = useState("")
    const [role, setRole] = useState("")

    useEffect(() => {
        Preferences.get({ key: "userdata" }).then(({ value }) => {
            if (!value) return
            
            var { success, data } = z.object({
                email: z.email(),
                name: z.string(),
                role: z.string().refine((role) => ["Student", "Teacher/Staff", "Visitor"].includes(role)),
                organization: z.string()
            }).safeParse(JSON.parse(value ?? "{}"))

            if (!success || !data) return

            setName(data.name)
            setEmail(data.email)
            setOrganization(data.organization)
            setRole(data.role)
        })
    }, [])

    async function update(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        let userdata = JSON.stringify({ name, email, organization, role })
        await Preferences.set({ key: "userdata", value: userdata })

        navigate("/home")
    }

    return <DefaultLayout>
        <div className="h-full grid place-items-center">
            <div className="w-full">
                <h1 className="w-full text-center text-2xl font-bold">Your Information</h1>

                <br />

                <Form onSubmit={update}>
                    <Input
                        isRequired
                        label="Full name"
                        labelPlacement="outside"
                        placeholder="Enter your full name"
                        value={name}
                        onValueChange={setName}
                    />

                    <br />

                    <Input
                        isRequired
                        label="Email Address"
                        labelPlacement="outside"
                        placeholder="Enter your email address"
                        validate={(value) => {
                            if (!((z.email()).safeParse(value)).success) return "Please provide a valid email."
                            return true
                        }}
                        value={email}
                        onValueChange={setEmail}
                    />
                    <br />

                    <Input
                        isRequired
                        label="Designation"
                        labelPlacement="outside"
                        placeholder="Enter your year and section or organization"
                        value={organization}
                        onValueChange={setOrganization}
                    />

                    <br />

                    <Select
                        isRequired
                        label="Role"
                        labelPlacement="outside"
                        placeholder="Choose your role"
                        value={role}
                        selectedKeys={[role]}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        {["Student", "Teacher/Staff", "Visitor"].map((item) => (
                            <SelectItem key={item}>{item}</SelectItem>
                        ))}
                    </Select>

                    <br />

                    <Button
                        className="w-full"
                        color="primary"
                        type="submit"
                    >
                        Confirm
                    </Button>
                </Form>
            </div>
        </div>
    </DefaultLayout>
}