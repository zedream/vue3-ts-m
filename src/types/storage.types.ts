export const enum StorageTypesUser {
  APP_STORE_TOKEN_LOCAL = 'app_store_token',
  APP_STORE_MEMBER_ID_LOCAL = 'app_store_member_id',
  APP_STORE_MOBILE_LOCAL = 'app_store_mobile',
  APP_STORE_ACCOUNT_LOCAL = 'app_store_account'
}

export const enum StorageTypesRefuel {
  APP_STORE_EXEMPT_SESSION = 'app_store_exempt',
  APP_SEARCH_HISTORY_LOCAL = 'app_search_history'
}

export const enum StorageTypesUrlSearch {
  APP_STORE_PARTNER_CODE_LOCAL = 'app_store_partner_code',
  APP_LOGIN_TYPE_SESSION = 'app_login_type',
  APP_U_SESSION = 'app_u',
  APP_FROM_APP_SESSION = 'app_from_app', // c2b_android_phone c2b_ios_phone
  APP_OPEN_ID_SESSION = 'app_open_id'
}

export const enum StorageTypesCommon {
  APP_ACTIVITY_CONFIG_SESSION = 'app_activity_config',
  APP_STORE_EYES_LOCAL = 'app_eyes',
  APP_ENV_LOCAL = 'app_env',
  APP_VERSION_LOCAL = 'app_version',
  APP_OPEN_ACCOUNT_USERNAME_SESSION = 'app_open_account_username',
  APP_OPEN_ACCOUNT_ID_CARD_SESSION = 'app_open_account_id_card',
  APP_OPEN_ACCOUNT_BANK_CARD_SESSION = 'app_open_account_bank_card',
  APP_OPEN_ACCOUNT_MOBILE_SESSION = 'app_open_account_mobile',
  APP_OPEN_ACCOUNT_THIRD_CARD_SESSION = 'app_open_account_third_card',
  APP_STORE_HAS_ALLOWANCE_SESSION = 'app_has_allowance',
  APP_API_DOMAIN_SESSION = 'app_api_domain',
  APP_API_DOMAIN_HAS_CHANGED_SESSION = 'app_api_domain_has_changed',
  APP_SHOWN_NEWBIE_LOCAL = 'app_shown_newbie',
  APP_SHOWN_MULTIPLE_POPUP_SESSION = 'app_shown_multiple_popup'
}

export const enum StorageTypesPay {
  APP_UNION_WAP_URL_SESSION = 'app_union_wap_url',
  APP_UNION_WAP_PARAMS_MAP_SESSION = 'app_union_wap_params_map',
  APP_PAY_PWD_STEP_SESSION = 'app_pay_pwd_step',
  APP_BIND_UNION_MOBILE_SESSION = 'app_bind_union_mobile',
  APP_BIND_UNION_PASSWORD_SESSION = 'app_bind_union_password',
  APP_ACTIVITY_RECOMMEND_MONEY_SESSION = 'app_activity_recommend_money',
}

export const enum StorageExpire {
  Hour = 60 * 60 * 1000,
  Day = 24 * 60 * 60 * 1000,
  Week = 7 * 24 * 60 * 60 * 1000,
  Month = 30 * 24 * 60 * 60 * 1000,
  Year = 365 * 24 * 60 * 60 * 1000
}
