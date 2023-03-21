"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LONG = exports.DWORD = exports.WORD = exports.BYTE = exports.CHAR = exports.MEM_FREE = exports.MEM_RELEASE = exports.MEM_DECOMMIT = exports.MEM_PRESERVE_PLACEHOLDER = exports.MEM_COALESCE_PLACEHOLDERS = exports.MEM_UNMAP_WITH_TRANSIENT_BOOST = exports.MEM_64K_PAGES = exports.MEM_4MB_PAGES = exports.MEM_LARGE_PAGES = exports.MEM_RESET_UNDO = exports.MEM_DIFFERENT_IMAGE_BASE_OK = exports.MEM_ROTATE = exports.MEM_PHYSICAL = exports.MEM_WRITE_WATCH = exports.MEM_TOP_DOWN = exports.MEM_RESET = exports.MEM_RESERVE_PLACEHOLDER = exports.MEM_REPLACE_PLACEHOLDER = exports.MEM_RESERVE = exports.MEM_COMMIT = exports.PAGE_ENCLAVE_DECOMMIT = exports.PAGE_ENCLAVE_UNVALIDATED = exports.PAGE_TARGETS_INVALID = exports.PAGE_TARGETS_NO_UPDATE = exports.PAGE_REVERT_TO_FILE_MAP = exports.PAGE_ENCLAVE_THREAD_CONTROL = exports.PAGE_GRAPHICS_COHERENT = exports.PAGE_GRAPHICS_EXECUTE_READWRITE = exports.PAGE_GRAPHICS_EXECUTE_READ = exports.PAGE_GRAPHICS_EXECUTE = exports.PAGE_GRAPHICS_READWRITE = exports.PAGE_GRAPHICS_READONLY = exports.PAGE_GRAPHICS_NOACCESS = exports.PAGE_WRITECOMBINE = exports.PAGE_NOCACHE = exports.PAGE_GUARD = exports.PAGE_EXECUTE_WRITECOPY = exports.PAGE_EXECUTE_READWRITE = exports.PAGE_EXECUTE_READ = exports.PAGE_EXECUTE = exports.PAGE_WRITECOPY = exports.PAGE_READWRITE = exports.PAGE_READONLY = exports.PAGE_NOACCESS = exports.MAX_PATH = void 0;
exports.PRIMARYLANGID = exports.MAKELANGID = exports.FORMAT_MESSAGE_MAX_WIDTH_MASK = exports.FORMAT_MESSAGE_ARGUMENT_ARRAY = exports.FORMAT_MESSAGE_FROM_SYSTEM = exports.FORMAT_MESSAGE_FROM_HMODULE = exports.FORMAT_MESSAGE_FROM_STRING = exports.FORMAT_MESSAGE_IGNORE_INSERTS = exports.FORMAT_MESSAGE_ALLOCATE_BUFFER = exports.EXCEPTION_NONCONTINUABLE_EXCEPTION = exports.STATUS_INVALID_PARAMETER = exports.EXCEPTION_ACCESS_VIOLATION = exports.EXCEPTION_BREAKPOINT = exports.IMAGE_FIRST_SECTION = exports.FILETIME = exports.EXCEPTION_POINTERS = exports.EXCEPTION_RECORD = exports.IMAGE_SECTION_HEADER = exports.IMAGE_THUNK_DATA64 = exports.IMAGE_IMPORT_DESCRIPTOR = exports.IMAGE_DEBUG_DIRECTORY = exports.IMAGE_NT_HEADERS64 = exports.IMAGE_OPTIONAL_HEADER64 = exports.IMAGE_FILE_HEADER = exports.IMAGE_DOS_HEADER = exports.IMAGE_DATA_DIRECTORY = exports.IMAGE_SNAP_BY_ORDINAL64 = exports.IMAGE_ORDINAL64 = exports.b64_LOW_WORD = exports.IMAGE_ORDINAL_FLAG32 = exports.IMAGE_ORDINAL_FLAG64 = exports.IMAGE_DIRECTORY_ENTRY_COM_DESCRIPTOR = exports.IMAGE_DIRECTORY_ENTRY_DELAY_IMPORT = exports.IMAGE_DIRECTORY_ENTRY_IAT = exports.IMAGE_DIRECTORY_ENTRY_BOUND_IMPORT = exports.IMAGE_DIRECTORY_ENTRY_LOAD_CONFIG = exports.IMAGE_DIRECTORY_ENTRY_TLS = exports.IMAGE_DIRECTORY_ENTRY_GLOBALPTR = exports.IMAGE_DIRECTORY_ENTRY_ARCHITECTURE = exports.IMAGE_DIRECTORY_ENTRY_DEBUG = exports.IMAGE_DIRECTORY_ENTRY_BASERELOC = exports.IMAGE_DIRECTORY_ENTRY_SECURITY = exports.IMAGE_DIRECTORY_ENTRY_EXCEPTION = exports.IMAGE_DIRECTORY_ENTRY_RESOURCE = exports.IMAGE_DIRECTORY_ENTRY_IMPORT = exports.IMAGE_DIRECTORY_ENTRY_EXPORT = exports.IMAGE_DOS_SIGNATURE = exports.IMAGE_NUMBEROF_DIRECTORY_ENTRIES = exports.ULONG_PTR = exports.ULONGLONG = void 0;
exports.LANG_HAUSA = exports.LANG_GUJARATI = exports.LANG_GREENLANDIC = exports.LANG_GREEK = exports.LANG_GERMAN = exports.LANG_GEORGIAN = exports.LANG_GALICIAN = exports.LANG_FULAH = exports.LANG_FRISIAN = exports.LANG_FRENCH = exports.LANG_FINNISH = exports.LANG_FILIPINO = exports.LANG_FARSI = exports.LANG_FAEROESE = exports.LANG_ESTONIAN = exports.LANG_ENGLISH = exports.LANG_DUTCH = exports.LANG_DIVEHI = exports.LANG_DARI = exports.LANG_DANISH = exports.LANG_CZECH = exports.LANG_CROATIAN = exports.LANG_CORSICAN = exports.LANG_CHINESE_TRADITIONAL = exports.LANG_CHINESE_SIMPLIFIED = exports.LANG_CHINESE = exports.LANG_CHEROKEE = exports.LANG_CENTRAL_KURDISH = exports.LANG_CATALAN = exports.LANG_BULGARIAN = exports.LANG_BOSNIAN_NEUTRAL = exports.LANG_BOSNIAN = exports.LANG_BRETON = exports.LANG_BENGALI = exports.LANG_BELARUSIAN = exports.LANG_BASQUE = exports.LANG_BASHKIR = exports.LANG_BANGLA = exports.LANG_AZERBAIJANI = exports.LANG_AZERI = exports.LANG_ASSAMESE = exports.LANG_ARMENIAN = exports.LANG_ARABIC = exports.LANG_AMHARIC = exports.LANG_ALSATIAN = exports.LANG_ALBANIAN = exports.LANG_AFRIKAANS = exports.LANG_INVARIANT = exports.LANG_NEUTRAL = exports.SUBLANGID = void 0;
exports.LANG_RUSSIAN = exports.LANG_ROMANSH = exports.LANG_ROMANIAN = exports.LANG_QUECHUA = exports.LANG_PUNJABI = exports.LANG_PULAR = exports.LANG_PORTUGUESE = exports.LANG_POLISH = exports.LANG_PERSIAN = exports.LANG_PASHTO = exports.LANG_ORIYA = exports.LANG_ODIA = exports.LANG_OCCITAN = exports.LANG_NORWEGIAN = exports.LANG_NEPALI = exports.LANG_MONGOLIAN = exports.LANG_MOHAWK = exports.LANG_MARATHI = exports.LANG_MAPUDUNGUN = exports.LANG_MAORI = exports.LANG_MANIPURI = exports.LANG_MALTESE = exports.LANG_MALAYALAM = exports.LANG_MALAY = exports.LANG_MACEDONIAN = exports.LANG_LUXEMBOURGISH = exports.LANG_LOWER_SORBIAN = exports.LANG_LITHUANIAN = exports.LANG_LATVIAN = exports.LANG_LAO = exports.LANG_KYRGYZ = exports.LANG_KOREAN = exports.LANG_KONKANI = exports.LANG_KINYARWANDA = exports.LANG_KICHE = exports.LANG_KHMER = exports.LANG_KAZAK = exports.LANG_KASHMIRI = exports.LANG_KANNADA = exports.LANG_JAPANESE = exports.LANG_ITALIAN = exports.LANG_IRISH = exports.LANG_INUKTITUT = exports.LANG_INDONESIAN = exports.LANG_IGBO = exports.LANG_ICELANDIC = exports.LANG_HUNGARIAN = exports.LANG_HINDI = exports.LANG_HEBREW = exports.LANG_HAWAIIAN = void 0;
exports.SUBLANG_ALSATIAN_FRANCE = exports.SUBLANG_ALBANIAN_ALBANIA = exports.SUBLANG_AFRIKAANS_SOUTH_AFRICA = exports.SUBLANG_UI_CUSTOM_DEFAULT = exports.SUBLANG_CUSTOM_UNSPECIFIED = exports.SUBLANG_CUSTOM_DEFAULT = exports.SUBLANG_SYS_DEFAULT = exports.SUBLANG_DEFAULT = exports.SUBLANG_NEUTRAL = exports.LANG_ZULU = exports.LANG_YORUBA = exports.LANG_YI = exports.LANG_YAKUT = exports.LANG_XHOSA = exports.LANG_WOLOF = exports.LANG_WELSH = exports.LANG_VIETNAMESE = exports.LANG_VALENCIAN = exports.LANG_UZBEK = exports.LANG_URDU = exports.LANG_UPPER_SORBIAN = exports.LANG_UKRAINIAN = exports.LANG_UIGHUR = exports.LANG_TURKMEN = exports.LANG_TURKISH = exports.LANG_TSWANA = exports.LANG_TIGRINYA = exports.LANG_TIGRIGNA = exports.LANG_TIBETAN = exports.LANG_THAI = exports.LANG_TELUGU = exports.LANG_TATAR = exports.LANG_TAMIL = exports.LANG_TAMAZIGHT = exports.LANG_TAJIK = exports.LANG_SYRIAC = exports.LANG_SWEDISH = exports.LANG_SWAHILI = exports.LANG_SPANISH = exports.LANG_SOTHO = exports.LANG_SLOVENIAN = exports.LANG_SLOVAK = exports.LANG_SINHALESE = exports.LANG_SINDHI = exports.LANG_SERBIAN_NEUTRAL = exports.LANG_SERBIAN = exports.LANG_SCOTTISH_GAELIC = exports.LANG_SANSKRIT = exports.LANG_SAMI = exports.LANG_SAKHA = void 0;
exports.SUBLANG_DUTCH = exports.SUBLANG_DIVEHI_MALDIVES = exports.SUBLANG_DARI_AFGHANISTAN = exports.SUBLANG_DANISH_DENMARK = exports.SUBLANG_CROATIAN_BOSNIA_HERZEGOVINA_LATIN = exports.SUBLANG_CROATIAN_CROATIA = exports.SUBLANG_CZECH_CZECH_REPUBLIC = exports.SUBLANG_CORSICAN_FRANCE = exports.SUBLANG_CHINESE_MACAU = exports.SUBLANG_CHINESE_SINGAPORE = exports.SUBLANG_CHINESE_HONGKONG = exports.SUBLANG_CHINESE_SIMPLIFIED = exports.SUBLANG_CHINESE_TRADITIONAL = exports.SUBLANG_CHEROKEE_CHEROKEE = exports.SUBLANG_CENTRAL_KURDISH_IRAQ = exports.SUBLANG_CATALAN_CATALAN = exports.SUBLANG_BULGARIAN_BULGARIA = exports.SUBLANG_BRETON_FRANCE = exports.SUBLANG_BOSNIAN_BOSNIA_HERZEGOVINA_CYRILLIC = exports.SUBLANG_BOSNIAN_BOSNIA_HERZEGOVINA_LATIN = exports.SUBLANG_BENGALI_BANGLADESH = exports.SUBLANG_BENGALI_INDIA = exports.SUBLANG_BELARUSIAN_BELARUS = exports.SUBLANG_BASQUE_BASQUE = exports.SUBLANG_BASHKIR_RUSSIA = exports.SUBLANG_BANGLA_BANGLADESH = exports.SUBLANG_BANGLA_INDIA = exports.SUBLANG_AZERBAIJANI_AZERBAIJAN_CYRILLIC = exports.SUBLANG_AZERBAIJANI_AZERBAIJAN_LATIN = exports.SUBLANG_AZERI_CYRILLIC = exports.SUBLANG_AZERI_LATIN = exports.SUBLANG_ASSAMESE_INDIA = exports.SUBLANG_ARMENIAN_ARMENIA = exports.SUBLANG_ARABIC_QATAR = exports.SUBLANG_ARABIC_BAHRAIN = exports.SUBLANG_ARABIC_UAE = exports.SUBLANG_ARABIC_KUWAIT = exports.SUBLANG_ARABIC_LEBANON = exports.SUBLANG_ARABIC_JORDAN = exports.SUBLANG_ARABIC_SYRIA = exports.SUBLANG_ARABIC_YEMEN = exports.SUBLANG_ARABIC_OMAN = exports.SUBLANG_ARABIC_TUNISIA = exports.SUBLANG_ARABIC_MOROCCO = exports.SUBLANG_ARABIC_ALGERIA = exports.SUBLANG_ARABIC_LIBYA = exports.SUBLANG_ARABIC_EGYPT = exports.SUBLANG_ARABIC_IRAQ = exports.SUBLANG_ARABIC_SAUDI_ARABIA = exports.SUBLANG_AMHARIC_ETHIOPIA = void 0;
exports.SUBLANG_IRISH_IRELAND = exports.SUBLANG_INUKTITUT_CANADA_LATIN = exports.SUBLANG_INUKTITUT_CANADA = exports.SUBLANG_INDONESIAN_INDONESIA = exports.SUBLANG_IGBO_NIGERIA = exports.SUBLANG_ICELANDIC_ICELAND = exports.SUBLANG_HUNGARIAN_HUNGARY = exports.SUBLANG_HINDI_INDIA = exports.SUBLANG_HEBREW_ISRAEL = exports.SUBLANG_HAWAIIAN_US = exports.SUBLANG_HAUSA_NIGERIA_LATIN = exports.SUBLANG_GUJARATI_INDIA = exports.SUBLANG_GREENLANDIC_GREENLAND = exports.SUBLANG_GREEK_GREECE = exports.SUBLANG_GERMAN_LIECHTENSTEIN = exports.SUBLANG_GERMAN_LUXEMBOURG = exports.SUBLANG_GERMAN_AUSTRIAN = exports.SUBLANG_GERMAN_SWISS = exports.SUBLANG_GERMAN = exports.SUBLANG_GEORGIAN_GEORGIA = exports.SUBLANG_GALICIAN_GALICIAN = exports.SUBLANG_FULAH_SENEGAL = exports.SUBLANG_FRISIAN_NETHERLANDS = exports.SUBLANG_FRENCH_MONACO = exports.SUBLANG_FRENCH_LUXEMBOURG = exports.SUBLANG_FRENCH_SWISS = exports.SUBLANG_FRENCH_CANADIAN = exports.SUBLANG_FRENCH_BELGIAN = exports.SUBLANG_FRENCH = exports.SUBLANG_FINNISH_FINLAND = exports.SUBLANG_FILIPINO_PHILIPPINES = exports.SUBLANG_FAEROESE_FAROE_ISLANDS = exports.SUBLANG_ESTONIAN_ESTONIA = exports.SUBLANG_ENGLISH_SINGAPORE = exports.SUBLANG_ENGLISH_MALAYSIA = exports.SUBLANG_ENGLISH_INDIA = exports.SUBLANG_ENGLISH_PHILIPPINES = exports.SUBLANG_ENGLISH_ZIMBABWE = exports.SUBLANG_ENGLISH_TRINIDAD = exports.SUBLANG_ENGLISH_BELIZE = exports.SUBLANG_ENGLISH_CARIBBEAN = exports.SUBLANG_ENGLISH_JAMAICA = exports.SUBLANG_ENGLISH_SOUTH_AFRICA = exports.SUBLANG_ENGLISH_EIRE = exports.SUBLANG_ENGLISH_NZ = exports.SUBLANG_ENGLISH_CAN = exports.SUBLANG_ENGLISH_AUS = exports.SUBLANG_ENGLISH_UK = exports.SUBLANG_ENGLISH_US = exports.SUBLANG_DUTCH_BELGIAN = void 0;
exports.SUBLANG_RUSSIAN_RUSSIA = exports.SUBLANG_ROMANSH_SWITZERLAND = exports.SUBLANG_ROMANIAN_ROMANIA = exports.SUBLANG_QUECHUA_PERU = exports.SUBLANG_QUECHUA_ECUADOR = exports.SUBLANG_QUECHUA_BOLIVIA = exports.SUBLANG_PUNJABI_PAKISTAN = exports.SUBLANG_PUNJABI_INDIA = exports.SUBLANG_PULAR_SENEGAL = exports.SUBLANG_PORTUGUESE_BRAZILIAN = exports.SUBLANG_PORTUGUESE = exports.SUBLANG_POLISH_POLAND = exports.SUBLANG_PERSIAN_IRAN = exports.SUBLANG_PASHTO_AFGHANISTAN = exports.SUBLANG_ORIYA_INDIA = exports.SUBLANG_ODIA_INDIA = exports.SUBLANG_OCCITAN_FRANCE = exports.SUBLANG_NORWEGIAN_NYNORSK = exports.SUBLANG_NORWEGIAN_BOKMAL = exports.SUBLANG_NEPALI_NEPAL = exports.SUBLANG_NEPALI_INDIA = exports.SUBLANG_MONGOLIAN_PRC = exports.SUBLANG_MONGOLIAN_CYRILLIC_MONGOLIA = exports.SUBLANG_MOHAWK_MOHAWK = exports.SUBLANG_MARATHI_INDIA = exports.SUBLANG_MAPUDUNGUN_CHILE = exports.SUBLANG_MAORI_NEW_ZEALAND = exports.SUBLANG_MALTESE_MALTA = exports.SUBLANG_MALAYALAM_INDIA = exports.SUBLANG_MALAY_BRUNEI_DARUSSALAM = exports.SUBLANG_MALAY_MALAYSIA = exports.SUBLANG_MACEDONIAN_MACEDONIA = exports.SUBLANG_LUXEMBOURGISH_LUXEMBOURG = exports.SUBLANG_LOWER_SORBIAN_GERMANY = exports.SUBLANG_LITHUANIAN = exports.SUBLANG_LATVIAN_LATVIA = exports.SUBLANG_LAO_LAO = exports.SUBLANG_KYRGYZ_KYRGYZSTAN = exports.SUBLANG_KOREAN = exports.SUBLANG_KONKANI_INDIA = exports.SUBLANG_KINYARWANDA_RWANDA = exports.SUBLANG_KICHE_GUATEMALA = exports.SUBLANG_KHMER_CAMBODIA = exports.SUBLANG_KAZAK_KAZAKHSTAN = exports.SUBLANG_KASHMIRI_INDIA = exports.SUBLANG_KASHMIRI_SASIA = exports.SUBLANG_KANNADA_INDIA = exports.SUBLANG_JAPANESE_JAPAN = exports.SUBLANG_ITALIAN_SWISS = exports.SUBLANG_ITALIAN = void 0;
exports.SUBLANG_SWAHILI_KENYA = exports.SUBLANG_SPANISH_US = exports.SUBLANG_SPANISH_PUERTO_RICO = exports.SUBLANG_SPANISH_NICARAGUA = exports.SUBLANG_SPANISH_HONDURAS = exports.SUBLANG_SPANISH_EL_SALVADOR = exports.SUBLANG_SPANISH_BOLIVIA = exports.SUBLANG_SPANISH_PARAGUAY = exports.SUBLANG_SPANISH_URUGUAY = exports.SUBLANG_SPANISH_CHILE = exports.SUBLANG_SPANISH_ECUADOR = exports.SUBLANG_SPANISH_ARGENTINA = exports.SUBLANG_SPANISH_PERU = exports.SUBLANG_SPANISH_COLOMBIA = exports.SUBLANG_SPANISH_VENEZUELA = exports.SUBLANG_SPANISH_DOMINICAN_REPUBLIC = exports.SUBLANG_SPANISH_PANAMA = exports.SUBLANG_SPANISH_COSTA_RICA = exports.SUBLANG_SPANISH_GUATEMALA = exports.SUBLANG_SPANISH_MODERN = exports.SUBLANG_SPANISH_MEXICAN = exports.SUBLANG_SPANISH = exports.SUBLANG_SLOVENIAN_SLOVENIA = exports.SUBLANG_SLOVAK_SLOVAKIA = exports.SUBLANG_SOTHO_NORTHERN_SOUTH_AFRICA = exports.SUBLANG_SINHALESE_SRI_LANKA = exports.SUBLANG_SINDHI_AFGHANISTAN = exports.SUBLANG_SINDHI_PAKISTAN = exports.SUBLANG_SINDHI_INDIA = exports.SUBLANG_SERBIAN_CYRILLIC = exports.SUBLANG_SERBIAN_LATIN = exports.SUBLANG_SERBIAN_CROATIA = exports.SUBLANG_SERBIAN_SERBIA_CYRILLIC = exports.SUBLANG_SERBIAN_SERBIA_LATIN = exports.SUBLANG_SERBIAN_MONTENEGRO_CYRILLIC = exports.SUBLANG_SERBIAN_MONTENEGRO_LATIN = exports.SUBLANG_SERBIAN_BOSNIA_HERZEGOVINA_CYRILLIC = exports.SUBLANG_SERBIAN_BOSNIA_HERZEGOVINA_LATIN = exports.SUBLANG_SCOTTISH_GAELIC = exports.SUBLANG_SANSKRIT_INDIA = exports.SUBLANG_SAMI_INARI_FINLAND = exports.SUBLANG_SAMI_SKOLT_FINLAND = exports.SUBLANG_SAMI_SOUTHERN_SWEDEN = exports.SUBLANG_SAMI_SOUTHERN_NORWAY = exports.SUBLANG_SAMI_LULE_SWEDEN = exports.SUBLANG_SAMI_LULE_NORWAY = exports.SUBLANG_SAMI_NORTHERN_FINLAND = exports.SUBLANG_SAMI_NORTHERN_SWEDEN = exports.SUBLANG_SAMI_NORTHERN_NORWAY = exports.SUBLANG_SAKHA_RUSSIA = void 0;
exports.CS_GLOBALCLASS = exports.CS_BYTEALIGNWINDOW = exports.CS_BYTEALIGNCLIENT = exports.CS_SAVEBITS = exports.CS_NOCLOSE = exports.CS_PARENTDC = exports.CS_CLASSDC = exports.CS_OWNDC = exports.CS_DBLCLKS = exports.CS_HREDRAW = exports.CS_VREDRAW = exports.CW_USEDEFAULT = exports.ATOM = exports.MODULEINFO = exports.ERROR_MOD_NOT_FOUND = exports.SUBLANG_ZULU_SOUTH_AFRICA = exports.SUBLANG_YORUBA_NIGERIA = exports.SUBLANG_YI_PRC = exports.SUBLANG_YAKUT_RUSSIA = exports.SUBLANG_XHOSA_SOUTH_AFRICA = exports.SUBLANG_WOLOF_SENEGAL = exports.SUBLANG_WELSH_UNITED_KINGDOM = exports.SUBLANG_VIETNAMESE_VIETNAM = exports.SUBLANG_VALENCIAN_VALENCIA = exports.SUBLANG_UZBEK_CYRILLIC = exports.SUBLANG_UZBEK_LATIN = exports.SUBLANG_URDU_INDIA = exports.SUBLANG_URDU_PAKISTAN = exports.SUBLANG_UPPER_SORBIAN_GERMANY = exports.SUBLANG_UKRAINIAN_UKRAINE = exports.SUBLANG_UIGHUR_PRC = exports.SUBLANG_TURKMEN_TURKMENISTAN = exports.SUBLANG_TURKISH_TURKEY = exports.SUBLANG_TSWANA_SOUTH_AFRICA = exports.SUBLANG_TSWANA_BOTSWANA = exports.SUBLANG_TIGRINYA_ETHIOPIA = exports.SUBLANG_TIGRINYA_ERITREA = exports.SUBLANG_TIGRIGNA_ERITREA = exports.SUBLANG_TIBETAN_PRC = exports.SUBLANG_THAI_THAILAND = exports.SUBLANG_TELUGU_INDIA = exports.SUBLANG_TATAR_RUSSIA = exports.SUBLANG_TAMIL_SRI_LANKA = exports.SUBLANG_TAMIL_INDIA = exports.SUBLANG_TAMAZIGHT_MOROCCO_TIFINAGH = exports.SUBLANG_TAMAZIGHT_ALGERIA_LATIN = exports.SUBLANG_TAJIK_TAJIKISTAN = exports.SUBLANG_SYRIAC_SYRIA = exports.SUBLANG_SWEDISH_FINLAND = exports.SUBLANG_SWEDISH = void 0;
exports.BS_CENTER = exports.BS_RIGHT = exports.BS_LEFT = exports.BS_BITMAP = exports.BS_ICON = exports.BS_TEXT = exports.BS_LEFTTEXT = exports.BS_TYPEMASK = exports.BS_OWNERDRAW = exports.BS_PUSHBOX = exports.BS_AUTORADIOBUTTON = exports.BS_USERBUTTON = exports.BS_GROUPBOX = exports.BS_AUTO3STATE = exports.BS_3STATE = exports.BS_RADIOBUTTON = exports.BS_AUTOCHECKBOX = exports.BS_CHECKBOX = exports.BS_DEFPUSHBUTTON = exports.BS_PUSHBUTTON = exports.MAKEINTRESOURCE = exports.WS_CHILDWINDOW = exports.WS_POPUPWINDOW = exports.WS_TILEDWINDOW = exports.WS_OVERLAPPEDWINDOW = exports.WS_SIZEBOX = exports.WS_ICONIC = exports.WS_TILED = exports.WS_MAXIMIZEBOX = exports.WS_MINIMIZEBOX = exports.WS_TABSTOP = exports.WS_GROUP = exports.WS_THICKFRAME = exports.WS_SYSMENU = exports.WS_HSCROLL = exports.WS_VSCROLL = exports.WS_DLGFRAME = exports.WS_BORDER = exports.WS_CAPTION = exports.WS_MAXIMIZE = exports.WS_CLIPCHILDREN = exports.WS_CLIPSIBLINGS = exports.WS_DISABLED = exports.WS_VISIBLE = exports.WS_MINIMIZE = exports.WS_CHILD = exports.WS_POPUP = exports.WS_OVERLAPPED = exports.CS_DROPSHADOW = exports.CS_IME = void 0;
exports.COLOR_GRAYTEXT = exports.COLOR_BTNSHADOW = exports.COLOR_BTNFACE = exports.COLOR_HIGHLIGHTTEXT = exports.COLOR_HIGHLIGHT = exports.COLOR_APPWORKSPACE = exports.COLOR_INACTIVEBORDER = exports.COLOR_ACTIVEBORDER = exports.COLOR_CAPTIONTEXT = exports.COLOR_WINDOWTEXT = exports.COLOR_MENUTEXT = exports.COLOR_WINDOWFRAME = exports.COLOR_WINDOW = exports.COLOR_MENU = exports.COLOR_INACTIVECAPTION = exports.COLOR_ACTIVECAPTION = exports.COLOR_BACKGROUND = exports.COLOR_SCROLLBAR = exports.CTLCOLOR_MAX = exports.CTLCOLOR_STATIC = exports.CTLCOLOR_SCROLLBAR = exports.CTLCOLOR_DLG = exports.CTLCOLOR_BTN = exports.CTLCOLOR_LISTBOX = exports.CTLCOLOR_EDIT = exports.CTLCOLOR_MSGBOX = exports.IDC_HELP = exports.IDC_APPSTARTING = exports.IDC_HAND = exports.IDC_NO = exports.IDC_SIZEALL = exports.IDC_SIZENS = exports.IDC_SIZEWE = exports.IDC_SIZENESW = exports.IDC_SIZENWSE = exports.IDC_ICON = exports.IDC_SIZE = exports.IDC_UPARROW = exports.IDC_CROSS = exports.IDC_WAIT = exports.IDC_IBEAM = exports.IDC_ARROW = exports.BS_RIGHTBUTTON = exports.BS_FLAT = exports.BS_NOTIFY = exports.BS_MULTILINE = exports.BS_PUSHLIKE = exports.BS_VCENTER = exports.BS_BOTTOM = exports.BS_TOP = void 0;
exports.CREATESTRUCT = exports.MSG = exports.POINT = exports.HWND = exports.WNDCLASSEXW = exports.COLOR_BTNHILIGHT = exports.COLOR_3DHILIGHT = exports.COLOR_3DHIGHLIGHT = exports.COLOR_3DSHADOW = exports.COLOR_3DFACE = exports.COLOR_DESKTOP = exports.COLOR_MENUBAR = exports.COLOR_MENUHILIGHT = exports.COLOR_GRADIENTINACTIVECAPTION = exports.COLOR_GRADIENTACTIVECAPTION = exports.COLOR_HOTLIGHT = exports.COLOR_INFOBK = exports.COLOR_INFOTEXT = exports.COLOR_3DLIGHT = exports.COLOR_3DDKSHADOW = exports.COLOR_BTNHIGHLIGHT = exports.COLOR_INACTIVECAPTIONTEXT = exports.COLOR_BTNTEXT = void 0;
const tslib_1 = require("tslib");
const bin_1 = require("./bin");
const core_1 = require("./core");
const nativeclass_1 = require("./nativeclass");
const nativetype_1 = require("./nativetype");
const UBYTE = nativetype_1.uint8_t;
const USHORT = nativetype_1.uint16_t;
const ULONG = nativetype_1.uint32_t;
exports.MAX_PATH = 260;
exports.PAGE_NOACCESS = 0x01;
exports.PAGE_READONLY = 0x02;
exports.PAGE_READWRITE = 0x04;
exports.PAGE_WRITECOPY = 0x08;
exports.PAGE_EXECUTE = 0x10;
exports.PAGE_EXECUTE_READ = 0x20;
exports.PAGE_EXECUTE_READWRITE = 0x40;
exports.PAGE_EXECUTE_WRITECOPY = 0x80;
exports.PAGE_GUARD = 0x100;
exports.PAGE_NOCACHE = 0x200;
exports.PAGE_WRITECOMBINE = 0x400;
exports.PAGE_GRAPHICS_NOACCESS = 0x0800;
exports.PAGE_GRAPHICS_READONLY = 0x1000;
exports.PAGE_GRAPHICS_READWRITE = 0x2000;
exports.PAGE_GRAPHICS_EXECUTE = 0x4000;
exports.PAGE_GRAPHICS_EXECUTE_READ = 0x8000;
exports.PAGE_GRAPHICS_EXECUTE_READWRITE = 0x10000;
exports.PAGE_GRAPHICS_COHERENT = 0x20000;
exports.PAGE_ENCLAVE_THREAD_CONTROL = 0x80000000;
exports.PAGE_REVERT_TO_FILE_MAP = 0x80000000;
exports.PAGE_TARGETS_NO_UPDATE = 0x40000000;
exports.PAGE_TARGETS_INVALID = 0x40000000;
exports.PAGE_ENCLAVE_UNVALIDATED = 0x20000000;
exports.PAGE_ENCLAVE_DECOMMIT = 0x10000000;
exports.MEM_COMMIT = 0x00001000;
exports.MEM_RESERVE = 0x00002000;
exports.MEM_REPLACE_PLACEHOLDER = 0x00004000;
exports.MEM_RESERVE_PLACEHOLDER = 0x00040000;
exports.MEM_RESET = 0x00080000;
exports.MEM_TOP_DOWN = 0x00100000;
exports.MEM_WRITE_WATCH = 0x00200000;
exports.MEM_PHYSICAL = 0x00400000;
exports.MEM_ROTATE = 0x00800000;
exports.MEM_DIFFERENT_IMAGE_BASE_OK = 0x00800000;
exports.MEM_RESET_UNDO = 0x01000000;
exports.MEM_LARGE_PAGES = 0x20000000;
exports.MEM_4MB_PAGES = 0x80000000;
exports.MEM_64K_PAGES = exports.MEM_LARGE_PAGES | exports.MEM_PHYSICAL;
exports.MEM_UNMAP_WITH_TRANSIENT_BOOST = 0x00000001;
exports.MEM_COALESCE_PLACEHOLDERS = 0x00000001;
exports.MEM_PRESERVE_PLACEHOLDER = 0x00000002;
exports.MEM_DECOMMIT = 0x00004000;
exports.MEM_RELEASE = 0x00008000;
exports.MEM_FREE = 0x00010000;
exports.CHAR = nativetype_1.uint8_t;
exports.BYTE = nativetype_1.uint8_t;
exports.WORD = nativetype_1.uint16_t;
exports.DWORD = nativetype_1.uint32_t;
exports.LONG = nativetype_1.int32_t;
exports.ULONGLONG = nativetype_1.bin64_t;
exports.ULONG_PTR = nativetype_1.bin64_t;
exports.IMAGE_NUMBEROF_DIRECTORY_ENTRIES = 16;
exports.IMAGE_DOS_SIGNATURE = 0x5a4d; // MZ
exports.IMAGE_DIRECTORY_ENTRY_EXPORT = 0; // Export Directory
exports.IMAGE_DIRECTORY_ENTRY_IMPORT = 1; // Import Directory
exports.IMAGE_DIRECTORY_ENTRY_RESOURCE = 2; // Resource Directory
exports.IMAGE_DIRECTORY_ENTRY_EXCEPTION = 3; // Exception Directory
exports.IMAGE_DIRECTORY_ENTRY_SECURITY = 4; // Security Directory
exports.IMAGE_DIRECTORY_ENTRY_BASERELOC = 5; // Base Relocation Table
exports.IMAGE_DIRECTORY_ENTRY_DEBUG = 6; // Debug Directory
//      IMAGE_DIRECTORY_ENTRY_COPYRIGHT       7   // (X86 usage)
exports.IMAGE_DIRECTORY_ENTRY_ARCHITECTURE = 7; // Architecture Specific Data
exports.IMAGE_DIRECTORY_ENTRY_GLOBALPTR = 8; // RVA of GP
exports.IMAGE_DIRECTORY_ENTRY_TLS = 9; // TLS Directory
exports.IMAGE_DIRECTORY_ENTRY_LOAD_CONFIG = 10; // Load Configuration Directory
exports.IMAGE_DIRECTORY_ENTRY_BOUND_IMPORT = 11; // Bound Import Directory in headers
exports.IMAGE_DIRECTORY_ENTRY_IAT = 12; // Import Address Table
exports.IMAGE_DIRECTORY_ENTRY_DELAY_IMPORT = 13; // Delay Load Import Descriptors
exports.IMAGE_DIRECTORY_ENTRY_COM_DESCRIPTOR = 14; // COM Runtime descriptor
exports.IMAGE_ORDINAL_FLAG64 = bin_1.bin.make64(0, 0x80000000);
exports.IMAGE_ORDINAL_FLAG32 = 0x80000000;
exports.b64_LOW_WORD = bin_1.bin.make(0xffff, 4);
function IMAGE_ORDINAL64(Ordinal) {
    return bin_1.bin.bitand(Ordinal, exports.b64_LOW_WORD);
}
exports.IMAGE_ORDINAL64 = IMAGE_ORDINAL64;
function IMAGE_SNAP_BY_ORDINAL64(Ordinal) {
    return bin_1.bin.bitand(Ordinal, exports.IMAGE_ORDINAL_FLAG64) !== nativetype_1.bin64_t.zero;
}
exports.IMAGE_SNAP_BY_ORDINAL64 = IMAGE_SNAP_BY_ORDINAL64;
let IMAGE_DATA_DIRECTORY = class IMAGE_DATA_DIRECTORY extends nativeclass_1.NativeStruct {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], IMAGE_DATA_DIRECTORY.prototype, "VirtualAddress", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], IMAGE_DATA_DIRECTORY.prototype, "Size", void 0);
IMAGE_DATA_DIRECTORY = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], IMAGE_DATA_DIRECTORY);
exports.IMAGE_DATA_DIRECTORY = IMAGE_DATA_DIRECTORY;
let IMAGE_DOS_HEADER = class IMAGE_DOS_HEADER extends nativeclass_1.NativeStruct {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_DOS_HEADER.prototype, "e_magic", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_DOS_HEADER.prototype, "e_cblp", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_DOS_HEADER.prototype, "e_cp", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_DOS_HEADER.prototype, "e_crlc", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_DOS_HEADER.prototype, "e_cparhdr", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_DOS_HEADER.prototype, "e_minalloc", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_DOS_HEADER.prototype, "e_maxalloc", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_DOS_HEADER.prototype, "e_ss", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_DOS_HEADER.prototype, "e_sp", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_DOS_HEADER.prototype, "e_csum", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_DOS_HEADER.prototype, "e_ip", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_DOS_HEADER.prototype, "e_cs", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_DOS_HEADER.prototype, "e_lfarlc", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_DOS_HEADER.prototype, "e_ovno", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativeclass_1.NativeArray.make(exports.WORD, 4))
], IMAGE_DOS_HEADER.prototype, "e_res", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_DOS_HEADER.prototype, "e_oemid", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_DOS_HEADER.prototype, "e_oeminfo", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativeclass_1.NativeArray.make(exports.WORD, 10))
], IMAGE_DOS_HEADER.prototype, "e_res2", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_DOS_HEADER.prototype, "e_lfanew", void 0);
IMAGE_DOS_HEADER = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], IMAGE_DOS_HEADER);
exports.IMAGE_DOS_HEADER = IMAGE_DOS_HEADER;
let IMAGE_FILE_HEADER = class IMAGE_FILE_HEADER extends nativeclass_1.NativeStruct {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_FILE_HEADER.prototype, "Machine", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_FILE_HEADER.prototype, "NumberOfSections", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], IMAGE_FILE_HEADER.prototype, "TimeDateStamp", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], IMAGE_FILE_HEADER.prototype, "PointerToSymbolTable", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], IMAGE_FILE_HEADER.prototype, "NumberOfSymbols", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_FILE_HEADER.prototype, "SizeOfOptionalHeader", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_FILE_HEADER.prototype, "Characteristics", void 0);
IMAGE_FILE_HEADER = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], IMAGE_FILE_HEADER);
exports.IMAGE_FILE_HEADER = IMAGE_FILE_HEADER;
let IMAGE_OPTIONAL_HEADER64 = class IMAGE_OPTIONAL_HEADER64 extends nativeclass_1.NativeStruct {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "Magic", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.BYTE)
], IMAGE_OPTIONAL_HEADER64.prototype, "MajorLinkerVersion", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.BYTE)
], IMAGE_OPTIONAL_HEADER64.prototype, "MinorLinkerVersion", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "SizeOfCode", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "SizeOfInitializedData", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "SizeOfUninitializedData", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "AddressOfEntryPoint", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "BaseOfCode", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.ULONGLONG)
], IMAGE_OPTIONAL_HEADER64.prototype, "ImageBase", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "SectionAlignment", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "FileAlignment", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "MajorOperatingSystemVersion", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "MinorOperatingSystemVersion", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "MajorImageVersion", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "MinorImageVersion", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "MajorSubsystemVersion", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "MinorSubsystemVersion", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "Win32VersionValue", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "SizeOfImage", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "SizeOfHeaders", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "CheckSum", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "Subsystem", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "DllCharacteristics", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.ULONGLONG)
], IMAGE_OPTIONAL_HEADER64.prototype, "SizeOfStackReserve", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.ULONGLONG)
], IMAGE_OPTIONAL_HEADER64.prototype, "SizeOfStackCommit", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.ULONGLONG)
], IMAGE_OPTIONAL_HEADER64.prototype, "SizeOfHeapReserve", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.ULONGLONG)
], IMAGE_OPTIONAL_HEADER64.prototype, "SizeOfHeapCommit", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "LoaderFlags", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], IMAGE_OPTIONAL_HEADER64.prototype, "NumberOfRvaAndSizes", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativeclass_1.NativeArray.make(IMAGE_DATA_DIRECTORY, exports.IMAGE_NUMBEROF_DIRECTORY_ENTRIES))
], IMAGE_OPTIONAL_HEADER64.prototype, "DataDirectory", void 0);
IMAGE_OPTIONAL_HEADER64 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], IMAGE_OPTIONAL_HEADER64);
exports.IMAGE_OPTIONAL_HEADER64 = IMAGE_OPTIONAL_HEADER64;
let IMAGE_NT_HEADERS64 = class IMAGE_NT_HEADERS64 extends nativeclass_1.NativeStruct {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], IMAGE_NT_HEADERS64.prototype, "Signature", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(IMAGE_FILE_HEADER)
], IMAGE_NT_HEADERS64.prototype, "FileHeader", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(IMAGE_OPTIONAL_HEADER64)
], IMAGE_NT_HEADERS64.prototype, "OptionalHeader", void 0);
IMAGE_NT_HEADERS64 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], IMAGE_NT_HEADERS64);
exports.IMAGE_NT_HEADERS64 = IMAGE_NT_HEADERS64;
let IMAGE_DEBUG_DIRECTORY = class IMAGE_DEBUG_DIRECTORY extends nativeclass_1.NativeStruct {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], IMAGE_DEBUG_DIRECTORY.prototype, "Characteristics", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], IMAGE_DEBUG_DIRECTORY.prototype, "TimeDateStamp", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_DEBUG_DIRECTORY.prototype, "MajorVersion", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_DEBUG_DIRECTORY.prototype, "MinorVersion", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], IMAGE_DEBUG_DIRECTORY.prototype, "Type", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], IMAGE_DEBUG_DIRECTORY.prototype, "SizeOfData", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], IMAGE_DEBUG_DIRECTORY.prototype, "AddressOfRawData", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], IMAGE_DEBUG_DIRECTORY.prototype, "PointerToRawData", void 0);
IMAGE_DEBUG_DIRECTORY = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], IMAGE_DEBUG_DIRECTORY);
exports.IMAGE_DEBUG_DIRECTORY = IMAGE_DEBUG_DIRECTORY;
let IMAGE_IMPORT_DESCRIPTOR = class IMAGE_IMPORT_DESCRIPTOR extends nativeclass_1.NativeStruct {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_IMPORT_DESCRIPTOR.prototype, "Characteristics", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_IMPORT_DESCRIPTOR.prototype, "OriginalFirstThunk", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], IMAGE_IMPORT_DESCRIPTOR.prototype, "TimeDateStamp", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], IMAGE_IMPORT_DESCRIPTOR.prototype, "ForwarderChain", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], IMAGE_IMPORT_DESCRIPTOR.prototype, "Name", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], IMAGE_IMPORT_DESCRIPTOR.prototype, "FirstThunk", void 0);
IMAGE_IMPORT_DESCRIPTOR = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], IMAGE_IMPORT_DESCRIPTOR);
exports.IMAGE_IMPORT_DESCRIPTOR = IMAGE_IMPORT_DESCRIPTOR;
class IMAGE_THUNK_DATA64_union extends nativeclass_1.NativeClass {
}
IMAGE_THUNK_DATA64_union.defineAsUnion({
    ForwarderString: exports.ULONGLONG,
    Function: exports.ULONGLONG,
    Ordinal: exports.ULONGLONG,
    AddressOfData: exports.ULONGLONG, // PIMAGE_IMPORT_BY_NAME
});
let IMAGE_THUNK_DATA64 = class IMAGE_THUNK_DATA64 extends nativeclass_1.NativeStruct {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(IMAGE_THUNK_DATA64_union)
], IMAGE_THUNK_DATA64.prototype, "u1", void 0);
IMAGE_THUNK_DATA64 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], IMAGE_THUNK_DATA64);
exports.IMAGE_THUNK_DATA64 = IMAGE_THUNK_DATA64;
class IMAGE_SECTION_HEADER_Misc extends nativeclass_1.NativeClass {
}
IMAGE_SECTION_HEADER_Misc.defineAsUnion({
    PhysicalAddress: exports.DWORD,
    VirtualSize: exports.DWORD,
});
const IMAGE_SIZEOF_SHORT_NAME = 8;
let IMAGE_SECTION_HEADER = class IMAGE_SECTION_HEADER extends nativeclass_1.NativeStruct {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativeclass_1.NativeArray.make(exports.BYTE, IMAGE_SIZEOF_SHORT_NAME))
], IMAGE_SECTION_HEADER.prototype, "Name", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(IMAGE_SECTION_HEADER_Misc)
], IMAGE_SECTION_HEADER.prototype, "Misc", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], IMAGE_SECTION_HEADER.prototype, "VirtualAddress", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], IMAGE_SECTION_HEADER.prototype, "SizeOfRawData", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], IMAGE_SECTION_HEADER.prototype, "PointerToRawData", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], IMAGE_SECTION_HEADER.prototype, "PointerToRelocations", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], IMAGE_SECTION_HEADER.prototype, "PointerToLinenumbers", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_SECTION_HEADER.prototype, "NumberOfRelocations", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.WORD)
], IMAGE_SECTION_HEADER.prototype, "NumberOfLinenumbers", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], IMAGE_SECTION_HEADER.prototype, "Characteristics", void 0);
IMAGE_SECTION_HEADER = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], IMAGE_SECTION_HEADER);
exports.IMAGE_SECTION_HEADER = IMAGE_SECTION_HEADER;
const EXCEPTION_MAXIMUM_PARAMETERS = 15; // maximum number of exception parameters
let EXCEPTION_RECORD = class EXCEPTION_RECORD extends nativeclass_1.NativeStruct {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], EXCEPTION_RECORD.prototype, "ExceptionCode", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], EXCEPTION_RECORD.prototype, "ExceptionFlags", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], EXCEPTION_RECORD.prototype, "ExceptionRecord", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], EXCEPTION_RECORD.prototype, "ExceptionAddress", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], EXCEPTION_RECORD.prototype, "NumberParameters", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], EXCEPTION_RECORD.prototype, "dummy", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativeclass_1.NativeArray.make(exports.ULONG_PTR, EXCEPTION_MAXIMUM_PARAMETERS))
], EXCEPTION_RECORD.prototype, "ExceptionInformation", void 0);
EXCEPTION_RECORD = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], EXCEPTION_RECORD);
exports.EXCEPTION_RECORD = EXCEPTION_RECORD;
// typedef struct DECLSPEC_ALIGN(16) DECLSPEC_NOINITALL _CONTEXT {
//     //
//     // Register parameter home addresses.
//     //
//     // N.B. These fields are for convience - they could be used to extend the
//     //      context record in the future.
//     //
//     DWORD64 P1Home;
//     DWORD64 P2Home;
//     DWORD64 P3Home;
//     DWORD64 P4Home;
//     DWORD64 P5Home;
//     DWORD64 P6Home;
//     //
//     // Control flags.
//     //
//     DWORD ContextFlags;
//     DWORD MxCsr;
//     //
//     // Segment Registers and processor flags.
//     //
//     WORD   SegCs;
//     WORD   SegDs;
//     WORD   SegEs;
//     WORD   SegFs;
//     WORD   SegGs;
//     WORD   SegSs;
//     DWORD EFlags;
//     //
//     // Debug registers
//     //
//     DWORD64 Dr0;
//     DWORD64 Dr1;
//     DWORD64 Dr2;
//     DWORD64 Dr3;
//     DWORD64 Dr6;
//     DWORD64 Dr7;
//     //
//     // Integer registers.
//     //
//     DWORD64 Rax;
//     DWORD64 Rcx;
//     DWORD64 Rdx;
//     DWORD64 Rbx;
//     DWORD64 Rsp;
//     DWORD64 Rbp;
//     DWORD64 Rsi;
//     DWORD64 Rdi;
//     DWORD64 R8;
//     DWORD64 R9;
//     DWORD64 R10;
//     DWORD64 R11;
//     DWORD64 R12;
//     DWORD64 R13;
//     DWORD64 R14;
//     DWORD64 R15;
//     //
//     // Program counter.
//     //
//     DWORD64 Rip;
//     //
//     // Floating point state.
//     //
//     union {
//         XMM_SAVE_AREA32 FltSave;
//         struct {
//             M128A Header[2];
//             M128A Legacy[8];
//             M128A Xmm0;
//             M128A Xmm1;
//             M128A Xmm2;
//             M128A Xmm3;
//             M128A Xmm4;
//             M128A Xmm5;
//             M128A Xmm6;
//             M128A Xmm7;
//             M128A Xmm8;
//             M128A Xmm9;
//             M128A Xmm10;
//             M128A Xmm11;
//             M128A Xmm12;
//             M128A Xmm13;
//             M128A Xmm14;
//             M128A Xmm15;
//         } DUMMYSTRUCTNAME;
//     } DUMMYUNIONNAME;
//     //
//     // Vector registers.
//     //
//     M128A VectorRegister[26];
//     DWORD64 VectorControl;
//     //
//     // Special debug control registers.
//     //
//     DWORD64 DebugControl;
//     DWORD64 LastBranchToRip;
//     DWORD64 LastBranchFromRip;
//     DWORD64 LastExceptionToRip;
//     DWORD64 LastExceptionFromRip;
// } CONTEXT, *PCONTEXT;
let EXCEPTION_POINTERS = class EXCEPTION_POINTERS extends nativeclass_1.NativeStruct {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(EXCEPTION_RECORD.ref())
], EXCEPTION_POINTERS.prototype, "ExceptionRecord", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], EXCEPTION_POINTERS.prototype, "ContextRecord", void 0);
EXCEPTION_POINTERS = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], EXCEPTION_POINTERS);
exports.EXCEPTION_POINTERS = EXCEPTION_POINTERS;
let FILETIME = class FILETIME extends nativeclass_1.NativeStruct {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], FILETIME.prototype, "dwLowDateTime", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], FILETIME.prototype, "dwHighDateTime", void 0);
FILETIME = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], FILETIME);
exports.FILETIME = FILETIME;
function IMAGE_FIRST_SECTION(ntheader) {
    return ntheader.addAs(IMAGE_SECTION_HEADER, IMAGE_NT_HEADERS64.offsetOf("OptionalHeader") + ntheader.FileHeader.SizeOfOptionalHeader);
}
exports.IMAGE_FIRST_SECTION = IMAGE_FIRST_SECTION;
exports.EXCEPTION_BREAKPOINT = 0x80000003 | 0;
exports.EXCEPTION_ACCESS_VIOLATION = 0xc0000005 | 0;
exports.STATUS_INVALID_PARAMETER = 0xc000000d | 0;
exports.EXCEPTION_NONCONTINUABLE_EXCEPTION = 0xc0000025 | 0;
exports.FORMAT_MESSAGE_ALLOCATE_BUFFER = 0x00000100;
exports.FORMAT_MESSAGE_IGNORE_INSERTS = 0x00000200;
exports.FORMAT_MESSAGE_FROM_STRING = 0x00000400;
exports.FORMAT_MESSAGE_FROM_HMODULE = 0x00000800;
exports.FORMAT_MESSAGE_FROM_SYSTEM = 0x00001000;
exports.FORMAT_MESSAGE_ARGUMENT_ARRAY = 0x00002000;
exports.FORMAT_MESSAGE_MAX_WIDTH_MASK = 0x000000ff;
function MAKELANGID(p, s) {
    return (s << 10) | p;
}
exports.MAKELANGID = MAKELANGID;
function PRIMARYLANGID(lgid) {
    return lgid & 0x3ff;
}
exports.PRIMARYLANGID = PRIMARYLANGID;
function SUBLANGID(lgid) {
    return (lgid & 0xffff) >>> 10;
}
exports.SUBLANGID = SUBLANGID;
exports.LANG_NEUTRAL = 0x00;
exports.LANG_INVARIANT = 0x7f;
exports.LANG_AFRIKAANS = 0x36;
exports.LANG_ALBANIAN = 0x1c;
exports.LANG_ALSATIAN = 0x84;
exports.LANG_AMHARIC = 0x5e;
exports.LANG_ARABIC = 0x01;
exports.LANG_ARMENIAN = 0x2b;
exports.LANG_ASSAMESE = 0x4d;
exports.LANG_AZERI = 0x2c; // for Azerbaijani, LANG_AZERBAIJANI is preferred
exports.LANG_AZERBAIJANI = 0x2c;
exports.LANG_BANGLA = 0x45;
exports.LANG_BASHKIR = 0x6d;
exports.LANG_BASQUE = 0x2d;
exports.LANG_BELARUSIAN = 0x23;
exports.LANG_BENGALI = 0x45; // Some prefer to use LANG_BANGLA
exports.LANG_BRETON = 0x7e;
exports.LANG_BOSNIAN = 0x1a; // Use with SUBLANG_BOSNIAN_* Sublanguage IDs
exports.LANG_BOSNIAN_NEUTRAL = 0x781a; // Use with the ConvertDefaultLocale function
exports.LANG_BULGARIAN = 0x02;
exports.LANG_CATALAN = 0x03;
exports.LANG_CENTRAL_KURDISH = 0x92;
exports.LANG_CHEROKEE = 0x5c;
exports.LANG_CHINESE = 0x04; // Use with SUBLANG_CHINESE_* Sublanguage IDs
exports.LANG_CHINESE_SIMPLIFIED = 0x04; // Use with the ConvertDefaultLocale function
exports.LANG_CHINESE_TRADITIONAL = 0x7c04; // Use with the ConvertDefaultLocale function
exports.LANG_CORSICAN = 0x83;
exports.LANG_CROATIAN = 0x1a;
exports.LANG_CZECH = 0x05;
exports.LANG_DANISH = 0x06;
exports.LANG_DARI = 0x8c;
exports.LANG_DIVEHI = 0x65;
exports.LANG_DUTCH = 0x13;
exports.LANG_ENGLISH = 0x09;
exports.LANG_ESTONIAN = 0x25;
exports.LANG_FAEROESE = 0x38;
exports.LANG_FARSI = 0x29; // Deprecated: use LANG_PERSIAN instead
exports.LANG_FILIPINO = 0x64;
exports.LANG_FINNISH = 0x0b;
exports.LANG_FRENCH = 0x0c;
exports.LANG_FRISIAN = 0x62;
exports.LANG_FULAH = 0x67;
exports.LANG_GALICIAN = 0x56;
exports.LANG_GEORGIAN = 0x37;
exports.LANG_GERMAN = 0x07;
exports.LANG_GREEK = 0x08;
exports.LANG_GREENLANDIC = 0x6f;
exports.LANG_GUJARATI = 0x47;
exports.LANG_HAUSA = 0x68;
exports.LANG_HAWAIIAN = 0x75;
exports.LANG_HEBREW = 0x0d;
exports.LANG_HINDI = 0x39;
exports.LANG_HUNGARIAN = 0x0e;
exports.LANG_ICELANDIC = 0x0f;
exports.LANG_IGBO = 0x70;
exports.LANG_INDONESIAN = 0x21;
exports.LANG_INUKTITUT = 0x5d;
exports.LANG_IRISH = 0x3c; // Use with the SUBLANG_IRISH_IRELAND Sublanguage ID
exports.LANG_ITALIAN = 0x10;
exports.LANG_JAPANESE = 0x11;
exports.LANG_KANNADA = 0x4b;
exports.LANG_KASHMIRI = 0x60;
exports.LANG_KAZAK = 0x3f;
exports.LANG_KHMER = 0x53;
exports.LANG_KICHE = 0x86;
exports.LANG_KINYARWANDA = 0x87;
exports.LANG_KONKANI = 0x57;
exports.LANG_KOREAN = 0x12;
exports.LANG_KYRGYZ = 0x40;
exports.LANG_LAO = 0x54;
exports.LANG_LATVIAN = 0x26;
exports.LANG_LITHUANIAN = 0x27;
exports.LANG_LOWER_SORBIAN = 0x2e;
exports.LANG_LUXEMBOURGISH = 0x6e;
exports.LANG_MACEDONIAN = 0x2f; // the Former Yugoslav Republic of Macedonia
exports.LANG_MALAY = 0x3e;
exports.LANG_MALAYALAM = 0x4c;
exports.LANG_MALTESE = 0x3a;
exports.LANG_MANIPURI = 0x58;
exports.LANG_MAORI = 0x81;
exports.LANG_MAPUDUNGUN = 0x7a;
exports.LANG_MARATHI = 0x4e;
exports.LANG_MOHAWK = 0x7c;
exports.LANG_MONGOLIAN = 0x50;
exports.LANG_NEPALI = 0x61;
exports.LANG_NORWEGIAN = 0x14;
exports.LANG_OCCITAN = 0x82;
exports.LANG_ODIA = 0x48;
exports.LANG_ORIYA = 0x48; // Deprecated: use LANG_ODIA, instead.
exports.LANG_PASHTO = 0x63;
exports.LANG_PERSIAN = 0x29;
exports.LANG_POLISH = 0x15;
exports.LANG_PORTUGUESE = 0x16;
exports.LANG_PULAR = 0x67; // Deprecated: use LANG_FULAH instead
exports.LANG_PUNJABI = 0x46;
exports.LANG_QUECHUA = 0x6b;
exports.LANG_ROMANIAN = 0x18;
exports.LANG_ROMANSH = 0x17;
exports.LANG_RUSSIAN = 0x19;
exports.LANG_SAKHA = 0x85;
exports.LANG_SAMI = 0x3b;
exports.LANG_SANSKRIT = 0x4f;
exports.LANG_SCOTTISH_GAELIC = 0x91;
exports.LANG_SERBIAN = 0x1a; // Use with the SUBLANG_SERBIAN_* Sublanguage IDs
exports.LANG_SERBIAN_NEUTRAL = 0x7c1a; // Use with the ConvertDefaultLocale function
exports.LANG_SINDHI = 0x59;
exports.LANG_SINHALESE = 0x5b;
exports.LANG_SLOVAK = 0x1b;
exports.LANG_SLOVENIAN = 0x24;
exports.LANG_SOTHO = 0x6c;
exports.LANG_SPANISH = 0x0a;
exports.LANG_SWAHILI = 0x41;
exports.LANG_SWEDISH = 0x1d;
exports.LANG_SYRIAC = 0x5a;
exports.LANG_TAJIK = 0x28;
exports.LANG_TAMAZIGHT = 0x5f;
exports.LANG_TAMIL = 0x49;
exports.LANG_TATAR = 0x44;
exports.LANG_TELUGU = 0x4a;
exports.LANG_THAI = 0x1e;
exports.LANG_TIBETAN = 0x51;
exports.LANG_TIGRIGNA = 0x73;
exports.LANG_TIGRINYA = 0x73; // Preferred spelling in locale
exports.LANG_TSWANA = 0x32;
exports.LANG_TURKISH = 0x1f;
exports.LANG_TURKMEN = 0x42;
exports.LANG_UIGHUR = 0x80;
exports.LANG_UKRAINIAN = 0x22;
exports.LANG_UPPER_SORBIAN = 0x2e;
exports.LANG_URDU = 0x20;
exports.LANG_UZBEK = 0x43;
exports.LANG_VALENCIAN = 0x03;
exports.LANG_VIETNAMESE = 0x2a;
exports.LANG_WELSH = 0x52;
exports.LANG_WOLOF = 0x88;
exports.LANG_XHOSA = 0x34;
exports.LANG_YAKUT = 0x85; // Deprecated: use LANG_SAKHA,instead
exports.LANG_YI = 0x78;
exports.LANG_YORUBA = 0x6a;
exports.LANG_ZULU = 0x35;
exports.SUBLANG_NEUTRAL = 0x00; // language neutral
exports.SUBLANG_DEFAULT = 0x01; // user default
exports.SUBLANG_SYS_DEFAULT = 0x02; // system default
exports.SUBLANG_CUSTOM_DEFAULT = 0x03; // default custom language/locale
exports.SUBLANG_CUSTOM_UNSPECIFIED = 0x04; // custom language/locale
exports.SUBLANG_UI_CUSTOM_DEFAULT = 0x05; // Default custom MUI language/locale
exports.SUBLANG_AFRIKAANS_SOUTH_AFRICA = 0x01; // Afrikaans (South Africa) 0x0436 af-ZA
exports.SUBLANG_ALBANIAN_ALBANIA = 0x01; // Albanian (Albania) 0x041c sq-AL
exports.SUBLANG_ALSATIAN_FRANCE = 0x01; // Alsatian (France) 0x0484
exports.SUBLANG_AMHARIC_ETHIOPIA = 0x01; // Amharic (Ethiopia) 0x045e
exports.SUBLANG_ARABIC_SAUDI_ARABIA = 0x01; // Arabic (Saudi Arabia)
exports.SUBLANG_ARABIC_IRAQ = 0x02; // Arabic (Iraq)
exports.SUBLANG_ARABIC_EGYPT = 0x03; // Arabic (Egypt)
exports.SUBLANG_ARABIC_LIBYA = 0x04; // Arabic (Libya)
exports.SUBLANG_ARABIC_ALGERIA = 0x05; // Arabic (Algeria)
exports.SUBLANG_ARABIC_MOROCCO = 0x06; // Arabic (Morocco)
exports.SUBLANG_ARABIC_TUNISIA = 0x07; // Arabic (Tunisia)
exports.SUBLANG_ARABIC_OMAN = 0x08; // Arabic (Oman)
exports.SUBLANG_ARABIC_YEMEN = 0x09; // Arabic (Yemen)
exports.SUBLANG_ARABIC_SYRIA = 0x0a; // Arabic (Syria)
exports.SUBLANG_ARABIC_JORDAN = 0x0b; // Arabic (Jordan)
exports.SUBLANG_ARABIC_LEBANON = 0x0c; // Arabic (Lebanon)
exports.SUBLANG_ARABIC_KUWAIT = 0x0d; // Arabic (Kuwait)
exports.SUBLANG_ARABIC_UAE = 0x0e; // Arabic (U.A.E)
exports.SUBLANG_ARABIC_BAHRAIN = 0x0f; // Arabic (Bahrain)
exports.SUBLANG_ARABIC_QATAR = 0x10; // Arabic (Qatar)
exports.SUBLANG_ARMENIAN_ARMENIA = 0x01; // Armenian (Armenia) 0x042b hy-AM
exports.SUBLANG_ASSAMESE_INDIA = 0x01; // Assamese (India) 0x044d
exports.SUBLANG_AZERI_LATIN = 0x01; // Azeri (Latin) - for Azerbaijani, SUBLANG_AZERBAIJANI_AZERBAIJAN_LATIN preferred
exports.SUBLANG_AZERI_CYRILLIC = 0x02; // Azeri (Cyrillic) - for Azerbaijani, SUBLANG_AZERBAIJANI_AZERBAIJAN_CYRILLIC preferred
exports.SUBLANG_AZERBAIJANI_AZERBAIJAN_LATIN = 0x01; // Azerbaijani (Azerbaijan, Latin)
exports.SUBLANG_AZERBAIJANI_AZERBAIJAN_CYRILLIC = 0x02; // Azerbaijani (Azerbaijan, Cyrillic)
exports.SUBLANG_BANGLA_INDIA = 0x01; // Bangla (India)
exports.SUBLANG_BANGLA_BANGLADESH = 0x02; // Bangla (Bangladesh)
exports.SUBLANG_BASHKIR_RUSSIA = 0x01; // Bashkir (Russia) 0x046d ba-RU
exports.SUBLANG_BASQUE_BASQUE = 0x01; // Basque (Basque) 0x042d eu-ES
exports.SUBLANG_BELARUSIAN_BELARUS = 0x01; // Belarusian (Belarus) 0x0423 be-BY
exports.SUBLANG_BENGALI_INDIA = 0x01; // Bengali (India) - Note some prefer SUBLANG_BANGLA_INDIA
exports.SUBLANG_BENGALI_BANGLADESH = 0x02; // Bengali (Bangladesh) - Note some prefer SUBLANG_BANGLA_BANGLADESH
exports.SUBLANG_BOSNIAN_BOSNIA_HERZEGOVINA_LATIN = 0x05; // Bosnian (Bosnia and Herzegovina - Latin) 0x141a bs-BA-Latn
exports.SUBLANG_BOSNIAN_BOSNIA_HERZEGOVINA_CYRILLIC = 0x08; // Bosnian (Bosnia and Herzegovina - Cyrillic) 0x201a bs-BA-Cyrl
exports.SUBLANG_BRETON_FRANCE = 0x01; // Breton (France) 0x047e
exports.SUBLANG_BULGARIAN_BULGARIA = 0x01; // Bulgarian (Bulgaria) 0x0402
exports.SUBLANG_CATALAN_CATALAN = 0x01; // Catalan (Catalan) 0x0403
exports.SUBLANG_CENTRAL_KURDISH_IRAQ = 0x01; // Central Kurdish (Iraq) 0x0492 ku-Arab-IQ
exports.SUBLANG_CHEROKEE_CHEROKEE = 0x01; // Cherokee (Cherokee) 0x045c chr-Cher-US
exports.SUBLANG_CHINESE_TRADITIONAL = 0x01; // Chinese (Taiwan) 0x0404 zh-TW
exports.SUBLANG_CHINESE_SIMPLIFIED = 0x02; // Chinese (PR China) 0x0804 zh-CN
exports.SUBLANG_CHINESE_HONGKONG = 0x03; // Chinese (Hong Kong S.A.R., P.R.C.) 0x0c04 zh-HK
exports.SUBLANG_CHINESE_SINGAPORE = 0x04; // Chinese (Singapore) 0x1004 zh-SG
exports.SUBLANG_CHINESE_MACAU = 0x05; // Chinese (Macau S.A.R.) 0x1404 zh-MO
exports.SUBLANG_CORSICAN_FRANCE = 0x01; // Corsican (France) 0x0483
exports.SUBLANG_CZECH_CZECH_REPUBLIC = 0x01; // Czech (Czech Republic) 0x0405
exports.SUBLANG_CROATIAN_CROATIA = 0x01; // Croatian (Croatia)
exports.SUBLANG_CROATIAN_BOSNIA_HERZEGOVINA_LATIN = 0x04; // Croatian (Bosnia and Herzegovina - Latin) 0x101a hr-BA
exports.SUBLANG_DANISH_DENMARK = 0x01; // Danish (Denmark) 0x0406
exports.SUBLANG_DARI_AFGHANISTAN = 0x01; // Dari (Afghanistan)
exports.SUBLANG_DIVEHI_MALDIVES = 0x01; // Divehi (Maldives) 0x0465 div-MV
exports.SUBLANG_DUTCH = 0x01; // Dutch
exports.SUBLANG_DUTCH_BELGIAN = 0x02; // Dutch (Belgian)
exports.SUBLANG_ENGLISH_US = 0x01; // English (USA)
exports.SUBLANG_ENGLISH_UK = 0x02; // English (UK)
exports.SUBLANG_ENGLISH_AUS = 0x03; // English (Australian)
exports.SUBLANG_ENGLISH_CAN = 0x04; // English (Canadian)
exports.SUBLANG_ENGLISH_NZ = 0x05; // English (New Zealand)
exports.SUBLANG_ENGLISH_EIRE = 0x06; // English (Irish)
exports.SUBLANG_ENGLISH_SOUTH_AFRICA = 0x07; // English (South Africa)
exports.SUBLANG_ENGLISH_JAMAICA = 0x08; // English (Jamaica)
exports.SUBLANG_ENGLISH_CARIBBEAN = 0x09; // English (Caribbean)
exports.SUBLANG_ENGLISH_BELIZE = 0x0a; // English (Belize)
exports.SUBLANG_ENGLISH_TRINIDAD = 0x0b; // English (Trinidad)
exports.SUBLANG_ENGLISH_ZIMBABWE = 0x0c; // English (Zimbabwe)
exports.SUBLANG_ENGLISH_PHILIPPINES = 0x0d; // English (Philippines)
exports.SUBLANG_ENGLISH_INDIA = 0x10; // English (India)
exports.SUBLANG_ENGLISH_MALAYSIA = 0x11; // English (Malaysia)
exports.SUBLANG_ENGLISH_SINGAPORE = 0x12; // English (Singapore)
exports.SUBLANG_ESTONIAN_ESTONIA = 0x01; // Estonian (Estonia) 0x0425 et-EE
exports.SUBLANG_FAEROESE_FAROE_ISLANDS = 0x01; // Faroese (Faroe Islands) 0x0438 fo-FO
exports.SUBLANG_FILIPINO_PHILIPPINES = 0x01; // Filipino (Philippines) 0x0464 fil-PH
exports.SUBLANG_FINNISH_FINLAND = 0x01; // Finnish (Finland) 0x040b
exports.SUBLANG_FRENCH = 0x01; // French
exports.SUBLANG_FRENCH_BELGIAN = 0x02; // French (Belgian)
exports.SUBLANG_FRENCH_CANADIAN = 0x03; // French (Canadian)
exports.SUBLANG_FRENCH_SWISS = 0x04; // French (Swiss)
exports.SUBLANG_FRENCH_LUXEMBOURG = 0x05; // French (Luxembourg)
exports.SUBLANG_FRENCH_MONACO = 0x06; // French (Monaco)
exports.SUBLANG_FRISIAN_NETHERLANDS = 0x01; // Frisian (Netherlands) 0x0462 fy-NL
exports.SUBLANG_FULAH_SENEGAL = 0x02; // Fulah (Senegal) 0x0867 ff-Latn-SN
exports.SUBLANG_GALICIAN_GALICIAN = 0x01; // Galician (Galician) 0x0456 gl-ES
exports.SUBLANG_GEORGIAN_GEORGIA = 0x01; // Georgian (Georgia) 0x0437 ka-GE
exports.SUBLANG_GERMAN = 0x01; // German
exports.SUBLANG_GERMAN_SWISS = 0x02; // German (Swiss)
exports.SUBLANG_GERMAN_AUSTRIAN = 0x03; // German (Austrian)
exports.SUBLANG_GERMAN_LUXEMBOURG = 0x04; // German (Luxembourg)
exports.SUBLANG_GERMAN_LIECHTENSTEIN = 0x05; // German (Liechtenstein)
exports.SUBLANG_GREEK_GREECE = 0x01; // Greek (Greece)
exports.SUBLANG_GREENLANDIC_GREENLAND = 0x01; // Greenlandic (Greenland) 0x046f kl-GL
exports.SUBLANG_GUJARATI_INDIA = 0x01; // Gujarati (India (Gujarati Script)) 0x0447 gu-IN
exports.SUBLANG_HAUSA_NIGERIA_LATIN = 0x01; // Hausa (Latin, Nigeria) 0x0468 ha-NG-Latn
exports.SUBLANG_HAWAIIAN_US = 0x01; // Hawiian (US) 0x0475 haw-US
exports.SUBLANG_HEBREW_ISRAEL = 0x01; // Hebrew (Israel) 0x040d
exports.SUBLANG_HINDI_INDIA = 0x01; // Hindi (India) 0x0439 hi-IN
exports.SUBLANG_HUNGARIAN_HUNGARY = 0x01; // Hungarian (Hungary) 0x040e
exports.SUBLANG_ICELANDIC_ICELAND = 0x01; // Icelandic (Iceland) 0x040f
exports.SUBLANG_IGBO_NIGERIA = 0x01; // Igbo (Nigeria) 0x0470 ig-NG
exports.SUBLANG_INDONESIAN_INDONESIA = 0x01; // Indonesian (Indonesia) 0x0421 id-ID
exports.SUBLANG_INUKTITUT_CANADA = 0x01; // Inuktitut (Syllabics) (Canada) 0x045d iu-CA-Cans
exports.SUBLANG_INUKTITUT_CANADA_LATIN = 0x02; // Inuktitut (Canada - Latin)
exports.SUBLANG_IRISH_IRELAND = 0x02; // Irish (Ireland)
exports.SUBLANG_ITALIAN = 0x01; // Italian
exports.SUBLANG_ITALIAN_SWISS = 0x02; // Italian (Swiss)
exports.SUBLANG_JAPANESE_JAPAN = 0x01; // Japanese (Japan) 0x0411
exports.SUBLANG_KANNADA_INDIA = 0x01; // Kannada (India (Kannada Script)) 0x044b kn-IN
exports.SUBLANG_KASHMIRI_SASIA = 0x02; // Kashmiri (South Asia)
exports.SUBLANG_KASHMIRI_INDIA = 0x02; // For app compatibility only
exports.SUBLANG_KAZAK_KAZAKHSTAN = 0x01; // Kazakh (Kazakhstan) 0x043f kk-KZ
exports.SUBLANG_KHMER_CAMBODIA = 0x01; // Khmer (Cambodia) 0x0453 kh-KH
exports.SUBLANG_KICHE_GUATEMALA = 0x01; // K'iche (Guatemala)
exports.SUBLANG_KINYARWANDA_RWANDA = 0x01; // Kinyarwanda (Rwanda) 0x0487 rw-RW
exports.SUBLANG_KONKANI_INDIA = 0x01; // Konkani (India) 0x0457 kok-IN
exports.SUBLANG_KOREAN = 0x01; // Korean (Extended Wansung)
exports.SUBLANG_KYRGYZ_KYRGYZSTAN = 0x01; // Kyrgyz (Kyrgyzstan) 0x0440 ky-KG
exports.SUBLANG_LAO_LAO = 0x01; // Lao (Lao PDR) 0x0454 lo-LA
exports.SUBLANG_LATVIAN_LATVIA = 0x01; // Latvian (Latvia) 0x0426 lv-LV
exports.SUBLANG_LITHUANIAN = 0x01; // Lithuanian
exports.SUBLANG_LOWER_SORBIAN_GERMANY = 0x02; // Lower Sorbian (Germany) 0x082e wee-DE
exports.SUBLANG_LUXEMBOURGISH_LUXEMBOURG = 0x01; // Luxembourgish (Luxembourg) 0x046e lb-LU
exports.SUBLANG_MACEDONIAN_MACEDONIA = 0x01; // Macedonian (Macedonia (FYROM)) 0x042f mk-MK
exports.SUBLANG_MALAY_MALAYSIA = 0x01; // Malay (Malaysia)
exports.SUBLANG_MALAY_BRUNEI_DARUSSALAM = 0x02; // Malay (Brunei Darussalam)
exports.SUBLANG_MALAYALAM_INDIA = 0x01; // Malayalam (India (Malayalam Script) ) 0x044c ml-IN
exports.SUBLANG_MALTESE_MALTA = 0x01; // Maltese (Malta) 0x043a mt-MT
exports.SUBLANG_MAORI_NEW_ZEALAND = 0x01; // Maori (New Zealand) 0x0481 mi-NZ
exports.SUBLANG_MAPUDUNGUN_CHILE = 0x01; // Mapudungun (Chile) 0x047a arn-CL
exports.SUBLANG_MARATHI_INDIA = 0x01; // Marathi (India) 0x044e mr-IN
exports.SUBLANG_MOHAWK_MOHAWK = 0x01; // Mohawk (Mohawk) 0x047c moh-CA
exports.SUBLANG_MONGOLIAN_CYRILLIC_MONGOLIA = 0x01; // Mongolian (Cyrillic, Mongolia)
exports.SUBLANG_MONGOLIAN_PRC = 0x02; // Mongolian (PRC)
exports.SUBLANG_NEPALI_INDIA = 0x02; // Nepali (India)
exports.SUBLANG_NEPALI_NEPAL = 0x01; // Nepali (Nepal) 0x0461 ne-NP
exports.SUBLANG_NORWEGIAN_BOKMAL = 0x01; // Norwegian (Bokmal)
exports.SUBLANG_NORWEGIAN_NYNORSK = 0x02; // Norwegian (Nynorsk)
exports.SUBLANG_OCCITAN_FRANCE = 0x01; // Occitan (France) 0x0482 oc-FR
exports.SUBLANG_ODIA_INDIA = 0x01; // Odia (India (Odia Script)) 0x0448 or-IN
exports.SUBLANG_ORIYA_INDIA = 0x01; // Deprecated: use SUBLANG_ODIA_INDIA instead
exports.SUBLANG_PASHTO_AFGHANISTAN = 0x01; // Pashto (Afghanistan)
exports.SUBLANG_PERSIAN_IRAN = 0x01; // Persian (Iran) 0x0429 fa-IR
exports.SUBLANG_POLISH_POLAND = 0x01; // Polish (Poland) 0x0415
exports.SUBLANG_PORTUGUESE = 0x02; // Portuguese
exports.SUBLANG_PORTUGUESE_BRAZILIAN = 0x01; // Portuguese (Brazil)
exports.SUBLANG_PULAR_SENEGAL = 0x02; // Deprecated: Use SUBLANG_FULAH_SENEGAL instead
exports.SUBLANG_PUNJABI_INDIA = 0x01; // Punjabi (India (Gurmukhi Script)) 0x0446 pa-IN
exports.SUBLANG_PUNJABI_PAKISTAN = 0x02; // Punjabi (Pakistan (Arabic Script)) 0x0846 pa-Arab-PK
exports.SUBLANG_QUECHUA_BOLIVIA = 0x01; // Quechua (Bolivia)
exports.SUBLANG_QUECHUA_ECUADOR = 0x02; // Quechua (Ecuador)
exports.SUBLANG_QUECHUA_PERU = 0x03; // Quechua (Peru)
exports.SUBLANG_ROMANIAN_ROMANIA = 0x01; // Romanian (Romania) 0x0418
exports.SUBLANG_ROMANSH_SWITZERLAND = 0x01; // Romansh (Switzerland) 0x0417 rm-CH
exports.SUBLANG_RUSSIAN_RUSSIA = 0x01; // Russian (Russia) 0x0419
exports.SUBLANG_SAKHA_RUSSIA = 0x01; // Sakha (Russia) 0x0485 sah-RU
exports.SUBLANG_SAMI_NORTHERN_NORWAY = 0x01; // Northern Sami (Norway)
exports.SUBLANG_SAMI_NORTHERN_SWEDEN = 0x02; // Northern Sami (Sweden)
exports.SUBLANG_SAMI_NORTHERN_FINLAND = 0x03; // Northern Sami (Finland)
exports.SUBLANG_SAMI_LULE_NORWAY = 0x04; // Lule Sami (Norway)
exports.SUBLANG_SAMI_LULE_SWEDEN = 0x05; // Lule Sami (Sweden)
exports.SUBLANG_SAMI_SOUTHERN_NORWAY = 0x06; // Southern Sami (Norway)
exports.SUBLANG_SAMI_SOUTHERN_SWEDEN = 0x07; // Southern Sami (Sweden)
exports.SUBLANG_SAMI_SKOLT_FINLAND = 0x08; // Skolt Sami (Finland)
exports.SUBLANG_SAMI_INARI_FINLAND = 0x09; // Inari Sami (Finland)
exports.SUBLANG_SANSKRIT_INDIA = 0x01; // Sanskrit (India) 0x044f sa-IN
exports.SUBLANG_SCOTTISH_GAELIC = 0x01; // Scottish Gaelic (United Kingdom) 0x0491 gd-GB
exports.SUBLANG_SERBIAN_BOSNIA_HERZEGOVINA_LATIN = 0x06; // Serbian (Bosnia and Herzegovina - Latin)
exports.SUBLANG_SERBIAN_BOSNIA_HERZEGOVINA_CYRILLIC = 0x07; // Serbian (Bosnia and Herzegovina - Cyrillic)
exports.SUBLANG_SERBIAN_MONTENEGRO_LATIN = 0x0b; // Serbian (Montenegro - Latn)
exports.SUBLANG_SERBIAN_MONTENEGRO_CYRILLIC = 0x0c; // Serbian (Montenegro - Cyrillic)
exports.SUBLANG_SERBIAN_SERBIA_LATIN = 0x09; // Serbian (Serbia - Latin)
exports.SUBLANG_SERBIAN_SERBIA_CYRILLIC = 0x0a; // Serbian (Serbia - Cyrillic)
exports.SUBLANG_SERBIAN_CROATIA = 0x01; // Croatian (Croatia) 0x041a hr-HR
exports.SUBLANG_SERBIAN_LATIN = 0x02; // Serbian (Latin)
exports.SUBLANG_SERBIAN_CYRILLIC = 0x03; // Serbian (Cyrillic)
exports.SUBLANG_SINDHI_INDIA = 0x01; // Sindhi (India) reserved 0x0459
exports.SUBLANG_SINDHI_PAKISTAN = 0x02; // Sindhi (Pakistan) 0x0859 sd-Arab-PK
exports.SUBLANG_SINDHI_AFGHANISTAN = 0x02; // For app compatibility only
exports.SUBLANG_SINHALESE_SRI_LANKA = 0x01; // Sinhalese (Sri Lanka)
exports.SUBLANG_SOTHO_NORTHERN_SOUTH_AFRICA = 0x01; // Northern Sotho (South Africa)
exports.SUBLANG_SLOVAK_SLOVAKIA = 0x01; // Slovak (Slovakia) 0x041b sk-SK
exports.SUBLANG_SLOVENIAN_SLOVENIA = 0x01; // Slovenian (Slovenia) 0x0424 sl-SI
exports.SUBLANG_SPANISH = 0x01; // Spanish (Castilian)
exports.SUBLANG_SPANISH_MEXICAN = 0x02; // Spanish (Mexico)
exports.SUBLANG_SPANISH_MODERN = 0x03; // Spanish (Modern)
exports.SUBLANG_SPANISH_GUATEMALA = 0x04; // Spanish (Guatemala)
exports.SUBLANG_SPANISH_COSTA_RICA = 0x05; // Spanish (Costa Rica)
exports.SUBLANG_SPANISH_PANAMA = 0x06; // Spanish (Panama)
exports.SUBLANG_SPANISH_DOMINICAN_REPUBLIC = 0x07; // Spanish (Dominican Republic)
exports.SUBLANG_SPANISH_VENEZUELA = 0x08; // Spanish (Venezuela)
exports.SUBLANG_SPANISH_COLOMBIA = 0x09; // Spanish (Colombia)
exports.SUBLANG_SPANISH_PERU = 0x0a; // Spanish (Peru)
exports.SUBLANG_SPANISH_ARGENTINA = 0x0b; // Spanish (Argentina)
exports.SUBLANG_SPANISH_ECUADOR = 0x0c; // Spanish (Ecuador)
exports.SUBLANG_SPANISH_CHILE = 0x0d; // Spanish (Chile)
exports.SUBLANG_SPANISH_URUGUAY = 0x0e; // Spanish (Uruguay)
exports.SUBLANG_SPANISH_PARAGUAY = 0x0f; // Spanish (Paraguay)
exports.SUBLANG_SPANISH_BOLIVIA = 0x10; // Spanish (Bolivia)
exports.SUBLANG_SPANISH_EL_SALVADOR = 0x11; // Spanish (El Salvador)
exports.SUBLANG_SPANISH_HONDURAS = 0x12; // Spanish (Honduras)
exports.SUBLANG_SPANISH_NICARAGUA = 0x13; // Spanish (Nicaragua)
exports.SUBLANG_SPANISH_PUERTO_RICO = 0x14; // Spanish (Puerto Rico)
exports.SUBLANG_SPANISH_US = 0x15; // Spanish (United States)
exports.SUBLANG_SWAHILI_KENYA = 0x01; // Swahili (Kenya) 0x0441 sw-KE
exports.SUBLANG_SWEDISH = 0x01; // Swedish
exports.SUBLANG_SWEDISH_FINLAND = 0x02; // Swedish (Finland)
exports.SUBLANG_SYRIAC_SYRIA = 0x01; // Syriac (Syria) 0x045a syr-SY
exports.SUBLANG_TAJIK_TAJIKISTAN = 0x01; // Tajik (Tajikistan) 0x0428 tg-TJ-Cyrl
exports.SUBLANG_TAMAZIGHT_ALGERIA_LATIN = 0x02; // Tamazight (Latin, Algeria) 0x085f tzm-Latn-DZ
exports.SUBLANG_TAMAZIGHT_MOROCCO_TIFINAGH = 0x04; // Tamazight (Tifinagh) 0x105f tzm-Tfng-MA
exports.SUBLANG_TAMIL_INDIA = 0x01; // Tamil (India)
exports.SUBLANG_TAMIL_SRI_LANKA = 0x02; // Tamil (Sri Lanka) 0x0849 ta-LK
exports.SUBLANG_TATAR_RUSSIA = 0x01; // Tatar (Russia) 0x0444 tt-RU
exports.SUBLANG_TELUGU_INDIA = 0x01; // Telugu (India (Telugu Script)) 0x044a te-IN
exports.SUBLANG_THAI_THAILAND = 0x01; // Thai (Thailand) 0x041e th-TH
exports.SUBLANG_TIBETAN_PRC = 0x01; // Tibetan (PRC)
exports.SUBLANG_TIGRIGNA_ERITREA = 0x02; // Tigrigna (Eritrea)
exports.SUBLANG_TIGRINYA_ERITREA = 0x02; // Tigrinya (Eritrea) 0x0873 ti-ER (preferred spelling)
exports.SUBLANG_TIGRINYA_ETHIOPIA = 0x01; // Tigrinya (Ethiopia) 0x0473 ti-ET
exports.SUBLANG_TSWANA_BOTSWANA = 0x02; // Setswana / Tswana (Botswana) 0x0832 tn-BW
exports.SUBLANG_TSWANA_SOUTH_AFRICA = 0x01; // Setswana / Tswana (South Africa) 0x0432 tn-ZA
exports.SUBLANG_TURKISH_TURKEY = 0x01; // Turkish (Turkey) 0x041f tr-TR
exports.SUBLANG_TURKMEN_TURKMENISTAN = 0x01; // Turkmen (Turkmenistan) 0x0442 tk-TM
exports.SUBLANG_UIGHUR_PRC = 0x01; // Uighur (PRC) 0x0480 ug-CN
exports.SUBLANG_UKRAINIAN_UKRAINE = 0x01; // Ukrainian (Ukraine) 0x0422 uk-UA
exports.SUBLANG_UPPER_SORBIAN_GERMANY = 0x01; // Upper Sorbian (Germany) 0x042e wen-DE
exports.SUBLANG_URDU_PAKISTAN = 0x01; // Urdu (Pakistan)
exports.SUBLANG_URDU_INDIA = 0x02; // Urdu (India)
exports.SUBLANG_UZBEK_LATIN = 0x01; // Uzbek (Latin)
exports.SUBLANG_UZBEK_CYRILLIC = 0x02; // Uzbek (Cyrillic)
exports.SUBLANG_VALENCIAN_VALENCIA = 0x02; // Valencian (Valencia) 0x0803 ca-ES-Valencia
exports.SUBLANG_VIETNAMESE_VIETNAM = 0x01; // Vietnamese (Vietnam) 0x042a vi-VN
exports.SUBLANG_WELSH_UNITED_KINGDOM = 0x01; // Welsh (United Kingdom) 0x0452 cy-GB
exports.SUBLANG_WOLOF_SENEGAL = 0x01; // Wolof (Senegal)
exports.SUBLANG_XHOSA_SOUTH_AFRICA = 0x01; // isiXhosa / Xhosa (South Africa) 0x0434 xh-ZA
exports.SUBLANG_YAKUT_RUSSIA = 0x01; // Deprecated: use SUBLANG_SAKHA_RUSSIA instead
exports.SUBLANG_YI_PRC = 0x01; // Yi (PRC)) 0x0478
exports.SUBLANG_YORUBA_NIGERIA = 0x01; // Yoruba (Nigeria) 046a yo-NG
exports.SUBLANG_ZULU_SOUTH_AFRICA = 0x01; // isiZulu / Zulu (South Africa) 0x0435 zu-ZA
exports.ERROR_MOD_NOT_FOUND = 126;
let MODULEINFO = class MODULEINFO extends nativeclass_1.NativeStruct {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], MODULEINFO.prototype, "lpBaseOfDll", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], MODULEINFO.prototype, "SizeOfImage", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], MODULEINFO.prototype, "EntryPoint", void 0);
MODULEINFO = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], MODULEINFO);
exports.MODULEINFO = MODULEINFO;
const UINT = nativetype_1.uint32_t;
const int = nativetype_1.int32_t;
exports.ATOM = nativetype_1.int32_t;
const HINSTANCE = core_1.VoidPointer;
const HICON = core_1.VoidPointer;
const HCURSOR = core_1.VoidPointer;
const HBRUSH = core_1.VoidPointer;
const LPCWSTR = core_1.VoidPointer;
const WNDPROC = core_1.VoidPointer;
exports.CW_USEDEFAULT = 0x80000000 | 0;
/*
 * Class styles
 */
