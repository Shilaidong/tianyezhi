import Image from "next/image";

const GOODS = [
  {
    name: "「界河」创刊号 · 印刷版",
    price: "¥68",
    status: "预购",
    image: "/images/goods-issue.jpg",
  },
  {
    name: "田野帆布帽",
    price: "¥128",
    status: "即将开售",
    image: "/images/goods-hat.jpg",
  },
];

export default function GoodsBlock() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 pt-20">
      <div className="border border-ink/15 bg-paper-deep px-8 py-12 sm:px-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="oa-section-title">田野铺子</h2>
            <p className="mt-3 max-w-xl font-body text-[15px] font-light leading-relaxed text-ink-soft">
              田野志是一份非营利刊物。支持慢叙事的方式大多不可机洗——这顶帽子可以。
            </p>
          </div>
          <span className="oa-label text-ink-soft">OA GOODS 式支持</span>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {GOODS.map((item) => (
            <div key={item.name} className="group">
              <div className="relative aspect-square overflow-hidden border border-ink/10 bg-paper">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 850px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <p className="mt-3 font-song text-[16px] font-semibold">{item.name}</p>
              <p className="oa-label mt-1.5 text-ink-soft">
                {item.price} · {item.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
