# 小鸡课表 · 网页版

> 一个纯前端的手机课表手账：课表 / 日常活动 / 省钱包 / 校园跑 / 日常出行。
> 全部数据只存在浏览器本机（localStorage），没有任何后端与上传。

- 入口文件：`index.html`（单文件构建产物，素材以 base64 内嵌，离线可开）
- 技术形态：原生 HTML + CSS + JS，无框架、无构建工具依赖，只有一段 Python 构建脚本负责把模板和数据拼成成品
- 适配：手机竖屏优先（390×844 起测），viewport-fit=cover，兼容 iOS 主屏幕 PWA 与安卓浏览器

---

## 1. 目录结构

```
web-ready/
├─ index.html                 ← 入口（构建产物，勿手改）
├─ manifest.webmanifest       ← PWA 清单
├─ sw.js                      ← 离线缓存（Service Worker）
├─ assets/
│  ├─ icons/                  ← 应用图标（icon-192 / icon-512 / apple-touch-icon）
│  ├─ media/                  ← iOS 启动图（3 种屏幕尺寸）
│  ├─ images/                 ← 壁纸与插画（webp，构建时内嵌进 index.html）
│  └─ data/courses.json       ← 课表数据（构建输入）
├─ source/                    ← 源码与构建脚本（唯一真源）
│  ├─ app.template.html       ← 页面模板（HTML/CSS/JS 全在这里）
│  ├─ build.py                ← 构建：模板 + 数据 + 素材 → index.html
│  ├─ assets_b64.json         ← 素材的 base64 版本（构建时替换占位符）
│  ├─ build_assets.py         ← 重新生成 assets_b64.json 的工具
│  ├─ import_schedule.py      ← 把教务《教学安排表.xls》转成 courses.json
│  └─ patch_webify.py         ← 本次「去原生化」的改写记录脚本
├─ tools/                     ← 本地调试工具（不参与线上部署）
│  ├─ serve.py                ← 局域网一键服务（手机同 WiFi 可访问）
│  ├─ 一键启动.bat            ← 双击启动上面那个服务
│  ├─ check_paths.py          ← 静态路径自检（含大小写校验）
│  ├─ smoke.js                ← 手机视口冒烟测试（CDP，抓 JS 异常与 404）
│  ├─ shots.js                ← 逐页截图脚本
│  ├─ gen_filelist.py         ← 重新生成 FILE-LIST.md
│  ├─ test.js / shot.js       ← 原项目自带的冒烟测试与截图脚本（保留未改）
├─ docs/                      ← 说明文档与验证截图
│  ├─ 需求规格说明书.md
│  ├─ 安装与打包指南.md
│  ├─ 教学安排表-导入报告.md
│  ├─ 小鸡课表-扫码.png
│  └─ verification/           ← 本次验证的真实截图（5 个 Tab + 设置弹层）
├─ _unused/                   ← 保留但网页用不到的东西（没删，只是移出来）
│  ├─ native-android/         ← 安卓壳（WebView + AlarmManager 精确闹钟）
│  ├─ native-ios/             ← iOS Flutter 壳
│  ├─ legacy-build/           ← 改造前的构建产物与旧构建脚本（对照用）
│  └─ python-vendor/          ← 纯 Python 二维码库（仅 serve.py 生成扫码图时用）
├─ README.md
└─ FILE-LIST.md
```

> 没有 `css/` 和 `js/` 目录：本项目刻意采用「单文件产物」策略，样式与脚本全部内联在 `index.html`，
> 图片以 base64 内嵌，好处是双击就能打开、断网也能用。要改样式请改 `source/app.template.html` 后重新构建。

---

## 2. 三种打开方式

### ① 直接双击（最简单）
双击 `index.html`，浏览器会以 `file://` 打开。

- ✅ 课表、活动、钱包、跑步、出行全部功能可用，数据照常存本机
- ❌ Service Worker 不注册（浏览器限制），离线缓存与「添加到主屏幕」不生效

