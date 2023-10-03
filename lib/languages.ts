const languages = [
  {
    label: 'Afrikaans',
    value: 'af',
  },
  {
    label: 'Amharic',
    value: 'am',
  },
  {
    label: 'Arabic',
    value: 'ar',
  },
  {
    label: 'Assamese',
    value: 'as',
  },
  {
    label: 'Azerbaijani',
    value: 'az',
  },
  {
    label: 'Bashkir',
    value: 'ba',
  },
  {
    label: 'Bulgarian',
    value: 'bg',
  },
  {
    label: 'Bangla',
    value: 'bn',
  },
  {
    label: 'Tibetan',
    value: 'bo',
  },
  {
    label: 'Bosnian',
    value: 'bs',
  },
  {
    label: 'Catalan',
    value: 'ca',
  },
  {
    label: 'Czech',
    value: 'cs',
  },
  {
    label: 'Welsh',
    value: 'cy',
  },
  {
    label: 'Danish',
    value: 'da',
  },
  {
    label: 'German',
    value: 'de',
  },
  {
    label: 'Lower Sorbian',
    value: 'dsb',
  },
  {
    label: 'Divehi',
    value: 'dv',
  },
  {
    label: 'Greek',
    value: 'el',
  },
  {
    label: 'English',
    value: 'en',
  },
  {
    label: 'Spanish',
    value: 'es',
  },
  {
    label: 'Estonian',
    value: 'et',
  },
  {
    label: 'Basque',
    value: 'eu',
  },
  {
    label: 'Persian',
    value: 'fa',
  },
  {
    label: 'Finnish',
    value: 'fi',
  },
  {
    label: 'Filipino',
    value: 'fil',
  },
  {
    label: 'Fijian',
    value: 'fj',
  },
  {
    label: 'Faroese',
    value: 'fo',
  },
  {
    label: 'French',
    value: 'fr',
  },
  {
    label: 'French (Canada)',
    value: 'fr-CA',
  },
  {
    label: 'Irish',
    value: 'ga',
  },
  {
    label: 'Galician',
    value: 'gl',
  },
  {
    label: 'Konkani',
    value: 'gom',
  },
  {
    label: 'Gujarati',
    value: 'gu',
  },
  {
    label: 'Hausa',
    value: 'ha',
  },
  {
    label: 'Hebrew',
    value: 'he',
  },
  {
    label: 'Hindi',
    value: 'hi',
  },
  {
    label: 'Croatian',
    value: 'hr',
  },
  {
    label: 'Upper Sorbian',
    value: 'hsb',
  },
  {
    label: 'Haitian Creole',
    value: 'ht',
  },
  {
    label: 'Hungarian',
    value: 'hu',
  },
  {
    label: 'Armenian',
    value: 'hy',
  },
  {
    label: 'Indonesian',
    value: 'id',
  },
  {
    label: 'Igbo',
    value: 'ig',
  },
  {
    label: 'Inuinnaqtun',
    value: 'ikt',
  },
  {
    label: 'Icelandic',
    value: 'is',
  },
  {
    label: 'Italian',
    value: 'it',
  },
  {
    label: 'Inuktitut',
    value: 'iu',
  },
  {
    label: 'Inuktitut (Latin)',
    value: 'iu-Latn',
  },
  {
    label: 'Japanese',
    value: 'ja',
  },
  {
    label: 'Georgian',
    value: 'ka',
  },
  {
    label: 'Kazakh',
    value: 'kk',
  },
  {
    label: 'Khmer',
    value: 'km',
  },
  {
    label: 'Kurdish (Northern)',
    value: 'kmr',
  },
  {
    label: 'Kannada',
    value: 'kn',
  },
  {
    label: 'Korean',
    value: 'ko',
  },
  {
    label: 'Kurdish (Central)',
    value: 'ku',
  },
  {
    label: 'Kyrgyz',
    value: 'ky',
  },
  {
    label: 'Lingala',
    value: 'ln',
  },
  {
    label: 'Lao',
    value: 'lo',
  },
  {
    label: 'Lithuanian',
    value: 'lt',
  },
  {
    label: 'Ganda',
    value: 'lug',
  },
  {
    label: 'Latvian',
    value: 'lv',
  },
  {
    label: 'Chinese (Literary)',
    value: 'lzh',
  },
  {
    label: 'Maithili',
    value: 'mai',
  },
  {
    label: 'Malagasy',
    value: 'mg',
  },
  {
    label: 'Māori',
    value: 'mi',
  },
  {
    label: 'Macedonian',
    value: 'mk',
  },
  {
    label: 'Malayalam',
    value: 'ml',
  },
  {
    label: 'Mongolian (Cyrillic)',
    value: 'mn-Cyrl',
  },
  {
    label: 'Mongolian (Traditional)',
    value: 'mn-Mong',
  },
  {
    label: 'Marathi',
    value: 'mr',
  },
  {
    label: 'Malay',
    value: 'ms',
  },
  {
    label: 'Maltese',
    value: 'mt',
  },
  {
    label: 'Hmong Daw',
    value: 'mww',
  },
  {
    label: 'Myanmar (Burmese)',
    value: 'my',
  },
  {
    label: 'Norwegian',
    value: 'nb',
  },
  {
    label: 'Nepali',
    value: 'ne',
  },
  {
    label: 'Dutch',
    value: 'nl',
  },
  {
    label: 'Sesotho sa Leboa',
    value: 'nso',
  },
  {
    label: 'Nyanja',
    value: 'nya',
  },
  {
    label: 'Odia',
    value: 'or',
  },
  {
    label: 'Querétaro Otomi',
    value: 'otq',
  },
  {
    label: 'Punjabi',
    value: 'pa',
  },
  {
    label: 'Polish',
    value: 'pl',
  },
  {
    label: 'Dari',
    value: 'prs',
  },
  {
    label: 'Pashto',
    value: 'ps',
  },
  {
    label: 'Portuguese (Brazil)',
    value: 'pt',
  },
  {
    label: 'Portuguese (Portugal)',
    value: 'pt-PT',
  },
  {
    label: 'Romanian',
    value: 'ro',
  },
  {
    label: 'Russian',
    value: 'ru',
  },
  {
    label: 'Rundi',
    value: 'run',
  },
  {
    label: 'Kinyarwanda',
    value: 'rw',
  },
  {
    label: 'Sindhi',
    value: 'sd',
  },
  {
    label: 'Sinhala',
    value: 'si',
  },
  {
    label: 'Slovak',
    value: 'sk',
  },
  {
    label: 'Slovenian',
    value: 'sl',
  },
  {
    label: 'Samoan',
    value: 'sm',
  },
  {
    label: 'Shona',
    value: 'sn',
  },
  {
    label: 'Somali',
    value: 'so',
  },
  {
    label: 'Albanian',
    value: 'sq',
  },
  {
    label: 'Serbian (Cyrillic)',
    value: 'sr-Cyrl',
  },
  {
    label: 'Serbian (Latin)',
    value: 'sr-Latn',
  },
  {
    label: 'Sesotho',
    value: 'st',
  },
  {
    label: 'Swedish',
    value: 'sv',
  },
  {
    label: 'Swahili',
    value: 'sw',
  },
  {
    label: 'Tamil',
    value: 'ta',
  },
  {
    label: 'Telugu',
    value: 'te',
  },
  {
    label: 'Thai',
    value: 'th',
  },
  {
    label: 'Tigrinya',
    value: 'ti',
  },
  {
    label: 'Turkmen',
    value: 'tk',
  },
  {
    label: 'Klingon (Latin)',
    value: 'tlh-Latn',
  },
  {
    label: 'Klingon (pIqaD)',
    value: 'tlh-Piqd',
  },
  {
    label: 'Setswana',
    value: 'tn',
  },
  {
    label: 'Tongan',
    value: 'to',
  },
  {
    label: 'Turkish',
    value: 'tr',
  },
  {
    label: 'Tatar',
    value: 'tt',
  },
  {
    label: 'Tahitian',
    value: 'ty',
  },
  {
    label: 'Uyghur',
    value: 'ug',
  },
  {
    label: 'Ukrainian',
    value: 'uk',
  },
  {
    label: 'Urdu',
    value: 'ur',
  },
  {
    label: 'Uzbek (Latin)',
    value: 'uz',
  },
  {
    label: 'Vietnamese',
    value: 'vi',
  },
  {
    label: 'Xhosa',
    value: 'xh',
  },
  {
    label: 'Yoruba',
    value: 'yo',
  },
  {
    label: 'Yucatec Maya',
    value: 'yua',
  },
  {
    label: 'Cantonese (Traditional)',
    value: 'yue',
  },
  {
    label: 'Chinese Simplified',
    value: 'zh-Hans',
  },
  {
    label: 'Chinese Traditional',
    value: 'zh-Hant',
  },
  {
    label: 'Zulu',
    value: 'zu',
  },
]

export default languages
