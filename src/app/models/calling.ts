import {Member} from "./member";

export interface Calling {
  name: string,
  className?: string,
  sortIndex: number,
  member?: Member,
  status?: CallingStatus
}

export interface CallingStatus {
  name: string,
  type: string,
  value: string,
  label: string,
  checked: boolean,
  description: string,
  sortIndex: string,
  id: string
}
