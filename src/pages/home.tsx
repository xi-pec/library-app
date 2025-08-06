import DefaultLayout from "@/layouts/default";
import { UserData, submit } from "@/api/library";

import { Button } from "@heroui/button"
import { NumberInput } from "@heroui/number-input"
import { addToast } from "@heroui/toast"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Card, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";

import { useEffect, useState } from "react";
import { z } from "zod"
import { Preferences } from "@capacitor/preferences";

export default function HomePage() {
  const [closed, setClosed] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [temperature, setTemperature] = useState(36.0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  async function log(temperature: number) {
    setDisabled(true);

    const { value } = await Preferences.get({ key: "userdata" })
    if (!value) return addToast({ title: "Missing user data!", color: "danger", variant: "solid" })
  
    var validation = z.object({
      email: z.email(),
      name: z.string(),
      role: z.string().refine((role) => ["Student", "Teacher/Staff", "Visitor"].includes(role)),
      organization: z.string()
    }).safeParse(JSON.parse(value ?? "{}"))

    if (!validation.success) return addToast({ title: "Malformed user data!", color: "danger", variant: "solid" })

    const success = await submit(validation.data as UserData, temperature);

    addToast({
      title: success ? "Success!" : "Failed!",
      color: success ? "success" : "danger",
      variant: "solid",
    });
    setDisabled(false);
  }

  function getTime() {
    return date.toLocaleString("default", {
      timeStyle: "short",
      hour12: false,
    });
  }

  function getDate() {
    return date.toLocaleString("default", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  }

  useEffect(() => {
    let day = date.getDay();
    let hr = date.getHours();
    setClosed(day == 0 || day == 7 || hr < 7 || hr > 16);

    let sec = date.getSeconds();
    let ms = date.getMilliseconds();
    setTimeout(() => setDate(new Date(Date.now())), 60000 - sec * 1000 - ms);
  }, [date]);

  return (
    <DefaultLayout>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-2xl font-bold">
                Log Attendance
              </ModalHeader>
              <ModalBody>
                <NumberInput
                  formatOptions={{
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1
                  }}
                  label="Temperature"
                  maxValue={40.0}
                  minValue={32.0}
                  placeholder={temperature.toFixed(1)}
                  step={0.1}
                  value={temperature}
                  onValueChange={setTemperature}>
                </NumberInput>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="w-full"
                  color="primary"
                  isDisabled={disabled}
                  onPress={() => log(temperature).then(onClose)}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="h-full flex flex-col">
        <nav>
          <Button
            as={Link}
            href="/information"
            className="float-right"
            isIconOnly
            variant="light"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </Button>
        </nav>
        <main className="grow shrink basis-auto">
          <h1 className="w-full text-center text-5xl mt-20 font-semibold">
            {getTime()}
          </h1>
          <h3 className="w-full text-center text-xl mt-2 mb-20 font-light">
            {getDate()}
          </h3>

          <Divider />
          <Card className="w-full mt-5">
            <CardBody className="justify-between">
              <div className="grid grid-cols-[1fr_auto]">
                <div className="w-full justify-end align-middle">
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-small ml-2 font-semibold text-default-600">
                      Library
                    </h4>
                    <h5 className="text-small ml-2 tracking-tight text-default-500">
                      Mon-Fri, 7:00 - 16:00
                    </h5>
                  </div>
                </div>
                <div className="flex flex-col gap-1 items-end justify-center">
                  {closed ? (
                    <h4 className="text-small mr-2 font-semibold text-danger-400">
                      Closed
                    </h4>
                  ) : (
                    <h4 className="text-small mr-2 font-semibold text-success-400">
                      Open
                    </h4>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        </main>

        <footer>
          <Button
            className="w-full"
            color="primary"
            isDisabled={closed}
            onPress={onOpen}
          >
            {closed ? "The library is closed" : "Log Attendance"}
          </Button>
        </footer>
      </div>
    </DefaultLayout>
  );
}