exports.CS_VREDRAW = 0x0001;
exports.CS_HREDRAW = 0x0002;
exports.CS_DBLCLKS = 0x0008;
exports.CS_OWNDC = 0x0020;
exports.CS_CLASSDC = 0x0040;
exports.CS_PARENTDC = 0x0080;
exports.CS_NOCLOSE = 0x0200;
exports.CS_SAVEBITS = 0x0800;
exports.CS_BYTEALIGNCLIENT = 0x1000;
exports.CS_BYTEALIGNWINDOW = 0x2000;
exports.CS_GLOBALCLASS = 0x4000;
exports.CS_IME = 0x00010000;
exports.CS_DROPSHADOW = 0x00020000;
/*
 * Window Styles
 */
exports.WS_OVERLAPPED = 0x00000000;
exports.WS_POPUP = 0x80000000;
exports.WS_CHILD = 0x40000000;
exports.WS_MINIMIZE = 0x20000000;
exports.WS_VISIBLE = 0x10000000;
exports.WS_DISABLED = 0x08000000;
exports.WS_CLIPSIBLINGS = 0x04000000;
exports.WS_CLIPCHILDREN = 0x02000000;
exports.WS_MAXIMIZE = 0x01000000;
exports.WS_CAPTION = 0x00c00000; /* WS_BORDER | WS_DLGFRAME  */
exports.WS_BORDER = 0x00800000;
exports.WS_DLGFRAME = 0x00400000;
exports.WS_VSCROLL = 0x00200000;
exports.WS_HSCROLL = 0x00100000;
exports.WS_SYSMENU = 0x00080000;
exports.WS_THICKFRAME = 0x00040000;
exports.WS_GROUP = 0x00020000;
exports.WS_TABSTOP = 0x00010000;
exports.WS_MINIMIZEBOX = 0x00020000;
exports.WS_MAXIMIZEBOX = 0x00010000;
exports.WS_TILED = exports.WS_OVERLAPPED;
exports.WS_ICONIC = exports.WS_MINIMIZE;
exports.WS_SIZEBOX = exports.WS_THICKFRAME;
/*
 * Common Window Styles
 */
