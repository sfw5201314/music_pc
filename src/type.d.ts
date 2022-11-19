//定义我们的接口类型
export interface LoginData {
  username: string
  password: string | number
  email?: string
}

export interface SearchDataType {
  keywords: string | null
  type?: string | number | null
  offset?: number | null
}
