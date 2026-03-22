/**
 * ONE桌遊系統 - 前端共用工具
 * 包含 XSS 防護、API 呼叫、通知系統等
 * @version 1.0.0
 * @date 2026-03-19
 */

const Utils = {
    /**
     * XSS 防護：將 HTML 特殊字元轉義
     * @param {string} str - 需要轉義的字串
     * @returns {string} 轉義後的安全字串
     */
    escapeHtml(str) {
        if (str === null || str === undefined) return '';
        const div = document.createElement('div');
        div.textContent = String(str);
        return div.innerHTML;
    },

    /**
     * 批量轉義物件中的所有字串屬性
     * @param {object} obj - 需要轉義的物件
     * @returns {object} 轉義後的物件
     */
    escapeObject(obj) {
        if (!obj || typeof obj !== 'object') return obj;
        
        const escaped = Array.isArray(obj) ? [] : {};
        
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];
                
                if (typeof value === 'string') {
                    escaped[key] = this.escapeHtml(value);
                } else if (typeof value === 'object') {
                    escaped[key] = this.escapeObject(value);
                } else {
                    escaped[key] = value;
                }
            }
        }
        
        return escaped;
    },

    /**
     * Toast 通知系統
     * @param {string} message - 通知訊息
     * @param {string} type - 類型：success/error/info/warning
     * @param {number} duration - 顯示時間（毫秒）
     */
    showToast(message, type = 'info', duration = 3000) {
        // 移除舊的 toast（如果有）
        const oldToast = document.querySelector('.toast-notification');
        if (oldToast) oldToast.remove();

        const toast = document.createElement('div');
        toast.className = `toast-notification toast-${type}`;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            font-size: 14px;
            font-weight: 500;
            max-width: 400px;
            animation: slideIn 0.3s ease-out;
        `;

        // 根據類型設定顏色
        const colors = {
            success: { bg: '#4caf50', text: '#fff' },
            error: { bg: '#f44336', text: '#fff' },
            warning: { bg: '#ff9800', text: '#fff' },
            info: { bg: '#2196f3', text: '#fff' }
        };

        const color = colors[type] || colors.info;
        toast.style.backgroundColor = color.bg;
        toast.style.color = color.text;

        // 使用 textContent（安全）而非 innerHTML
        toast.textContent = message;

        document.body.appendChild(toast);

        // 自動移除
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },

    /**
     * Loading 動畫
     * @param {boolean} show - 是否顯示
     */
    showLoading(show = true) {
        let loader = document.getElementById('global-loader');
        
        if (show) {
            if (!loader) {
                loader = document.createElement('div');
                loader.id = 'global-loader';
                loader.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                `;
                loader.innerHTML = `
                    <div style="
                        width: 50px;
                        height: 50px;
                        border: 5px solid #f3f3f3;
                        border-top: 5px solid #ff6b35;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                    "></div>
                `;
                document.body.appendChild(loader);
            }
            loader.style.display = 'flex';
        } else {
            if (loader) {
                loader.style.display = 'none';
            }
        }
    },

    /**
     * API 統一呼叫（帶錯誤處理）
     * @param {string} url - API 網址
     * @param {object} options - fetch 選項
     * @returns {Promise<any>} API 回應
     */
    async apiCall(url, options = {}) {
        try {
            this.showLoading(true);
            
            const response = await fetch(url, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
            
        } catch (error) {
            console.error('API 錯誤:', error);
            this.showToast(`API 錯誤：${error.message}`, 'error');
            throw error;
            
        } finally {
            this.showLoading(false);
        }
    },

    /**
     * 格式化數字（加上千分位）
     * @param {number} num - 數字
     * @returns {string} 格式化後的字串
     */
    formatNumber(num) {
        if (num === null || num === undefined) return '0';
        return Number(num).toLocaleString('zh-TW');
    },

    /**
     * 防抖（Debounce）
     * @param {function} func - 要執行的函數
     * @param {number} wait - 等待時間（毫秒）
     * @returns {function} 防抖後的函數
     */
    debounce(func, wait = 300) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// 加入動畫樣式
if (!document.getElementById('utils-styles')) {
    const style = document.createElement('style');
    style.id = 'utils-styles';
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}
