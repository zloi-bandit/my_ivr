| actions_table | CREATE TABLE `actions_table` (
  `action_id` int(11) NOT NULL,
  `web_action_name` varchar(128) NOT NULL,
  `function_handler_name` varchar(128) NOT NULL,
  `allowed_for_this_menu` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`action_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 |

| audiofiles_table | CREATE TABLE `audiofiles_table` (
  `file_id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(512) NOT NULL DEFAULT '',
  `language` varchar(32) NOT NULL DEFAULT '',
  `audio_format` varchar(32) NOT NULL DEFAULT '',
  PRIMARY KEY (`file_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 |

| billing_info | CREATE TABLE `billing_info` (
  `subscriber` varchar(32) NOT NULL,
  `balance` int(11) NOT NULL DEFAULT '0',
  `current_tariff` varchar(32) NOT NULL DEFAULT '0',
  PRIMARY KEY (`subscriber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 |

| ivr_actions | CREATE TABLE `ivr_actions` (
  `varchar_location_id` varchar(128) NOT NULL,
  `priority` int(11) NOT NULL,
  `action_id` int(11) NOT NULL,
  `action_args` varchar(256) NOT NULL DEFAULT '',
  PRIMARY KEY (`varchar_location_id`,`priority`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 |

| ivr_map | CREATE TABLE `ivr_map` (
  `varchar_ivr_id` varchar(128) NOT NULL,
  `extension` varchar(32) NOT NULL,
  `next_location_id` varchar(128) NOT NULL,
  PRIMARY KEY (`varchar_ivr_id`,`extension`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 |

| lang_directories | CREATE TABLE `lang_directories` (
  `language` varchar(32) NOT NULL,
  `audio_directory` varchar(512) NOT NULL DEFAULT '',
  PRIMARY KEY (`language`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 |

| language_en | CREATE TABLE `language_en` (
  `parameter_name` varchar(128) NOT NULL,
  `local_name` varchar(128) NOT NULL DEFAULT '',
  PRIMARY KEY (`parameter_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 |

| language_kz | CREATE TABLE `language_kz` (
  `parameter_name` varchar(128) NOT NULL,
  `local_name` varchar(128) NOT NULL DEFAULT '',
  PRIMARY KEY (`parameter_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 |

| language_ru | CREATE TABLE `language_ru` (
  `parameter_name` varchar(128) NOT NULL,
  `local_name` varchar(128) NOT NULL DEFAULT '',
  PRIMARY KEY (`parameter_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 |
