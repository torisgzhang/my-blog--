/*
Navicat MySQL Data Transfer

Source Server         : my-company
Source Server Version : 80013
Source Host           : localhost:3306
Source Database       : torisg_blog

Target Server Type    : MYSQL
Target Server Version : 80013
File Encoding         : 65001

Date: 2019-08-14 18:17:57
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tg_blogs
-- ----------------------------
DROP TABLE IF EXISTS `tg_blogs`;
CREATE TABLE `tg_blogs` (
  `articleid` varchar(100) NOT NULL,
  `title` longtext NOT NULL,
  `content` longtext NOT NULL,
  `createtime` bigint(20) NOT NULL,
  `author` varchar(20) NOT NULL,
  PRIMARY KEY (`articleid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of tg_blogs
-- ----------------------------
INSERT INTO `tg_blogs` VALUES ('1ff7b170-be6d-11e9-9850-5360761654c7', '新建文章标题4', '新建文章标题4', '1565771150855', 'Torisg');
INSERT INTO `tg_blogs` VALUES ('723ab5f1-be67-11e9-889d-5fe74741410d', '新建的文章标题2', '新建的文章内容2', '1565768711887', 'Torisg');
INSERT INTO `tg_blogs` VALUES ('a59fd301-be65-11e9-8931-51360942c9ea', '新建的文章标题1', '新建的文章内容1', '1565767939120', 'Torisg');
INSERT INTO `tg_blogs` VALUES ('db09d1b0-be6c-11e9-a706-c7445db17792', '新建文章标题3', '新建文章标题3', '1565771035211', 'Torisg');

-- ----------------------------
-- Table structure for tg_users
-- ----------------------------
DROP TABLE IF EXISTS `tg_users`;
CREATE TABLE `tg_users` (
  `userid` varchar(100) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `realname` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of tg_users
-- ----------------------------
INSERT INTO `tg_users` VALUES ('1898ab4b-dc7f-4a39-84fc-3c9e53fb992e', 'Torisg', '123456', 'Torisg');
INSERT INTO `tg_users` VALUES ('b217e212-37d9-4ec7-9de7-925f6f2dec9c', 'admin', 'admin', 'admin');
