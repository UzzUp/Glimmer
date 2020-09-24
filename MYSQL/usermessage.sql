/*
Navicat MySQL Data Transfer

Source Server         : 数据库
Source Server Version : 50721
Source Host           : 127.0.0.1:3306
Source Database       : bokedata

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2020-09-24 19:24:18
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for usermessage
-- ----------------------------
DROP TABLE IF EXISTS `usermessage`;
CREATE TABLE `usermessage` (
  `id` int(10) unsigned zerofill NOT NULL COMMENT '用户的唯一id',
  `Age` int(5) unsigned zerofill DEFAULT NULL COMMENT '用户的年龄',
  `Sex` int(1) unsigned zerofill DEFAULT NULL COMMENT '用户的性别,0为保密，1为男，2为女',
  `Ophone` int(15) unsigned zerofill DEFAULT NULL COMMENT '用户的手机号',
  `Email` char(20) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '用户的邮箱',
  `Present` varchar(200) DEFAULT NULL COMMENT '用户的个性签名',
  `Pagecover` char(20) DEFAULT NULL COMMENT '用户的个性封面[图片路径]',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of usermessage
-- ----------------------------
INSERT INTO `usermessage` VALUES ('0000000000', null, '2', null, null, '这位腼腆的用户没有设置签名~~~', null);
INSERT INTO `usermessage` VALUES ('0000000001', '00018', '2', '000001730000114', '24123123123@qq.ocm', '我就是我，是颜色不一样的烟火！', '');
INSERT INTO `usermessage` VALUES ('0000000002', null, '2', null, null, '这位腼腆的用户没有设置签名~~~', null);
INSERT INTO `usermessage` VALUES ('0000000003', '00018', '2', '000000123123123', '24123123123@qq.ocm', '这位腼腆的用户没有设置签名~~~', '');
INSERT INTO `usermessage` VALUES ('0000000004', null, '2', null, null, '这位腼腆的用户没有设置签名~~~', null);
INSERT INTO `usermessage` VALUES ('0000000005', null, '2', null, null, '这位腼腆的用户没有设置签名~~~', null);
INSERT INTO `usermessage` VALUES ('0000000006', null, '2', null, null, '这位腼腆的用户没有设置签名~~~', null);
INSERT INTO `usermessage` VALUES ('0000000007', null, '1', null, null, '这位腼腆的用户没有设置签名~~~', null);
INSERT INTO `usermessage` VALUES ('0000000008', null, '1', null, null, '这位腼腆的用户没有设置签名~~~', null);
