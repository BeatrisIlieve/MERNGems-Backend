const mongoose = require("mongoose");
const Jewelry = require("./models/Jewelry");
const Category = require("./models/Category");
const JewelryCollection = require("./models/JewelryCollection");
const StoneType = require("./models/StoneType");
const StoneColor = require("./models/StoneColor");
const JewelryStones = require("./models/JewelryStones");
const Size = require("./models/Size");
const Inventory = require("./models/Inventory");
require("dotenv").config();

async function populateDb() {
  await mongoose.connect(
    "mongodb+srv://beatrisilieve:31iiG2CgGYT18OZg@merngemscluster.u9znfhf.mongodb.net/?retryWrites=true&w=majority&appName=MERNGemsCluster"
  );

  await Category.create({
    title: "Bracelet",
  });

  await Category.create({
    title: "Earring",
  });

  await Category.create({
    title: "Necklace",
  });

  await Category.create({
    title: "Ring",
  });

  await JewelryCollection.create({
    title: "Diamond Loop",
  });

  await JewelryCollection.create({
    title: "Sparkling Cluster",
  });

  await JewelryCollection.create({
    title: "Forget-Me-Not",
  });

  await JewelryCollection.create({
    title: "Sunflower",
  });

  await StoneType.create({
    title: "Spinel",
  });

  await StoneType.create({
    title: "Diamond",
  });

  await StoneType.create({
    title: "Ruby",
  });

  await StoneType.create({
    title: "Sapphire",
  });

  await StoneColor.create({
    title: "Aquamarine",
  });

  await StoneColor.create({
    title: "Black",
  });

  await StoneColor.create({
    title: "Blue",
  });

  await StoneColor.create({
    title: "Pink",
  });

  await StoneColor.create({
    title: "Red",
  });

  await StoneColor.create({
    title: "White",
  });

  await StoneColor.create({
    title: "Yellow",
  });

  await Size.create({
    measurement: "15.2 cm",
  });

  await Size.create({
    measurement: "17.8 cm",
  });

  await Size.create({
    measurement: "19.3 cm",
  });

  await Size.create({
    measurement: "2.05 cm",
  });

  await Size.create({
    measurement: "3.95 cm",
  });

  await Size.create({
    measurement: "5.86 cm",
  });

  await Size.create({
    measurement: "40.64 cm",
  });

  await Size.create({
    measurement: "43.18 cm",
  });

  await Size.create({
    measurement: "45.72 cm",
  });

  await Size.create({
    measurement: "4.7 cm",
  });

  await Size.create({
    measurement: "4.9 cm",
  });

  await Size.create({
    measurement: "5.05 cm",
  });

  const allCategories = await Category.find();
  const allJewelryCollections = await JewelryCollection.find();
  const allStoneTypes = await StoneType.find();
  const allStoneColors = await StoneColor.find();
  const allSizes = await Size.find();

  await Jewelry.create({
    title: "Diamond Loop Full Motif Diamond Bracelet",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968212/mern-gems/diamond-loop/bracelets/diamond_loop_full_motif_diamond_bracelet_brdprp1ml4c_e-1_bscok2.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968229/mern-gems/diamond-loop/bracelets/diamond_loop_full_motif_diamond_bracelet_brdprp1ml4c_e-2_nynjvd.avif",
    category: allCategories[0],
    jewelryCollection: allJewelryCollections[0],
    description:
      "Four pear-shaped and 81 round brilliant diamonds weighing a total of approximately 4.41 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Diamond Loop Full Motif Diamond Earrings",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968209/mern-gems/diamond-loop/earrings/diamond_loop_earrings_diamond_eadprpmel4c_e-1_hybfgc.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968228/mern-gems/diamond-loop/earrings/diamond_loop_earrings_diamond_eadprpmel4c_e-2_sefdlv.webp",
    category: allCategories[1],
    jewelryCollection: allJewelryCollections[0],
    description:
      "8 pear-shaped and 58 round brilliant diamonds weighing a total of approximately 3.80 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Diamond Loop Full Motif Yellow Sapphire and Diamond Earrings",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968209/mern-gems/diamond-loop/earrings/diamond_loop_earrings_full_motif_yellow_sapphire_diamond_eaysprpmel4c_e-1_sqhzlo.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968210/mern-gems/diamond-loop/earrings/diamond_loop_earrings_full_motif_yellow_sapphire_diamond_eaysprpmel4c_e-2_qaklcf.webp",
    category: allCategories[1],
    jewelryCollection: allJewelryCollections[0],
    description:
      "8 pear-shaped yellow sapphires weighing a total of approximately 1.66 carats and 58 round brilliant diamonds weighing a total of approximately 2.66 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Diamond Loop Full Motif Black Spinel and Diamond Earrings",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968227/mern-gems/diamond-loop/earrings/diamond_loop_earrings_full_motif_black_spinel_diamond_eabsprpmel4c_e-1_uk2rnr.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968210/mern-gems/diamond-loop/earrings/diamond_loop_earrings_full_motif_black_spinel_diamond_eabsprpmel4c_e-2_wre6xg.webp",
    category: allCategories[1],
    jewelryCollection: allJewelryCollections[0],
    description:
      "8 pear-shaped black spinels weighing a total of 1.61 carats and 58 round brilliant diamonds weighing a total of 2.66 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Diamond Loop Full Motif Ruby and Diamond Earrings",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968213/mern-gems/diamond-loop/earrings/diamond_loop_earrings_full_motif_ruby_and_diamond_earprpmel4c_e-1_m4hjan.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968219/mern-gems/diamond-loop/earrings/diamond_loop_earrings_full_motif_ruby_and_diamond_earprpmel4c_e-2_etnepk.webp",
    category: allCategories[1],
    jewelryCollection: allJewelryCollections[0],
    description:
      "8 pear-shaped rubies weighing a total of approximately 1.83 carats and 58 round brilliant diamonds weighing a total of approximately 2.66 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Diamond Loop Full Motif Diamond Pendant",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968225/mern-gems/diamond-loop/necklaces/diamond_loop_full_motif_diamond_pendant_pedprpmel4c_e-1h_evwkpx.webp",
    category: allCategories[2],
    jewelryCollection: allJewelryCollections[0],
    description:
      "4 pear-shaped and 29 round brilliant diamonds weighing a total of approximately 1.89 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Diamond Loop Full Motif Yellow Sapphire and Diamond Pendant",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968212/mern-gems/diamond-loop/necklaces/diamond_loop_pendant_full_motif_yellow_sapphire_diamond_peysprpmel4c_e-2_chvti2.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968207/mern-gems/diamond-loop/necklaces/diamond_loop_pendant_full_motif_yellow_sapphire_diamond_peysprpmel4c_e-3_bzzgt1.avif",
    category: allCategories[2],
    jewelryCollection: allJewelryCollections[0],
    description:
      "4 pear-shaped yellow sapphires weighing a total of approximately 0.85 carats and 29 round brilliant diamonds weighing a total of approximately 1.33 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Diamond Loop Full Motif Black Spinel and Diamond Pendant",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968234/mern-gems/diamond-loop/necklaces/diamond_loop_pendant_full_motif_black_spinel_diamond_pebsprpmel4c_e-2_i1p2kj.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968221/mern-gems/diamond-loop/necklaces/diamond_loop_pendant_full_motif_black_spinel_diamond_pebsprpmel4c_e-3_crpvpw.avif",
    category: allCategories[2],
    jewelryCollection: allJewelryCollections[0],
    description:
      "4 pear-shaped black spinels weighing a total of approximately 0.80 carats and 29 round brilliant diamonds weighing a total of approximately 1.33 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Diamond Loop Full Motif Ruby and Diamond Pendant",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968211/mern-gems/diamond-loop/necklaces/diamond_loop_pendant_full_motif_ruby_and_diamond_perprpmel4c_e-1_ucqur0.avif",
    category: allCategories[2],
    jewelryCollection: allJewelryCollections[0],
    description:
      "4 pear-shaped rubies weighing a total of approximately 0.91 carats and 29 round brilliant diamonds weighing a total of approximately 1.33 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Diamond Loop Full Motif Diamond Ring",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968225/mern-gems/diamond-loop/rings/diamond_loop_ring_diamond_frdprp1ml4c_e-1_skpl4z.avif",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968208/mern-gems/diamond-loop/rings/diamond_loop_ring_diamond_frdprp1ml4c_e-2_eisdp0.avif",
    category: allCategories[3],
    jewelryCollection: allJewelryCollections[0],
    description:
      "4 pear-shaped and 29 round brilliant diamonds weighing a total of approximately 1.08 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Sparkling Cluster Diamond Bracelet",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968236/mern-gems/sparkling-cluster/bracelets/sparkling_cluster_bracelet_diamond_brdpclrfspc_e-1_zamdun.webp",
    category: allCategories[0],
    jewelryCollection: allJewelryCollections[1],
    description:
      "55 round brilliant and 4 pear-shaped diamonds weighing a total of approximately 10.17 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Sparkling Cluster Sapphire, Aquamarine and Diamond Bracelet",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968233/mern-gems/sparkling-cluster/bracelets/sparkling_cluster_sap_aqua_and_diamond_bracelet_brsaqpclrfspc_e-1h_fvznzu.webp",
    category: allCategories[0],
    jewelryCollection: allJewelryCollections[1],
    description:
      "10 round and pear-shaped sapphires weighing a total of approximately 3.39 carats, 10 round aquamarines weighing a total of approximately 1.98 carats, and 39 round brilliant and pear-shaped diamonds weighing a total of approximately 5.74 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Sparkling Cluster Diamond Earrings",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968222/mern-gems/sparkling-cluster/earrings/sparkling_cluster_earrings_diamond_eadppsdrspc_e-1_tmt7ck.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968236/mern-gems/sparkling-cluster/earrings/sparkling_cluster__earrings_diamond_eadppsdrspc_e-2_p9kvkv.webp",
    category: allCategories[1],
    jewelryCollection: allJewelryCollections[1],
    description:
      "16 round brilliant and 4 pear-shaped diamonds weighing a total of 4.27 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Sparkling Cluster Sapphire, Aquamarine and Diamond Earrings",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718971268/mern-gems/sparkling-cluster/earrings/sparkling_cluster_sap_aqua_and_diamond_earrings_easaqpclrfspc_e-1_1_wklyow.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718971293/mern-gems/sparkling-cluster/earrings/sparkling_cluster_sap_aqua_and_diamond_earrings_easaqpclrfspc_e-2_qhmuex.webp",
    category: allCategories[1],
    jewelryCollection: allJewelryCollections[1],
    description:
      "2 round and 2 pear-shaped sapphires weighing a total of approximately 1.90 carats, 4 round aquamarines weighing a total of approximately 1.00 carat, and 12 round brilliant and pear-shaped diamonds weighing a total of approximately 1.79 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Sparkling Cluster Diamond Necklace",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968217/mern-gems/sparkling-cluster/necklaces/sparkling_cluster_necklace_diamond_nkdpclrfspc_e-1_ormxd7.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968217/mern-gems/sparkling-cluster/necklaces/sparkling_cluster_necklace_diamond_nkdpclrfspc_e-2_swk28b.webp",
    category: allCategories[2],
    jewelryCollection: allJewelryCollections[1],
    description:
      "148 round brilliant and 3 pear-shaped diamonds weighing a total of approximately 15.18 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Sparkling Cluster Sapphire, Aquamarine and Diamond Necklace",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968232/mern-gems/sparkling-cluster/necklaces/sparkling_cluster_sap_aqua_and_diamond_necklace_nksaqpclrfspc_e-1_dinyfd.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968222/mern-gems/sparkling-cluster/necklaces/sparkling_cluster_sap_aqua_and_diamond_necklace_nksaqpclrfspc_e-2_fk1lcy.webp",
    category: allCategories[2],
    jewelryCollection: allJewelryCollections[1],
    description:
      "25 round and pear-shaped sapphires weighing a total of approximately 4.45 carats, 23 round aquamarines weighing a total of approximately 2.80 carats, and 130 round brilliant and pear-shaped diamonds weighing a total of approximately 8.73 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Sparkling Cluster Diamond Ring",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968218/mern-gems/sparkling-cluster/rings/sparkling_cluster_ring_diamond_frdpclrfspc_e-1_ltonka.avif",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968224/mern-gems/sparkling-cluster/rings/sparkling_cluster_ring_diamond_frdpclrfspc_e-2_iohlrf.webp",
    category: allCategories[3],
    jewelryCollection: allJewelryCollections[1],
    description:
      "10 round brilliant and 2 pear-shaped diamonds weighing a total of approximately 2.34 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Sparkling Cluster Sapphire, Aquamarine and Diamond Ring",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968224/mern-gems/sparkling-cluster/rings/sparkling_cluster_sap_aqua_and_diamond_ring_frsaqpclrfspc_e-1h_y2f9x1.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968226/mern-gems/sparkling-cluster/rings/sparkling_cluster_sap_aqua_and_diamond_ring_frsaqpclrfspc_e-2h_tej58c.webp",
    category: allCategories[3],
    jewelryCollection: allJewelryCollections[1],
    description:
      "1 pear-shaped and 2 round sapphires weighing a total of approximately 1.08 carats, 2 round aquamarines weighing a total of approximately 0.38 carats, and 7 round brilliant and pear-shaped diamonds weighing a total of approximately 1.19 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Forget-Me-Not Pink Sapphire and Diamond Bracelet",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968216/mern-gems/forget-me-not/bracelets/forget_me_not_bracelet_diamond_and_pink_sapphire_brpsprfflrfmn_e_1_g7x7pw.avif",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968231/mern-gems/forget-me-not/bracelets/forget_me_not_bracelet_diamond_and_pink_sapphire_brpsprfflrfmn_e_2_tur12a.avif",
    category: allCategories[0],
    jewelryCollection: allJewelryCollections[2],
    description:
      "45 pear-shaped and round brilliant pink sapphires weighing a total of approximately 4.36 carats and 33 pear-shaped, marquise and round brilliant diamonds weighing a total of approximately 4.24 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Forget-Me-Not Sapphire and Diamond Bracelet",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968223/mern-gems/forget-me-not/bracelets/forget_me_not_bracelet_diamond_and_sapphire_brsprfflrfmn_e_1_b2jjc0.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968216/mern-gems/forget-me-not/bracelets/forget_me_not_bracelet_diamond_and_sapphire_brsprfflrfmn_e_2_kzqmdk.avif",
    category: allCategories[0],
    jewelryCollection: allJewelryCollections[2],
    description:
      "45 pear-shaped and round brilliant sapphires weighing a total of approximately 4.17 carats and 33 pear-shaped, marquise and round brilliant diamonds weighing a total of approximately 4.24 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Forget-Me-Not Ruby and Diamond Bracelet",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968238/mern-gems/forget-me-not/bracelets/forget-me-not_bracelet_ruby_and_diamond_brrprfflrfmn_e-1_ovmtsf.avif",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968233/mern-gems/forget-me-not/bracelets/forget-me-not_bracelet_ruby_and_diamond_brrprfflrfmn_e-2_ipo6o1.avif",
    category: allCategories[0],
    jewelryCollection: allJewelryCollections[2],
    description:
      "45 pear-shaped and round rubies weighing a total of approximately 4.43 carats and 33 pear-shaped, marquise and round brilliant diamonds weighing a total of approximately 4.37 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Forget-Me-Not Pink Sapphire and Diamond Drop Earrings",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968219/mern-gems/forget-me-not/earrings/forget_me_not_drop_earrings_diamond_and_pink_sapphire_eapspdrflrfmn_ee-1_aoajvf.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968235/mern-gems/forget-me-not/earrings/forget_me_not_drop_earrings_diamond_and_pink_sapphire_eapspdrflrfmn_ee-2_dskvau.webp",
    category: allCategories[1],
    jewelryCollection: allJewelryCollections[2],
    description:
      "28 pear-shaped and round brilliant pink sapphires weighing a total of approximately 3.20 carats and 28 marquise and round brilliant diamonds weighing a total of approximately 1.98 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Forget-Me-Not Sapphire and Diamond Drop Earrings",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968220/mern-gems/forget-me-not/earrings/forget_me_not_drop_earrings_diamond_and_sapphire_easpdrflrfmn_ee-1_keujzm.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968235/mern-gems/forget-me-not/earrings/forget_me_not_drop_earrings_diamond_and_sapphire_easpdrflrfmn_ee-2_j9zbhi.webp",
    category: allCategories[1],
    jewelryCollection: allJewelryCollections[2],
    description:
      "28 pear-shaped and round brilliant sapphires weighing a total of approximately 3.00 carats and 28 marquise and round brilliant diamonds weighing a total of approximately 1.98 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Forget-Me-Not Ruby and Diamond Earrings",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968227/mern-gems/forget-me-not/earrings/forget-me-not_winstonearrings_ruby_and_diamond_earp1mflrfmn_e-1_q4kqfv.avif",
    category: allCategories[1],
    jewelryCollection: allJewelryCollections[2],
    description:
      "12 pear-shaped rubies weighing a total of approximately 2.37 carats and 2 round brilliant diamonds weighing a total of approximately 0.07 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Forget-Me-Not Pink Sapphire and Diamond Lariat Necklace",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968214/mern-gems/forget-me-not/necklaces/forget_me_not_lariat_necklace_diamond_and_pink_sapphire_nkpspltflrfmn_e_1_akpqmp.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968215/mern-gems/forget-me-not/necklaces/forget_me_not_lariat_necklace_diamond_and_pink_sapphire_nkpspltflrfmn_e_2_cnvjjj.webp",
    category: allCategories[2],
    jewelryCollection: allJewelryCollections[2],
    description:
      "78 pear-shaped and round brilliant pink sapphires weighing a total of approximately 8.61 carats and 99 marquise and round brilliant diamonds weighing a total of approximately 8.60 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Forget-Me Not Sapphire and Diamond Lariat Necklace",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968229/mern-gems/forget-me-not/necklaces/forget_me_not_lariat_necklace_diamond_and_sapphire_nkspltflrfmn_e_1_tbhoxg.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968214/mern-gems/forget-me-not/necklaces/forget_me_not_lariat_necklace_diamond_and_sapphire_nkspltflrfmn_e_2_ukdknd.avif",
    category: allCategories[2],
    jewelryCollection: allJewelryCollections[2],
    description:
      "78 pear-shaped and round brilliant sapphires weighing a total of approximately 8.61 carats and 99 marquise and round brilliant diamonds weighing a total of approximately 8.37 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Forget-Me-Not Ruby and Diamond Pendant",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718973931/mern-gems/forget-me-not/necklaces/forget-me-not_pendant_ruby_and_diamond_perprfflrfmn_e-1_i4jze5.avif",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718973937/mern-gems/forget-me-not/necklaces/forget-me-not_pendant_ruby_and_diamond_perprfflrfmn_e-2_qfa4h7.avif",
    category: allCategories[2],
    jewelryCollection: allJewelryCollections[2],
    description:
      "6 pear-shaped rubies weighing a total of approximately 1.68 carats and 1 round brilliant diamond weighing a total of approximately 0.04 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Forget-Me-Not Pink Sapphire and Diamond Ring",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968232/mern-gems/forget-me-not/rings/forget_me_not_ring_diamond_and_pink_sapphire_frpsprfflrfmn_e_1_ahlwli.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968231/mern-gems/forget-me-not/rings/forget_me_not_ring_diamond_and_pink_sapphire_frpsprfflrfmn_e_2_v5ldlf.avif",
    category: allCategories[3],
    jewelryCollection: allJewelryCollections[2],
    description:
      "6 pear-shaped pink sapphires weighing a total of approximately 2.22 carats and 1 round brilliant diamond weighing approximately 0.05 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Forget-Me-Not Blue Sapphire and Diamond Ring",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968220/mern-gems/forget-me-not/rings/forget_me_not_ring_diamond_and_sapphire_frsprfflrfmn_e_1_rqfflx.avif",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968237/mern-gems/forget-me-not/rings/forget_me_not_ring_diamond_and_sapphire_frsprfflrfmn_e_2_yw3vpw.avif",
    category: allCategories[3],
    jewelryCollection: allJewelryCollections[2],
    description:
      "6 pear-shaped sapphires weighing a total of approximately 2.15 carats and 1 round brilliant diamond weighing approximately 0.05 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Forget-Me-Not Ruby and Diamond Twin Ring",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1718968238/mern-gems/forget-me-not/rings/forget-me-not_twin_ring_ruby_and_diamond_frrptnflfmn_e-1_m6nye0.avif",
    category: allCategories[3],
    jewelryCollection: allJewelryCollections[2],
    description:
      "6 pear-shaped rubies weighing a total of approximately 0.95 carats and 8 pear-shaped and round brilliant diamonds weighing a total of approximately 1.17 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Sunflower Diamond Bracelet",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1719038508/mern-gems/sunflower/bracelets/sunflower-_bracelet_diamond_brdpnasmsf_e-1_gr2rdj.webp",
    category: allCategories[0],
    jewelryCollection: allJewelryCollections[3],
    description:
      "198 round brilliant diamonds weighing a total of approximately 9.70 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Sunflower Diamond Earrings on Platinum Wire",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1719038506/mern-gems/sunflower/earrings/sunflower_earrings_diamond_platinum_eadpwimesf_e-1_oaweay.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1719038506/mern-gems/sunflower/earrings/sunflower_earrings_diamond_platinum_eadpwimesf_e-2_iqss9b.webp",
    category: allCategories[1],
    jewelryCollection: allJewelryCollections[3],
    description:
      "18 round brilliant diamonds weighing a total of approximately 4.43 carats, center stones are approximately 1.00 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Sunflower Petite Ruby and Diamond Earrings",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1719038506/mern-gems/sunflower/earrings/sunflower_earrings_ruby_and_diamond_earppopetsf_e-1_zxcysr.avif",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1719038506/mern-gems/sunflower/earrings/sunflower_earrings_ruby_and_diamond_earppopetsf_e-2_zydukf.avif",
    category: allCategories[1],
    jewelryCollection: allJewelryCollections[3],
    description:
      "16 round brilliant diamonds weighing a total of approximately 0.90 carats with round ruby center stones of approximately 0.44 carats each, set in platinum",
  });

  await Jewelry.create({
    title: "Sunflower Diamond Necklace",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1719038507/mern-gems/sunflower/necklaces/sunflower_necklace_diamond_nkdpnasmsf_e-1_icjsbb.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1719038506/mern-gems/sunflower/necklaces/sunflower_necklace_diamond_nkdpnasmsf_e-2_gdbr95.webp",
    category: allCategories[2],
    jewelryCollection: allJewelryCollections[3],
    description:
      "429 round brilliant diamonds weighing a total of approximately 20.60 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Sunflower Ruby and Diamond Pendant",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1719038506/mern-gems/sunflower/necklaces/sunflower_petite_ruby_and_diamond_pendant_perpnapetsf_e-1h_qgneby.avif",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1719038507/mern-gems/sunflower/necklaces/sunflower_petite_ruby_and_diamond_pendant_perpnapetsf_e-2_qpkwnn.avif",
    category: allCategories[2],
    jewelryCollection: allJewelryCollections[3],
    description:
      "8 round brilliant diamonds weighing a total of approximately 0.44 carats with a round ruby center stone of approximately 0.46 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Sunflower Diamond Twin Ring",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1719038508/mern-gems/sunflower/rings/sunflower_ring_diamond_frdptw003sf_e-1_f31djd.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1719038507/mern-gems/sunflower/rings/sunflower_ring_diamond_frdptw003sf_e-2_zhoq8y.avif",
    category: allCategories[3],
    jewelryCollection: allJewelryCollections[3],
    description:
      "36 round brilliant diamonds weighing a total of approximately 1.86 carats, center stones are approximately 0.30 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Sunflower Ruby and Diamond Ring",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1719038507/mern-gems/sunflower/rings/sunflower_ring_ruby_and_diamond_frrpnapetsf_e-1_dkkirx.avif",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1719038507/mern-gems/sunflower/rings/sunflower_ring_ruby_and_diamond_frrpnapetsf_e-2_eoul0j.avif",
    category: allCategories[3],
    jewelryCollection: allJewelryCollections[3],
    description:
      "18 round brilliant diamonds, weighing a total of approximately 0.58 carats with a round ruby center stone of approximately 0.44 carats, set in platinum",
  });

  const allJewelries = await Jewelry.find();

  await JewelryStones.insertMany([
    {
      jewelry: allJewelries[0],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[1],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[2],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[2],
      stoneType: allStoneTypes[3],
      stoneColor: allStoneColors[6],
    },
    {
      jewelry: allJewelries[3],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[3],
      stoneType: allStoneTypes[0],
      stoneColor: allStoneColors[1],
    },
    {
      jewelry: allJewelries[4],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[4],
      stoneType: allStoneTypes[2],
      stoneColor: allStoneColors[4],
    },
    {
      jewelry: allJewelries[5],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[6],
      stoneType: allStoneTypes[3],
      stoneColor: allStoneColors[6],
    },
    {
      jewelry: allJewelries[6],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[7],
      stoneType: allStoneTypes[0],
      stoneColor: allStoneColors[1],
    },
    {
      jewelry: allJewelries[7],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[8],
      stoneType: allStoneTypes[2],
      stoneColor: allStoneColors[4],
    },
    {
      jewelry: allJewelries[8],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[9],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[10],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[11],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[11],
      stoneType: allStoneTypes[3],
      stoneColor: allStoneColors[2],
    },
    {
      jewelry: allJewelries[11],
      stoneType: allStoneTypes[3],
      stoneColor: allStoneColors[0],
    },
    {
      jewelry: allJewelries[12],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[13],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[13],
      stoneType: allStoneTypes[3],
      stoneColor: allStoneColors[2],
    },
    {
      jewelry: allJewelries[13],
      stoneType: allStoneTypes[3],
      stoneColor: allStoneColors[0],
    },
    {
      jewelry: allJewelries[14],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[15],
      stoneType: allStoneTypes[3],
      stoneColor: allStoneColors[2],
    },
    {
      jewelry: allJewelries[15],
      stoneType: allStoneTypes[3],
      stoneColor: allStoneColors[0],
    },
    {
      jewelry: allJewelries[15],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[16],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[17],
      stoneType: allStoneTypes[3],
      stoneColor: allStoneColors[2],
    },
    {
      jewelry: allJewelries[17],
      stoneType: allStoneTypes[3],
      stoneColor: allStoneColors[0],
    },
    {
      jewelry: allJewelries[17],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[18],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[18],
      stoneType: allStoneTypes[3],
      stoneColor: allStoneColors[3],
    },
    {
      jewelry: allJewelries[19],
      stoneType: allStoneTypes[3],
      stoneColor: allStoneColors[2],
    },
    {
      jewelry: allJewelries[19],
      stoneType: allStoneTypes[3],
      stoneColor: allStoneColors[0],
    },
    {
      jewelry: allJewelries[19],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[20],
      stoneType: allStoneTypes[2],
      stoneColor: allStoneColors[4],
    },
    {
      jewelry: allJewelries[20],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[21],
      stoneType: allStoneTypes[3],
      stoneColor: allStoneColors[3],
    },
    {
      jewelry: allJewelries[21],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[22],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[22],
      stoneType: allStoneTypes[3],
      stoneColor: allStoneColors[0],
    },
    {
      jewelry: allJewelries[22],
      stoneType: allStoneTypes[3],
      stoneColor: allStoneColors[2],
    },
    {
      jewelry: allJewelries[23],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[23],
      stoneType: allStoneTypes[2],
      stoneColor: allStoneColors[4],
    },
    {
      jewelry: allJewelries[24],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[24],
      stoneType: allStoneTypes[3],
      stoneColor: allStoneColors[3],
    },
    {
      jewelry: allJewelries[25],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[25],
      stoneType: allStoneTypes[3],
      stoneColor: allStoneColors[0],
    },
    {
      jewelry: allJewelries[25],
      stoneType: allStoneTypes[3],
      stoneColor: allStoneColors[2],
    },
    {
      jewelry: allJewelries[26],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[26],
      stoneType: allStoneTypes[2],
      stoneColor: allStoneColors[4],
    },
    {
      jewelry: allJewelries[27],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[27],
      stoneType: allStoneTypes[3],
      stoneColor: allStoneColors[3],
    },
    {
      jewelry: allJewelries[28],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[28],
      stoneType: allStoneTypes[3],
      stoneColor: allStoneColors[2],
    },
    {
      jewelry: allJewelries[29],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[29],
      stoneType: allStoneTypes[2],
      stoneColor: allStoneColors[4],
    },
    {
      jewelry: allJewelries[30],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[31],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[32],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[32],
      stoneType: allStoneTypes[2],
      stoneColor: allStoneColors[4],
    },
    {
      jewelry: allJewelries[33],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[34],
      stoneType: allStoneTypes[2],
      stoneColor: allStoneColors[4],
    },
    {
      jewelry: allJewelries[34],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[35],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[36],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[36],
      stoneType: allStoneTypes[2],
      stoneColor: allStoneColors[4],
    },
  ]);

  await Inventory.insertMany([
    {
      jewelry: allJewelries[0],
      size: allSizes[0],
      quantity: 100,
      price: 32000,
    },
    {
      jewelry: allJewelries[0],
      size: allSizes[1],
      quantity: 3,
      price: 32000,
    },
    {
      jewelry: allJewelries[0],
      size: allSizes[2],
      quantity: 3,
      price: 32000,
    },
    {
      jewelry: allJewelries[1],
      size: allSizes[3],
      quantity: 3,
      price: 23000,
    },
    {
      jewelry: allJewelries[2],
      size: allSizes[3],
      quantity: 3,
      price: 21000,
    },
    {
      jewelry: allJewelries[3],
      size: allSizes[3],
      quantity: 3,
      price: 18000,
    },
    {
      jewelry: allJewelries[4],
      size: allSizes[3],
      quantity: 3,
      price: 20000,
    },
    {
      jewelry: allJewelries[5],
      size: allSizes[6],
      quantity: 3,
      price: 41000,
    },
    {
      jewelry: allJewelries[5],
      size: allSizes[7],
      quantity: 3,
      price: 41000,
    },
    {
      jewelry: allJewelries[5],
      size: allSizes[8],
      quantity: 3,
      price: 41000,
    },
    {
      jewelry: allJewelries[6],
      size: allSizes[6],
      quantity: 3,
      price: 39000,
    },
    {
      jewelry: allJewelries[6],
      size: allSizes[7],
      quantity: 3,
      price: 39000,
    },
    {
      jewelry: allJewelries[6],
      size: allSizes[8],
      quantity: 3,
      price: 39000,
    },
    {
      jewelry: allJewelries[7],
      size: allSizes[6],
      quantity: 3,
      price: 37000,
    },
    {
      jewelry: allJewelries[7],
      size: allSizes[7],
      quantity: 3,
      price: 37000,
    },
    {
      jewelry: allJewelries[7],
      size: allSizes[8],
      quantity: 3,
      price: 37000,
    },
    {
      jewelry: allJewelries[8],
      size: allSizes[6],
      quantity: 3,
      price: 38000,
    },
    {
      jewelry: allJewelries[8],
      size: allSizes[7],
      quantity: 3,
      price: 38000,
    },
    {
      jewelry: allJewelries[8],
      size: allSizes[8],
      quantity: 3,
      price: 38000,
    },
    {
      jewelry: allJewelries[9],
      size: allSizes[9],
      quantity: 3,
      price: 14000,
    },
    {
      jewelry: allJewelries[9],
      size: allSizes[10],
      quantity: 3,
      price: 14000,
    },
    {
      jewelry: allJewelries[9],
      size: allSizes[11],
      quantity: 3,
      price: 14000,
    },
    {
      jewelry: allJewelries[10],
      size: allSizes[0],
      quantity: 3,
      price: 39000,
    },
    {
      jewelry: allJewelries[10],
      size: allSizes[1],
      quantity: 3,
      price: 39000,
    },
    {
      jewelry: allJewelries[10],
      size: allSizes[2],
      quantity: 3,
      price: 39000,
    },
    {
      jewelry: allJewelries[11],
      size: allSizes[0],
      quantity: 3,
      price: 37000,
    },
    {
      jewelry: allJewelries[11],
      size: allSizes[1],
      quantity: 3,
      price: 37000,
    },
    {
      jewelry: allJewelries[11],
      size: allSizes[2],
      quantity: 3,
      price: 37000,
    },
    {
      jewelry: allJewelries[12],
      size: allSizes[4],
      quantity: 3,
      price: 28000,
    },
    {
      jewelry: allJewelries[13],
      size: allSizes[4],
      quantity: 3,
      price: 26000,
    },
    {
      jewelry: allJewelries[14],
      size: allSizes[6],
      quantity: 3,
      price: 44000,
    },
    {
      jewelry: allJewelries[14],
      size: allSizes[7],
      quantity: 3,
      price: 44000,
    },
    {
      jewelry: allJewelries[14],
      size: allSizes[8],
      quantity: 3,
      price: 44000,
    },
    {
      jewelry: allJewelries[15],
      size: allSizes[6],
      quantity: 3,
      price: 42000,
    },
    {
      jewelry: allJewelries[15],
      size: allSizes[7],
      quantity: 3,
      price: 42000,
    },
    {
      jewelry: allJewelries[15],
      size: allSizes[8],
      quantity: 3,
      price: 42000,
    },
    {
      jewelry: allJewelries[16],
      size: allSizes[9],
      quantity: 3,
      price: 15000,
    },
    {
      jewelry: allJewelries[16],
      size: allSizes[10],
      quantity: 3,
      price: 15000,
    },
    {
      jewelry: allJewelries[16],
      size: allSizes[11],
      quantity: 3,
      price: 15000,
    },
    {
      jewelry: allJewelries[17],
      size: allSizes[9],
      quantity: 3,
      price: 13000,
    },
    {
      jewelry: allJewelries[17],
      size: allSizes[10],
      quantity: 3,
      price: 13000,
    },
    {
      jewelry: allJewelries[17],
      size: allSizes[11],
      quantity: 3,
      price: 13000,
    },
    {
      jewelry: allJewelries[18],
      size: allSizes[0],
      quantity: 3,
      price: 35000,
    },
    {
      jewelry: allJewelries[18],
      size: allSizes[1],
      quantity: 3,
      price: 35000,
    },
    {
      jewelry: allJewelries[18],
      size: allSizes[2],
      quantity: 3,
      price: 35000,
    },
    {
      jewelry: allJewelries[19],
      size: allSizes[0],
      quantity: 3,
      price: 36000,
    },
    {
      jewelry: allJewelries[19],
      size: allSizes[1],
      quantity: 3,
      price: 36000,
    },
    {
      jewelry: allJewelries[19],
      size: allSizes[2],
      quantity: 3,
      price: 36000,
    },
    {
      jewelry: allJewelries[20],
      size: allSizes[0],
      quantity: 3,
      price: 37000,
    },
    {
      jewelry: allJewelries[20],
      size: allSizes[1],
      quantity: 3,
      price: 37000,
    },
    {
      jewelry: allJewelries[20],
      size: allSizes[2],
      quantity: 3,
      price: 37000,
    },
    {
      jewelry: allJewelries[21],
      size: allSizes[5],
      quantity: 3,
      price: 27000,
    },
    {
      jewelry: allJewelries[22],
      size: allSizes[5],
      quantity: 3,
      price: 28000,
    },
    {
      jewelry: allJewelries[23],
      size: allSizes[3],
      quantity: 3,
      price: 21000,
    },
    {
      jewelry: allJewelries[24],
      size: allSizes[6],
      quantity: 3,
      price: 47000,
    },
    {
      jewelry: allJewelries[24],
      size: allSizes[7],
      quantity: 3,
      price: 47000,
    },
    {
      jewelry: allJewelries[24],
      size: allSizes[8],
      quantity: 3,
      price: 47000,
    },
    {
      jewelry: allJewelries[25],
      size: allSizes[6],
      quantity: 3,
      price: 48000,
    },
    {
      jewelry: allJewelries[25],
      size: allSizes[7],
      quantity: 3,
      price: 48000,
    },
    {
      jewelry: allJewelries[25],
      size: allSizes[8],
      quantity: 3,
      price: 48000,
    },
    {
      jewelry: allJewelries[26],
      size: allSizes[6],
      quantity: 3,
      price: 41000,
    },
    {
      jewelry: allJewelries[26],
      size: allSizes[7],
      quantity: 3,
      price: 41000,
    },
    {
      jewelry: allJewelries[26],
      size: allSizes[8],
      quantity: 3,
      price: 41000,
    },
    {
      jewelry: allJewelries[27],
      size: allSizes[9],
      quantity: 3,
      price: 17000,
    },
    {
      jewelry: allJewelries[27],
      size: allSizes[10],
      quantity: 3,
      price: 17000,
    },
    {
      jewelry: allJewelries[27],
      size: allSizes[11],
      quantity: 3,
      price: 17000,
    },
    {
      jewelry: allJewelries[28],
      size: allSizes[9],
      quantity: 3,
      price: 17000,
    },
    {
      jewelry: allJewelries[28],
      size: allSizes[10],
      quantity: 3,
      price: 17000,
    },
    {
      jewelry: allJewelries[28],
      size: allSizes[11],
      quantity: 3,
      price: 17000,
    },
    {
      jewelry: allJewelries[29],
      size: allSizes[9],
      quantity: 3,
      price: 18000,
    },
    {
      jewelry: allJewelries[29],
      size: allSizes[10],
      quantity: 3,
      price: 18000,
    },
    {
      jewelry: allJewelries[29],
      size: allSizes[11],
      quantity: 3,
      price: 18000,
    },
    {
      jewelry: allJewelries[30],
      size: allSizes[0],
      quantity: 3,
      price: 38000,
    },
    {
      jewelry: allJewelries[30],
      size: allSizes[1],
      quantity: 3,
      price: 38000,
    },
    {
      jewelry: allJewelries[30],
      size: allSizes[2],
      quantity: 3,
      price: 38000,
    },
    {
      jewelry: allJewelries[31],
      size: allSizes[4],
      quantity: 3,
      price: 27000,
    },
    {
      jewelry: allJewelries[32],
      size: allSizes[3],
      quantity: 3,
      price: 22000,
    },
    {
      jewelry: allJewelries[33],
      size: allSizes[6],
      quantity: 3,
      price: 49000,
    },
    {
      jewelry: allJewelries[33],
      size: allSizes[7],
      quantity: 3,
      price: 49000,
    },
    {
      jewelry: allJewelries[33],
      size: allSizes[8],
      quantity: 3,
      price: 49000,
    },
    {
      jewelry: allJewelries[34],
      size: allSizes[6],
      quantity: 3,
      price: 41000,
    },
    {
      jewelry: allJewelries[34],
      size: allSizes[7],
      quantity: 3,
      price: 41000,
    },
    {
      jewelry: allJewelries[34],
      size: allSizes[8],
      quantity: 3,
      price: 41000,
    },
    {
      jewelry: allJewelries[35],
      size: allSizes[9],
      quantity: 3,
      price: 19000,
    },
    {
      jewelry: allJewelries[35],
      size: allSizes[10],
      quantity: 3,
      price: 19000,
    },
    {
      jewelry: allJewelries[35],
      size: allSizes[11],
      quantity: 3,
      price: 19000,
    },
    {
      jewelry: allJewelries[36],
      size: allSizes[9],
      quantity: 3,
      price: 14000,
    },
    {
      jewelry: allJewelries[36],
      size: allSizes[10],
      quantity: 3,
      price: 14000,
    },
    {
      jewelry: allJewelries[36],
      size: allSizes[11],
      quantity: 3,
      price: 14000,
    },
  ]);
}
populateDb();
