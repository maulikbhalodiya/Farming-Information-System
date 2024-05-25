-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 25, 2024 at 09:14 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cp`
--

-- --------------------------------------------------------

--
-- Table structure for table `crop`
--

CREATE TABLE `crop` (
  `CropName` varchar(20) DEFAULT NULL,
  `Temperature` varchar(20) DEFAULT NULL,
  `Duration` varchar(20) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `ProfitableSoilType` varchar(50) DEFAULT NULL,
  `PriceRange` varchar(20) DEFAULT NULL,
  `Image` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `crop`
--

INSERT INTO `crop` (`CropName`, `Temperature`, `Duration`, `Description`, `ProfitableSoilType`, `PriceRange`, `Image`) VALUES
('Wheat', '60-75°F', '90-150', 'Wheat is a versatile cereal grain widely cultivated for its nutritious seeds. It is a staple food in many parts of the world, used primarily for making flour for bread, pasta, and pastries. Wheat fields sway in the breeze, painting landscapes golden yellow during harvest season.', 'Loamy Soil', '₹ 20 - ₹ 25', 0x433a78616d70706874646f637332565320436f6465696d6763726f7057686561742e706e67),
('Rice', '70-90°F', '100-180', 'Rice, a vital food crop, thrives in flooded fields or paddies in warm climates. This staple food for billions sustains over half the global population. Various varieties are grown, each with unique characteristics suited to different climates and culinary uses, from sushi to risotto.', 'Clayey Soil', '₹ 35 - ₹ 40', 0x433a5c55736572735c39313730345c4f6e6544726976655c4465736b746f705c435049495c43505c63726f705c526963652e706e67),
('Maize (Corn)', '65-85°F', '60-100', 'Maize, commonly known as corn, is a versatile cereal grain integral to diets worldwide. Its tall stalks sway in summer breezes, bearing kernels in a rainbow of colors. Corn is used fresh, dried, or processed into a myriad of products, including flour, animal feed, oils, and biofuels.', 'Sandy Loam Soil', '₹ 15 - ₹ 20', 0x433a5c55736572735c39313730345c4f6e6544726976655c4465736b746f705c435049495c43505c63726f705c4d61697a652e706e67),
('Soybeans', '70-80°F', '80-120', 'Soybeans are legumes rich in protein, used in food products, animal feed, and industrial applications. They are a valuable source of plant-based protein worldwide.', 'Clayey Soil', '₹ 40 - ₹ 45', 0x433a5c55736572735c39313730345c4f6e6544726976655c4465736b746f705c435049495c43505c63726f705c536f796265616e732e706e67),
('Cotton', '60-95°F', '150-200', 'Cotton, the fabric of our lives, flourishes in warm climates, yielding fluffy bolls that are transformed into textiles worldwide. From clothing to home goods, cotton\'s fibers offer comfort and durability, making it one of the most widely used natural fibers in the world.', 'Sandy Soil', '₹ 25 - ₹ 30', 0x433a5c55736572735c39313730345c4f6e6544726976655c4465736b746f705c435049495c43505c63726f705c436f74746f6e2e706e67),
('Sugarcane', '75-95°F', '12-24 Months', 'Sugarcane, a tall perennial grass, thrives in tropical climates, producing sweet juice used in various applications. From granulated sugar to ethanol, sugarcane\'s versatility fuels industries and sweetens countless products, earning its status as one of the world\'s most important crops.', 'Clayey Soil', '₹ 25 - ₹ 30', 0x433a5c55736572735c39313730345c4f6e6544726976655c4465736b746f705c435049495c43505c63726f705c537567617263616e652e706e67),
('Potatoes', '60-70°F', '70-120', 'Potatoes, humble tubers, are dietary staples worldwide, offering versatility and nutrition. From mashed to fried, roasted to boiled, potatoes feature prominently in diverse culinary traditions.', 'Sandy Loam Soil', '₹ 20 - ₹ 25', 0x433a5c55736572735c39313730345c4f6e6544726976655c4465736b746f705c435049495c43505c63726f705c506f7461746f65732e706e67),
('Tomatoes', '70-85°F', '60-100', 'Tomatoes, vibrant fruits of summer, thrive in warm climates, offering juicy sweetness and culinary versatility. From salads to sauces, pizzas to pastas, tomatoes add brightness and flavor to countless dishes, making them a beloved staple in kitchens around the world.', 'Loamy Soil', '₹ 25 - ₹ 30', 0x433a5c55736572735c39313730345c4f6e6544726976655c4465736b746f705c435049495c43505c63726f705c546f6d61746f65732e706e67),
('Peanuts', '70-90°F', '120-150', 'Peanuts, legumes of the earth, are nutrient-rich pods cultivated for their delicious seeds. Whether roasted, ground into butter, or pressed for oil, peanuts are prized for their flavor and protein content, contributing to a wide array of culinary delights and snacks enjoyed globally.', 'Sandy Soil', '₹ 45 - ₹ 50', 0x433a5c55736572735c39313730345c4f6e6544726976655c4465736b746f705c435049495c43505c63726f705c5065616e7574732e706e67),
('Sunflowers', '70-85°F', '70-100', 'Sunflowers, iconic symbols of brightness, thrive in sunny climates, unfurling vibrant blooms that track the sun\'s path. Besides their aesthetic appeal, sunflowers produce nutritious seeds used for snacks, oils, and bird feed, while their tall stalks provide beauty and biodiversity to landscapes.', 'Well-Drained Soil', '₹ 20 - ₹ 25', 0x433a5c55736572735c39313730345c4f6e6544726976655c4465736b746f705c435049495c43505c63726f705c53756e666c6f776572732e706e67),
('Grapes', '60-90°F', '100-180', 'Grapes, luscious jewels of the vine, flourish in temperate climates, yielding clusters of sweetness. Whether enjoyed fresh, dried into raisins, or fermented into wine, grapes offer diverse culinary pleasures while contributing to cultural traditions and economies worldwide.', 'Sandy Loam Soil', '₹ 40 - ₹ 45', 0x433a5c55736572735c39313730345c4f6e6544726976655c4465736b746f705c435049495c43505c63726f705c4772617065732e706e67),
('Apples', '35-50°F', '90-240', 'Apples, crisp orbs of autumn, thrive in cool climates, offering a bounty of flavors and varieties. From snacking to baking, cider to sauce, apples feature prominently in culinary traditions and folklore, symbolizing abundance, temptation, and the cycle of seasons.', 'Loamy Soil', '₹ 30 - ₹ 35', 0x433a5c55736572735c39313730345c4f6e6544726976655c4465736b746f705c435049495c43505c63726f705c4170706c65732e706e67),
('Oranges', '55-100°F', '150-300', 'Oranges, radiant citrus treasures, flourish in subtropical climates, offering juicy sweetness and bright flavors. From fresh juice to marmalade, oranges are beloved for their refreshing taste and nutritional benefits, enriching diets and landscapes around the world.', 'Sandy Soil', '₹ 35 - ₹ 40', 0x433a5c55736572735c39313730345c4f6e6544726976655c4465736b746f705c435049495c43505c63726f705c4f72616e6765732e706e67),
('Strawberries', '60-80°F', '60-120', 'Strawberries, ruby gems of summer, thrive in temperate climates, offering sweet bursts of flavor and vibrant color. Whether enjoyed fresh, in desserts, or preserved as jam, strawberries are cherished for their delicate fragrance and seasonal abundance, heralding the joys of warmer days.', 'Well-Drained Soil', '₹ 50 - ₹ 55', 0x433a5c55736572735c39313730345c4f6e6544726976655c4465736b746f705c435049495c43505c63726f705c5374726177626572726965732e706e67),
('Onions', '50-75°F', '90-120', 'Onions, pungent bulbs of flavor, thrive in temperate climates, adding depth to countless dishes worldwide. Whether raw, caramelized, or pickled, onions are indispensable in cuisines globally, offering versatility and distinct taste profiles.', 'Loamy Soil', '₹ 20 - ₹ 25', 0x433a5c55736572735c39313730345c4f6e6544726976655c4465736b746f705c435049495c43505c63726f705c4f6e696f6e732e706e67),
('Carrots', '60-70°F', '70-120', 'Carrots, vibrant roots of vitality, thrive in temperate climates, offering sweetness and nutrition. Whether raw, roasted, or juiced, carrots are prized for their versatility and beta-carotene content, contributing to eye health and culinary delights worldwide.', 'Sandy Loam Soil', '₹ 15 - ₹ 20', 0x433a5c55736572735c39313730345c4f6e6544726976655c4465736b746f705c435049495c43505c63726f705c436172726f74732e706e67),
('Lettuce', '45-75°F', '40-80', 'Lettuce, tender leaves of freshness, thrive in cool climates, offering crispness and hydration. From salads to wraps, sandwiches to tacos, lettuce provides a refreshing backdrop for culinary creations, adding crunch and nutrition to meals enjoyed year-round.', 'Well-Drained Soil', '₹ 30 - ₹ 35', 0x433a5c55736572735c39313730345c4f6e6544726976655c4465736b746f705c435049495c43505c63726f705c4c6574747563652e706e67),
('Garlic', '60-70°F', '180-210', 'Garlic, aromatic bulbs of flavor, thrive in temperate climates, imparting a distinctive taste to dishes worldwide. Whether minced, roasted, or infused, garlic adds depth and complexity to culinary creations, offering both flavor enhancement and potential health benefits.', 'Loamy Soil', '₹ 40 - ₹ 45', 0x433a5c55736572735c39313730345c4f6e6544726976655c4465736b746f705c435049495c43505c63726f705c4761726c69632e706e67),
('Cauliflower', '50-75°F', '60-120', 'Cauliflower, snowy florets of nutrition, thrive in cool climates, offering versatility and cruciferous goodness. Whether roasted, mashed, or stir-fried, cauliflower serves as a blank canvas for culinary creativity, adding texture and nutrients to a variety of dishes.', 'Well-Drained Soil', '₹ 25 - ₹ 30', 0x433a5c55736572735c39313730345c4f6e6544726976655c4465736b746f705c435049495c43505c63726f705c4361756c69666c6f7765722e706e67),
('Broccoli', '60-70°F', '60-90', 'Broccoli, vibrant florets of health, thrive in temperate climates, offering a nutrient-rich addition to meals. Whether steamed, sautéed, or blended into soups, broccoli provides antioxidants, vitamins, and fiber, contributing to overall well-being and culinary enjoyment.', 'Sandy Loam Soil', '₹ 35 - ₹ 40', 0x433a5c55736572735c39313730345c4f6e6544726976655c4465736b746f705c435049495c43505c63726f705c42726f63636f6c692e706e67),
('Bell Peppers', '70-85°F', '60-90', 'Bell Peppers, colorful capsules of flavor, thrive in warm climates, adding sweetness and crunch to dishes. Whether raw in salads, grilled in skewers, or stuffed with fillings, bell peppers offer versatility and vibrant hues to culinary creations, enhancing both taste and visual appeal.', 'Loamy Soil', '₹ 30 - ₹ 35', 0x433a5c55736572735c39313730345c4f6e6544726976655c4465736b746f705c435049495c43505c63726f705c42656c6c5f506570706572732e706e67),
('Eggplant', '70-85°F', '90-120', 'Eggplant, glossy orbs of versatility, thrive in warm climates, offering a meaty texture and mild flavor. Whether roasted, grilled, or sautéed, eggplant serves as a versatile ingredient in cuisines worldwide, adding depth and richness to dishes from appetizers to entrees.', 'Sandy Soil', '₹ 20 - ₹ 25', 0x433a5c55736572735c39313730345c4f6e6544726976655c4465736b746f705c435049495c43505c63726f705c456767706c616e742e706e67),
('Spinach', '50-75°F', '30-60', 'Spinach, tender leaves of green goodness, thrive in cool climates, offering a nutrient-rich addition to meals. Whether raw in salads, sautéed in pastas, or blended into smoothies, spinach provides vitamins, minerals, and antioxidants, promoting health and vitality with every bite.', 'Well-Drained Soil', '₹ 25 - ₹ 30', 0x433a5c55736572735c39313730345c4f6e6544726976655c4465736b746f705c435049495c43505c63726f705c5370696e6163682e706e67),
('Cucumber', '70-85°F', '50-70', 'Cucumber, crisp fruits of hydration, thrive in warm climates, offering refreshment and versatility. Whether sliced in salads, pickled in jars, or blended into smoothies, cucumbers add coolness and crunch to culinary creations, satisfying thirst and hunger alike.', 'Sandy Loam Soil', '₹ 15 - ₹ 20', 0x433a5c55736572735c39313730345c4f6e6544726976655c4465736b746f705c435049495c43505c63726f705c437563756d6265722e706e67),
('Peas', '60-75°F', '60-90', 'Peas, sweet orbs of green goodness, thrive in cool climates, offering a burst of freshness and flavor. Whether shelled in soups, tossed in salads, or pureed into dips, peas provide vitamins, fiber, and protein, enhancing both taste and nutrition in a variety of dishes.', 'Loamy Soil', '₹ 25 - ₹ 30', 0x433a5c55736572735c39313730345c4f6e6544726976655c4465736b746f705c435049495c43505c63726f705c506561732e706e67),
('Beetroot', '55-75°F', '55-75', 'Beetroot, vibrant roots of earthy sweetness, thrive in temperate climates, offering a colorful addition to meals. Whether roasted in salads, juiced in smoothies, or pickled in jars, beetroot provides nutrients and antioxidants, promoting health and culinary enjoyment with its rich flavor.', 'Well-Drained Soil', '₹ 20 - ₹ 25', 0x433a5c55736572735c39313730345c4f6e6544726976655c4465736b746f705c435049495c43505c63726f705c42656574726f6f742e706e67);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
