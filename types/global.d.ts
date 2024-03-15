declare global {
  interface UserInfo {
    userId: number;
    username: string;
    roles?: string[];
    // 其他字段...
  }
}

export {};