exports.WS_OVERLAPPEDWINDOW = exports.WS_OVERLAPPED | exports.WS_CAPTION | exports.WS_SYSMENU | exports.WS_THICKFRAME | exports.WS_MINIMIZEBOX | exports.WS_MAXIMIZEBOX;
exports.WS_TILEDWINDOW = exports.WS_OVERLAPPEDWINDOW;
exports.WS_POPUPWINDOW = exports.WS_POPUP | exports.WS_BORDER | exports.WS_SYSMENU;
exports.WS_CHILDWINDOW = exports.WS_CHILD;
function MAKEINTRESOURCE(v) {
    return core_1.VoidPointer.fromAddress(v, 0);
}
exports.MAKEINTRESOURCE = MAKEINTRESOURCE;
/*
 * Button Control Styles
 */
exports.BS_PUSHBUTTON = 0x00000000;
exports.BS_DEFPUSHBUTTON = 0x00000001;
exports.BS_CHECKBOX = 0x00000002;
exports.BS_AUTOCHECKBOX = 0x00000003;
exports.BS_RADIOBUTTON = 0x00000004;
exports.BS_3STATE = 0x00000005;
exports.BS_AUTO3STATE = 0x00000006;
exports.BS_GROUPBOX = 0x00000007;
exports.BS_USERBUTTON = 0x00000008;
exports.BS_AUTORADIOBUTTON = 0x00000009;
exports.BS_PUSHBOX = 0x0000000a;
exports.BS_OWNERDRAW = 0x0000000b;
exports.BS_TYPEMASK = 0x0000000f;
exports.BS_LEFTTEXT = 0x00000020;
exports.BS_TEXT = 0x00000000;
exports.BS_ICON = 0x00000040;
exports.BS_BITMAP = 0x00000080;
exports.BS_LEFT = 0x00000100;
exports.BS_RIGHT = 0x00000200;
exports.BS_CENTER = 0x00000300;
exports.BS_TOP = 0x00000400;
exports.BS_BOTTOM = 0x00000800;
exports.BS_VCENTER = 0x00000c00;
exports.BS_PUSHLIKE = 0x00001000;
exports.BS_MULTILINE = 0x00002000;
exports.BS_NOTIFY = 0x00004000;
exports.BS_FLAT = 0x00008000;
exports.BS_RIGHTBUTTON = exports.BS_LEFTTEXT;
/*
 * Standard Cursor IDs
 */
