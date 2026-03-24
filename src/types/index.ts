export type Page =
  | "login"
  | "dashboard"
  | "placements"
  | "applications"
  | "application-detail"
  | "messages"
  | "settings";

export type Status = "Approved" | "Rejected" | "Pending";

export interface Placement {
  id: number;
  dept: string;
  seats: string;
  duration: string;
  deadline: string;
  active: boolean;
}

export interface Application {
  id: number;
  name: string;
  dept: string;
  duration: string;
  deadline: string;
  status: Status;
}

export interface Message {
  id: number;
  from: "me" | "them";
  text: string;
  time: string;
}

export interface Contact {
  id: number;
  name: string;
  preview: string;
}
