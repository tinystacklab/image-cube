# 图片魔方 - 专业的在线图片处理工具

[English](./README.md) | **简体中文** | [繁體中文](./README.zh-TW.md)

一个免费、注重隐私的在线图片处理工具，支持图片压缩、格式转换和裁切功能。所有处理均在浏览器本地完成，您的图片永远不会离开您的设备。

## ✨ 功能特性

### 🗜️ 智能压缩
- 先进的压缩算法，在保持视觉质量的同时减小文件大小
- 可调节的质量设置（10-100%）
- 最大尺寸限制（无限制、1920px、1280px、800px）
- 支持批量处理

### 🔄 格式转换
- 支持 JPG、PNG、WebP、GIF、BMP 格式互转
- 一键转换为最优格式
- 可调节输出质量

### ✂️ 精准裁切
- 自由裁切或预设宽高比（1:1、4:3、16:9 等）
- 常用尺寸预设（800×600、1280×720、1920×1080、1080×1080）
- 证件照尺寸（带实际毫米尺寸标识）：
  - 1寸照片 (25×35mm)
  - 2寸照片 (35×49mm)
  - 护照 (35×45mm)
  - 签证 (33×48mm)
  - 美国签证 (51×51mm)
- 多种输出格式可选

### 🌐 多语言支持
- English（英文）
- 简体中文
- 繁體中文
- 根据浏览器语言自动检测
- 支持手动切换语言

## 🔒 隐私安全

- **100% 客户端处理**：所有图片处理都在您的浏览器中完成
- **不上传服务器**：图片永远不会离开您的设备
- **不收集数据**：我们不追踪或存储任何信息
- **无需注册**：无需注册即可使用所有功能

## 🚀 快速开始

### 本地开发

1. 克隆仓库：
```bash
git clone https://github.com/tinystacklab/image-cube.git
cd image-cube
```

2. 安装依赖：
```bash
npm install
```

3. 启动开发服务器：
```bash
npm run dev
```

4. 在浏览器中打开 http://localhost:3000

### 构建生产版本

```bash
npm run build
```

构建后的文件将在 `dist` 文件夹中。

## 📦 部署

这是一个静态网站，可以部署到任何静态托管平台。

### 部署到 Cloudflare Pages

1. 将代码推送到 GitHub 仓库
2. 登录 [Cloudflare 控制台](https://dash.cloudflare.com/)
3. 进入 **Pages** → **创建项目** → **连接到 Git**
4. 配置构建设置：
   - **构建命令**：`npm run build`
   - **构建输出目录**：`dist`
5. 点击 **保存并部署**

### 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com/) 导入项目
3. Vercel 会自动检测 Vite 并配置
4. 点击 **Deploy**

### 部署到 Netlify

1. 将代码推送到 GitHub
2. 在 [Netlify](https://netlify.com/) 导入项目
3. 配置构建设置：
   - **构建命令**：`npm run build`
   - **发布目录**：`dist`
4. 点击 **Deploy site**

### 部署到 GitHub Pages

1. 在 `vite.config.js` 中添加：`base: '/your-repo-name/'`
2. 构建项目：`npm run build`
3. 将 `dist` 文件夹部署到 GitHub Pages

## 🛠️ 技术栈

- **构建工具**：[Vite](https://vitejs.dev/)
- **图片压缩**：[browser-image-compression](https://github.com/Donaldcwl/browser-image-compression)
- **图片裁切**：[Cropper.js](https://fengyuanchen.github.io/cropperjs/)
- **样式**：原生 CSS 配合 CSS 变量
- **字体**：Inter（本地）+ 系统中文字体

## 📝 许可证

MIT 许可证 - 可自由用于个人或商业用途。

## 🤝 贡献

欢迎贡献！请随时提交 Pull Request。

1. Fork 本项目
2. 创建您的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📧 联系

如果您有任何问题或建议，请在 GitHub 上提交 issue。

---

用 ❤️ 为注重隐私的图片处理而制作