exports.IDC_ARROW = MAKEINTRESOURCE(32512);
exports.IDC_IBEAM = MAKEINTRESOURCE(32513);
exports.IDC_WAIT = MAKEINTRESOURCE(32514);
exports.IDC_CROSS = MAKEINTRESOURCE(32515);
exports.IDC_UPARROW = MAKEINTRESOURCE(32516);
exports.IDC_SIZE = MAKEINTRESOURCE(32640); /* OBSOLETE: use IDC_SIZEALL */
exports.IDC_ICON = MAKEINTRESOURCE(32641); /* OBSOLETE: use IDC_ARROW */
exports.IDC_SIZENWSE = MAKEINTRESOURCE(32642);
exports.IDC_SIZENESW = MAKEINTRESOURCE(32643);
exports.IDC_SIZEWE = MAKEINTRESOURCE(32644);
exports.IDC_SIZENS = MAKEINTRESOURCE(32645);
exports.IDC_SIZEALL = MAKEINTRESOURCE(32646);
exports.IDC_NO = MAKEINTRESOURCE(32648); /* not in win3.1 */
exports.IDC_HAND = MAKEINTRESOURCE(32649);
exports.IDC_APPSTARTING = MAKEINTRESOURCE(32650); /* not in win3.1 */
exports.IDC_HELP = MAKEINTRESOURCE(32651);
/*
 * Color Types
 */
