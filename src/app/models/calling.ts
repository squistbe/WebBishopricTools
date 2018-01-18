import {Member} from "./member";
import {Org} from "./org";

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

export interface CallingFilters {
  filterByOrg?: any[],
  filterByStatus?: any[],
  vacantCallings?: boolean,
  simple?: boolean
}
