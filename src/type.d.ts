//定义我们的接口类型
export interface LoginData {
  username: string
  password: string | number
  email?: string
}

export interface BannerDataType {
  banner: Array<any>
}

export interface SearchDataType {
  keywords: string | null
  type?: number
}
