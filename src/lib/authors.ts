export type Author = {
  slug: string;
  name: string;
  place: string;
  bio: string;
  network?: boolean;
};

export const AUTHORS: Author[] = [
  {
    slug: "yu-bo",
    name: "玉波",
    place: "云南 · 德宏",
    bio: "傣族，在瑞丽江边长大。书写边境人家的日常，相信最慢的那条河最懂两岸。",
    network: true,
  },
  {
    slug: "chen-qingmai",
    name: "陈青麦",
    place: "本刊记者",
    bio: "本刊记者，行走于边境村镇与口岸之间，关注集市、道路与谋生的人。",
  },
  {
    slug: "su-suo",
    name: "苏蓑",
    place: "本刊写作者",
    bio: "写作者，长期记录高原与草原上的声音：鹰笛、长调与逐渐消失的歌。",
    network: true,
  },
  {
    slug: "jiang-jinyue",
    name: "江浸月",
    place: "本刊特约",
    bio: "口述史整理人。认为每一个人的一辈子都值得被原话记下。",
  },
  {
    slug: "lin-shisui",
    name: "林拾穗",
    place: "本刊记者",
    bio: "本刊记者，关注边境教育、方言与正在消失的小学校。",
  },
  {
    slug: "mo-zhi",
    name: "莫轾",
    place: "本刊写作者",
    bio: "写作者，重走过三条古道。写路，也写路上不再回来的人。",
    network: true,
  },
  {
    slug: "ai-zi-mai-ti",
    name: "艾孜买提·吐尔逊",
    place: "新疆 · 霍尔果斯",
    bio: "维吾尔族。霍尔果斯一家报关行的夜班调度，在口岸货场过了十一年。",
    network: true,
  },
  {
    slug: "yin-qiu",
    name: "尹秋",
    place: "云南 · 腾冲",
    bio: "猴桥镇人。口岸货运部开了八年，认得每一辆从缅甸过来的车的声音。",
    network: true,
  },
  {
    slug: "nong-xiu-mei",
    name: "农秀梅",
    place: "广西 · 凭祥",
    bio: "壮族。凭祥一所中学的地理老师，周末回友谊关外帮母亲看水果摊。",
    network: true,
  },
  {
    slug: "ci-ren-wang-dui",
    name: "次仁旺堆",
    place: "西藏 · 樟木",
    bio: "藏族。聂拉木县樟木镇卫生院司机，口岸恢复后每周跑三次吉隆沟。",
    network: true,
  },
  {
    slug: "sha-li",
    name: "沙砾",
    place: "内蒙古 · 额济纳",
    bio: "额济纳旗人，文化馆馆员。夏天在胡杨林讲解，冬天去策克口岸看风。",
    network: true,
  },
  {
    slug: "liang-shuang",
    name: "梁霜",
    place: "内蒙古 · 满洲里",
    bio: "在满洲里国际列车上当了八年乘务。俄语是在餐车里学的。",
    network: true,
  },
  {
    slug: "piao-cheng-ri",
    name: "朴成日",
    place: "辽宁 · 丹东",
    bio: "朝鲜族。丹东本地摄影师，拍了十二年鸭绿江，相机里最多的是桥下的人，不是桥。",
    network: true,
  },
  {
    slug: "yan-wen-bian",
    name: "岩温扁",
    place: "云南 · 勐腊",
    bio: "克木人。勐腊县勐满镇文化站临时工，跟寨子里的老人学古歌。",
    network: true,
  },
  {
    slug: "wu-yun-qi-qi-ge",
    name: "乌云其其格",
    place: "内蒙古 · 二连浩特",
    bio: "蒙古族。二连浩特互市翻译。把往来司机的话原样记下来，是她给自己定的规矩。",
    network: true,
  },
  {
    slug: "zhou-shuan-zhu",
    name: "周拴柱",
    place: "甘肃 · 肃北",
    bio: "马鬃山镇护边员。骆驼比人认路。周末把镇上的小事写成纸条。",
    network: true,
  },
  {
    slug: "pan-jin-lian",
    name: "盘金莲",
    place: "云南 · 金平",
    bio: "金水河镇中学教师。周末回南科。路上的泥比地图准确。",
    network: true,
  },
  {
    slug: "ha-li-mu",
    name: "哈力木·哈森",
    place: "新疆 · 哈巴河",
    bio: "兵团农十师一八五团职工。在一张从未开通的口岸地图旁边生活了二十年。",
    network: true,
  },
  {
    slug: "mi-ma",
    name: "米玛",
    place: "西藏 · 定结",
    bio: "日屋到陈塘的司机。公路通车以前，这条路是用腿走完的。",
    network: true,
  },
  {
    slug: "meng-he-jie",
    name: "孟和杰",
    place: "黑龙江 · 塔河",
    bio: "十八站护林员。船还在棚子里，河还在，猎不打了。",
    network: true,
  },
  {
    slug: "ge-sang-la-mu",
    name: "格桑拉姆",
    place: "西藏 · 察隅",
    bio: "下察隅卫生院护士。把僜人老人的话原样记下，不改成参观词。",
    network: true,
  },
  {
    slug: "you-xiu-lan",
    name: "尤秀兰",
    place: "黑龙江 · 饶河",
    bio: "四排乡人。伊玛堪是听父亲唱的，鱼皮在抽屉里，不在景区里。",
    network: true,
  },
  {
    slug: "na-ta-sha",
    name: "娜塔莎·李",
    place: "内蒙古 · 额尔古纳",
    bio: "恩和华俄后裔。拍木刻楞，不拍室韦的仿俄式街。",
    network: true,
  },
  {
    slug: "ma-yi-la",
    name: "玛依拉·吐尔干",
    place: "新疆 · 乌恰",
    bio: "吉根乡斯姆哈纳村牧民。太阳在这里落得最晚，羊比塔先到。",
    network: true,
  },
  {
    slug: "huang-xiu-ying",
    name: "黄秀英",
    place: "广西 · 那坡",
    bio: "平孟归侨的女儿。记得农历三、八的圩，也记得桐油换布的秤。",
    network: true,
  },
  {
    slug: "ha-de-er",
    name: "哈德尔",
    place: "新疆 · 福海",
    bio: "红山嘴护边员。口岸一年开一百天，其余时候门对着雪。",
    network: true,
  },
  {
    slug: "dao-cheng-en",
    name: "刀承恩",
    place: "云南 · 瑞丽",
    bio: "傣族。姐告奘房开门的人。门开了，灯才算亮。",
    network: true,
  },
  {
    slug: "ma-fu-hai",
    name: "马福海",
    place: "新疆 · 霍尔果斯",
    bio: "回族。货场装卸。周五主麻，车先停。",
    network: true,
  },
  {
    slug: "ruan-shi-mei",
    name: "阮氏梅",
    place: "广西 · 东兴",
    bio: "京族。哈亭管事。节怎么过，灯先亮。",
    network: true,
  },
  {
    slug: "suo-lang-qu-zhen",
    name: "索朗曲珍",
    place: "西藏 · 普兰",
    bio: "普兰人。转山是走路，不是去看山。",
    network: true,
  },
  {
    slug: "ba-tu-meng-ke",
    name: "巴图孟克",
    place: "内蒙古 · 额济纳",
    bio: "土尔扈特人。敖包上的石头，谁放的谁知道。",
    network: true,
  },
  {
    slug: "yi-lin-na-zhang",
    name: "伊琳娜·张",
    place: "内蒙古 · 满洲里",
    bio: "华俄后裔。拍空堂，不拍景区里的洋葱头。",
    network: true,
  },
  {
    slug: "yu-han",
    name: "玉罕",
    place: "云南 · 芒市",
    bio: "傣族。奘房里念早课。灯油尽了就停，添完再念。",
    network: true,
  },
  {
    slug: "yan-kan",
    name: "岩坎",
    place: "云南 · 沧源",
    bio: "佤族。木鼓房看房。鼓不是给游客敲的。",
    network: true,
  },
  {
    slug: "gong-jue",
    name: "贡觉",
    place: "西藏 · 仲巴",
    bio: "仲巴人。玛永边贸点摆摊。风先到，货后到。",
    network: true,
  },
];

