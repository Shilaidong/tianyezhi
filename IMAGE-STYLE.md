# 田野志 · Grok 配图设计规则

本刊全部配图用 Grok（GenerateImage）生成，风格对标 **Oxford American** 纪实摄影，尤其是 Issue 94《The Road to Tama-Re》里 Anderson Scott 那一组：空的地方、剩下的东西、人很小或背对镜头。真实、克制、有呼吸感。任何新图都必须符合下面的规则，否则宁可重画。

## 一、总基调（每张必带）

```
Photorealistic documentary photograph, Oxford American / Anderson Scott
empty-place photojournalism: shot on 35mm Kodak Portra 400, real film grain,
natural overcast or dusk light, muted earth tones, slightly underexposed,
imperfect, authentic, unposed, not CGI, not illustration, not 3D render,
not beauty-filtered, not airbrushed, no text, no watermark, no logo,
no readable signage, no flags.
```

**六条铁律：**
1. **像过期胶片上的真照片**，不要插画、3D、过曝、光滑皮肤。
2. **自然光**（阴天 / 晨雾 / 暮色 / 蓝调），不要影棚、不要轮廓光。
3. **低饱和、哑色**，贴近 Portra，不要糖水色。
4. **无人造文字 / 标志 / 水印**，招牌虚化到不可读。
5. **人不是封面模特。** 优先：空地、残件、手、后背、侧影、远处一个很小的人。脸必须在阴影里或转开，不准正脸微笑，不准对称网红脸，不准蜡像皮肤。
6. **去 AI 脸：** 写进 prompt：`asymmetrical weathered real skin, visible pores, not a beauty portrait, not stock photo, faces averted or cropped or from behind`。与其画一张假脸，不如拍空椅子。

## 二、按位置的规格

| 位置 | 宽高比 | 构图要求 |
|---|---|---|
| 首页主视觉 featured / 文章头图 | 16:9 | 宽幅空环境，略压暗，中央可留白叠标题；人若出现只占画面一角 |
| square-split / 文章卡 | 4:3 | 中景物件或背影，主体偏一侧 |
| 影像条 strip | 4:3 | 主体靠中上 |
| 田野铺子 goods | 1:1 | 静物，柔窗光 |
| 文内插图 | 4:3 | 每篇至少 2 张：一只手 / 一个空处 / 一件剩下的东西 |

每篇文章最低配置：**1 张 16:9 头图 + 2 张 4:3 文内图**。

**影像专题必须图文一一对应。** 文里写了「十二幅」，就得有十二张图，不能只挂头图。每条编号说明下面立刻跟 `![说明](/images/slug-NN.jpg)`。短专题（界碑早市、防川、漠河、喀什巴扎）至少头图 + 3 张文内图。长专题（断桥底下、冬天只剩官员）按编号配齐。

## 三、题材方法（对标 Tama-Re）

先找文章里「东西散尽之后还在的那一件」：锁着的抽屉、没开通的铁门、棚子里的桦皮船、旧寨的空灶坑。把那一件拍成照片，而不是把人摆成旅游海报。

写清楚：地点 + 天气 + 关键物 + 光线方向 + 前景遮挡。人物只给年龄/服饰/背对镜头的动作。

## 四、现成模板

**空地 / 残件（首选，特写头图）：**
```
Photorealistic documentary photograph, Oxford American Anderson Scott style,
35mm Portra 400, overcast, muted, fine grain, slightly underexposed,
empty place after people left, no text, no watermark, no flags.
[地点+物件+天气+前景杂草/泥/窗框], 16:9, human eye-level, not drone.
```

**背影 / 手（人物不得已时）：**
```
Photorealistic candid documentary, 35mm film, natural light, muted,
weathered hands or figure from behind, face averted or in shadow,
asymmetrical real skin, not beauty portrait, not CGI, quiet dignity.
[地点+年龄+动作+物件]
```

## 五、避免

- 正脸、微笑、眼神杀、对称五官、瓷娃娃皮肤。
- 国旗、可读招牌、logo、水印。
- 无人机大片、明信片饱和、影棚轮廓光。
- 「民族风情园」摆拍：盛装、篝火、跳锅庄。

## 六、声音栏目（不写设备）

录音文只写**谁、在哪儿、唱了什么、停了几次、同不同意刊发**。不要写手机型号、App 名、单声道、距演唱者多少厘米。正文里「把手机支在凳子上」可以，品牌和参数不要。

录制背景只保留：时间、地点、演唱者、曲目、停顿原因、整理者、授权。不写附件文件名里的机型。

## 七、图注跟作者走

照片风格统一（胶片、空地、不摆拍），**说明文字不统一**。图注跟作者的写法走，不是跟标点走：陈青麦用完整记者句；朴成日编号可以短，导语收尾要长；娜塔莎用冷静完整句，不学朴成日的口语碎句。不要所有图注都写成「空。风。门。」作者怎么起笔、用什么词，见 [WRITING-STYLE.md](WRITING-STYLE.md)。

