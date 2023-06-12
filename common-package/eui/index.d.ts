declare type TopTipType = 'normal' | 'success' | 'error'
declare type ToastType = 'message' | 'success' | 'info' | 'warning' | 'error'

export declare namespace eui {
  /**
   * 打开顶部提示
   * @param message 顶部提示消息
   * @param type 类型
   * @param timeout 多少毫秒后关闭
   */
  function showTopTip(message: string, type: TopTipType, timeout: number): Promise<void>

  /**
   * 显示轻提示
   * @param text 提示文本
   * @param type 类型
   * @param delay 多少毫秒后关闭
   * @param callback 关闭后的回调函数
   */
  function showToast(text: string, type: ToastType, delay: number, callback: Function): Promise<void>


  /**
   * 隐藏顶部提示
   */
  function hideTopTip(): void

  /**
   * 打开全局Loading
   * @param text loading文本
   * @param color 颜色
   */
  function showLoading(text?: string, color?: string): void

  /**
   * 隐藏全局Loading
   */
  function hideLoading(): void

  function confirm(title: string, text: string, type: string): Promise<Boolean>
}
