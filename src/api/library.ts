import { CapacitorHttp } from "@capacitor/core";

import constants from "@/config/constants";

export interface UserData {
  email: string;
  name: string;
  role: "Student" | "Teacher/Staff" | "Visitor";
  organization: string;
}

export async function submit(data: UserData, temperature: number) {
  const now = new Date(Date.now());
  const hours = now.getHours();
  const mins = now.getMinutes();

  let formdata = {
    [constants.email]: data.email,
    [constants.name]: data.name,
    [constants.role]: data.role,
    [constants.organization]: data.organization,
    [constants.temperature]: temperature.toFixed(1),
    [constants.hour_in]: hours.toString(),
    [constants.mins_in]: mins.toString(),
  };

  try {
    let response = await CapacitorHttp.post({
      url: `https://docs.google.com/forms/u/0/d/e/${constants.formId}/formResponse`,
      headers: { "Content-type": "application/x-www-form-urlencoded" },
      data: Object.entries(formdata)
        .map(([k, v]) => `${encodeURI(k)}=${encodeURI(v.split(" ").join("+"))}`)
        .join("&"),
      dataType: "formData",
      connectTimeout: 5000,
    });

    return response.status == 200;
  } catch (e) {
    return false;
  }
}
