# 图片魔方 - 免费在线图片处理工具

一个基于 Cloudflare Pages 部署的免费图片处理工具，支持图片无损压缩、格式转换和智能裁切。

## ✨ 功能特性

### 🗜️ 图片压缩
- 智能压缩算法，最大程度保持图片质量
- 可调节压缩质量（10%-100%）
- 支持批量处理
- 可设置最大尺寸限制

### 🔄 格式转换
- 支持 JPG、PNG、WebP、GIF、BMP 格式互转
- 推荐转换为 WebP 格式以获得最佳压缩比
- 可调节输出质量
- 支持批量转换

### ✂️ 图片裁切
- 自由裁切和预设比例
- 常用尺寸预设（1寸、2寸照片等）
- 实时预览
- 支持多种输出格式

## 🔒 隐私安全

**所有图片处理均在浏览器本地完成，不会上传到任何服务器！**

## 🚀 技术栈

- **前端框架**: Vanilla JavaScript (ES6+)
- **构建工具**: Vite
- **图片压缩**: [browser-image-compression](https://github.com/nicehorse/browser-image-compression)
- **图片裁切**: [Cropper.js](https://github.com/fengyuanchen/cropperjs)
- **部署平台**: Cloudflare Pages

## 📦 本地开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## ☁️ 部署到 Cloudflare Pages

### 方式一：通过 Git 集成

1. Fork 或克隆此仓库到你的 GitHub/GitLab 账号
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. 进入 Pages > Create a project
4. 连接你的 Git 仓库
5. 配置构建设置：
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
6. 点击 Deploy

### 方式二：直接上传

1. 运行 `npm run build` 生成 `dist` 目录
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. 进入 Pages > Create a project > Direct Upload
4. 上传 `dist` 目录中的所有文件

## 📝 项目结构

```
image-process-cloudflare/
├── index.html          # 主页面
├── package.json        # 项目配置
├── vite.config.js      # Vite 配置
├── src/
│   ├── main.js         # 主逻辑
│   └── styles/
│       └── main.css    # 样式文件
└── README.md           # 说明文档
```

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
