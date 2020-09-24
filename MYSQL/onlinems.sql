/*
Navicat MySQL Data Transfer

Source Server         : 数据库
Source Server Version : 50721
Source Host           : 127.0.0.1:3306
Source Database       : bokedata

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2020-09-24 19:25:02
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for onlinems
-- ----------------------------
DROP TABLE IF EXISTS `onlinems`;
CREATE TABLE `onlinems` (
  `OnlineOBJ` varchar(100) NOT NULL COMMENT '聊天对象集合[id]',
  `Message` longtext COMMENT '用户之间聊天信息的存储,|X|分割信息单元|Y|分割具体信息'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of onlinems
-- ----------------------------
INSERT INTO `onlinems` VALUES ('0[$F]1', '0|Y|亲爱的用户，欢迎您使用Glimmer微光|X|0|Y|向我发送消息可以获取使用教程');
INSERT INTO `onlinems` VALUES ('0[$F]2', '0|Y|亲爱的用户，欢迎您使用Glimmer微光|X|0|Y|向我发送消息可以获取使用教程');
INSERT INTO `onlinems` VALUES ('0[$F]3', '0|Y|亲爱的用户，欢迎您使用Glimmer微光|X|0|Y|向我发送消息可以获取使用教程');
INSERT INTO `onlinems` VALUES ('0[$F]4', '0|Y|亲爱的用户，欢迎您使用Glimmer微光|X|0|Y|向我发送消息可以获取使用教程');
INSERT INTO `onlinems` VALUES ('0[$F]5', '0|Y|亲爱的用户，欢迎您使用Glimmer微光|X|0|Y|向我发送消息可以获取使用教程');
INSERT INTO `onlinems` VALUES ('0[$F]6', '0|Y|亲爱的用户，欢迎您使用Glimmer微光|X|0|Y|向我发送消息可以获取使用教程');
INSERT INTO `onlinems` VALUES ('0[$F]7', '0|Y|亲爱的用户，欢迎您使用Glimmer微光|X|0|Y|向我发送消息可以获取使用教程');
INSERT INTO `onlinems` VALUES ('0[$F]8', '0|Y|亲爱的用户，欢迎您使用Glimmer微光|X|0|Y|向我发送消息可以获取使用教程');