exports.CTLCOLOR_MSGBOX = 0;
exports.CTLCOLOR_EDIT = 1;
exports.CTLCOLOR_LISTBOX = 2;
exports.CTLCOLOR_BTN = 3;
exports.CTLCOLOR_DLG = 4;
exports.CTLCOLOR_SCROLLBAR = 5;
exports.CTLCOLOR_STATIC = 6;
exports.CTLCOLOR_MAX = 7;
exports.COLOR_SCROLLBAR = 0;
exports.COLOR_BACKGROUND = 1;
exports.COLOR_ACTIVECAPTION = 2;
exports.COLOR_INACTIVECAPTION = 3;
exports.COLOR_MENU = 4;
exports.COLOR_WINDOW = 5;
exports.COLOR_WINDOWFRAME = 6;
exports.COLOR_MENUTEXT = 7;
exports.COLOR_WINDOWTEXT = 8;
exports.COLOR_CAPTIONTEXT = 9;
exports.COLOR_ACTIVEBORDER = 10;
exports.COLOR_INACTIVEBORDER = 11;
exports.COLOR_APPWORKSPACE = 12;
exports.COLOR_HIGHLIGHT = 13;
exports.COLOR_HIGHLIGHTTEXT = 14;
exports.COLOR_BTNFACE = 15;
exports.COLOR_BTNSHADOW = 16;
exports.COLOR_GRAYTEXT = 17;
exports.COLOR_BTNTEXT = 18;
exports.COLOR_INACTIVECAPTIONTEXT = 19;
exports.COLOR_BTNHIGHLIGHT = 20;
exports.COLOR_3DDKSHADOW = 21;
exports.COLOR_3DLIGHT = 22;
exports.COLOR_INFOTEXT = 23;
exports.COLOR_INFOBK = 24;
exports.COLOR_HOTLIGHT = 26;
exports.COLOR_GRADIENTACTIVECAPTION = 27;
exports.COLOR_GRADIENTINACTIVECAPTION = 28;
exports.COLOR_MENUHILIGHT = 29;
exports.COLOR_MENUBAR = 30;
exports.COLOR_DESKTOP = exports.COLOR_BACKGROUND;
exports.COLOR_3DFACE = exports.COLOR_BTNFACE;
exports.COLOR_3DSHADOW = exports.COLOR_BTNSHADOW;
exports.COLOR_3DHIGHLIGHT = exports.COLOR_BTNHIGHLIGHT;
exports.COLOR_3DHILIGHT = exports.COLOR_BTNHIGHLIGHT;
exports.COLOR_BTNHILIGHT = exports.COLOR_BTNHIGHLIGHT;
let WNDCLASSEXW = class WNDCLASSEXW extends nativeclass_1.NativeStruct {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(UINT)
], WNDCLASSEXW.prototype, "cbSize", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(UINT)
], WNDCLASSEXW.prototype, "style", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(WNDPROC)
], WNDCLASSEXW.prototype, "lpfnWndProc", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(int)
], WNDCLASSEXW.prototype, "cbClsExtra", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(int)
], WNDCLASSEXW.prototype, "cbWndExtra", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(HINSTANCE)
], WNDCLASSEXW.prototype, "hInstance", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(HICON)
], WNDCLASSEXW.prototype, "hIcon", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(HCURSOR)
], WNDCLASSEXW.prototype, "hCursor", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(HBRUSH)
], WNDCLASSEXW.prototype, "hbrBackground", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(LPCWSTR)
], WNDCLASSEXW.prototype, "lpszMenuName", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(LPCWSTR)
], WNDCLASSEXW.prototype, "lpszClassName", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(HICON)
], WNDCLASSEXW.prototype, "hIconSm", void 0);
WNDCLASSEXW = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], WNDCLASSEXW);
exports.WNDCLASSEXW = WNDCLASSEXW;
class HWND extends core_1.VoidPointer {
}
exports.HWND = HWND;
let POINT = class POINT extends nativeclass_1.NativeStruct {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], POINT.prototype, "x", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], POINT.prototype, "y", void 0);
POINT = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], POINT);
exports.POINT = POINT;
let MSG = class MSG extends nativeclass_1.NativeStruct {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(HWND)
], MSG.prototype, "hwnd", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(UINT)
], MSG.prototype, "message", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], MSG.prototype, "wParam", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], MSG.prototype, "lParam", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], MSG.prototype, "time", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(POINT)
], MSG.prototype, "pt", void 0);
MSG = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], MSG);
exports.MSG = MSG;
const LPVOID = core_1.VoidPointer;
const HMENU = core_1.VoidPointer;
let CREATESTRUCT = class CREATESTRUCT extends nativeclass_1.NativeStruct {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(LPVOID)
], CREATESTRUCT.prototype, "lpCreateParams", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(HINSTANCE)
], CREATESTRUCT.prototype, "hInstance", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(HMENU)
], CREATESTRUCT.prototype, "hMenu", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(HWND)
], CREATESTRUCT.prototype, "hwndParent", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(int)
], CREATESTRUCT.prototype, "cy", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(int)
], CREATESTRUCT.prototype, "cx", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(int)
], CREATESTRUCT.prototype, "y", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(int)
], CREATESTRUCT.prototype, "x", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.LONG)
], CREATESTRUCT.prototype, "style", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(LPCWSTR)
], CREATESTRUCT.prototype, "lpszName", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(LPCWSTR)
], CREATESTRUCT.prototype, "lpszClass", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.DWORD)
], CREATESTRUCT.prototype, "dwExStyle", void 0);
CREATESTRUCT = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], CREATESTRUCT);
exports.CREATESTRUCT = CREATESTRUCT;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93c19oLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2luZG93c19oLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBNEI7QUFDNUIsaUNBQXFDO0FBQ3JDLCtDQUFpRztBQUNqRyw2Q0FBNkU7QUFFN0UsTUFBTSxLQUFLLEdBQUcsb0JBQU8sQ0FBQztBQUV0QixNQUFNLE1BQU0sR0FBRyxxQkFBUSxDQUFDO0FBRXhCLE1BQU0sS0FBSyxHQUFHLHFCQUFRLENBQUM7QUFHVixRQUFBLFFBQVEsR0FBRyxHQUFHLENBQUM7QUFFZixRQUFBLGFBQWEsR0FBRyxJQUFJLENBQUM7QUFDckIsUUFBQSxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBQ3JCLFFBQUEsY0FBYyxHQUFHLElBQUksQ0FBQztBQUN0QixRQUFBLGNBQWMsR0FBRyxJQUFJLENBQUM7QUFDdEIsUUFBQSxZQUFZLEdBQUcsSUFBSSxDQUFDO0FBQ3BCLFFBQUEsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO0FBQ3pCLFFBQUEsc0JBQXNCLEdBQUcsSUFBSSxDQUFDO0FBQzlCLFFBQUEsc0JBQXNCLEdBQUcsSUFBSSxDQUFDO0FBQzlCLFFBQUEsVUFBVSxHQUFHLEtBQUssQ0FBQztBQUNuQixRQUFBLFlBQVksR0FBRyxLQUFLLENBQUM7QUFDckIsUUFBQSxpQkFBaUIsR0FBRyxLQUFLLENBQUM7QUFDMUIsUUFBQSxzQkFBc0IsR0FBRyxNQUFNLENBQUM7QUFDaEMsUUFBQSxzQkFBc0IsR0FBRyxNQUFNLENBQUM7QUFDaEMsUUFBQSx1QkFBdUIsR0FBRyxNQUFNLENBQUM7QUFDakMsUUFBQSxxQkFBcUIsR0FBRyxNQUFNLENBQUM7QUFDL0IsUUFBQSwwQkFBMEIsR0FBRyxNQUFNLENBQUM7QUFDcEMsUUFBQSwrQkFBK0IsR0FBRyxPQUFPLENBQUM7QUFDMUMsUUFBQSxzQkFBc0IsR0FBRyxPQUFPLENBQUM7QUFDakMsUUFBQSwyQkFBMkIsR0FBRyxVQUFV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eUJBQXlCO0FBQzVELFFBQUEseUJBQXlCLEdBQUcsSUFBSSxDQUFDLENBQUMscUNBQXFDO0FBRXZFLFFBQUEsOEJBQThCLEdBQUcsSUFBSSxDQUFDLENBQUMsd0NBQXdDO0FBQy9FLFFBQUEsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLENBQUMsa0NBQWtDO0FBQ25FLFFBQUEsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLENBQUMsMkJBQTJCO0FBQzNELFFBQUEsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLENBQUMsNEJBQTRCO0FBQzdELFFBQUEsMkJBQTJCLEdBQUcsSUFBSSxDQUFDLENBQUMsd0JBQXdCO0FBQzVELFFBQUEsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLENBQUMsZ0JBQWdCO0FBQzVDLFFBQUEsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLENBQUMsaUJBQWlCO0FBQzlDLFFBQUEsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLENBQUMsaUJBQWlCO0FBQzlDLFFBQUEsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLENBQUMsbUJBQW1CO0FBQ2xELFFBQUEsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLENBQUMsbUJBQW1CO0FBQ2xELFFBQUEsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLENBQUMsbUJBQW1CO0FBQ2xELFFBQUEsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLENBQUMsZ0JBQWdCO0FBQzVDLFFBQUEsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLENBQUMsaUJBQWlCO0FBQzlDLFFBQUEsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLENBQUMsaUJBQWlCO0FBQzlDLFFBQUEscUJBQXFCLEdBQUcsSUFBSSxDQUFDLENBQUMsa0JBQWtCO0FBQ2hELFFBQUEsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLENBQUMsbUJBQW1CO0FBQ2xELFFBQUEscUJBQXFCLEdBQUcsSUFBSSxDQUFDLENBQUMsa0JBQWtCO0FBQ2hELFFBQUEsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLENBQUMsaUJBQWlCO0FBQzVDLFFBQUEsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLENBQUMs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