### ② 本地服务器（推荐，最接近真实效果）
```bash
cd web-ready
python -m http.server 8000
# 浏览器打开 http://localhost:8000/index.html
```
或用自带的局域网服务（手机和电脑连同一个 WiFi 就能用手机打开）：
```bash
python tools/serve.py        # Windows 也可直接双击 tools/一键启动.bat
# 会在控制台打印 http://<你的局域网IP>:8765/index.html
```

### ③ 部署到静态托管（要 PWA / 离线才需要）
把 `web-ready/` 整个目录上传到任意静态站点（GitHub Pages、Vercel、对象存储、Nginx 均可）。

- 必须走 **https**，否则 Service Worker 不注册，「添加到主屏幕」「离线可用」都失效
- 不需要构建、不需要 Node、不需要后端

---

## 3. 重新构建

```bash
python source/build.py       # 在 web-ready/ 目录下执行
```
产出 `index.html`、`manifest.webmanifest`、`sw.js`。改了模板或课表数据后跑一次即可。

课表数据更新：把教务导出的《教学安排表.xls》放到 `D:\qq\下载文件\`，执行
`python source/import_schedule.py`，它会生成新的 `教学安排表-课程数据.json`，
复制/改名为 `assets/data/courses.json` 后再构建。

---

## 4. 与原（原生）版本的差异

原项目带安卓壳与 iOS 壳，有几件事**只有原生能做，纯网页做不到**，本次已按「做不到就删掉」处理：

| 功能 | 原生版做法 | 网页版处理 |
|---|---|---|
| 上课提醒（关掉 App 也能响） | `AndroidApp.scheduleReminders()` 交给 AlarmManager 排 14 天精确闹钟；iOS 由 `ChickBridge` 排本地通知 | **已移除**。改为「页面开着时」的到点检查：页内横幅 + 系统通知（需授权）。文案也改成如实说明 |
| 通知权限申请 | 原生弹系统权限框 | 改为浏览器 `Notification.requestPermission()` |
| 「再按一次退出」 | 原生拦截返回键 | 移除。保留 `window.__wbBack()`，网页后退手势先关弹层、再回课表页 |

保留且网页完全可用的部分：课表渲染、周次切换、活动、省钱包、校园跑、出行、导出/导入存档（JSON 文件）、壁纸切换、深浅色随系统。

---

## 5. 已知问题与注意事项

1. **提醒只在页面开着时有效**。手机浏览器不允许后台定时器，页面切走/锁屏就收不到——这是浏览器限制，不是 bug。需要真正的到点提醒，得用 `_unused/native-android` 里的原生壳。
2. **Service Worker 需要 http/https**。`file://` 双击打开时会静默跳过注册（代码里已判断协议），属预期行为。
3. **数据存在 localStorage**，清浏览器数据 / 换设备会丢。重要数据请用「设置 → 导出存档」备份成 JSON。
4. **http 局域网访问时**，部分浏览器不允许注册 SW、也不能装到主屏幕，仅用于试用。
5. **图标与启动图路径**已改为 `assets/icons/`、`assets/media/`；如果自行替换素材，注意同步 `manifest.webmanifest` 与 `sw.js` 的缓存清单，并把 `sw.js` 里的 `CACHE` 版本号 +1，否则手机会一直读旧缓存。
6. 字体全部使用系统字体（苹方 / 微软雅黑），没有外链字体，因此不会出现字体 404，但不同设备字重会有细微差异。
7. `_unused/` 里的东西**没有删除**，只是网页用不到；确认不需要后可自行清理。

---

## 6. 验证结果（2026-11-11）

| 项目 | 方法 | 结果 |
|---|---|---|
| 静态路径 | `tools/check_paths.py` 逐条比对（区分大小写） | 18 条引用全部存在 ✅ |
| HTTP 可达 | 本地服务器 `curl` 全部关键资源 | index / manifest / sw / 图标 / 启动图 均 200 ✅ |
| 运行时 | Edge 无头 + CDP，390×844 手机视口 | JS 异常 0，失败请求 0 ✅ |
| 版式 | 逐 Tab 截图 | 5 个 Tab 全部正常，无横向溢出（scrollWidth = innerWidth = 390）✅ |
| 原生残留 | 全文检索 `AndroidApp / ChickBridge / NATIVE / iosShell` | 0 处 ✅ |

截图见 `docs/verification/`。