## 八、工作流（先找真照片，再变换摄影）

不准凭印象空画。边境的奘房、哈亭、口岸货场、木刻楞、界碑早市长什么样，网上有真实照片；先找到、用视觉核对，再基于原图改角度和摄影方式生图。空 prompt 会画出旅游海报和假地方。

1. **读稿。** 记下地点（精确到村镇/口岸/寺/江段）、关键物件、天气、光线、要不要人。
2. **上网找真照片。** 用具体地名搜（如「瑞丽 奘房 内部」「霍尔果斯 货场 夜」「防川 瞭望台」「漠河 黑龙江 封冻」），不要搜「边境风情」。每张目标图至少存 1 张参考图到 `.image-refs/`（gitignored）。拒用：民族园盛装、国旗海报、可读招牌特写、插画、3D、明显 AI 图。
3. **视觉确认。** 打开参考图核对：是不是这个地方/这类建筑/这件东西？光线和季节对不对？有没有旗、可读文字、正脸？不对就换图，不准将就。
4. **图文一起生。** GenerateImage 必须带上 `reference_image_paths`（刚确认过的真照片）+ 英文摄影说明。要求：
   - **保留原图的真实身份**（这座门、这条江、这种屋顶），不要换成「看起来像边境」的布景。
   - **变换角度和摄影**：不要 1:1 临摹构图。换机位（平视、门框里看、侧前方、更近的残件），换成 35mm Portra 400、阴天/晨暮、略欠曝、细颗粒、Oxford American / Anderson Scott 空地。
   - 套第一节总基调；人物只给背影/手。
5. **落盘。** 头图 16:9、文内 4:3、铺子 1:1。覆盖 `public/images/` 原文件名（保持 `.jpg`）。不要改 markdown 路径。
6. 影像专题：先数正文编号，再按编号走完 2–5，缺一张都不算完。

## 九、特刊封面（Oxford American 杂志封面）

特刊封面不是网站头图。它是一本杂志立在桌上的那一面：竖构图 **3:4**，照片铺满，刊名、期号、主题用排版叠上去，**照片里不要字**。

对标 OA：每期一张从本期稿子里抽出的纪实照片当封面，再配一套只属于这一期的刊头。不要五期共用一条色带。

| 期 | 布局名 | 照片（现用） | 刊头怎么叠 | 再生图时的摄影说明 |
|---|---|---|---|---|
| 创刊号 · 界河 | `river` | `jie-he-xi-yi-ji.jpg` 瑞丽江雾、吊脚楼、棒槌 | 顶栏半透明青绿刊名「田野志 / Edgeland」，底部大字「界河」 | 保留两岸河湾与雾。3:4，上方多留雾给刊名，下方湿石与棒槌。阴天 Portra，略欠曝。无人正脸。 |
| 第二期 · 口岸 | `port` | `huo-er-guo-si-ye-ban.jpg` 霍尔果斯夜班两列卡车 | 顶上实色朱砂刊头带，右上期号方框，底「口岸」 | 保留货场走廊与车灯。3:4，上方多留夜空给刊头。钠灯，湿地面反光。空场，不要人。 |
| 第三期 · 香火 | `incense` | `zhuang-fang-wu-dian-kai-men.jpg` 门缝灯、砖院、奘房顶 | 内框细线，右侧竖排「田野志」，底部实色底板「香火」 | 保留木门缝里那一线灯。3:4，前景门板更大，院与屋顶退后。蓝调，灯暖。空院子。 |
| 第四期 · 古道 | `road` | `yan-hai-zai-tian-li.jpg` 澜沧江边盐田木架 | 照片在上，下部约 32% 土色底板写「古道」与季节 | 保留木架卤池与江。3:4，木架占下半，天空留给刊名带。暮色，空架，不要人。 |
| 第五期 · 西藏 | `plateau` | `chu-zhen-yao-guo-he.jpg` 察隅河谷、对岸田与村 | 巨大半透明期号「05」衬在山里，顶栏淡刊名，底「西藏」 | 保留河、田、村、山雾。3:4，上方多山，河在下三分之一。阴天，空岸。 |

排版规则（做封面组件时也遵守）：

1. 照片铺满，**不在图上烧字**；刊名、期号、主题全部 HTML/CSS 叠层。
2. 比例固定 3:4。网站头图仍是 16:9，不要把特刊封面拉成宽图。
3. 每期主色跟 `issues.ts` 里的 `color`：界河 `#33585e`，口岸 `#b03a24`，香火 `#6b4536`，古道 `#5c4a32`，西藏 `#3f534c`。
4. 首页特刊是**叠层封面滚动**：中间一本最大，两侧缩后、略转、略暗，可点、可滑、可左右键切换。点正面封面进入该期全部文章。
5. 再生封面底图时走第八节：先用本期已刊照片做 `reference_image_paths`，只改裁切和颗粒，不换地方。

落盘（若单独出封面底图）：`public/images/covers/issue-0N.jpg`，3:4。现在首页直接用上表「现用」照片裁成封面，避免再画一套假地方。
