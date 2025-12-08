// Image Processing Tool - Main Application
import imageCompression from 'browser-image-compression';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { I18n } from './i18n.js';

// Initialize i18n
const i18n = new I18n();

// ============================================
// State Management
// ============================================
const state = {
    currentTab: 'compress',
    compressFiles: [],
    convertFiles: [],
    cropper: null,
    cropFile: null,
    compressedResults: [],
    convertedResults: [],
    settings: {
        compress: {
            quality: 0.8,
            maxSize: 1920
        },
        convert: {
            format: 'webp',
            quality: 0.9
        },
        crop: {
            aspectRatio: NaN,
            format: 'original'
        }
    }
};

// ============================================
// Utility Functions
// ============================================
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getFileExtension(format) {
    const extensions = {
        'jpeg': 'jpg',
        'png': 'png',
        'webp': 'webp',
        'gif': 'gif'
    };
    return extensions[format] || format;
}

function generateFileName(originalName, suffix, newFormat = null) {
    const lastDot = originalName.lastIndexOf('.');
    const baseName = lastDot > 0 ? originalName.substring(0, lastDot) : originalName;
    const extension = newFormat ? getFileExtension(newFormat) : originalName.substring(lastDot + 1);
    return `${baseName}_${suffix}.${extension}`;
}

function showProcessing(show = true, progress = 0) {
    const overlay = document.getElementById('processing-overlay');
    const progressEl = document.getElementById('processing-progress');
    overlay.style.display = show ? 'flex' : 'none';
    progressEl.textContent = `${Math.round(progress)}%`;
}