export const BORDERWIRE_AUTHOR = "田野志 · 边境雷达";

type AuthorRow = {
  slug: string;
  name: string;
  place: string;
  bio: string;
  network: number;
};

function mapAuthor(row: AuthorRow): Author {
  return {
    slug: row.slug,
    name: row.name,
    place: row.place,
    bio: row.bio,
    network: Boolean(row.network),
  };
}

export async function getAllAuthors(): Promise<Author[]> {
  const { getDb } = await import("./cf");
  const db = await getDb();
  if (db) {
    const { results } = await db
      .prepare("SELECT slug, name, place, bio, network FROM authors")
      .all<AuthorRow>();
    if (results?.length) return results.map(mapAuthor);
  }
  return AUTHORS;
}

export async function getAuthorBySlug(slug: string): Promise<Author | undefined> {
  const { getDb } = await import("./cf");
  const db = await getDb();
  if (db) {
    const row = await db
      .prepare("SELECT slug, name, place, bio, network FROM authors WHERE slug = ?")
      .bind(slug)
      .first<AuthorRow>();
    return row ? mapAuthor(row) : undefined;
  }
  return AUTHORS.find((a) => a.slug === slug);
}

export async function getAuthorByName(name: string): Promise<Author | undefined> {
  const { getDb } = await import("./cf");
  const db = await getDb();
  if (db) {
    const row = await db
      .prepare("SELECT slug, name, place, bio, network FROM authors WHERE name = ?")
      .bind(name)
      .first<AuthorRow>();
    return row ? mapAuthor(row) : undefined;
  }
  return AUTHORS.find((a) => a.name === name);
}
