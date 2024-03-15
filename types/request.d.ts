// 对 express 扩展请求对象的类型声明
declare global {
  namespace Express {
    interface Request {
      auth?: UserInfo;
    }
  }
}

export {};
