import DefaultLayout from "@/layouts/default";

import { Button } from "@heroui/button"
import { Link } from "@heroui/link"

export default function WelcomePage() {
    return <DefaultLayout>
        <div className="h-full flex flex-col">
            <div className="grow shrink basis-auto">
                <h1 className="text-4xl font-bold">Welcome!</h1>
                
                <br />

                <p className="text-default-800">
                    To get started, enter your information in the next page. 
                    This can be updated later (by clicking the cog icon on the top right corner of the home page).
                </p>
            </div>
            
            <Button href="/information" as={Link} className="w-full" color="primary">Go</Button>
        </div>
    </DefaultLayout>
}