import DefaultLayout from "@/layouts/default";
import { UserData, submit } from "@/api/library";

import { Button } from "@heroui/button"
import { NumberInput } from "@heroui/number-input"
import { addToast } from "@heroui/toast"
import { useState } from "react";

let fakeData: UserData = {
  email: "hello@example.com",
  name: {
    given: "John",
    initials: "D.C.",
    family: "Doe"
  },
  role: "Visitor",
  organization: "Pentester"
}

export default function IndexPage() {
  const [temperature, setTemperature] = useState(36.0);

  async function log(data: UserData, temperature: number) {
    const success = await submit(data, temperature)

    addToast({
      title: success ? "Success" : "Failed",
      color: success ? "success" : "danger",
      variant: "solid"
    })
  }
  
  return (
    <DefaultLayout>
      <NumberInput 
        value={temperature}
        onValueChange={setTemperature}
        label="Temperature"
        placeholder={temperature.toFixed(1)}
        minValue={32.0}
        maxValue={40.0}
        step={0.1}
        formatOptions={{
          minimumFractionDigits: 1,
          maximumFractionDigits: 1
        }}>

      </NumberInput>
      <Button color="primary" onPress={() => log(fakeData, temperature)}>submit</Button>
      <span>{status ? "success" : "fail"}</span>
    </DefaultLayout>
  );
}
