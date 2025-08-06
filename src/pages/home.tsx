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

import { useEffect, useState } from "react";
import DefaultLayout from "@/layouts/default";

let fakeData: UserData = {
  email: "hello@example.com",
  name: "Doe, John D.C.",
  role: "Visitor",
  organization: "Pentester",
};

export default function HomePage() {
  const [closed, setClosed] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [temperature, setTemperature] = useState(36.0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  async function log(data: UserData, temperature: number) {
    setDisabled(true);
    const success = await submit(data, temperature);

    addToast({
      title: success ? "Success" : "Failed",
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
                  onPress={() => log(fakeData, temperature).then(onClose)}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="h-full flex flex-col">
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
