import { expect } from "chai";
import { Item, GildedRose } from "../app/gilded-rose";

describe("Gilded Rose", function () {
  it("should update sellIn", function () {
    const gildedRose = new GildedRose([
      new Item("Ancient Qiraji Ripper", 10, 20),
      new Item("Jack the Ripper", 12, 18),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(9);
    expect(items[1].sellIn).to.equal(11);
  });

  it("should correctly update quality of normal items", function () {
    const gildedRose = new GildedRose([
      new Item("Ancient Qiraji Ripper", 10, 20),
      new Item("Jack the Ripper", 12, 18),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(19);
    expect(items[1].quality).to.equal(17);
  });

  it("should not decrease quality below zero", function () {
    const gildedRose = new GildedRose([
      new Item("Ancient Qiraji Ripper", 10, 0),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  it("should increase Aged Brie quality until 50", function () {
    const gildedRose = new GildedRose([
      new Item("Aged Brie", 10, 20),
      new Item("Aged Brie", 10, 50),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(21);
    expect(items[1].quality).to.equal(50);
  });

  it("should increase backstage passes quality according to number of days left", function () {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 11, 1),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 1),
      new Item("Backstage passes to a TAFKAL80ETC concert", 6, 1),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 1),
      new Item("Backstage passes to a TAFKAL80ETC concert", 1, 1),
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 1),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(2);
    expect(items[1].quality).to.equal(3);
    expect(items[2].quality).to.equal(3);
    expect(items[3].quality).to.equal(4);
    expect(items[4].quality).to.equal(4);
    expect(items[5].quality).to.equal(0);
  });

  it("should not increase backstage passes quality beyond 50", function () {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 2, 49),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });

  it("should respect Sulfuras, Hand of Ragnaros", function () {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 10, 80),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(80);

    // this is not in the requirements but it is explicitly handled
    // in the original code, so test for backward compatibility
    expect(items[0].sellIn).to.equal(10);
  });

  it("should decrease Conjured items twice as fast", function () {
    const gildedRose = new GildedRose([
      new Item("Conjured Mana Cake", 10, 50),
      new Item("Conjured Mana Cake", 1, 1),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(48);
    expect(items[1].quality).to.equal(0);
  });
});
