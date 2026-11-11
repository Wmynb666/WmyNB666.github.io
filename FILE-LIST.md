# FILE-LIST · 小鸡课表网页版

整理基准：`E:\work Buddy工作区\iphone-class-app` → `E:\work Buddy工作区\web-ready`
备份：`E:\work Buddy工作区\_backup\iphone-class-app_20261111`（原项目完整副本，未改动）

| 原路径 | 新路径 | 大小 | 类型/用途 | 被引用 | 改过路径 | 备注 |
|---|---|---|---|---|---|---|
| `（本次新增）` | `FILE-LIST.md` | 7 KB | 文件清单（本文件） | 否 | — |  |
| `（本次新增）` | `README.md` | 8 KB | 项目说明与使用方式 | 否 | — |  |
| `iphone-class-app/教学安排表-课程数据.json` | `assets/data/courses.json` | 6 KB | 课表数据（15 条课程 + 2 场考试） | 是（构建输入） | 是 | 中文名改为 courses.json，避免部署到 Linux 后中文路径问题 |
| `iphone-class-app/apple-touch-icon.png` | `assets/icons/apple-touch-icon.png` | 35 KB | iOS 添加到主屏幕图标 | 是（index.html link） | 是 |  |
| `iphone-class-app/icon-192.png` | `assets/icons/icon-192.png` | 39 KB | PWA 小图标 | 是（manifest） | 是 |  |
| `iphone-class-app/icon-512.png` | `assets/icons/icon-512.png` | 177 KB | PWA 大图标 | 是（manifest） | 是 |  |
| `iphone-class-app/splash-1125x2436.png` | `assets/media/splash-1125x2436.png` | 95 KB | iOS 启动图 375×812@3x | 是（index.html link） | 是 | 同上 |
| `iphone-class-app/splash-1170x2532.png` | `assets/media/splash-1170x2532.png` | 100 KB | iOS 启动图 390×844@3x | 是（index.html link） | 是 | 尺寸必须精确，否则 Safari 静默忽略 |
| `iphone-class-app/splash-1284x2778.png` | `assets/media/splash-1284x2778.png` | 113 KB | iOS 启动图 428×926@3x | 是（index.html link） | 是 | 同上 |
| `iphone-class-app/安装与打包指南.md` | `docs/安装与打包指南.md` | 29 KB | 原生版安装/打包指南 | 否 | 否 | 面向原生壳，网页版仅作参考 |
| `iphone-class-app/小鸡课表-扫码.png` | `docs/小鸡课表-扫码.png` | 11 KB | 局域网访问二维码图 | 否 | 是 | serve.py 会把新二维码也写到这个位置 |
| `iphone-class-app/教学安排表-导入报告.md` | `docs/教学安排表-导入报告.md` | 4 KB | 课表导入结果报告 | 否 | 否 |  |
| `iphone-class-app/需求规格说明书.md` | `docs/需求规格说明书.md` | 14 KB | 功能与需求说明 | 否 | 否 |  |
| `iphone-class-app/index.html` | `index.html` | 361 KB | 入口页面（构建产物） | 是（入口） | 是 | 由 source/build.py 重新生成：外链只保留 manifest、图标、启动图，其余素材 base64 内嵌 |
| `iphone-class-app/manifest.webmanifest` | `manifest.webmanifest` | 640 B | PWA 清单 | 是（index.html link） | 是 | 图标路径改为 assets/icons/；start_url 保持 ./index.html |
| `iphone-class-app/app.template.html` | `source/app.template.html` | 73 KB | 页面模板：HTML+CSS+JS 唯一真源 | 是（构建输入） | 否 | 内容已改写：删除 AndroidApp/ChickBridge 原生桥与原生提醒逻辑 |
| `iphone-class-app/assets_b64.json` | `source/assets_b64.json` | 281 KB | 素材 base64（10 张 webp + 图标） | 是（构建输入） | 否 |  |
| `iphone-class-app/build.py` | `source/build.py` | 5 KB | 构建脚本 | 是（执行） | 是 | 重写：只产出 index.html + manifest + sw.js；图标/启动图指向 assets/；去掉单文件分享版与 Flutter 同步 |
| `iphone-class-app/build_assets.py` | `source/build_assets.py` | 6 KB | 把 assets/images 里的 webp 重新打包成 assets_b64.json | 否（开发者工具） | 否 | 需要时手动执行；路径按原项目同级读取 |
| `iphone-class-app/import_schedule.py` | `source/import_schedule.py` | 10 KB | 把教务导出的 .xls(GBK HTML 表格) 转成课表 JSON | 否（开发者工具） | 否 | 数据更新时使用 |
| `（本次新增）` | `source/patch_webify.py` | 7 KB | 去原生化改写的可复算脚本 | 否（一次性记录） | — | 记录了本次删掉的每一处原生代码，便于回溯 |
| `iphone-class-app/sw.js` | `sw.js` | 1 KB | 离线缓存 Service Worker | 是（JS 注册） | 是 | 缓存清单改为新路径；CACHE 版本 v2→v3，避免手机读旧缓存 |
| `（本次新增）` | `tools/check_paths.py` | 3 KB | 静态路径自检：逐条验证引用存在且大小写一致 | 否 | — | 部署前建议每次跑一次 |
| `（本次新增）` | `tools/gen_filelist.py` | 9 KB | 生成本文件清单 | 否 | — |  |
| `iphone-class-app/serve.py` | `tools/serve.py` | 4 KB | 局域网一键静态服务 + 扫码图 | 否（调试工具） | 是 | 根目录改为上一级（web-ready/）；vendor 路径指向 _unused/python-vendor |
| `iphone-class-app/shot.js` | `tools/shot.js` | 3 KB | 原截图脚本 | 否 | 否 |  |
| `（本次新增）` | `tools/shots.js` | 2 KB | 逐 Tab 截图脚本 | 否 | — | 产物写入 docs/verification/ |
| `（本次新增）` | `tools/smoke.js` | 5 KB | 手机视口冒烟测试（CDP） | 否 | — | 需 Edge/Chrome 带 --remote-debugging-port=9222 |
| `iphone-class-app/test.js` | `tools/test.js` | 10 KB | 原 CDP 冒烟测试（含真实增删改流程） | 否 | 否 | 端口与路径沿用原项目，仍可用于 8765 |
| `iphone-class-app/一键启动.bat` | `tools/一键启动.bat` | 62 B | Windows 双击启动 serve.py | 否 | 否 |  |
| `iphone-class-app/index.html、build.py、sw.js、manifest.webmanifest` | `_unused/legacy-build/` | 5 个文件 | 改造前的构建产物与旧构建脚本 | 否 | 是 | 对照用：可 diff 看本次改了什么 |
| `iphone-class-app/android/` | `_unused/native-android/` | 55 个文件 | 安卓 WebView 壳（含 AlarmManager 精确闹钟、打包脚本） | 否 | 是（从项目根移入） | 纯网页无法实现「关掉也能响」的提醒，保留备查 |
| `iphone-class-app/flutter_ios/` | `_unused/native-ios/` | 5 个文件 | iOS Flutter 壳与通知资源 | 否 | 是（从项目根移入） | 同上 |
| `iphone-class-app/vendor/` | `_unused/python-vendor/` | 36 个文件 | 纯 Python 二维码库 qrcode（含 __pycache__） | 否 | 是 | 仅 tools/serve.py 生成扫码图时用；不影响网页 |
| `iphone-class-app/（根目录散落的 wall*.webp、chick-*.webp）` | `assets/images/` | 10 个文件 | 壁纸与插画源文件（wall0-5.webp、chick-bell/buddy/read/sleep.webp） | 否（构建时已内嵌 base64） | 是（移入 assets/images） | 网页运行时不直接请求这些文件；改图后需重跑 build_assets.py + build.py |
| `（本次新增）` | `docs/verification/` | 8 个文件 | 验证截图（5 个 Tab + 设置弹层 + 整页） | 否 | — | 390×844 手机视口真机内核渲染 |

## 说明

1. **没有任何文件被删除**。网页用不到的一律移到 `_unused/`，与运行无关但可能还有价值的放 `legacy-build/`。
2. `index.html` 是**构建产物**，请改 `source/app.template.html` 后运行 `python source/build.py` 重新生成。
3. 所有中文文件名已改为英文（`教学安排表-课程数据.json` → `assets/data/courses.json`），避免部署到 Linux 后 404。
4. 所有引用均为相对路径，没有 `file:///`、`C:\` 之类本地绝对路径。
