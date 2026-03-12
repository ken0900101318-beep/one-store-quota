# ONE桌遊 開店區域查詢系統

🌐 **線上網址：** https://ken0900101318-beep.github.io/one-store-quota/

## 📊 功能說明

### 1. 區域查詢
- 輸入縣市或鄉鎮市區名稱
- 顯示該區域的開店狀況

### 2. 自動計算店家限額
根據人口數自動計算：
- **< 10萬人** → 限制 **2家**
- **10-20萬人** → 限制 **3家**
- **> 20萬人** → 限制 **4家**

### 3. 顯示資訊
- ✅ 2026年2月最新人口數
- ✅ 店家限額
- ✅ 已開業店數
- ✅ 剩餘名額
- ✅ 已開業店家名單
- ✅ 特殊標記（舊約額滿、特殊保留等）

### 4. 統計總覽
- 📍 開店區域總數
- 🏪 已開業店家總數
- 🔴 額滿區域數量
- 🟢 剩餘名額總數

---

## 🔧 如何更新數據

### 方法 1：通過 GitHub 網頁界面

1. 打開 [index.html](https://github.com/ken0900101318-beep/one-store-quota/blob/main/index.html)
2. 點擊右上角的 ✏️ **Edit** 按鈕
3. 找到 `areasData` 陣列（約在第 200 行左右）
4. 修改或新增區域數據

#### 數據格式範例：
```javascript
{
    county: '台北市',          // 縣市
    district: '大安區',        // 鄉鎮市區
    population: 280000,        // 人口數（2026年最新）
    stores: 2,                 // 已開業店數
    storeNames: ['店名1', '店名2'],  // 店家名稱清單
    isSpecial: false,          // 是否有特殊標記
    specialNote: '舊約額滿'    // 特殊說明（可選）
}
```

5. 點擊 **Commit changes**
6. 等待 1-2 分鐘，網站會自動更新

---

### 方法 2：本地修改（進階）

```bash
# 1. Clone 專案
git clone https://github.com/ken0900101318-beep/one-store-quota.git
cd one-store-quota

# 2. 編輯 index.html
# 修改 areasData 陣列

# 3. 提交並推送
git add index.html
git commit -m "更新區域數據"
git push origin main
```

---

## 📝 數據來源

### 人口數據
- **來源：** 中華民國內政部戶政司
- **時間：** 2026年2月
- **參考：** [維基百科 - 台灣行政區人口列表](https://zh.wikipedia.org/wiki/臺灣行政區人口列表)

### 店家數據
- **來源：** ONE桌遊內部統計
- **更新：** 2025年4月（114年4月）
- **參考：** 加盟商統計及鄉鎮人口數表單

---

## 🛠️ 技術架構

- **前端：** HTML + CSS + JavaScript（原生，無框架）
- **部署：** GitHub Pages
- **版本控制：** Git + GitHub

---

## 📞 聯絡資訊

**ONE桌遊**
- 客服專線：0970-199296
- LINE 官方：[@oneju](https://lin.ee/fhLAwUE)

---

## 📄 授權

僅供 ONE桌遊內部使用。
