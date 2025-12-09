# 圖片魔方 - 專業的線上圖片處理工具

[English](./README.md) | [简体中文](./README.zh-CN.md) | **繁體中文**

一個免費、注重隱私的線上圖片處理工具，支援圖片壓縮、格式轉換和裁切功能。所有處理均在瀏覽器本地完成，您的圖片永遠不會離開您的裝置。

## ✨ 功能特性

### 🗜️ 智能壓縮
- 先進的壓縮演算法，在保持視覺品質的同時減小檔案大小
- 可調節的品質設定（10-100%）
- 最大尺寸限制（無限制、1920px、1280px、800px）
- 支援批量處理

### 🔄 格式轉換
- 支援 JPG、PNG、WebP、GIF、BMP 格式互轉
- 一鍵轉換為最優格式
- 可調節輸出品質

### ✂️ 精準裁切
- 自由裁切或預設寬高比（1:1、4:3、16:9 等）
- 常用尺寸預設（800×600、1280×720、1920×1080、1080×1080）
- 證件照尺寸（帶實際毫米尺寸標識）：
  - 1吋照片 (25×35mm)
  - 2吋照片 (35×49mm)
  - 護照 (35×45mm)
  - 簽證 (33×48mm)
  - 美國簽證 (51×51mm)
- 多種輸出格式可選

### 🌐 多語言支援
- English（英文）
- 简体中文
- 繁體中文
- 根據瀏覽器語言自動檢測
- 支援手動切換語言

## 🔒 隱私安全

- **100% 客戶端處理**：所有圖片處理都在您的瀏覽器中完成
- **不上傳伺服器**：圖片永遠不會離開您的裝置
- **不收集資料**：我們不追蹤或儲存任何資訊
- **無需註冊**：無需註冊即可使用所有功能

## 🚀 快速開始

### 本地開發

1. 克隆倉庫：
```bash
git clone https://github.com/tinystacklab/image-cube.git
cd image-cube
```

2. 安裝依賴：
```bash
npm install
```

3. 啟動開發伺服器：
```bash
npm run dev
```

4. 在瀏覽器中打開 http://localhost:3000

### 構建生產版本

```bash
npm run build
```

構建後的檔案將在 `dist` 資料夾中。

## 📦 部署

這是一個靜態網站，可以部署到任何靜態託管平台。

### 部署到 Cloudflare Pages

1. 將程式碼推送到 GitHub 倉庫
2. 登入 [Cloudflare 控制台](https://dash.cloudflare.com/)
3. 進入 **Pages** → **創建專案** → **連接到 Git**
4. 配置構建設定：
   - **構建命令**：`npm run build`
   - **構建輸出目錄**：`dist`
5. 點擊 **儲存並部署**

### 部署到 Vercel

1. 將程式碼推送到 GitHub
2. 在 [Vercel](https://vercel.com/) 導入專案
3. Vercel 會自動檢測 Vite 並配置
4. 點擊 **Deploy**

### 部署到 Netlify

1. 將程式碼推送到 GitHub
2. 在 [Netlify](https://netlify.com/) 導入專案
3. 配置構建設定：
   - **構建命令**：`npm run build`
   - **發布目錄**：`dist`
4. 點擊 **Deploy site**

### 部署到 GitHub Pages

1. 在 `vite.config.js` 中添加：`base: '/your-repo-name/'`
2. 構建專案：`npm run build`
3. 將 `dist` 資料夾部署到 GitHub Pages

## 🛠️ 技術棧

- **構建工具**：[Vite](https://vitejs.dev/)
- **圖片壓縮**：[browser-image-compression](https://github.com/Donaldcwl/browser-image-compression)
- **圖片裁切**：[Cropper.js](https://fengyuanchen.github.io/cropperjs/)
- **樣式**：原生 CSS 配合 CSS 變數
- **字體**：Inter（本地）+ 系統中文字體

## 📝 許可證

MIT 許可證 - 可自由用於個人或商業用途。

## 🤝 貢獻

歡迎貢獻！請隨時提交 Pull Request。

1. Fork 本專案
2. 創建您的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打開一個 Pull Request

## 📧 聯繫

如果您有任何問題或建議，請在 GitHub 上提交 issue。

---

用 ❤️ 為注重隱私的圖片處理而製作
