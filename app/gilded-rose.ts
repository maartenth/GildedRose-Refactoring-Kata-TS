export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const legendaryItems = ["Sulfuras, Hand of Ragnaros"];

const specialItemHandlers: {
  [name: string]: (quality: number, sellIn: number) => number;
} = {
  "Aged Brie": (q) => q + 1,
  "Backstage passes to a TAFKAL80ETC concert": (q, sellIn) =>
    sellIn < 1 ? 0 : sellIn < 6 ? q + 3 : sellIn < 11 ? q + 2 : q + 1,
  "Conjured Mana Cake": (q) => q - 2,
};

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      const updateQuality = specialItemHandlers[item.name] || ((q) => q - 1);

      if (legendaryItems.indexOf(item.name) === -1) {
        const unboundQuality = updateQuality(item.quality, item.sellIn);
        item.quality = Math.min(50, Math.max(0, unboundQuality));
        item.sellIn -= 1;
      }
    }

    return this.items;
  }
}
