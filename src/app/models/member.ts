export interface MemberName {
  first: string,
  last: string
}

export interface Member {
  name: MemberName | string,
  recordNumber: string,
  birthDate?: Date,
  phone?: string,
  email?: string,
  unitNumber: string,
  gender?: string
}
