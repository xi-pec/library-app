import DefaultLayout from "@/layouts/default";

import { CircularProgress } from "@heroui/progress"

export default function IndexPage() {
    return <DefaultLayout>
        <div className="h-full grid place-items-center">
            <CircularProgress />
        </div>
    </DefaultLayout>
}