function downloadFile(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

async function downloadAllFiles(results) {
    for (const result of results) {
        downloadFile(result.blob, result.filename);
        await new Promise(resolve => setTimeout(resolve, 300)); // Delay between downloads
    }
}

// ============================================
// Tab Navigation
// ============================================
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const toolPanels = document.querySelectorAll('.tool-panel');
    const toolsSection = document.querySelector('.tools-section');

    function switchToTab(tabId) {
        // Update nav links
        navLinks.forEach(l => l.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[data-tab="${tabId}"]`);
        if (activeLink) activeLink.classList.add('active');

        // Handle home tab specially
        if (tabId === 'home') {
            document.getElementById('home').classList.add('active');
            toolsSection.style.display = 'none';
        } else {
            document.getElementById('home').classList.remove('active');
            toolsSection.style.display = 'block';

            // Show the correct tool panel inside tools-section
            toolPanels.forEach(panel => {
                if (panel.id !== 'home') {
                    panel.classList.toggle('active', panel.id === tabId);
                }
            });
        }

        state.currentTab = tabId;
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchToTab(link.dataset.tab);
        });
    });

    // Handle "立即开始" and feature buttons
    document.querySelectorAll('[data-goto]').forEach(btn => {
        btn.addEventListener('click', () => {
            switchToTab(btn.dataset.goto);
        });
    });

    // Initialize: show home tab, hide tools section
    toolsSection.style.display = 'none';
}

// ============================================
// Drag & Drop Handling
// ============================================
function initDragDrop() {
    const uploadAreas = document.querySelectorAll('.upload-area');

    uploadAreas.forEach(area => {
        area.addEventListener('dragover', (e) => {
            e.preventDefault();
            area.classList.add('dragover');
        });

        area.addEventListener('dragleave', (e) => {
            e.preventDefault();
            area.classList.remove('dragover');
        });

        area.addEventListener('drop', (e) => {
            e.preventDefault();
            area.classList.remove('dragover');
            const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
            if (files.length > 0) {
                handleFileSelect(area, files);
            }
        });

        // Click to upload
        area.addEventListener('click', () => {
            const input = area.querySelector('input[type="file"]');
            input.click();
        });
    });
}

function handleFileSelect(area, files) {
    const panelId = area.id.replace('-upload', '');

    if (panelId === 'compress') {
        state.compressFiles = files;
        showCompressOptions();
        processCompression();
    } else if (panelId === 'convert') {
        state.convertFiles = files;
        showConvertOptions();
        processConversion();
    } else if (panelId === 'crop') {
        state.cropFile = files[0];
        showCropWorkspace();
    }
}

// ============================================
// Compression
// ============================================
function initCompression() {
    const input = document.getElementById('compress-input');
    const qualitySlider = document.getElementById('quality-slider');
    const qualityValue = document.getElementById('quality-value');
    const presetBtns = document.querySelectorAll('.quality-presets .preset-btn');
    const sizeBtns = document.querySelectorAll('.size-options .size-btn');

    input.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            handleFileSelect(document.getElementById('compress-upload'), files);
        }
    });

    qualitySlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        qualityValue.textContent = `${value}%`;
        state.settings.compress.quality = value / 100;

        // Update preset buttons
        presetBtns.forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.quality) === value);
        });
    });

    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const quality = parseInt(btn.dataset.quality);
            qualitySlider.value = quality;
            qualityValue.textContent = `${quality}%`;
            state.settings.compress.quality = quality / 100;

            presetBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    sizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const size = parseInt(btn.dataset.size);
            state.settings.compress.maxSize = size || Infinity;

            sizeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    document.getElementById('compress-download-all').addEventListener('click', () => {
        downloadAllFiles(state.compressedResults);
    });

    // 重新处理按钮
    document.getElementById('compress-reprocess').addEventListener('click', () => {
        if (state.compressFiles.length > 0) {
            processCompression();
        }
    });
}

function showCompressOptions() {
    document.getElementById('compress-options').style.display = 'block';
}

async function processCompression() {
    if (state.compressFiles.length === 0) return;

    showProcessing(true, 0);
    state.compressedResults = [];
    const resultList = document.getElementById('compress-list');
    resultList.innerHTML = '';

    const totalFiles = state.compressFiles.length;

    for (let i = 0; i < totalFiles; i++) {
        const file = state.compressFiles[i];
        const progress = ((i + 0.5) / totalFiles) * 100;
        showProcessing(true, progress);

        try {
            const options = {
                maxSizeMB: 10,
                maxWidthOrHeight: state.settings.compress.maxSize || undefined,
                useWebWorker: true,
                initialQuality: state.settings.compress.quality,
            };

            const compressedFile = await imageCompression(file, options);
            const reduction = ((file.size - compressedFile.size) / file.size * 100).toFixed(1);

            const result = {
                original: file,
                compressed: compressedFile,
                blob: compressedFile,
                filename: generateFileName(file.name, 'compressed'),
                reduction
            };

            state.compressedResults.push(result);
            addResultItem(resultList, result, 'compress');

        } catch (error) {
            console.error('Compression error:', error);
        }

        showProcessing(true, ((i + 1) / totalFiles) * 100);
    }

    showProcessing(false);
    document.getElementById('compress-result').style.display = 'block';
}

// ============================================
// Format Conversion
// ============================================
function initConversion() {
    const input = document.getElementById('convert-input');
    const formatBtns = document.querySelectorAll('.format-btn');
    const qualitySlider = document.getElementById('convert-quality-slider');
    const qualityValue = document.getElementById('convert-quality-value');

    input.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            handleFileSelect(document.getElementById('convert-upload'), files);
        }
    });

    formatBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            formatBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.settings.convert.format = btn.dataset.format;
        });
    });

    qualitySlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        qualityValue.textContent = `${value}%`;
        state.settings.convert.quality = value / 100;
    });

    document.getElementById('convert-download-all').addEventListener('click', () => {
        downloadAllFiles(state.convertedResults);
    });

    // 重新处理按钮
    document.getElementById('convert-reprocess').addEventListener('click', () => {
        if (state.convertFiles.length > 0) {
            processConversion();
        }
    });
}

function showConvertOptions() {
    document.getElementById('convert-options').style.display = 'block';
}

async function processConversion() {
    if (state.convertFiles.length === 0) return;

    showProcessing(true, 0);
    state.convertedResults = [];
    const resultList = document.getElementById('convert-list');
    resultList.innerHTML = '';

    const totalFiles = state.convertFiles.length;
    const format = state.settings.convert.format;
    const quality = state.settings.convert.quality;

    for (let i = 0; i < totalFiles; i++) {
        const file = state.convertFiles[i];
        const progress = ((i + 0.5) / totalFiles) * 100;
        showProcessing(true, progress);

        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = await createImageBitmap(file);

            canvas.width = img.width;
            canvas.height = img.height;

            // Handle transparency for formats that don't support it
            if (format === 'jpeg') {
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            ctx.drawImage(img, 0, 0);

            const mimeType = `image/${format}`;
            const blob = await new Promise(resolve => {
                canvas.toBlob(resolve, mimeType, quality);
            });

            const reduction = ((file.size - blob.size) / file.size * 100).toFixed(1);

            const result = {
                original: file,
                blob,
                filename: generateFileName(file.name, 'converted', format),
                reduction,
                format: format.toUpperCase()
            };

            state.convertedResults.push(result);
            addResultItem(resultList, result, 'convert');

        } catch (error) {
            console.error('Conversion error:', error);
        }

        showProcessing(true, ((i + 1) / totalFiles) * 100);
    }

    showProcessing(false);
    document.getElementById('convert-result').style.display = 'block';
}

// ============================================
// Cropping
// ============================================
function initCropping() {
    const input = document.getElementById('crop-input');
    const ratioBtns = document.querySelectorAll('.ratio-btn');
    const presetSizeBtns = document.querySelectorAll('.preset-size-btn');
    const formatSelect = document.getElementById('crop-format');
    const resetBtn = document.getElementById('crop-reset');
    const applyBtn = document.getElementById('crop-apply');

    input.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            handleFileSelect(document.getElementById('crop-upload'), files);
        }
    });

    ratioBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            ratioBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const ratio = btn.dataset.ratio;
            const aspectRatio = ratio === 'free' ? NaN : parseFloat(ratio);
            state.settings.crop.aspectRatio = aspectRatio;

            if (state.cropper) {
                state.cropper.setAspectRatio(aspectRatio);
            }
        });
    });

    presetSizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const width = parseInt(btn.dataset.width);
            const height = parseInt(btn.dataset.height);

            if (state.cropper) {
                const ratio = width / height;
                state.cropper.setAspectRatio(ratio);
                state.cropper.setCropBoxData({ width, height });

                // Update ratio buttons
                ratioBtns.forEach(b => b.classList.remove('active'));
            }
        });
    });

    formatSelect.addEventListener('change', (e) => {
        state.settings.crop.format = e.target.value;
    });

    resetBtn.addEventListener('click', () => {
        if (state.cropper) {
            state.cropper.reset();
        }
    });

    applyBtn.addEventListener('click', applyCrop);

    // 选择其他图片按钮
    document.getElementById('crop-new').addEventListener('click', () => {
        resetCropWorkspace();
    });
}

function resetCropWorkspace() {
    // 销毁现有的 cropper
    if (state.cropper) {
        state.cropper.destroy();
        state.cropper = null;
    }
    state.cropFile = null;

    // 显示上传区域，隐藏工作区
    document.getElementById('crop-upload').style.display = 'block';
    document.getElementById('crop-workspace').style.display = 'none';

    // 清空图片元素
    document.getElementById('crop-image').src = '';

    // 重置比例按钮
    const ratioBtns = document.querySelectorAll('.ratio-btn');
    ratioBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.ratio === 'free');
    });
    state.settings.crop.aspectRatio = NaN;
}

function showCropWorkspace() {
    document.getElementById('crop-upload').style.display = 'none';
    document.getElementById('crop-workspace').style.display = 'grid';

    const imageEl = document.getElementById('crop-image');
    const reader = new FileReader();

    reader.onload = (e) => {
        imageEl.src = e.target.result;

        // Destroy existing cropper
        if (state.cropper) {
            state.cropper.destroy();
        }

        // Initialize new cropper
        state.cropper = new Cropper(imageEl, {
            aspectRatio: state.settings.crop.aspectRatio,
            viewMode: 1,
            autoCropArea: 0.8,
            responsive: true,
            guides: true,
            center: true,
            highlight: true,
            background: true,
        });
    };

    reader.readAsDataURL(state.cropFile);
}

async function applyCrop() {
    if (!state.cropper) return;

    showProcessing(true, 50);

    try {
        let format = state.settings.crop.format;
        let mimeType;

        if (format === 'original') {
            const originalType = state.cropFile.type;
            mimeType = originalType;
            format = originalType.split('/')[1];
        } else {
            mimeType = `image/${format}`;
        }

        const canvas = state.cropper.getCroppedCanvas();

        const blob = await new Promise(resolve => {
            canvas.toBlob(resolve, mimeType, 0.92);
        });

        const filename = generateFileName(state.cropFile.name, 'cropped', format);
        downloadFile(blob, filename);

    } catch (error) {
        console.error('Crop error:', error);
    }

    showProcessing(false);
}

// ============================================
// Result Item Rendering
// ============================================
function addResultItem(container, result, type) {
    const item = document.createElement('div');
    item.className = 'result-item';

    const thumbnailUrl = URL.createObjectURL(result.blob);

    item.innerHTML = `
        <img src="${thumbnailUrl}" alt="Thumbnail" class="result-thumbnail">
        <div class="result-info">
            <div class="result-filename">${result.filename}</div>
            <div class="result-stats">
                <span class="result-stat">
                    原始: ${formatFileSize(result.original.size)}
                </span>
                <span class="result-stat">
                    新: ${formatFileSize(result.blob.size)}
                </span>
                ${parseFloat(result.reduction) > 0 ? `
                    <span class="result-stat result-reduction">
                        ↓ ${result.reduction}%
                    </span>
                ` : ''}
                ${result.format ? `
                    <span class="result-stat">
                        → ${result.format}
                    </span>
                ` : ''}
            </div>
        </div>
        <div class="result-actions">
            <button class="download-btn" data-index="${container.children.length}">下载</button>
        </div>
    `;

    const downloadBtn = item.querySelector('.download-btn');
    downloadBtn.addEventListener('click', () => {
        downloadFile(result.blob, result.filename);
    });

    container.appendChild(item);
}

// ============================================
// Initialization
// ============================================
function init() {
    initLanguage();
    initNavigation();
    initDragDrop();
    initCompression();
    initConversion();
    initCropping();

    console.log('🎨 Image Cube loaded');
}

// ============================================
// Language Switching
// ============================================
function initLanguage() {
    // Apply initial language
    i18n.updatePage();

    // Language toggle button
    const langToggle = document.getElementById('lang-toggle');
    const langSwitcher = document.querySelector('.lang-switcher');
    const langOptions = document.querySelectorAll('.lang-option');

    if (langToggle) {
        langToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            langSwitcher.classList.toggle('open');
        });
    }

    // Language options
    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.dataset.lang;
            i18n.setLanguage(lang);
            langSwitcher.classList.remove('open');

            // Update active state
            langOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
        });

        // Set initial active state
        if (option.dataset.lang === i18n.currentLang) {
            option.classList.add('active');
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!langSwitcher.contains(e.target)) {
            langSwitcher.classList.remove('open');
        }
    });

    // Update logo text based on language
    i18n.onLanguageChange((lang) => {
        const logoText = document.querySelector('.logo-text');
        if (logoText) {
            const logoNames = {
                'en': 'Image Cube',
                'zh-CN': '图片魔方',
                'zh-TW': '圖片魔方'
            };
            logoText.textContent = logoNames[lang];
        }
    });
}

// Start the application
document.addEventListener('DOMContentLoaded', init);
