/*
Navicat MySQL Data Transfer

Source Server         : 数据库
Source Server Version : 50721
Source Host           : 127.0.0.1:3306
Source Database       : bokedata

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2020-09-24 19:24:54
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for userlist
-- ----------------------------
DROP TABLE IF EXISTS `userlist`;
CREATE TABLE `userlist` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Username` char(20) NOT NULL COMMENT '用户的账户',
  `Password` char(20) NOT NULL COMMENT '用户的密码',
  `name` char(20) DEFAULT NULL COMMENT '用户的昵称',
  `FriendList` varchar(100) DEFAULT NULL COMMENT '好友列表，使用[$F]分割，存储使用用户的Id',
  `Headimage` char(20) DEFAULT NULL COMMENT '用户的头像，通常用户头像使用 id-Head+后缀形式保存在public文件夹下,有一个默认头像',
  `OnlineTalk` char(100) DEFAULT NULL COMMENT '离线聊天记录，使用|X|进行分割',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userlist
-- ----------------------------
INSERT INTO `userlist` VALUES ('0', 'T', '1', 'Glimmer', '1[$F]0', '0-Head.png', '');
INSERT INTO `userlist` VALUES ('1', 'P', '1', '潘老师', '0[$F]1[$F]2[$F]3[$F]4[$F]5[$F]6[$F]7[$F]8', '1-Head.jpeg', '');
INSERT INTO `userlist` VALUES ('2', 'X', '1', '小糊糊', '1[$F]0', '2-Head.jpeg', '');
INSERT INTO `userlist` VALUES ('3', 'Q', '1', '甜甜同学', '1[$F]0', '3-Head.jpeg', '');
INSERT INTO `userlist` VALUES ('4', 'Z', '1', '柚子与白鹿', '1[$F]0', '4-Head.jpeg', '');
INSERT INTO `userlist` VALUES ('5', 'W', '1', '王小易', '1[$F]0', '5-Head.jpeg', '');
INSERT INTO `userlist` VALUES ('6', 'L', '1', '刘玲同学', '1[$F]0', '6-Head.jpg', '');
INSERT INTO `userlist` VALUES ('7', 'C', '1', '十七屿', '1[$F]0', 'AccountHead.jpg', '');
INSERT INTO `userlist` VALUES ('8', 'G', '1', '安凉', '1[$F]0', 'AccountHead.jpg', '');
